var clone = require('lodash').clone;
var Model = require('../model/datamodel.js').Model;
var ModelMethod = require('../model/datamodel.js').ModelMethod;
var ModelProperty = require('../model/datamodel.js').ModelProperty;
var ModelRelation = require('../model/datamodel.js').ModelRelation;
var read = require('../util/read.js');
var update = require('../util/update.js');
var create = require('../util/create.js');


module.exports = MethodHandler;

function MethodHandler() {

} 

MethodHandler.prototype.isMethodExists = function(id) {
  var storedmodel = this.getModel(modelId);
  
}

MethodHandler.prototype.readModelMethod = function(id, cb) {
  var workspace = this;
  var operations = new read.operations();
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var propertyName = parts[2];
  var modelId = parts[0] + '.' + parts[1];
  workspace.readModel(modelId, function(err, modelDef){
    var methods = modelDef['methods'];
    var method = methods[methodName];
    cb(null, method);
  });
}

MethodHandler.prototype.createModelMethod = function(id, methodDef, cb) {
  var workspace = this;
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var methodName = parts[2];
  var modelId = parts[0] + '.' + parts[1];
  var operations = new update.operations();
  
  var refresh = function(next) {
    workspace.readModel(modelId, function(err, data) {
      next();
    });
  }
  var updateModel = function(next) {
    if(workspace.isModelExists(modelId)) {
      var model = workspace.getModel(modelId);
      var method = new ModelMethod(workspace, modelId, methodName, methodDef);
      model.addMethod(methodName, method);
      var modelDef = model.getDefinition();
      operations.updateModel(modelId, modelDef, function(err) { 
        next(err);
      });
    } else {
      next("Model does not exists", null);
    }
  }

  var callBack = function(err, data) {
    cb(err, data);
  }
  var task = workspace.createTask(callBack);
  task.addFunction(refresh);
  task.addFunction(updateModel);
  workspace.addTask(task);
  workspace.execute();
}