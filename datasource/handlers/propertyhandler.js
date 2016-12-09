var clone = require('lodash').clone;
var Model = require('../model/datamodel.js').Model;
var ModelMethod = require('../model/datamodel.js').ModelMethod;
var ModelProperty = require('../model/datamodel.js').ModelProperty;
var ModelRelation = require('../model/datamodel.js').ModelRelation;

module.exports = PropertyHandler;

function PropertyHandler() {

} 

PropertyHandler.prototype.isPropertyExists = function(id) {
  var storedmodel = this.getModel(modelId);
  
}

PropertyHandler.prototype.readModelProperty = function(id, cb) {
  var workspace = this;
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var propertyName = parts[2];
  var modelId = parts[0] + '.' + parts[1];

  var readModel = function(next) {
    workspace.readModel(modelId, function(err, modelDef){
      if(err) return next(err);
      next(null, modelDef);
    });
  }

  var callBack = function(err, results) {
    if(err) return cb(err);
    var modelDef = results[0];
    var properties = modelDef['properties'];
    var property = properties[propertyName];
    cb(null, property);
  }

  var taskList = [readModel];
  workspace.execute(taskList, callBack);
}

PropertyHandler.prototype.createModelProperty = function(id, propertyDef, cb) {
  var workspace = this;
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var propertyName = parts[2];
  var modelId = parts[0] + '.' + parts[1];

  var refresh = function(next) {
    workspace.readModel(modelId, function(err, data) {
      next();
    });
  }
  var updateProperty = function(next) {
    workspace.addProperty(workspace, modelId, propertyName, propertyDef, next);
  }

  var callBack = function(err, data) {
    cb(err, data);
  }

  var taskList = [refresh, updateProperty];
  workspace.execute(taskList, callBack);
}