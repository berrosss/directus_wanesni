import { defineEndpoint } from "@directus/extensions-sdk";

export default defineEndpoint((router, context) => {
  const { services, getSchema } = context;
  const { UsersService, MailService } = services;

  const usersService = new UsersService({ schema: getSchema });
  const mailService = new MailService({ schema: getSchema });

  router.post("/", async (_req, res) => {
    if (Object.keys(_req.body).length > 0) {
      if (
        _req.body.hasOwnProperty("email") ||
        _req.body.hasOwnProperty("code")
      ) {
        res.status(500).send({
          errors: [
            {
              message: "Payload email and code is required",
              extensions: {
                code: "INTERNAL_SERVER_ERROR",
              },
            },
          ],
        });
      } else {
        const { email, code } = _req.body;
        const data = await usersService.getUserByEmail(email);
        if (data != undefined) {
          res.status(500).send({
            errors: [
              {
                message: "Email already exist",
                extensions: {
                  code: "INTERNAL_SERVER_ERROR",
                },
              },
            ],
          });
        } else {
          await mailService.send({
            to: `${email}`,
            subject: "WANESNI EMAIL VERIFICATION ",
            template: {
              name: "otp-email-template",
              data: {
                code: `${code}`,
              },
            },
          });
          res.status(200).send({
            data: [
              {
                message: `Email sent to ${email}`,
                extensions: {
                  code: "SUCCESS",
                },
              },
            ],
          });
        }
      }
    } else {
      res.status(500).send({
        errors: [
          {
            message: "Payload email and code is required",
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          },
        ],
      });
    }
  });
});
