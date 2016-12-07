var clone = require('lodash').clone;
var Model = require('../model/datamodel.js').Model;
var ModelMethod = require('../model/datamodel.js').ModelMethod;
var ModelProperty = require('../model/datamodel.js').ModelProperty;
var ModelRelation = require('../model/datamodel.js').ModelRelation;
var read = require('../util/read.js');
var update = require('../util/update.js');
var create = require('../util/create.js');

module.exports = PropertyHandler;

function PropertyHandler() {

} 

PropertyHandler.prototype.isPropertyExists = function(id) {
  var storedmodel = this.getModel(modelId);
  
}

PropertyHandler.prototype.readModelProperty = function(id, cb) {
  var workspace = this;
  var operations = new read.operations();
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var propertyName = parts[2];
  var modelId = parts[0] + '.' + parts[1];
  workspace.readModel(modelId, function(err, modelDef){
    var properties = modelDef['properties'];
    var property = properties[propertyName];
    cb(null, property);
  });
}

PropertyHandler.prototype.createModelProperty = function(id, propertyDef, cb) {
  var workspace = this;
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var propertyName = parts[2];
  var modelId = parts[0] + '.' + parts[1];
  var operations = new update.operations();
  workspace.readModel(modelId, function(err, data) {
    if(workspace.isModelExists(modelId)) {
      var model = workspace.getModel(modelId);
      var property = new ModelProperty(workspace, modelId, propertyName, propertyDef);
      model.addProperty(propertyName, property);
      var modelDef = model.getDefinition();
      operations.updateModel(modelId, modelDef, function(err) { 
        cb(err);
      });
    } else {
      cb("Model does not exists", null);
    }
  });
}