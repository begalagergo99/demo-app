# Build stage
FROM node:20 as build
WORKDIR /app
COPY client/package*.json ./
RUN npm install
COPY client/ ./

ARG REACT_APP_API_BASE_URL
RUN REACT_APP_API_BASE_URL=${REACT_APP_API_BASE_URL} npm run build

# Run stage
FROM nginx:alpine
COPY --from=build /app/build /usr/share/nginx/html
EXPOSE 80
CMD ["nginx", "-g", "daemon off;"]
