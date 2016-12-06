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
var ModelHandler = require('./handlers/modelhandler.js');

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

function mixin(target, source) {
  for (var ix in source) {
    if(typeof source[ix] === 'function') {
      var mx = source[ix];
      target[ix] = mx;
    }
  } 
}

function lazyLoadModel(workspace, facet, modelName) {
  var modelId = facet + "." + modelName;
  var options = {};
  options.lazyLoadModel = true;
  var model = new Model(workspace, modelId, {}, options);
  workspace.addConfigEntry(workspace, modelId, model, {}, options);
  return model;
}

Workspace.prototype.addConfigEntry = function(Workspace, id, model, modelDef, options) {
  var modelConfig = new ModelConfig(Workspace, id, modelDef, options);
}

mixin(Workspace.prototype, ModelHandler.prototype);


Workspace.prototype.getModel = function(modelId) {
  var model = this.getNode("ModelDefinition", modelId);
  return model;
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
    var fromModel = Workspace.getModel(modelId);
    var toModel = Workspace.getModel(relation.model);
    if(typeof toModel === 'undefined') {
      toModel = lazyLoadModel(Workspace, facet, relation.model);
    }
    model.relations[relationName] = new ModelRelation(Workspace, modelId, relationName, fromModel, toModel);
  });
}