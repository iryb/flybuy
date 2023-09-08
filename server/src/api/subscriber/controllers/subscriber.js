"use strict";

/**
 * subscriber controller
 */

const { createCoreController } = require("@strapi/strapi").factories;

module.exports = createCoreController(
  "api::subscriber.subscriber",
  ({ strapi }) => ({
    async create(ctx) {
      const { email } = ctx.request.body;

      try {
        const isSubscribed = await strapi.entityService.findMany(
          "api::subscriber.subscriber",
          {
            filters: { email },
          }
        );

        if (isSubscribed.length > 0) throw new Error();

        await strapi.service("api::subscriber.subscriber").create({
          data: { email },
        });

        await strapi.service("api::coupon.coupon").create({
          data: { email, coupon: "FIRST10" },
        });

        return { data: { message: "sucessfullySubscribed" } };
      } catch (error) {
        ctx.response.status = 500;
        return { error: { message: "cantSubscribe" } };
      }
    },
  })
);
