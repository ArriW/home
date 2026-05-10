# Static site (Vite + React + TS) served by nginx.
# Build stage compiles to /app/dist; runtime stage serves it.

FROM node:22-alpine AS builder
WORKDIR /app
COPY package.json package-lock.json ./
RUN npm ci --no-audit --no-fund
COPY . .
RUN npm run build

# nginx-unprivileged runs as user `nginx` (uid 101) with no setuid; default
# listen port is 8080. This drops the privileged-port requirement, lets us
# run rootless, and matches the platform's container-hardening posture.
FROM nginxinc/nginx-unprivileged:alpine AS runtime
COPY --from=builder /app/dist /usr/share/nginx/html
COPY nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=5s --start-period=5s \
  CMD wget -qO- http://127.0.0.1:8080/ >/dev/null 2>&1 || exit 1
