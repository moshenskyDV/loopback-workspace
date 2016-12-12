var app = require('../server/server.js');
var loopback = require('loopback');
var workspaceManager = require('../datasource/workspaceManager.js');
var connector = app.dataSources.db.connector;

connector.findModelConfig = function(id, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.findModelConfig(id, cb);
};

connector.findModel = function(id, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.findModel(id, cb);
};

connector.updateModel = function(id, data, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.updateModel(id, data, cb); 
};

connector.createFacet = function(id, data, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.createFacet(id, data, cb); 
};

connector.createModel = function(id, data, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.createModel(id, data, cb); 
};

connector.deleteModel = function(id, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.deleteModel(id, function(err, data){
    if (err) cb(err);
  }); 
};

connector.findModelMethod = function(id, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.findModelMethod(id, cb); 
};

connector.createModelMethod = function(id, data, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.createModelMethod(id, data, cb); 
};

connector.findModelProperty = function(id, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.findModelProperty(id, cb); 
};

connector.createModelProperty = function(id, data, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.createModelProperty(id, data, cb); 
};

connector.find = function(modelName, id, options, cb) {
  throw new Error('Not Implemented');
};

connector.create = function(modelName, data, options, cb) {
  throw new Error('Not Implemented');
};

connector.update = function(modelName, where, data, options, cb) {
  throw new Error('Not Implemented');
};

connector.updateAttributes = function(modelName, id, data, options, cb) {
  throw new Error('Not Implemented');

};

connector.all = function(modelName, filter, options, cb) {
  throw new Error('Not Implemented');
};

connector.patchOrCreateWithWhere = function() {
  throw new Error('Not Implemented');
}

connector.upsertWithWhere = function() {
  throw new Error('Not Implemented');
}

connector.findOrCreate = function() {
  throw new Error('Not Implemented');
}

connector.exists = function (model, id, done) {
  throw new Error('Not Implemented');
};

connector.destroy = function (model, id, done) {
  throw new Error('Not Implemented');
};

connector.destroyAll = function (model, filter, done) {
  var modelDef = app.models[model]
  modelDef.destroyAll(filter, done);
};

connector.count = function count(model, done, filter) {
  throw new Error('Not Implemented');
};

connector.save = function (model, data, done) {
  throw new Error('Not Implemented');
};

connector.updateOrCreate = function updateOrCreate(model, data, done) {
  throw new Error('Not Implemented');
};

connector.updateAll = function updateOrCreate(model, data, done) {
  throw new Error('Not Implemented');
};

connector.sharedCtor = function sharedCtor(model, data, done) {
  throw new Error('Not Implemented');
};

