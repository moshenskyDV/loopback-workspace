var async = require('async');

module.exports.Processor = Processor;
module.exports.Task = Task;

function Processor() {
  this.taskList = [];
  this.statusEnum = {
    IDLE : 0,
    ACTIVE : 1,
    SLEEP : 2
  }
  this.status = this.statusEnum.IDLE;
}

function Task(cb) {
  this.list = [];
  this.callBack = cb; 
}

Task.prototype.addFunction = function(f) {
  this.list.push(f);
}

Processor.prototype.createTask = function(cb) {
  return new Task(cb);
}

Processor.prototype.addTask = function(task) {
  this.taskList.push(task);
}

Processor.prototype.execute = function() {
  var queue = async.queue(executor,1);
  function executor(task, next) {
    async.series(task.list, function(err, data) {
      if (err) {
        task.callBack(err);
      } else {
        task.callBack(null, data);
      } 
    });
  }
  var executionList = this.taskList;
  this.taskList = [];
  executionList.forEach(function(task) {
    queue.push(task);
  });
}

