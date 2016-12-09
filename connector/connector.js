var app = require('../server/server.js');
var loopback = require('loopback');
var workspaceManager = require('../datasource/workspaceManager.js');
var connector = app.dataSources.db.connector;

connector.getModel = function(id, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.readModel(id, cb);
};

connector.updateModel = function(id, data, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.updateModel(id, data, cb); 
};

connector.createModel = function(id, data, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.createModel(id, data, cb); 
};

connector.getModelMethod = function(id, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.readModelMethod(id, cb); 
};

connector.createModelMethod = function(id, data, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.createModelMethod(id, data, cb); 
};

connector.getModelProperty = function(id, cb) {
  var workspace = workspaceManager.getWorkspace();
  workspace.readModelProperty(id, cb); 
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

connector.destroy = function destroy(model, id, done) {
  throw new Error('Not Implemented');
};

connector.destroyAll = function destroyAll(model, filter, done) {
  throw new Error('Not Implemented');
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

