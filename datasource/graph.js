module.exports.Graph = Graph;
module.exports.Node = Node;
module.exports.Link = Link;

function Graph(id) {
  this._id = id;
  this._cache = {};
}

function Node(graph, domain, name, data) {
  this._graph = graph;
  this._name = name;
  this._outboundLinks = {};
  this._inboundLinks = {};
  this.domain = domain;
  this._content = data;
  var root = graph._cache[domain];
  root[name] = this;
} 

function Link(name, type, fromNode, toNode) {
  this._from = fromNode;
  this._to = toNode;
  this._name = name;
  this._linkType = type;
  this._attributes = [];
  fromNode._outboundLinks[name] = this;
  toNode._inboundLinks[name] = this;
}

Graph.prototype.addDomain = function(name) {
  this._cache[name] = {
    _nodes: {
    }
  };
}

Graph.prototype.getNode = function(domain, name) {
  return this._cache[domain][name];
}

Graph.prototype.updateNode = function(domain, name, value) {
  this._cache[domain][name]._content = value;
} 

Link.prototype.remove = function() {
  var name = this._name;
  delete _from._outboundLinks[this._linkType][name];
  delete _to._inboundLinks[name];
}
