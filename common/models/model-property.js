// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT
'use strict';
var fs = require('fs-extra');
var path = require('path');
var workspaceManager = require('../../datasource/workspaceManager.js');

/**
  * Represents a Property of a LoopBack `Model`.
  *
  * @class ModelProperty
  * @inherits WorkspaceEntity
  */
module.exports = function(ModelProperty) {
  ModelProperty.validatesFormatOf('name', {with: /^[\-_a-zA-Z0-9]+$/});

  /**
   * List of built-in types that can be used for `ModelProperty.type`.
   * @type {string[]}
   */
  ModelProperty.availableTypes = [
    'string',
    'number',
    'boolean',
    'object',
    'array',
    'date',
    'buffer',
    'geopoint',
    'any',
  ];

  ModelProperty.getAvailableTypes = function(cb) {
    cb(null, ModelProperty.availableTypes);
  };

  ModelProperty.remoteMethod('getAvailableTypes', {
    http: {verb: 'get', path: '/available-types'},
    returns: {type: ['string'], root: true},
  });

  ModelProperty.getData = function(id, cb) {
    var workspace = workspaceManager.getWorkspace();
    workspace.readModelProperty(id, cb); 
  };

  ModelProperty.add = function(data, cb) {
    var workspace = workspaceManager.getWorkspace();
    var id = data.id;
    workspace.createModelProperty(id, data, cb); 
  };
};
