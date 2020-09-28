# pull official base image
FROM node:13.12.0-alpine

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
RUN npm run add-locale en it
RUN npm run extract:clean
RUN npm run compile

EXPOSE 8888
# start app
CMD ["npm", "start"] 
