module.exports = PropertyHandler;

function PropertyHandler() {

} 

PropertyHandler.prototype.isPropertyExists = function(id) {
  var storedmodel = this.getModel(modelId);
  
}

PropertyHandler.prototype.findModelProperty = function(id, cb) {
  var workspace = this;
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var propertyName = parts[2];
  var modelId = parts[0] + '.' + parts[1];

  var refreshModel = function(next) {
    workspace.refreshModel(modelId, function(err, modelDef){
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

  var taskList = [refreshModel];
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
    workspace.refreshModel(modelId, function(err, data) {
      next();
    });
  }
  var updateProperty = function(next) {
    var model = workspace.getModel(modelId);
    workspace.addProperty(workspace, modelId, propertyName, propertyDef, function(err, data) {
      if(err) return next(err);
      else
      next(err, data);
    });
  }

  var callBack = function(err, results) {
    if(err) return cb(err);
    else {
      cb(null, propertyDef);
    }
  }

  var taskList = [refresh, updateProperty];
  workspace.execute(taskList, callBack);
}