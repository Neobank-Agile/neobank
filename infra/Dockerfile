FROM node:14-alpine AS builder
ARG NPM_AUTH_TOKEN
ENV NODE_ENV production
WORKDIR /app
COPY package.json .
COPY yarn.lock .
RUN echo "//registry.npmjs.org/:_authToken=${NPM_AUTH_TOKEN}" > ~/.npmrc \
    && yarn install --production 
COPY . .
RUN yarn build

FROM nginx:1.21.0-alpine as production
ENV NODE_ENV production
COPY --from=builder /app/build /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["sh", "-c", "/usr/share/nginx/html/setenv.sh && nginx -g 'daemon off;'"]
