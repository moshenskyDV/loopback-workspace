// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';
var clone = require('lodash').clone;

module.exports = function(ModelDefinition) {
  /**
   * Defines a model configuration which attaches a model to a facet and a
   * dataSource. It also can extend a model definition with additional configuration.
   *
   * @class ModelDefinition
   * @inherits Definition
   */

  ModelDefinition.on('dataSourceAttached', function(eventData) {
    var connector = ModelDefinition.getConnector();
    
    ModelDefinition.create = function(data, options, cb) {
      if(typeof options === 'function') {
        cb = options;
        options = null;
      }
      var id = data.id;
      delete data['id'];
      delete data['facetName'];
      connector.createModel(id, data, function(err, modelDef) {
        if(err) return cb(err);
        var modelData = clone(modelDef);
        modelData['id'] = id;
        cb(null, modelData);
      });
    };

    ModelDefinition.find = function(filter, options, cb) {
      var id = filter.where.id;
      connector.getModel(id, function(err, modelDef) {
        if(err) return cb(err);
        var modelData = clone(modelDef);
        delete modelData['properties'];
        delete modelData['methods'];
        delete modelData['relations'];
        delete modelData['validations'];
        delete modelData['acls'];
        modelData['id'] = id;
        modelData = [modelData];
        cb(null, modelData);
      });
    };

    ModelDefinition.updateAttributes = function(id, data, options, cb) {
      delete data['id'];
      delete data['facetName'];
      connector.updateModel(id, data, function(err, modelDef) {
        if(err) return cb(err);
        var modelData = clone(modelDef);
        modelData['id'] = id;
        cb(null, modelData);
      });
    };
  });
};
