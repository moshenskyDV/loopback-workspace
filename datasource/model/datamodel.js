var clone = require('lodash').clone;
var Graph = require('./graph.js').Graph;
var Node = require('./graph.js').Node;
var inheritsFrom = require('../util/common.js').inheritsFrom;
var Link = require('./graph.js').Link;

module.exports.Model = Model;
module.exports.ModelConfig = ModelConfig;
module.exports.ModelProperty = ModelProperty;
module.exports.ModelMethod = ModelMethod;
module.exports.ModelRelation = ModelRelation;
module.exports.Facet = Facet;

function Facet(Workspace, name, configData) {
  Node.call(this, Workspace, "Facet", name, configData);
  Workspace.facet[name] = this;
}

function FacetSetting(Workspace, name, configData) {
  Node.call(this, Workspace, "FacetSetting", name, configData);
}

function ModelConfig(modelName, data, facet, model) {
  this._content = data;
  Link.call(this, modelName, "ModelConfig", facet, model);  
}

function ModelProperty (wkspace, modelId, name, data) {
  var id = modelId + "." + name;
  Node.call(this, wkspace, "ModelProperty", id, data);
  this.model = wkspace.getNode("ModelDefinition", modelId);
}

function ModelMethod (wkspace, modelId, name, data) {
  var id = modelId + "." + name;
  Node.call(this, wkspace, "ModelMethod", id, data);
  this.model = wkspace.getNode("ModelDefinition", modelId);
}

function ModelRelation (wkspace, modelId, relationName, fromModel, toModel) { 
  var id = modelId + "." + relationName;
  Link.call(this, id, "ModelRelation", fromModel, toModel);  
}

function Model(Workspace, id, modelDef, options) {
  Node.call(this, Workspace, "ModelDefinition", id, modelDef);
  this.properties = {};
  this.methods = {};
  this.relations = {};
  this.config = {};
  this.options = options;
}

inheritsFrom(Facet, Node);
inheritsFrom(ModelProperty, Node);
inheritsFrom(ModelMethod, Node);
inheritsFrom(ModelRelation, Link);
inheritsFrom(ModelConfig, Link);
inheritsFrom(Model, Node);

Model.prototype.getDefinition = function() {
  var model = this;
  var modelData = model._content;
  var modelDef = clone(modelData);
  var properties = modelDef['properties'] = {};
  var methods = modelDef['methods'] = {};
  var relations = modelDef['relations'] = {};
  var id = model._name;
  Object.keys(model.properties).forEach(function(key){
   var modelProperty = model.properties[key];
   properties[key] = modelProperty._content;
  });
  Object.keys(model.methods).forEach(function(key){
   var modelMethod = model.methods[key];
   methods[key] = modelMethod._content;  
  });
  Object.keys(model.relations).forEach(function(key){
   var modelRelation = model.relations[key];
   relations[key] = modelRelation._content;
  });
  return modelDef;
}

Model.prototype.update = function(modelData) {
  this._content = modelData;
}

Model.prototype.setProperty = function(name, property) {
  this.properties[name] = property;
}

Model.prototype.setMethod = function(name, method) {
  this.methods[name] = method;
}

Model.prototype.addProperties = function(workspace, modelId, properties) {
  var model = this;
  Object.keys(properties).forEach(function(propertyName) {
    var property = properties[propertyName];
    model.properties[propertyName] = new ModelProperty(workspace, modelId, propertyName, property);
  });
}

Model.prototype.addMethods = function(workspace, modelId, methods) {
  var model = this;
  Object.keys(methods).forEach(function(methodName) {
    var method = methods[methodName];
    model.methods[methodName] = new ModelMethod(workspace, modelId, methodName, method);
  });
}

Model.prototype.addModelRelations = function(workspace, modelId, relations) {
  var model = this;
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

Model.prototype.addModelAttributes = function(workspace, modelId, modelDef) {
  var model = this;
  var properties = modelDef['properties'];
  var methods = modelDef['methods'];
  var relations = modelDef['relations'];
  var parts = modelId.split('.');
  var facet = parts[0];
  if(properties) {
    model.addProperties(workspace, modelId, properties);
  }
  if(methods) {
    model.addMethods(workspace, modelId, methods);
  }
  if(relations) {
    model.addModelRelations(workspace, modelId, relations);
  }  
}

Facet.prototype.addModelConfig = function(modelName, model, configData) {
  var modelConfig = new ModelConfig(modelName, configData, this, model);
  return modelConfig;
}

Facet.prototype.getModelConfigurations = function() {
  var links = this._outboundLinks;
  var modelConfigs = {};
  for (var key in links) {
    var config = links[key];
    modelConfigs[key] = config._content;
  }
  return modelConfigs;
}