var read = require('../util/read.js');
var update = require('../util/update.js');
var create = require('../util/create.js');

module.exports.Tasks = Tasks;

function Tasks() {

}

Tasks.prototype.getModel = function(modelId, next) {
  var workspace = this;
  var operations = new read.operations();
  operations.readModel(modelId, function(err, modelDef) {
    if(err) return next(err);
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
      //workspace.updateModel(modelId, modelData, cb);
    }
    next(null, modelDef);
  });
}

Tasks.prototype.changeModel = function(modelId, modelData, next) {
  var workspace = this;
  var operations = new update.operations();
  if(workspace.isModelExists(modelId)) {
    var model = workspace.getModel(modelId);
    model.update(modelData);
    var modelDef = model.getDefinition();
    operations.updateModel(modelId, modelDef, function(err) { 
      if(err) return next(err);
      next(null, modelDef);
    });
  } else {
    next("Model does not exist", null);
  }
}

Tasks.prototype.addModel = function(modelId, modelData, next) {
  var workspace = this;
  var operations = new create.operations();
  if(!workspace.isModelExists(modelId)) {
    var modelDef = model.getDefinition();
    operations.createModel(modelId, modelData, function(next) { 
      if(err) return next(err);
      next(null, modelDef);
    });
  } else {
    next("Model already exists", null);
  }
}

Tasks.prototype.addMethod = function (workspace, modelId, methodName, methodDef, next) {
  var operations = new update.operations();
  if(workspace.isModelExists(modelId)) {
    var model = workspace.getModel(modelId);
    var method = new ModelMethod(workspace, modelId, methodName, methodDef);
    model.addMethod(methodName, method);
    var modelDef = model.getDefinition();
    operations.updateModel(modelId, modelDef, function(err) { 
      if(err) return next(err);
      next(null, modelDef);
    });
  } else {
    next("Model does not exists", null);
  }
}

Tasks.prototype.addProperty = function (workspace, modelId, propertyName, propertyDef, next) {
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
}

