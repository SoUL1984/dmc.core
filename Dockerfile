FROM node:12.6

WORKDIR /app

COPY package*.json ./

RUN npm install -g npm@6.14.11

RUN npm --version

RUN npm install --verbose

COPY . .

CMD ["npm", "run", "start:de

