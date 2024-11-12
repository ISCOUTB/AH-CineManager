FROM node:18-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install react@18.2.0

RUN npm install --force

COPY . .

RUN npm run build

EXPOSE 8018

CMD ["npm", "start"]
