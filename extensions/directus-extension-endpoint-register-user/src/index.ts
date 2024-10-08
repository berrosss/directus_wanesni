import { defineEndpoint } from "@directus/extensions-sdk";

export default defineEndpoint((router, context) => {
  router.post("/", async (_req: any, res: any) => {
    const { services, getSchema } = context;
    const { UsersService } = services;
    const schema = await getSchema();
    const usersService = new UsersService({
      schema,
      accountability: {
        ..._req.accountability,
        admin: true,
        role: "0eb17514-a007-424a-b7b2-11074e7cf585",
      },
    });
    try {
      const usr = await usersService.createOne(_req.body);
      console.log(JSON.stringify(usr));
      return res.status(200).send({
        data: usr,
      });
    } catch (error) {
      return res.status(500).send({
        error: error,
      });
    }
  });
});

function isValidMap(obj: any) {
  const requiredFields = [
    "first_name",
    "last_name",
    "email",
    "gender",
    "isocode",
    "device_id",
    "birthday",
    "avatar",
    "location",
    "manager_id",
    "phone",
    "role",
    "password",
    "user_type",
  ];
  for (const field of requiredFields) {
    if (!(field in obj) || obj[field] === "") {
      return false;
    }
  }
  return true;
}
