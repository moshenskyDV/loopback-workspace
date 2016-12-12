var Graph = require('./model/graph.js').Graph;
var Model = require('./model/datamodel.js').Model;
var ModelConfig = require('./model/datamodel.js').ModelConfig;
var ModelMethod = require('./model/datamodel.js').ModelMethod;
var ModelProperty = require('./model/datamodel.js').ModelProperty;
var ModelRelation = require('./model/datamodel.js').ModelRelation;
var Facet = require('./model/datamodel.js').Facet;
var inheritsFrom = require('./util/common.js').inheritsFrom;
var mixin = require('./util/common.js').mixin;
var ModelHandler = require('./handlers/modelhandler.js');
var PropertyHandler = require('./handlers/propertyhandler.js');
var MethodHandler = require('./handlers/methodhandler.js');
var RelationsHandler = require('./handlers/relationshandler.js');
var ProcessorClass = require('./util/processor.js').Processor;
var initMiddleware = require('./util/common.js').initMiddleware;
var Tasks = require('./Tasks.js').Tasks;
var initWorkspace = require('./util/common.js').initWorkspace;

module.exports.loader = function() {
  return Workspace;
};

function Workspace(rootFolder) {
  Graph.call(this);
  initWorkspace(this);
  this.directory = rootFolder;
  this.middlewarePhases = [];
  this.facet = {};
  var serverFacet = new Facet(this, 'server', {});
  var commonFacet = new Facet(this, 'common', {});
  this.facet['server'] = serverFacet;
  this.facet['common'] = commonFacet;
  //initMiddleware(this);
  this.processor = new ProcessorClass();
};

inheritsFrom(Workspace, Graph);

Workspace.prototype.createTask = function(cb) {
  return this.processor.createTask(cb);
}

Workspace.prototype.addTask = function(task) {
  return this.processor.addTask(task);
}

Workspace.prototype.execute = function(functionList, callBack) {
  var task = this.createTask(callBack);
  functionList.forEach(function(f){
     task.addFunction(f);
  });
  this.addTask(task);
  this.trigger();
}

Workspace.prototype.trigger = function() {
  return this.processor.execute();
}

Workspace.prototype.getModel = function(modelId) {
  var model = this.getNode("ModelDefinition", modelId);
  return model;
}

Workspace.prototype.deleteItem = function(domain, id, cb) {
  var node = this.getNode(domain, id);
  this.deleteNode(domain, id, cb);
}

Workspace.prototype.getFacet = function(facetName) {
  return this.facet[facetName];
}

Workspace.prototype.lazyLoadModel = function lazyLoadModel(workspace, facet, modelName) {
  var modelId = facet + "." + modelName;
  var options = {};
  options.lazyLoadModel = true;
  var model = new Model(workspace, modelId, {}, options);
  var facet = workspace.getFacet(facet);
  facet.addModelConfig(modelName, model, {});
  return model;
}

mixin(Workspace.prototype, ModelHandler.prototype);
mixin(Workspace.prototype, PropertyHandler.prototype);
mixin(Workspace.prototype, MethodHandler.prototype);
mixin(Workspace.prototype, RelationsHandler.prototype);
mixin(Workspace.prototype, Tasks.prototype);