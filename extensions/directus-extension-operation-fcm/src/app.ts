import { defineOperationApp } from "@directus/extensions-sdk";

export default defineOperationApp({
  id: "fcm",
  name: "Notify users using FCM",
  icon: "box",
  description:
    "$last.tokens must contain user tokens as JSON. Uses Google Auth Library to retrieve an access token, then notify the users",
  overview: ({ title, body, type }) => [
    {
      label: "Title",
      text: title,
    },
    {
      label: "Body",
      text: body,
    },
    {
      label: "type",
      text: type,
    },
  ],
  options: [
    {
      field: "title",
      name: "Title",
      type: "string",
      meta: {
        width: "full",
        interface: "input",
      },
    },
    {
      field: "body",
      name: "Body",
      type: "string",
      meta: {
        width: "full",
        interface: "input",
      },
    },
    {
      field: "type",
      name: "type",
      type: "string",
      meta: {
        width: "full",
        interface: "input",
      },
    },
  ],
});
