#!/bin/sh

echo "======================================="
echo "         Перезапуск dmc.core           "
echo "======================================="

cd ..
git pull
docker-compose down
docker-compose up
exit