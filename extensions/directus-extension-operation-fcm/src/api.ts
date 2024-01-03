const axios = require("axios");
const { JWT } = require("google-auth-library");

import { defineOperationApi } from "@directus/extensions-sdk";

type Options = {
  title: string;
  body: string;
  type: string;
  item_id: string;
};

export default defineOperationApi<Options>({
  id: "fcm",
  handler: async ({ title, body, type, item_id }, { env, data }) => {
    const fcmUrl = `https://fcm.googleapis.com/v1/projects/${env.FCM_PROJECT_ID}/messages:send`;

    const message = {
      message: {
        token: item_id,
        notification: {
          title: title,
          body: body,
        },
        data: {
          type: type,
        },
      },
    };

    // const headers = {
    //   "Content-Type": "application/json",
    //   Authorization: `Bearer ${data.$last.tokens}`,
    // };

    // try {
    //   const response = await axios.post(fcmUrl, message, { headers });
    //   console.log("Successfully sent FCM message:", response.data);
    // } catch (error) {
    //   console.error("Error sending FCM message:", error);
    // }
  },
});
