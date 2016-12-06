var app = require('../server/server.js');
var loopback = require('loopback');
var connector = app.dataSources.db.connector;

connector.find = function(modelName, id, options, cb) {
  var listOfModels = app.models;
  var appModel = listOfModels[modelName];
  appModel.getData(id, function(err, data){
    if(!data.length) {
      cb(err, [data]);
    }  
  });
};

connector.create = function(modelName, id, options, cb) {
  var listOfModels = app.models;
  var appModel = listOfModels[modelName];
  appModel.getData(id, function(err, data){
    if(!data.length) {
      cb(err, [data]);
    }  
  });
};

connector.all = function(modelName, filter, options, cb) {
  var listOfModels = app.models;
  var appModel = listOfModels[modelName];
  if(!filter.where){
    appModel.getAllData(function(err, data){
      if(!data.length) {
        cb(err, [data]);
      } else {
        cb(err, data);
      }  
    });
  } else {
    appModel.getData(filter.where.id,  function(err, data){
      if(!data.length) {
        cb(err, [data]);
      } else {
        cb(err, data);
      } 
    });
  }
};