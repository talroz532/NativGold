# Use a Node.js runtime as the base image
FROM node:14

RUN mkdir -p /app
WORKDIR /app

COPY package*.json ./

COPY . .
RUN npm install
RUN npm run build

CMD ["npm", "start"]