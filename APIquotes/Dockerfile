# FROM nginx:stable-alpine
# COPY ./nginx/default.conf /etc/nginx/conf.d/default.conf
# COPY ./www/html/ /var/www/html
# EXPOSE 80

#Switch to Apache
FROM php:apache
#WORKDIR /var/www/html

COPY www/html/ /var/www/html/
EXPOSE 80