var config = require('../config.json');
var path = require('path');
var async = require('async');
var glob = require('glob');
module.exports.listOfFiles = listOfFiles;

function listOfFiles(workspaceDir, cb) {
  var patterns = {};
  var files = config.files;
  var steps = [];
  var result = {};
  Object.keys(files).forEach(function(key) {
    patterns[key] = [];
    var filePattern = files[key];
    patterns[key] = patterns[key].concat(filePattern);
  });

  Object.keys(patterns).forEach(function(key) {
    patterns[key] = patterns[key].concat(patterns[key].map(function(pattern) {
      return path.join('*', pattern);
    }));
  });

  Object.keys(patterns).forEach(function(key) {
    steps.push(function(next) {
      async.map(patterns[key], find, function(err, paths) {
        if (err) return cb(err);
  
        // flatten paths into single list
        var merged = [];
        merged = merged.concat.apply(merged, paths);

        //var configFiles = merged.map(function(filePath) {
        //  return new ConfigFile({ path: filePath });
        //});
        result[key] = merged;
        next();
      });
    });
  });

  async.parallel(steps, function(err, data) {
    if(err) return cb(err);
    cb(null, result);
  });

  function find(pattern, cb) {
    glob(pattern, { cwd: workspaceDir }, cb);
  }
}