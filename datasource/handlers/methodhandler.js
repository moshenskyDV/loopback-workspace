var clone = require('lodash').clone;
var Model = require('../model/datamodel.js').Model;
var ModelMethod = require('../model/datamodel.js').ModelMethod;
var ModelProperty = require('../model/datamodel.js').ModelProperty;
var ModelRelation = require('../model/datamodel.js').ModelRelation;

module.exports = MethodHandler;

function MethodHandler() {

} 

MethodHandler.prototype.isMethodExists = function(id) {
  var storedmodel = this.getModel(modelId);
  
}

MethodHandler.prototype.readModelMethod = function(id, cb) {
  var workspace = this;
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var methodName = parts[2];
  var modelId = parts[0] + '.' + parts[1];

  var readModel = function(next) {
    workspace.readModel(modelId, function(err, modelDef){
      if(err) return next(err);
      next(null, modelDef);
    });
  }

  var callBack = function(err, results){
    if(err) return cb(err);
    var modelDef = results[0];
    var methods = modelDef['methods'];
    var method = methods[methodName];
    cb(null, method);
  }

  var taskList = [readModel];
  workspace.execute(taskList, callBack);
}

MethodHandler.prototype.createModelMethod = function(id, methodDef, cb) {
  var workspace = this;
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var methodName = parts[2];
  var modelId = parts[0] + '.' + parts[1];
  
  var refresh = function(next) {
    workspace.readModel(modelId, function(err, data) {
      next();
    });
  }
  var updateModel = function(next) {
    workspace.addMethod(workspace, modelId, methodName, methodDef, next);
  }

  var callBack = function(err, data) {
    cb(err, data);
  }

  var taskList = [refresh, updateModel];
  workspace.execute(taskList, callBack);
}
