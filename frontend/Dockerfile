FROM node:18-alpine

RUN apk update && apk add nginx

WORKDIR /yombo_frontend

COPY package.json ./
COPY package-lock.json ./

ENV NODE_ENV=production
RUN npm install
COPY . .
COPY nginx.conf /etc/nginx/
RUN npm run build

CMD ["nginx", "-g daemon off;"]
