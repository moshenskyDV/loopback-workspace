var clone = require('lodash').clone;
var Model = require('./model/datamodel.js').Model;
var ModelMethod = require('./model/datamodel.js').ModelMethod;
var ModelProperty = require('./model/datamodel.js').ModelProperty;
var ModelRelation = require('./model/datamodel.js').ModelRelation;
var Facet = require('./model/datamodel.js').Facet;
var read = require('./util/read.js');
var write = require('./util/write.js');

module.exports.Tasks = Tasks;

function Tasks() {

}

Tasks.prototype.refreshModel = function(modelId, cb) {
  var workspace = this;
  var operations = new read.operations();
  operations.readModel(modelId, function(err, modelDef) {
    if(err) return cb(err);
    var modelData = clone(modelDef);
    delete modelData['properties'];
    delete modelData['methods'];
    delete modelData['relations'];
    delete modelData['validations'];
    delete modelData['acls'];  
    if(!workspace.isModelExists(modelId)) {
      var model = new Model(workspace, modelId, modelData);
      model.addModelAttributes(workspace, modelId, modelDef);
    } else {
      //workspace.updateModel(modelId, modelData, cb);
    }
    cb(null, modelDef);
  });
}

Tasks.prototype.removeModel = function(modelId, cb) {
  var workspace = this;
  var operations = new write.operations();
  if(workspace.isModelExists(modelId)) {
    var model = workspace.getModel(modelId);
    workspace.deleteItem("ModelDefinition", modelId, function(err){
      if(err) cb(err);
      else cb('success');
    });
      //operations.deleteModel(modelId, function(err) { 
      //if(err) return cb(err);
      //cb(null);
    //});
  } else {
    cb("Model does not exist", null);
  }
}


Tasks.prototype.addModelConfig = function(modelId, data, cb) {
  var workspace = this;
  var facetName = 'common';
  var operations = new write.operations();
  var parts = modelId.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  if(workspace.isModelExists(modelId)) {
    var facet = workspace.getFacet(facetName);
    var model = workspace.getModel(modelId);
    facet.addModelConfig(modelName, model, data);
    var modelConfigurations = facet.getModelConfigurations();
    operations.writeModelConfig(modelConfigurations, function(err) { 
      if(err) return cb(err);
      cb(null, modelConfigurations);
    });
  } else {
    cb("Model does not exist", null);
  }
}

Tasks.prototype.refreshModelConfig = function(cb) {
  var workspace = this;
  var facetName = 'common';
  var operations = new read.operations();
  operations.readModelConfig(function(err, modelConfigurations) { 
    if(err) return cb(err);
    var facet = workspace.getFacet(facetName);
    Object.keys(modelConfigurations).forEach(function(key) {
      var config = modelConfigurations[key];
      var modelId = facetName + "." + key;
      var model = workspace.getModel(modelId);
      if(!model) {
        model = workspace.lazyLoadModel(workspace, facetName, key);
      }
      facet.addModelConfig(key, model, config);
    });
    cb(null, modelConfigurations);
  });
}

Tasks.prototype.changeModel = function(modelId, modelDef, cb) {
  var workspace = this;
  var operations = new write.operations();
  if(workspace.isModelExists(modelId)) {
    var model = workspace.getModel(modelId);
    var modelData = clone(modelDef);
    delete modelData['properties'];
    delete modelData['methods'];
    delete modelData['relations'];
    delete modelData['validations'];
    delete modelData['acls'];  
    model.update(modelData);
    model.addModelAttributes(model, modelId, modelDef);
    modelDef = model.getDefinition();
    operations.writeModel(modelId, modelDef, function(err) { 
      if(err) return cb(err);
      cb(null, modelDef);
    });
  } else {
    cb("Model does not exist", null);
  }
}

Tasks.prototype.addModel = function(modelId, modelDef, cb) {
  var workspace = this;
  var operations = new write.operations();
  if(!workspace.isModelExists(modelId)) {
    var modelData = clone(modelDef);
    delete modelData['properties'];
    delete modelData['methods'];
    delete modelData['relations'];
    delete modelData['validations'];
    delete modelData['acls'];  
    var model = new Model(workspace, modelId, modelData);
    model.addModelAttributes(model, modelId, modelDef);
    var modelDef = model.getDefinition();
    operations.writeModel(modelId, modelDef, function(err) { 
      if(err) return cb(err);
      cb(null);
    });
  } else {
    cb("Model already exists", null);
  }
}

Tasks.prototype.addFacet = function (facetName, facetConfig, cb) {
  var operations = new write.operations();
  var facet = new Facet(this, facetName, facetConfig);
  operations.writeFacet(facetName, facetConfig, function(err) { 
    if(err) return cb(err);
    cb(null, facetConfig);
  });
}

Tasks.prototype.addMethod = function (workspace, modelId, methodName, methodDef, cb) {
  var operations = new write.operations();
  if(workspace.isModelExists(modelId)) {
    var model = workspace.getModel(modelId);
    var method = new ModelMethod(workspace, modelId, methodName, methodDef);
    model.setMethod(methodName, method);
    var modelDef = model.getDefinition();
    operations.writeModel(modelId, modelDef, function(err, data) { 
      if(err) return cb(err);
      cb(null, modelDef);
    });
  } else {
    cb("Model does not exists", null);
  }
}

Tasks.prototype.addProperty = function (workspace, modelId, propertyName, propertyDef, cb) {
  var operations = new write.operations();
  if(workspace.isModelExists(modelId)) {
    var model = workspace.getModel(modelId);
    var property = new ModelProperty(workspace, modelId, propertyName, propertyDef);
    model.setProperty(propertyName, property);
    var modelDef = model.getDefinition();
    operations.writeModel(modelId, modelDef, function(err, data) {
      if(err) return cb(err); 
      cb(null, data);
    });
  } else {
    cb("Model does not exists", null);
  }
}

