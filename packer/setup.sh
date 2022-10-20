#!/bin/bash

sleep 40

sudo apt-get update -y
sudo apt-get upgrade
# sudo apt-get install build-essential

# sudo apt-get install git make gcc -y

# npm
sudo apt-get -y install npm

#node
curl -sL https://deb.nodesource.com/setup_16.X | sudo -E bash -
sudo apt-get install -y nodejs

#pm2
sudo npm install -g pm2

#mysql
sudo apt-get -y install mysql-server
sudo systemctl start mysql.service
sudo systemctl status mysql


node --version
npm --version

# sudo apt-get install plocate
# mkdir ec2-user
# mkdir ec2-user/node-app
mkdir node-app

chown ubuntu:ubuntu /home/ubuntu/node-app