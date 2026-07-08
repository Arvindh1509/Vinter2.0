# Backend Dockerfile for the Express server
FROM node:22-alpine AS deps
WORKDIR /app
RUN apk add --no-cache curl

# Copy backend package manifest and lockfile
COPY package.json ./
COPY server/package-lock.json ./package-lock.json
RUN npm ci --production

FROM node:22-alpine AS runner
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY server/ ./

EXPOSE 8000
ENV PORT=8000
CMD ["node", "server2.js"]
