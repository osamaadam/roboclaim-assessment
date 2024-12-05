FROM node:22-alpine AS builder

WORKDIR /app

COPY package*.json .
RUN npm ci

COPY . .
ENV NEXT_PUBLIC_API_URL=http://localhost:4000
RUN npm run build

FROM node:22-alpine

WORKDIR /app

COPY --from=builder /app/package*.json /app/node_modules/ ./
RUN npm ci --only=production

COPY --from=builder /app/.next ./.next
COPY --from=builder /app/next.config.mjs ./next.config.mjs

EXPOSE 3000

CMD ["npm", "start"]
