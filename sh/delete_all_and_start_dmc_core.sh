1#!/bin/sh

echo "======================================="
echo "      Установка и запуск dmc.core      "
echo "======================================="

cd ..
git pull
echo y | docker system prune
echo y | docker system prune -a
echo y | docker volume prune
echo y | docker network prune
docker-compose build
docker-compose up
exit
