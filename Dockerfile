FROM directus/directus:10.1.1

ENV \
  KEY="fe301aa8-c5a2-470d-ad73-a93a2929c109" \
  SECRET="bwuTV-tjqW4D9Fu5G3GYXuBS87EWBsS0" \
  ADMIN_EMAIL='' \
  ADMIN_PASSWORD='' \
  DB_CLIENT="mysql" \
  DB_HOST="" \
  DB_PORT="" \
  DB_DATABASE="" \
  DB_USER="" \
  DB_PASSWORD="" \
  WEBSOCKETS_ENABLED="true"

EXPOSE 8056
CMD npx directus bootstrap && npx directus start