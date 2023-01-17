FROM node:12.6

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@latest

RUN npm install --verbose

COPY . .

CMD ["npm", "run", "start:dev"]

