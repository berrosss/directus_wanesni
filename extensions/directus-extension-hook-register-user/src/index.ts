import { defineHook } from "@directus/extensions-sdk";
import { createError } from "@directus/errors";

export default defineHook(({ filter, action }, { services }) => {
  filter("users.create", async (input) => {
    var res = isValidMap(input);
    if (!res) {
      throw createError("INVALID_PAYLOAD", "Payload is required");
    }
    return input;
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
    "description",
    "fcm_token",
  ];
  for (const field of requiredFields) {
    if (!(field in obj) || obj[field] === "") {
      return false;
    }
  }
  return true;
}
