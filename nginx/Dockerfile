FROM openresty/openresty:alpine

# Install docker CLI and docker-compose
RUN apk add --no-cache \
    docker-cli \
    docker-compose

# Create scripts directory
RUN mkdir -p /usr/local/openresty/scripts

# Copy configuration files
COPY nginx.conf /usr/local/openresty/nginx/conf/nginx.conf
COPY html /usr/share/nginx/html
COPY .htpasswd /etc/nginx/.htpasswd
COPY stop.sh /usr/local/openresty/scripts/stop.sh

# Make stop script executable
RUN chmod +x /usr/local/openresty/scripts/stop.sh

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"] 