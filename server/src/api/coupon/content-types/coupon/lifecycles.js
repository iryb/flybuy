module.exports = {
  async afterCreate(event) {
    // Connected to "Save" button in admin panel
    const { result } = event;

    try {
      await strapi.plugins["email"].services.email.send({
        to: `${result.email}`,
        from: process.env.SMTP_FROM_EMAIL,
        replyTo: process.env.SMTP_REPLY_TO_EMAIL,
        subject: "Get your coupon!",
        html: `Your coupon for ${result.percent * 100}% discount: ${
          result.coupon
        }.`,
      });
    } catch (err) {
      console.log(err);
    }
  },
};
