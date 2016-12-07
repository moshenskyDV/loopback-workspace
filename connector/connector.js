var app = require('../server/server.js');
var loopback = require('loopback');
var connector = app.dataSources.db.connector;

connector.find = function(modelName, id, options, cb) {
  var listOfModels = app.models;
  var appModel = listOfModels[modelName];
  appModel.getData(id, function(err, data) {
    if(!data.length) {
      cb(err, [data]);
    }  
  });
};

connector.create = function(modelName, data, options, cb) {
  if(!cb) {
    cb = options;
    options = null;
  }
  var listOfModels = app.models;
  var appModel = listOfModels[modelName];
  appModel.add(data, function(err) {
      cb(err);
  });
};

connector.update = function(modelName, where, data, options, cb) {
  var listOfModels = app.models;
  var appModel = listOfModels[modelName];
  var id = where.id;
  appModel.updateData(id, data, function(err) {
      cb(err);
  });
};

connector.updateAttributes = function(modelName, id, data, options, cb) {
  var listOfModels = app.models;
  var appModel = listOfModels[modelName];
  appModel.updateData(id, data, function(err) {
      cb(err);
  });
};

connector.all = function(modelName, filter, options, cb) {
  var listOfModels = app.models;
  var appModel = listOfModels[modelName];
  if(!filter.where){
    appModel.getAllData(function(err, data) {
      if(!data.length) {
        cb(err, [data]);
      } else {
        cb(err, data);
      }  
    });
  } else {
    appModel.getData(filter.where.id,  function(err, data){
      if(!data.length) {
        cb(err, [data]);
      } else {
        cb(err, data);
      } 
    });
  }
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

