echo off
cls
echo "===========dmc.core start==========="
cd ..
docker-compose stop
docker-compose up
exit