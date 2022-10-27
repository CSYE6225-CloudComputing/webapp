#!/bin/bash

sleep 20

sudo apt-get update -y
sudo apt-get upgrade

#node
cd ~
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt-get -y install nodejs


#pm2
sudo npm install -g pm2


node --version
npm --version

mkdir node-app
chown ubuntu:ubuntu /home/ubuntu/node-app