module.exports.inheritsFrom = inheritsFrom;
module.exports.initWorkspace = initWorkspace;
module.exports.initMiddleware = initMiddleware;


function inheritsFrom(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = parent; 
};

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
  var initialPhase = Node(this, "Middleware", "initial", {});
  var sessionPhase = Node(this, "Middleware", "session", {});
  var authPhase = Node(this, "Middleware", "auth", {});
  var parsePhase = Node(this, "Middleware", "parse", {});
  var routesPhase = Node(this, "Middleware", "routes", {});
  var filesPhase = Node(this, "Middleware", "files", {});
  var finalPhase = Node(this, "Middleware", "final", {});
  workspace.middlewarePhases.push(initialPhase);
  workspace.middlewarePhases.push(sessionPhase);
  workspace.middlewarePhases.push(authPhase);
  workspace.middlewarePhases.push(parsePhase);
  workspace.middlewarePhases.push(routesPhase);
  workspace.middlewarePhases.push(filesPhase);
  workspace.middlewarePhases.push(finalPhase);
}