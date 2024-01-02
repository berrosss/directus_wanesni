// import { defineOperationApi } from '@directus/extensions-sdk';

// type Options = {
// 	text: string;
// };

// export default defineOperationApi<Options>({
// 	id: 'custom',
// 	handler: ({ text }) => {
// 		console.log(text);
// 	},
// });

const axios = require("axios");
const { JWT } = require("google-auth-library");

export default {
  id: "fcm",
  handler: async ({ title, body, type, item_id }, { env, data }) => {
    const userTokens = data.$last.tokens;
    if (!Array.isArray(userTokens) || userTokens < 1) {
      return "No token provided in $last.tokens";
    }

    function getAccessToken() {
      return new Promise(function (resolve, reject) {
        const jwtClient = new JWT(
          env.FCM_CLIENT_EMAIL,
          null,
          env.FCM_PRIVATE_KEY,
          ["https://www.googleapis.com/auth/firebase.messaging"],
          null
        );
        jwtClient.authorize(function (err, tokens) {
          if (err) {
            reject(err);
            return;
          }
          resolve(tokens.access_token);
        });
      });
    }

    try {
      const accessToken = await getAccessToken();
      const headers = {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      };
      const requestData = {
        message: {
          notification: {
            body: body,
            title: title,
          },
          android: {
            priority: "high",
            notification: {
              sound: "default",
            },
          },
          apns: {
            payload: {
              aps: {
                "content-available": 1,
                sound: "default",
              },
            },
          },
          data: {
            type: type,
            item_id: item_id,
          },
        },
      };

      async function sendNotification(userToken) {
        requestData.message.token = userToken;
        try {
          const response = await axios.post(
            "https://fcm.googleapis.com/v1/projects/teamwell-380113/messages:send",
            requestData,
            { headers }
          );
          //console.log(`Notification sent to user ${userToken}: ${response.status} ${response.statusText}`);
          return response.statusText;
        } catch (error) {
          //console.error(`Error sending notification to user ${userToken}: ${error.message}`);
          return error.message;
        }
      }

      const results = [];
      for (const userToken of userTokens) {
        results.push(await sendNotification(userToken));
      }

      return { results };

      // TO DO : remove FCM token from user if not valid anymore.
    } catch (err) {
      return { error: err };
    }
  },
};
