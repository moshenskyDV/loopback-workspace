var clone = require('lodash').clone;
var Model = require('../model/datamodel.js').Model;
var ModelMethod = require('../model/datamodel.js').ModelMethod;
var ModelProperty = require('../model/datamodel.js').ModelProperty;
var ModelRelation = require('../model/datamodel.js').ModelRelation;
var read = require('../util/read.js');
var update = require('../util/update.js');
var create = require('../util/create.js');

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
      //workspace.updateModel(modelId, modelData, cb);
    }
    cb(null, modelDef);
  });
}

ModelHandler.prototype.readModelRelation = function(id, cb) {
  var workspace = this;
  var operations = new read.operations();
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var propertyName = parts[2];
  var modelId = parts[0] + '.' + parts[1];
  workspace.readModel(modelId, function(err, modelDef) {
    var relations = modelDef['relations'];
    var relation = relations[relationName];
    cb(null, relation);
  });
}

ModelHandler.prototype.updateModel = function(modelId, modelData, cb) {
  var workspace = this;
  var operations = new update.operations();
  if(workspace.isModelExists(modelId)) {
    var model = workspace.getModel(modelId);
    model.update(modelData);
    var modelDef = model.getDefinition();
    operations.updateModel(modelId, modelDef, function(err) { 
      cb(err);
    });
  } else {
    cb("Model does not exist", null);
  }
}

ModelHandler.prototype.createModel = function(modelId, modelData, cb) {
  var workspace = this;
  var operations = new create.operations();
  if(!workspace.isModelExists(modelId)) {
    operations.createModel(modelId, modelData, function(err) { 
      cb(err);
    });
  } else {
    cb("Model already exists", null);
  }
}