"use strict";

process.env.NODE_ENV = process.env.NODE_ENV || "local";
var fs        = require("fs");
var path      = require("path");
var Sequelize = require("sequelize");
if(process.env.NODE_ENV !== "SQLITE_TEST")
  var config = require(path.join(__dirname, '../config/', process.env.NODE_ENV + '.js'))


// instantiate sequelize By getting the details from config. Configuration will handle the master slave Connections.
if (process.env.DATABASE_URL) {
  var sequelize = new Sequelize(process.env.DATABASE_URL, config)
}
else if(process.env.NODE_ENV === "SQLITE_TEST"){
  var sequelize = new Sequelize('sqlite:',{dailect : 'sqlite',storage : ':memory:', synchronous:'OFF'});
}
else if (process.env.NODE_ENV && process.env.NODE_ENV != 'local') {
  var dbConfig = require(path.join(__dirname, '../../../', 'sequelize.json'))['mysql']
  var sequelize = new Sequelize(dbConfig.database, null, null, dbConfig)
}
else {
  var sequelize = new Sequelize(config.mysql.database, null, null, config.mysql)
}
var db  = {};
fs
  .readdirSync(__dirname)
  .filter(function(file) {
    if(process.env.NODE_ENV === "SQLITE_TEST"){
        if(file === "product_instance_mem.js")
          return true;
        else
          return false;
    }
    else
      return (file.indexOf(".") !== 0) && (file !== "index.js");
  })
  .forEach(function(file) {
    var model = sequelize.import(path.join(__dirname, file));
    db[model.name] = model;
  });

db.sequelize = sequelize;
db.Sequelize = Sequelize;
module.exports = db;
