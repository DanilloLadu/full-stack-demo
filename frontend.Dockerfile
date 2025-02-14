#Build
FROM node:22-alpine as build-stage

WORKDIR /app

COPY /frontend/package*.json ./

RUN npm install

COPY /frontend .

RUN npm run build --prod

#Deploy
FROM nginx:alpine

COPY nginx.conf /etc/nginx/nginx.conf

COPY --from=build-stage /app/dist/frontend/browser /usr/share/nginx/html

EXPOSE 80
