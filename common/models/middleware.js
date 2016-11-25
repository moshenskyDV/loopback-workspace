// Copyright IBM Corp. 2015,2016. All Rights Reserved.
// Node module: loopback-workspace
// This file is licensed under the MIT License.
// License text available at https://opensource.org/licenses/MIT

var fs = require('fs-extra');
var path = require('path');

/**
  * Defines a `Middleware` configuration.
  * @class Middleware
  * @inherits Definition
  */
module.exports = function(Middleware) {

  Middleware.getUniqueId = function(data) {
    var phase = data.phase;
    if (data.subPhase) {
      phase = phase + ':' + data.subPhase;
    }
    var index = '';
    if (data.index) {
      index = '.' + data.index.toString();
    }
    return phase + '.' + data.name + index;
  };

  Middleware.all = function(workspaceDir, cb) {
    var file = path.resolve(workspaceDir, 'server/middleware.json');
    fs.readJson(file, function(err, data) {
      if (err && err.name === 'SyntaxError') {
        err.message = g.f('Cannot parse %s: %s', id, err.message);
        return cb(err);
      }
      cb(null, Object.keys(data));
    });
  }

  Middleware.find = function(workspaceDir, id, cb) {
    var file = path.resolve(workspaceDir, 'server/middleware.json');
    fs.readJson(file, function(err, data) {
      if (err && err.name === 'SyntaxError') {
        err.message = g.f('Cannot parse %s: %s', id, err.message);
        return cb(err);
      }
      var phase = data[id];
      cb(null, phase);
    });
  }
};