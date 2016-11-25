var clone = require('lodash').clone;
var Graph = require('./graph.js').Graph;
var Model = require('./datamodel.js').Model;
var ModelConfig = require('./datamodel.js').ModelConfig;
var ModelMethod = require('./datamodel.js').ModelMethod;
var ModelProperty = require('./datamodel.js').ModelProperty;
var ModelRelation = require('./datamodel.js').ModelRelation;
var read = require('./read.js');
var inheritsFrom = require('./util.js').inheritsFrom;
var initMiddleware = require('./util.js').initMiddleware;
var initWorkspace = require('./util.js').initWorkspace;

module.exports.loader = function() {
  return Workspace;
};

function Workspace(rootFolder) {
  Graph.call(this);
  initWorkspace(this);
  this.directory = rootFolder;
  this.middlewarePhases = [];
  //initMiddleware(this);
};

inheritsFrom(Workspace, Graph);

Workspace.prototype.isModelExists = function(modelId) {
  var storedmodel = this.getNode("ModelDefinition", modelId);
  if(typeof storedmodel === 'undefined') 
  { 
    return false; 
  } else { 
    return true;
  }
}

Workspace.prototype.getModel = function(modelId) {
  var model = this.getNode("ModelDefinition", modelId);
  return model;
}

Workspace.prototype.updateModel = function(modelId, modelDef) {
  var model = this.getNode("ModelDefinition", modelId);
  model._content = modelDef;
}

Workspace.prototype.readModel = function(modelId, cb) {
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

Workspace.prototype.readModelProperty = function(id, cb) {
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

Workspace.prototype.readModelMethod = function(id, cb) {
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

Workspace.prototype.readModelRelation = function(id, cb) {
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

Workspace.prototype.addConfigEntry = function(Workspace, id, model, modelDef, options) {
  var modelConfig = new ModelConfig(Workspace, id, modelDef, options);
}

Workspace.prototype.addModelAttributes = function(model, modelId, modelDef) {
  var properties = modelDef['properties'];
  var methods = modelDef['methods'];
  var relations = modelDef['relations'];
  var modelData = clone(modelDef);
  delete modelData['properties'];
  delete modelData['methods'];
  delete modelData['relations'];
  delete modelData['validations'];
  delete modelData['acls'];  
  var parts = modelId.split('.');
  var facet = parts[0];
  var Workspace = this;
  Object.keys(properties).forEach(function(propertyName) {
    var property = properties[propertyName];
    model.properties[propertyName] = new ModelProperty(Workspace, modelId, propertyName, property);
  });
  Object.keys(methods).forEach(function(methodName) {
    var method = methods[methodName];
    model.methods[methodName] = new ModelMethod(Workspace, modelId, methodName, method);
  });
  Object.keys(relations).forEach(function(relationName) {
    var relation = relations[relationName];
    var fromModel = Workspace.getNode("ModelDefinition", modelId);
    var toModel = Workspace.getNode("ModelDefinition", relation.model);
    if(typeof toModel === 'undefined') {
      toModel = lazyLoadModel(Workspace, facet, relation.model);
    }
    model.relations[relationName] = new ModelRelation(Workspace, modelId, relationName, fromModel, toModel);
  });
}

function lazyLoadModel(workspace, facet, modelName) {
  var modelId = facet + "." + modelName;
  var options = {};
  options.lazyLoadModel = true;
  var model = new Model(workspace, modelId, {}, options);
  workspace.addConfigEntry(workspace, modelId, model, {}, options);
  return model;
}