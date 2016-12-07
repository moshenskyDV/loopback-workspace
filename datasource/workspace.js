var clone = require('lodash').clone;
var Graph = require('./model/graph.js').Graph;
var Node = require('./model/graph.js').Node;
var Model = require('./model/datamodel.js').Model;
var ModelConfig = require('./model/datamodel.js').ModelConfig;
var ModelMethod = require('./model/datamodel.js').ModelMethod;
var ModelProperty = require('./model/datamodel.js').ModelProperty;
var ModelRelation = require('./model/datamodel.js').ModelRelation;
var read = require('./util/read.js');
var inheritsFrom = require('./util/common.js').inheritsFrom;
var mixin = require('./util/common.js').mixin;
var ModelHandler = require('./handlers/modelhandler.js');
var PropertyHandler = require('./handlers/propertyhandler.js');
var MethodHandler = require('./handlers/methodhandler.js');

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
mixin(Workspace.prototype, PropertyHandler.prototype);
mixin(Workspace.prototype, MethodHandler.prototype);


Workspace.prototype.getModel = function(modelId) {
  var model = this.getNode("ModelDefinition", modelId);
  return model;
}

Workspace.prototype.addModelProperties = function(model, modelId, properties) {
  var workspace = this;
  Object.keys(properties).forEach(function(propertyName) {
    var property = properties[propertyName];
    model.properties[propertyName] = new ModelProperty(workspace, modelId, propertyName, property);
  });
}

Workspace.prototype.addModelMethods = function(model, modelId, methods) {
  var workspace = this;
  Object.keys(methods).forEach(function(methodName) {
    var method = methods[methodName];
    model.methods[methodName] = new ModelMethod(workspace, modelId, methodName, method);
  });
}

Workspace.prototype.addModelRelations = function(model, modelId, relations) {
  var workspace = this;
  var parts = modelId.split('.');
  var facet = parts[0];
  Object.keys(relations).forEach(function(relationName) {
    var relation = relations[relationName];
    var fromModel = workspace.getModel(modelId);
    var toModel = workspace.getModel(relation.model);
    if(typeof toModel === 'undefined') {
      toModel = lazyLoadModel(workspace, facet, relation.model);
    }
    model.relations[relationName] = new ModelRelation(workspace, modelId, relationName, fromModel, toModel);
  });
}

Workspace.prototype.addModelAttributes = function(model, modelId, modelDef) {
  var workspace = this;
  var properties = modelDef['properties'];
  var methods = modelDef['methods'];
  var relations = modelDef['relations'];
  var parts = modelId.split('.');
  var facet = parts[0];
  var Workspace = this;
  if(properties) {
    Workspace.addModelProperties(model, modelId, properties);
  }
  if(methods) {
    Workspace.addModelMethods(model, modelId, methods);
  }
  if(relations) {
    Workspace.addModelRelations(model, modelId, relations);
  }  
}

function initWorkspace(workspace) {
  workspace.addDomain("Facet");
  workspace.addDomain("FacetConfig");
  workspace.addDomain("ModelDefinition");
  workspace.addDomain("ModelRelation");
  workspace.addDomain("ModelProperty");
  workspace.addDomain("ModelMethod");
  workspace.addDomain("ModelConfig");
  workspace.addDomain("DataSources");
  workspace.addDomain("Middleware");
  workspace.addDomain("MiddlewarePhases");
  workspace.addDomain("FileVersions");
  workspace.addDomain("ConfigFile");
}

function initMiddleware(workspace) {
  var initialPhase = Node(workspace, "Middleware", "initial", {});
  var sessionPhase = Node(workspace, "Middleware", "session", {});
  var authPhase = Node(workspace, "Middleware", "auth", {});
  var parsePhase = Node(workspace, "Middleware", "parse", {});
  var routesPhase = Node(workspace, "Middleware", "routes", {});
  var filesPhase = Node(workspace, "Middleware", "files", {});
  var finalPhase = Node(workspace, "Middleware", "final", {});
  workspace.middlewarePhases.push(initialPhase);
  workspace.middlewarePhases.push(sessionPhase);
  workspace.middlewarePhases.push(authPhase);
  workspace.middlewarePhases.push(parsePhase);
  workspace.middlewarePhases.push(routesPhase);
  workspace.middlewarePhases.push(filesPhase);
  workspace.middlewarePhases.push(finalPhase);
}