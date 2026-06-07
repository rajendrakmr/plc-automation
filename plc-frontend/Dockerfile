# ═══════════════════════════════
# 1. Dependencies
# ═══════════════════════════════
FROM node:20-alpine AS deps

WORKDIR /app

COPY package.json package-lock.json* ./

RUN npm ci


# ═══════════════════════════════
# 2. Builder
# ═══════════════════════════════
FROM node:20-alpine AS builder

WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

ENV NEXT_TELEMETRY_DISABLED=1

RUN npm run build


# ═══════════════════════════════
# 3. Runner
# ═══════════════════════════════
FROM node:20-alpine AS runner

WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1

# install nginx
RUN apk add --no-cache nginx

# create nginx dirs
RUN mkdir -p /run/nginx

# copy standalone output
COPY --from=builder /app/.next/standalone ./

# copy static files
COPY --from=builder /app/.next/static ./.next/static
COPY --from=builder /app/public ./public

# copy nginx config
COPY nginx.conf /etc/nginx/nginx.conf

EXPOSE 80

# start both nginx + nextjs
CMD sh -c "node server.js & nginx -g 'daemon off;'"