module.exports.inheritsFrom = inheritsFrom;

function inheritsFrom(child, parent) {
  child.prototype = Object.create(parent.prototype);
  child.prototype.constructor = parent; 
};
