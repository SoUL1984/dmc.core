#!/bin/sh

echo "======================================="
echo "            Удаление dmc.core          "
echo "======================================="

cd ..
echo y | docker system prune
echo y | docker system prune -a
docker images -a
echo y | docker rmi image image
exit