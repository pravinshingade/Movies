FROM node:14-alpine as builder
WORKDIR /api
COPY ./package.json ./
RUN yarn install
COPY . .
RUN yarn build


# Second Stage : Setup command to run your app using lightweight node image
FROM node:14-alpine
WORKDIR /api
COPY --from=builder /api ./
EXPOSE 4000
CMD ["yarn", "start:prod"]