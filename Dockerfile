# Stage 1: Build & Compress
FROM node:24-alpine AS builder

WORKDIR /app

# Install dependencies first for layered caching
COPY package*.json ./
RUN npm ci

# Copy remainder of codebase
COPY . .
RUN npm run build

# Pre-compress and replace static assets with brotli (highest compression level -Z, remove source -j)
RUN apk add --no-cache brotli
RUN find dist -type f \( -name "*.html" -o -name "*.js" -o -name "*.css" -o -name "*.svg" -o -name "*.json" -o -name "*.xml" \) -exec brotli -f -j -Z {} \+

# Stage 2: Serve
FROM nginx:alpine

# Configure Nginx
COPY nginx.conf /etc/nginx/nginx.conf

# Copy ONLY pre-compressed files from builder
COPY --from=builder /app/dist /usr/share/nginx/html

EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
