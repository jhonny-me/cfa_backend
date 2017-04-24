'use strict';

module.exports = function(New) {
  New.beforeRemote('create', function (context, instance, next) {
    context.args.data.createTime = Date.now();
    next()
  })
};
