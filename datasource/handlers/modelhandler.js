var clone = require('lodash').clone;
var Model = require('../model/datamodel.js').Model;
var ModelMethod = require('../model/datamodel.js').ModelMethod;
var ModelProperty = require('../model/datamodel.js').ModelProperty;
var ModelRelation = require('../model/datamodel.js').ModelRelation;

module.exports = ModelHandler;

function ModelHandler() {

} 

ModelHandler.prototype.isModelExists = function(modelId) {
  var storedmodel = this.getModel(modelId);
  if(typeof storedmodel === 'undefined') { 
    return false; 
  } else { 
    return true;
  }
}

ModelHandler.prototype.readModel = function(modelId, cb) {
  var workspace = this;

  var readModel = function(next) {
    workspace.readModel(modelId, function(err, modelDef){
      if(err) return next(err);
      next(null, modelDef);
    });
  }

  var callBack = function(err, results) {
    if(err) return cb(err);
    var modelDef = results[0];
    var modelData = clone(modelDef);
    delete modelData['properties'];
    delete modelData['methods'];
    delete modelData['relations'];
    delete modelData['validations'];
    delete modelData['acls'];  
    if(!workspace.isModelExists(modelId)) {
      var model = new Model(workspace, modelId, modelData);
      workspace.addConfigEntry(workspace, modelId, model, modelDef);
      workspace.addModelAttributes(model, modelId, modelDef);
    } else {
      //workspace.updateModel(modelId, modelData, cb);
    }
    cb(null, modelDef);
  }

  var taskList = [readModel];
  workspace.execute(taskList, callBack);
}

ModelHandler.prototype.updateModel = function(modelId, modelData, cb) {
  var workspace = this;

  var refresh = function(next) {
    workspace.readModel(modelId, function(err, modelDef){
      if(err) return next(err);
      next(null, modelDef);
    });
  }

  var update = function(next) {
    if(workspace.isModelExists(modelId)) {
      var model = workspace.getModel(modelId);
      model.update(modelData);
      var modelDef = model.getDefinition();
      workspace.changeModel(modelId, modelDef, function(err) { 
        next(err);
      });
    } else {
      next("Model does not exist", null);
    }
  }

  var callBack = function(err, results) {
    if(err) return cb(err);
    var modelDef = results[0];
    cb(null, modelDef);
  }

  var taskList = [refresh, update];
  workspace.execute(taskList, callBack);
}

ModelHandler.prototype.createModel = function(modelId, modelData, cb) {
  var workspace = this;

  var create = function(next) {
    if(!workspace.isModelExists(modelId)) {
      workspace.addModel(modelId, modelData, function(err) { 
        next(err, modelData);
      });
    } else {
      next("Model already exists", null);
    }
  }
  
  var callBack = function(err, results) {
    if(err) return cb(err);
    var modelDef = results[0];
    cb(null, modelDef);
  }

  var taskList = [create];
  workspace.execute(taskList, callBack);
}