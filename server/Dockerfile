FROM node:18-alpine

COPY package* ./

ENV NODE_ENV=production
RUN npm install --production=false
COPY . .
ENV PORT=8000
CMD ["npm", "start"]
