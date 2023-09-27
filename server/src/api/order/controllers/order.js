"use strict";
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

/**
 * order controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController("api::order.order", ({ strapi }) => ({
  async create(ctx) {
    const {
      products,
      name,
      userId,
      email,
      discount,
      country,
      city,
      state,
      streetAddress,
      streetAddress2,
      zip,
      phoneNumber,
      comment,
    } = ctx.request.body;

    try {
      const lineItems = await Promise.all(
        products.map(async (product) => {
          const item = await strapi
            .service("api::item.item")
            .findOne(product.id);

          const finalPrice = item.price - item.price * discount.percent;
          const priceInCents = finalPrice * 100;

          return {
            price_data: {
              currency: "usd",
              product_data: {
                name: item.name,
              },
              unit_amount: priceInCents,
            },
            quantity: product.count,
          };
        })
      );

      const session = await stripe.checkout.sessions.create({
        payment_method_types: ["card"],
        customer_email: email,
        mode: "payment",
        success_url: "http://localhost:3000/success",
        cancel_url: "http://localhost:3000",
        line_items: lineItems,
      });

      await strapi.service("api::order.order").create({
        data: {
          name,
          products,
          userId,
          stripeSessionId: session.id,
          country,
          city,
          state,
          streetAddress,
          streetAddress2,
          zip,
          phoneNumber,
          comment,
        },
      });

      if (discount.name) {
        const coupon = await strapi.entityService.findMany(
          "api::coupon.coupon",
          {
            filters: {
              email,
              coupon: discount.name,
            },
          }
        );

        await strapi.entityService.delete("api::coupon.coupon", coupon[0].id);
      }

      return { id: session.id };
    } catch (error) {
      ctx.response.status = 500;
      return { error: { message: "Can't create the order." } };
    }
  },
}));
