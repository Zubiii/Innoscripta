FROM php:8.3.11-fpm

# Install system dependencies
RUN apt-get update && apt-get install -y \
    libpng-dev \
    libjpeg-dev \
    libfreetype6-dev \
    libzip-dev \
    unzip \
    git \
    libicu-dev \
    libonig-dev \
    libxml2-dev \
    libcurl4-openssl-dev \
    libxslt1-dev \
    cron \
    supervisor

# Install PHP extensions
RUN docker-php-ext-configure gd --with-freetype --with-jpeg \
    && docker-php-ext-install gd zip pdo pdo_mysql intl xsl

# Set working directory
WORKDIR /var/www

# Copy application files
COPY . /var/www

# Install Composer
COPY --from=composer:latest /usr/bin/composer /usr/bin/composer
RUN composer install

# Copy cron jobs and Supervisor configuration
COPY ./cron /etc/cron.d/laravel-cron
COPY ./supervisord.conf /etc/supervisor/conf.d/supervisord.conf

# Set permissions for cron jobs
RUN chmod 0644 /etc/cron.d/laravel-cron

# Start Supervisor
CMD ["/usr/bin/supervisord"]