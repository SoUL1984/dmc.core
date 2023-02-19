echo off
cls
echo "===========dmc.core delete all and start==========="
cd ..

echo y | docker system prune
echo y | docker system prune -a
echo y | docker volume prune
echo y | docker network prune
docker-compose build
docker-compose up
exit
