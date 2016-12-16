// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';
var fs = require('fs-extra');
var path = require('path');
var clone = require('lodash').clone;

module.exports = function(ModelConfig) {
  /**
   * Defines a model configuration which attaches a model to a facet and a
   * dataSource. It also can extend a model definition with additional configuration.
   *
   * @class ModelDefinition
   * @inherits Definition
   */

  ModelConfig.on('dataSourceAttached', function(eventData) {
    var connector = ModelConfig.getConnector();
    
    ModelConfig.find = function(filter, options, cb) {
      var id = filter.where.id;
      connector.findModelConfig(id, function(err, modelConfig) {
        if(err) return cb(err);
        var data = clone(modelConfig);
        data['id'] = id;
        cb(null, [data]); 
      });
    };
  });
};
