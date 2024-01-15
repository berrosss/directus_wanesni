import { defineEndpoint } from "@directus/extensions-sdk";

export default defineEndpoint((router, context) => {
  const { services, getSchema } = context;
  const { UsersService } = services;

  router.post("/", async (_req: any, res) => {
    const schema = await getSchema();
    const usersService = new UsersService({
      schema,
      accountability: _req.accountability,
    });

    console.log(Object.keys(_req.body).length);
    if (Object.keys(_req.body).length > 0) {
      if (
        _req.body.hasOwnProperty("first_name") &&
        _req.body.hasOwnProperty("last_name") &&
        _req.body.hasOwnProperty("email") &&
        _req.body.hasOwnProperty("gender") &&
        _req.body.hasOwnProperty("isocode") &&
        _req.body.hasOwnProperty("device_id") &&
        _req.body.hasOwnProperty("birthday") &&
        _req.body.hasOwnProperty("avatar") &&
        _req.body.hasOwnProperty("location") &&
        _req.body.hasOwnProperty("manager_id") &&
        _req.body.hasOwnProperty("phone") &&
        _req.body.hasOwnProperty("role") &&
        _req.body.hasOwnProperty("password")
      ) {
        try {
          const data = await usersService.createOne({
            first_name: _req.body.first_name,
            last_name: _req.body.last_name,
            email: _req.body.email,
            gender: _req.body.gender,
            isocode: _req.body.isocode,
            device_id: _req.body.device_id,
            birthday: _req.body.birthday,
            avatar: _req.body.avatar,
            location: _req.body.location,
            manager_id: _req.body.manager_id,
            phone: _req.body.phone,
            password: _req.body.password,
            role: _req.body.role,
          });
          res.json(data);
        } catch (error) {
          res.status(500).send({
            errors: [
              {
                message: error,
                extensions: {
                  code: "INTERNAL_SERVER_ERROR",
                },
              },
            ],
          });
        }
      } else {
        res.status(500).send({
          errors: [
            {
              message: "Some fields are missing",
              extensions: {
                code: "INTERNAL_SERVER_ERROR",
              },
            },
          ],
        });
      }
    } else {
      res.status(500).send({
        errors: [
          {
            message: "Payload is required",
            extensions: {
              code: "INTERNAL_SERVER_ERROR",
            },
          },
        ],
      });
    }
  });
});
