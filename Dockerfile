FROM node:20-alpine

WORKDIR /api

COPY package*.json ./

RUN npm ci --only=production

COPY . .

RUN npx prisma generate

RUN npm run build

EXPOSE 3000

CMD ["npm", "start"]
