FROM node:20-alpine

WORKDIR /comments-app/

COPY package*.json ./

RUN npm install

CMD ["npm", "dev"]
