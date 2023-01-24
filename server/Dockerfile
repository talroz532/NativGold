FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./
COPY . .

RUN npm install

CMD npm run devStart
