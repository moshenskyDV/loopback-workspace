// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var app = require('../../');
var fs = require('fs-extra');
var path = require('path');
var config = require('../config.json');
var ModelDefinition = app.models.ModelDefinition;
var Middleware = app.models.Middleware;
var ModelConfig = app.models.ModelConfig;
var ModelProperty = app.models.ModelProperty;
var ModelMethod = app.models.ModelMethod;
var loader = function(){
  return require('../workspaceManager.js');
}

module.exports.operations = createOperations;

function createOperations(){
  this._id = "create";
}

createOperations.prototype.createModelConfig = function(modelConfig, data, cb) {
  var modelConfigFilePath = path.join(loader().getDirectory(), 'server/model-config.json');
  fs.writeJson(modelConfigFilePath, data, function(err) {
    if(err) return cb(err);
    cb(null);
  }); 
}

createOperations.prototype.createModel = function(id, data, cb) {
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var folder = config.ModelDefaultDir;
  var file = path.resolve(loader().getDirectory(), facet, folder, modelName + '.json');
  fs.writeJson(file, data, function(err) {
    if(err) return cb(err);
    cb(null);
  });
}

createOperations.prototype.createMiddleware = function(id, data, cb) {
  var file = path.resolve(loader().getDirectory(), 'server/middleware.json');
  fs.writeJson(file, data, function(err) {
    if(err) return cb(err);
    cb(null);
  });
}

