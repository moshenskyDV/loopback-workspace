// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var fs = require('fs-extra');
var path = require('path');
var workspaceManager = require('../../datasource/workspaceManager.js');

/**
  * Represents a relation between two LoopBack `Model`s.
  *
  * @class ModelRelation
  * @inherits WorkspaceEntity
  */
module.exports = function(ModelRelation) {

  ModelRelation.getValidTypes = function(cb) {
    cb(null, [
      { name: 'has many', value: 'hasMany' },
      { name: 'belongs to', value: 'belongsTo' },
      { name: 'has and belongs to many', value: 'hasAndBelongsToMany' },
      { name: 'has one', value: 'hasOne' },
    ]);
  };

  ModelRelation.getAllData = function(modelId, cb) {
    var workspace = workspaceManager.getWorkspace();
    workspace.readAllModelRelation(this, modelId, cb); 
  };

  ModelRelation.getData = function(id, cb) {
    var workspace = workspaceManager.getWorkspace();
    workspace.readModelRelation(id, cb); 
  };
};
