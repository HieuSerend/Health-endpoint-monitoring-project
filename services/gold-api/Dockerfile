FROM node:22.11-alpine

WORKDIR /app

COPY package*.json ./

RUN npm install

COPY . .

ENV PORT=8001
ENV SJC_URL=https://sjc.com.vn/GoldPrice/Services/PriceService.ashx

EXPOSE 8001

CMD [ "npm", "start" ] 
