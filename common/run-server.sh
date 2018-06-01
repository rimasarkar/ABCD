#! /bin/ksh

source ~/.profile
source ../.profile
export PM2_HOME=".$NODE_ENV"
mkdir -p ~/$PM2_HOME
/app/titan/common/node pm2.js
