import { defineHook } from "@directus/extensions-sdk";
import { createError } from "@directus/errors";

export default defineHook(({ filter, action }) => {
  filter("users.create", async (input) => {
    var res = isValidMap(input);
    console.log("input", Object.keys(input!));
    if (!res) {
      throw createError("INVALID_PAYLOAD", "Payload is required");
    }
  });

  action("users.create", () => {
    console.log("user created!");
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
  ];
  for (const field of requiredFields) {
    if (!(field in obj) || obj[field] === "") {
      return false;
    }
  }
  return true;
}
