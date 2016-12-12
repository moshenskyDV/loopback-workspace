module.exports = ModelHandler;

function ModelHandler() {

} 

ModelHandler.prototype.isModelExists = function(modelId) {
  var storedmodel = this.getModel(modelId);
  if(typeof storedmodel === 'undefined') { 
    return false; 
  } else { 
    return true;
  }
}


ModelHandler.prototype.deleteModel = function(modelId, cb) {
  var workspace = this;

  var refresh = function(next) {
    workspace.refreshModel(modelId, function(err, modelDef){
      if(err) {
        next(err);
      } else
      next(null, modelDef);
    });
  }

  var refreshModelConfig = function(next) {
    workspace.refreshModelConfig(function(err, ModelConfig){
      if(err) { next(err); }
      else
      next(null, ModelConfig);
    });
  }

  var remove = function(next) {
    workspace.removeModel(modelId, function(err, data){
      if(err) { next(err); }
      else {next(data);}
    });
  }

  var callBack = function(err) {
    if(err) return cb(err);
  }

  var taskList = [refresh, refreshModelConfig, remove];
  workspace.execute(taskList, callBack);
}

ModelHandler.prototype.findModel = function(modelId, cb) {
  var workspace = this;

  var refresh = function(next) {
    workspace.refreshModel(modelId, function(err, modelDef){
      if(err) return next(err);
      next(null, modelDef);
    });
  }

  var callBack = function(err, results) {
    if(err) return cb(err);
    var modelDef = results[0];
    cb(null, modelDef);
  }

  var taskList = [refresh];
  workspace.execute(taskList, callBack);
}

ModelHandler.prototype.updateModel = function(modelId, modelData, cb) {
  var workspace = this;

  var refresh = function(next) {
    workspace.refreshModel(modelId, function(err, modelDef){
      if(err) return next(err);
      next(null, modelDef);
    });
  }

  var update = function(next) {
    workspace.changeModel(modelId, modelDef, function(err) { 
      next(err);
    });
  }

  var callBack = function(err, results) {
    if(err) return cb(err);
    var modelDef = results[0];
    cb(null, modelDef);
  }

  var taskList = [refresh, update];
  workspace.execute(taskList, callBack);
}

ModelHandler.prototype.createModel = function(modelId, modelData, cb) {
  var workspace = this;

  var refresh = function(next) {
    workspace.refreshModel(modelId, function(err, modelDef){
      //if(err) return next(err);
      next();
    });
  }

  var refreshModelConfig = function(next) {
    workspace.refreshModelConfig(function(err, ModelConfig){
      if(err) { next(err); }
      else
      next(null, ModelConfig);
    });
  }

  var create = function(next) {
    workspace.addModel(modelId, modelData, function(err) { 
      next(err);
    });
  }

  var addModelConfig = function(next) {
    workspace.addModelConfig(modelId, {datasource: 'db', public: true}, function(err) { 
      next(err);
    });
  }
   
  var callBack = function(err, results) {
    if(err) return cb(err);
    cb(null, modelData);
  }

  var taskList = [refresh, refreshModelConfig, create, addModelConfig];
  workspace.execute(taskList, callBack);
}

ModelHandler.prototype.createFacet = function(facetName, facetData, cb) {
  var workspace = this;

  var create = function(next) {
    workspace.addFacet(facetName, facetData, function(err) { 
      next(err, facetData);
    });
  }
  
  var callBack = function(err, results) {
    if(err) return cb(err);
    var config = results[0];
    cb(null, config);
  }

  var taskList = [create];
  workspace.execute(taskList, callBack);
}