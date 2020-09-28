# pull official base image
FROM node:13.12.0-alpine

# set working directory
WORKDIR /app

# add `/app/node_modules/.bin` to $PATH
ENV PATH /app/node_modules/.bin:$PATH

# install app dependencies
COPY packages/api/package.json ./
COPY packages/api/package-lock.json ./
RUN npm install

# add app
COPY packages/api/ ./
RUN npm install

EXPOSE 3000 
# start app
CMD ["npm", "start"] 
