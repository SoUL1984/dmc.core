#!/bin/sh

echo "======================================="
echo "            Удаление dmc.core          "
echo "======================================="

cd ..
echo y | docker system prune
echo y | docker system prune -a
echo y | docker volume prune
echo y | docker network prune
docker images -a
echo y | docker rmi image image
exit
