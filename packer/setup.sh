#!/bin/bash

sleep 20

sudo apt-get update -y
sudo apt-get upgrade




# sudo apt-get -y install npm

#node
# curl -sL https://deb.nodesource.com/setup_16.X | sudo -E bash -
# sudo apt-get install -y nodejs
cd ~
curl -sL https://deb.nodesource.com/setup_16.x -o /tmp/nodesource_setup.sh
sudo bash /tmp/nodesource_setup.sh
sudo apt-get -y install nodejs


#pm2
sudo npm install -g pm2

#mysql
# sudo apt-get -y install mysql-server
# sudo systemctl start mysql.service
# sudo systemctl status mysql
# sudo systemctl enable --now mysqld
# systemctl status mysqld
# pwd=`sudo grep 'temporary password' /var/log/mysqld.log | rev | cut -d':' -f 1 | rev | xargs`
# sudo mysql -uroot -p$pwd --connect-expired-password -e \"Alter user 'root'@'localhost' IDENTIFIED BY 'Qwerty@12345!';\"
# mysql -u root -pQwerty@12345! -e \"CREATE DATABASE IF NOT EXISTS usersDB;\"
node --version
npm --version

# sudo apt-get install plocate
# mkdir ec2-user
# mkdir ec2-user/node-app
mkdir node-app

chown ubuntu:ubuntu /home/ubuntu/node-app