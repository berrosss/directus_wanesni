# directus_wanesni

# extionsions 
## || Hook example ||
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
