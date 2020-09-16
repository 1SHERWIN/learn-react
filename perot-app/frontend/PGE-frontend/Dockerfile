# base image
FROM node:12.2.0

# set working directory
WORKDIR /app

# install and cache app dependencies
COPY package*.json /app/
RUN npm i -g @angular/cli
RUN npm install

# add app
COPY . /app/

# start app
CMD ng serve --host 0.0.0.0