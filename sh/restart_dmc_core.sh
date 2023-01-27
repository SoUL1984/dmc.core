#!/bin/sh

echo "======================================="
echo "         Перезапуск dmc.core           "
echo "======================================="

cd ..
git pull
docker-compose down
COMPOSE_HTTP_TIMEOUT=300 docker-compose up
exit
