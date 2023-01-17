#!/bin/sh
sed "s|API_URL|$API_URL|" /usr/share/nginx/html/index.html > /tmp/aux.html
mv /tmp/index.html /usr/share/nginx/html/index.html
