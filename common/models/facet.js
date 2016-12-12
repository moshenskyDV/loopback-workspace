// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';
var clone = require('lodash').clone;

module.exports = function(Facet) {
  /**
   * Defines a model configuration which attaches a model to a facet and a
   * dataSource. It also can extend a model definition with additional configuration.
   *
   * @class ModelDefinition
   * @inherits Definition
   */

  Facet.on('dataSourceAttached', function(eventData) {
    var connector = Facet.getConnector();
    
    Facet.create = function(data, options, cb) {
      if(typeof options === 'function') {
        cb = options;
        options = null;
      }
      var id = data.name;
      connector.createFacet(id, data, function(err, data) {
        if(err) return cb(err);
        cb(null, data);
      });
    };
  });
};
