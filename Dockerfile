# Build stage
FROM node:18-alpine AS builder
WORKDIR /app
COPY package*.json ./
RUN npm ci
COPY . .
RUN npm run build

# Production stage
FROM node:18-alpine AS runner
WORKDIR /app
COPY --from=builder /app/package*.json ./
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
# Only copy next.config.js if it exists (commented out if not needed)
# COPY --from=builder /app/next.config.js ./next.config.js
RUN npm ci --omit=dev
EXPOSE 3200
ENV NODE_ENV=production
CMD ["npm", "start", "--", "-p", "3200"]