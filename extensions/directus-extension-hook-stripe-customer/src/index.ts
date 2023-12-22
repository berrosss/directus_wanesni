import { defineHook } from "@directus/extensions-sdk";
import Stripe from "stripe";

export default defineHook(({ action }, { env, services }) => {
  const { MailService, ItemsService } = services;

  action("items.create", async ({ key, collection, payload }, { schema }) => {
    if (collection !== "stripe_customers") return;
    const stripe = new Stripe(env.STRIPE_SECRET_KEY);

    const paymentIntent = await stripe.paymentIntents.create({
      amount: 3000, // Amount in cents
      currency: "usd",
      payment_method_types: ["card"],
    });

    console.log("Client Secret:", paymentIntent.client_secret);

    stripe.customers
      .create({
        name: `${payload.first_name} ${payload.last_name}`,
        email: payload.email_address,
      })
      .then((customer) => {
        const customers = new ItemsService(collection, { schema: schema });
        customers.updateByQuery(
          { filter: { id: key } },
          { stripe_id: customer.id },
          { emitEvents: false }
        );
      })
      .catch((error) => {
        // const mailService = new MailService({ schema });
        // mailService.send({
        // 	to: 'wanesnichat@gmail.com',
        // 	from: 'aniffour.dev@gmail.com',
        // 	subject: `An error has occurred with Stripe API`,
        // 	text: `The following error occurred for ${payload.first_name} ${payload.last_name} when attempting to create an account in Stripe.\r\n\r\n${error}\r\n\r\nPlease investigate.\r\n\r\nID: ${key}\r\nEmail: ${payload.email_address}`,
        // });
      });
  });
});
