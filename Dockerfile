FROM node:18-alpine AS builder

WORKDIR /src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run migration:run

RUN npm run seed:run

RUN npm run build

FROM node:18-alpine

WORKDIR /src/app

COPY --from=builder /src/app/node_modules ./node_modules
COPY --from=builder /src/app/package*.json ./

COPY --from=builder /src/app/dist ./dist

EXPOSE 3000

CMD ["node", "dist/src/main.js"]