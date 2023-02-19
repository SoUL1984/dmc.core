echo off
cls
echo "===========dmc.core restart==========="
cd ..
git pull
docker-compose down
docker-compose up
exit
