FROM node:18-alpine

WORKDIR /yombo_server

COPY package* ./

ENV NODE_ENV=production
RUN npm install
COPY . .
ENV PORT=8000
CMD ["npm", "start"]
