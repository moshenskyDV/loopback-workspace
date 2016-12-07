module.exports.inheritsFrom = inheritsFrom;
module.exports.mixin = mixin;

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