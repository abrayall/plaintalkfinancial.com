FROM ghcr.io/abrayall/lightspeed-server:latest

# Copy project files
COPY . /var/www/html/

# Inject site version
RUN echo 'version=latest' > /var/www/html/version.properties

# Set proper permissions
RUN chown -R www-data:www-data /var/www/html

# Expose port 80
EXPOSE 80
