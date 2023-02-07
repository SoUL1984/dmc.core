#!/bin/sh

echo "======================================="
echo "            Запуск dmc.core            "
echo "======================================="

cd ..
git pull
docker-compose stop
docker-compose up
exit
