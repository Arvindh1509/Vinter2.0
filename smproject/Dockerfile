# Frontend Dockerfile for the React app
FROM node:22-alpine AS build
WORKDIR /app

COPY smproject/package.json smproject/package-lock.json ./
RUN npm ci

COPY smproject/ ./
RUN npm run build

FROM nginx:stable-alpine AS runtime
COPY --from=build /app/build /usr/share/nginx/html
COPY smproject/nginx.conf /etc/nginx/conf.d/default.conf
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
