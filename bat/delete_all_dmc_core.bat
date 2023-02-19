echo off
cls
echo "===========dmc.core delete==========="
cd ..
echo y | docker system prune
echo y | docker system prune -a
echo y | docker volume prune
echo y | docker network prune
docker images -a
echo y | docker rmi image image
pause
exit
