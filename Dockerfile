
# Use official Node.js image for build
FROM node:18 AS build

# Set working directory
WORKDIR /app

# Copy package.json and package-lock.json (or yarn.lock)
COPY package*.json ./

# Install dependencies
RUN npm install

# Copy the rest of the application code
COPY . .

# Accept build arg for API URL
ARG REACT_APP_API_URL

# Set env for build
ENV REACT_APP_API_URL=$REACT_APP_API_URL

# Build the React app with the correct API URL
RUN echo "REACT_APP_API_URL=$REACT_APP_API_URL" > .env && npm run build

# Use official Nginx image for serving static files
FROM nginx:alpine

# Copy built React app from previous stage
COPY --from=build /app/build /usr/share/nginx/html

# Copy custom nginx config if present
COPY nginx.conf /etc/nginx/nginx.conf

# Set default port for Cloud Run
ENV PORT=8080

# Expose the port (Cloud Run will map this)
EXPOSE 8080

# Start Nginx with envsubst to inject PORT into nginx.conf
CMD ["/bin/sh", "-c", "envsubst '$PORT' < /etc/nginx/nginx.conf > /etc/nginx/nginx.conf.tmp && mv /etc/nginx/nginx.conf.tmp /etc/nginx/nginx.conf && nginx -g 'daemon off;'"]
