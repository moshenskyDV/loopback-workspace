var Node = require('../model/graph.js').Node;

module.exports.inheritsFrom = inheritsFrom;
module.exports.mixin = mixin;
module.exports.initWorkspace = initWorkspace;
module.exports.initMiddleware = initMiddleware;

function inheritsFrom(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = parent; 
};

function mixin(target, source) {
  for (var ix in source) {
    if(typeof source[ix] === 'function') {
      var mx = source[ix];
      target[ix] = mx;
    }
  } 
}

function initWorkspace(workspace) {
  workspace.addDomain("Facet");
  workspace.addDomain("FacetConfig");
  workspace.addDomain("ModelDefinition");
  workspace.addDomain("ModelRelation");
  workspace.addDomain("ModelProperty");
  workspace.addDomain("ModelMethod");
  workspace.addDomain("ModelConfig");
  workspace.addDomain("DataSources");
  workspace.addDomain("Middleware");
  workspace.addDomain("MiddlewarePhases");
  workspace.addDomain("FileVersions");
  workspace.addDomain("ConfigFile");
}

function initMiddleware(workspace) {
  var initialPhase = Node(workspace, "Middleware", "initial", {});
  var sessionPhase = Node(workspace, "Middleware", "session", {});
  var authPhase = Node(workspace, "Middleware", "auth", {});
  var parsePhase = Node(workspace, "Middleware", "parse", {});
  var routesPhase = Node(workspace, "Middleware", "routes", {});
  var filesPhase = Node(workspace, "Middleware", "files", {});
  var finalPhase = Node(workspace, "Middleware", "final", {});
  workspace.middlewarePhases.push(initialPhase);
  workspace.middlewarePhases.push(sessionPhase);
  workspace.middlewarePhases.push(authPhase);
  workspace.middlewarePhases.push(parsePhase);
  workspace.middlewarePhases.push(routesPhase);
  workspace.middlewarePhases.push(filesPhase);
  workspace.middlewarePhases.push(finalPhase);
}