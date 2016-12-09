


RelationsHandler.prototype.readModelRelation = function(id, cb) {
  var workspace = this;
  var operations = new read.operations();
  var parts = id.split('.');
  var facet = parts[0];
  var modelName = parts[1];
  var propertyName = parts[2];
  var modelId = parts[0] + '.' + parts[1];
  workspace.readModel(modelId, function(err, modelDef) {
    var relations = modelDef['relations'];
    var relation = relations[relationName];
    cb(null, relation);
  });
}
