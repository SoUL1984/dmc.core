FROM node:12.6

WORKDIR /app

COPY package*.json ./

COPY . .

RUN npm install

CMD ["npm", "run", "start:dev"]

