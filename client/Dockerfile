FROM alpine
EXPOSE 80

COPY . /var/www/localhost/htdocs
RUN apk add nginx && \
    mkdir /run/nginx && \
    apk add nodejs && \
    apk add npm && \
    cd /var/www/localhost/htdocs && \
    npm install && \
    npm rebuild node-sass && \
    npm run build && \
    apk del nodejs && \
    apk del npm && ls;
ADD config/default.conf /etc/nginx/conf.d/default.conf
CMD ["/bin/sh", "-c", "exec nginx -g 'daemon off;';"]
WORKDIR /var/www/localhost/htdocs