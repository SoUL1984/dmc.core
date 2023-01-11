#!/bin/sh

echo "======================================="
echo "      Установка и запуск dmc.core      "
echo "======================================="

cd ..
git pull
echo y | docker system prune
echo y | docker system prune -a
docker-compose build
docker-compose up
exit