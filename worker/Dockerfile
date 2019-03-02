FROM node:8.7.0

RUN apt-get update && apt-get install -y wget

ENV DOCKERIZE_VERSION v0.5.0
RUN wget https://github.com/jwilder/dockerize/releases/download/$DOCKERIZE_VERSION/dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && tar -C /usr/local/bin -xzvf dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz \
    && rm dockerize-linux-amd64-$DOCKERIZE_VERSION.tar.gz

WORKDIR /usr/app

COPY ./package.json ./package.json

RUN npm install && npm cache clean --force

COPY ./ ./

EXPOSE 5000

CMD dockerize -wait tcp://mongodb:27017 -timeout 1m && npm start