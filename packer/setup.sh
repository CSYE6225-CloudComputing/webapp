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

#cloudwatch
sudo wget https://s3.amazonaws.com/amazoncloudwatch-agent/debian/amd64/latest/amazon-cloudwatch-agent.deb
sudo dpkg -i -E ./amazon-cloudwatch-agent.deb
sudo apt-get install amazon-cloudwatch-agent

# install codedeploy agent
cd /home/ubuntu
sudo wget https://aws-codedeploy-us-east-1.s3.us-east-1.amazonaws.com/latest/install
sudo chmod +x ./install
sudo ./install auto
sudo service codedeploy-agent status
sudo service codedeploy-agent start
sudo service codedeploy-agent status

#zip
sudo apt-get install zip unzip

#unzip
# mkdir -p ~/node-app/
# mv /tmp/webapp.zip ~/node-app/
# cd ~/node-app
# unzip webapp.zip -d webapp
# cd webapp
# ls
# npm install


node --version
npm --version

mkdir node-app
chown ubuntu:ubuntu /home/ubuntu/node-app
sudo chmod 777 /tmp
sudo chmod u+x /tmp/script_*.sh