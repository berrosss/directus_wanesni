# directus_wanesni

# extonsions 

###### || HOOK EXAMPLE || ########
## import { defineHook } from "@directus/extensions-sdk";
## import { createError } from "@directus/errors";
## export default defineHook(({ filter, action }, { services }) => {
##   filter("items.create", async (payload: any, meta, context) => {
##     const { UsersService, MailService } = services;
##     const { schema } = context;
##     console.log("## meta ##", meta);
##     if (Object.keys(payload).length <= 0) {
##       const Internal_Server_Error = createError(
##         "INTERNAL_SERVER_ERROR",
##         "Payload is empty.",
##         500
##       );
##       throw new Internal_Server_Error();
##     }
## 
##     if (meta.collection == "email_otp") {
##       const usersService = new UsersService({ schema });
##       const mailService = new MailService({ schema });
##       const data = await usersService.getUserByEmail(payload!.email);
##       if (data != undefined) {
##         const Internal_Server_Error = createError(
##           "INTERNAL_SERVER_ERROR",
##           "Email already exist.",
##           500
##         );
##         throw new Internal_Server_Error();
##       } else {
##         //this userr is not existed the send email
##         await mailService.send({
##           to: payload!.email,
##           subject: "WANESNI EMAIL VERIFICATION ",
##           template: {
##             name: "otp-email-template",
##             data: {
##               code: "1232",
##             },
##           },
##         });
##       }
##       console.log("## email sent ## ");
##     }
##   });
## 
##   action("items.create", () => {
##     console.log("Item created!");
##   });
## });

###### || ENDPOINT EXAMPLE || ########
## export default defineEndpoint((router, context) => {
##  const { services, getSchema } = context;
##  const { UsersService } = services;
##  router.post("/", async (_req: any, res) => {
##    const schema = await getSchema();
##    const usersService = new UsersService({
##      schema,
##      accountability: _req.accountability,
##    });
##   console.log(Object.keys(_req.body).length);
##    if (Object.keys(_req.body).length > 0) {
##      if (
##        _req.body.hasOwnProperty("first_name") &&
##        _req.body.hasOwnProperty("last_name") &&
##      ) {
##        try {
##          const data = await usersService.createOne({
##            first_name: _req.body.first_name,
##            last_name: _req.body.last_name,
##          });
##          res.json(data);
##        } catch (error) {
##          res.status(500).send({
##            errors: [
##              {
##                message: error,
##                extensions: {
##                  code: "INTERNAL_SERVER_ERROR",
##                },
##              },
##            ],
##          });
##        }
##      } else {
##        res.status(500).send({
##          errors: [
##            {
##              message: "Some fields are missing",
##              extensions: {
##                code: "INTERNAL_SERVER_ERROR",
##              },
##            },
##          ],
##        });
##      }
##    } else {
##      res.status(500).send({
##        errors: [
##          {
##            message: "Payload is required",
##            extensions: {
##              code: "INTERNAL_SERVER_ERROR",
##            },
##          },
##        ],
##      });
##    }
##  });
## });
