FROM node:alpine

WORKDIR /usr/app

COPY ./package.json ./package.json
RUN npm install && npm cache clean --force

COPY ./ ./

EXPOSE 4000

CMD ["npm", "start"]