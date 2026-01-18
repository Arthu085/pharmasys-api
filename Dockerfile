FROM node:18-alpine AS builder

WORKDIR /src/app

COPY package*.json ./

RUN npm ci

COPY . .

RUN npm run build

FROM node:18-alpine

WORKDIR /src/app

COPY --from=builder /src/app/node_modules ./node_modules
COPY --from=builder /src/app/package*.json ./

COPY --from=builder /src/app/dist ./dist
COPY --from=builder /src/app/src ./src

EXPOSE 3000

CMD ["sh", "-c", "npm run migration:run && npm run seed:run && node dist/main.js"]