var datamodel = require('./workspace.js');

var workspace = null;

var WorkspaceManager = function () {
};

WorkspaceManager.createWorkspace = function(dir) {
  var modelClass = datamodel.loader();
  workspace = new modelClass(dir);
}
    
WorkspaceManager.getDirectory = function() {
  return workspace.directory;
}

WorkspaceManager.getWorkspace = function() {
  return workspace;
}

module.exports = WorkspaceManager;
