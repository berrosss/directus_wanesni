import { defineOperationApi } from "@directus/extensions-sdk";

type Options = {
  title: string;
  body: string;
  type: string;
};

export default defineOperationApi<Options>({
  id: "fcm",
  handler: async ({ title, body, type }, { env, data }) => {
    console.log(JSON.stringify(title));
    console.log(JSON.stringify(body));
    console.log(JSON.stringify(type));
    console.log(JSON.stringify(env));
    console.log(JSON.stringify(data));
  },
});
