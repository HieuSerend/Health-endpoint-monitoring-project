FROM node:22.11-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8002
ENV VIETCOMBANK_URL=https://www.vietcombank.com.vn/api/exchangerates?date

EXPOSE 8002

CMD [ "npm", "start" ] 
