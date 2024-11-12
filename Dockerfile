FROM node:20.16-alpine

WORKDIR /app

COPY . .

RUN yarn

RUN yarn workspace @ticktuk-test/utils build

RUN yarn workspace @ticktuk-test/back build

EXPOSE 8081

CMD [ "yarn", "workspace", "@ticktuk-test/back", "start" ]