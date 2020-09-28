# build env
FROM node:13.12.0-alpine as builder

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY packages/frondend/package.json ./
COPY packages/frondend/package-lock.json ./
RUN npm install

# add app
COPY packages/frondend/ ./

RUN npm run extract:clean
RUN npm run compile
RUN npm run build-prod

# prod env
FROM nginx:stable-alpine
COPY --from=builder /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
