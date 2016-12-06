var clone = require('lodash').clone;
var Model = require('../datamodel.js').Model;
var ModelMethod = require('../datamodel.js').ModelMethod;
var ModelProperty = require('../datamodel.js').ModelProperty;
var ModelRelation = require('../datamodel.js').ModelRelation;
var read = require('../read.js');

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


ModelHandler.prototype.updateModel = function(modelId, modelDef) {
  var model = this.getModel(modelId);
  model._content = modelDef;
}

ModelHandler.prototype.readModel = function(modelId, cb) {
  var workspace = this;
  var operations = new read.operations();
  operations.readModel(modelId, function(err, modelDef) {
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
      workspace.updateModel(modelId, modelData);
    }
    cb(null, modelData)
  });
}

ModelHandler.prototype.readModelProperty = function(id, cb) {
  var workspace = this;
  var operations = new read.operations();
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var propertyName = parts[2];
  var modelId = parts[0] + '.' + parts[1];
  operations.readModel(modelId, function(err, modelDef) {
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
      workspace.updateModel(modelId, modelData);
    }
    var properties = modelDef['properties'];
    var property = properties[propertyName];
    cb(null, property);
  });
}

ModelHandler.prototype.readModelMethod = function(id, cb) {
  var workspace = this;
  var operations = new read.operations();
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var methodName = parts[2];
  var modelId = parts[0] + '.' + parts[1];
  operations.readModel(modelId, function(err, modelDef) {
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
      workspace.updateModel(modelId, modelData);
    }
    var properties = modelDef['methods'];
    var property = properties[methodName];
    cb(null, property);
  });
}

ModelHandler.prototype.readModelRelation = function(id, cb) {
  var workspace = this;
  var operations = new read.operations();
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var relationName = parts[2];
  var modelId = parts[0] + '.' + parts[1];
  operations.readModel(modelId, function(err, modelDef) {
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
      workspace.updateModel(modelId, modelData);
    }
    var properties = modelDef['relations'];
    var property = properties[relationName];
    cb(null, property);
  });
}