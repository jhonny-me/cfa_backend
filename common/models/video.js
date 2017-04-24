'use strict';

module.exports = function(Video) {
  Video.beforeRemote('*', function (context, instance, next) {
    console.log(context.args.filter)
    if (!context.args.data) {
      context.args.data = {
        namespace: context.req.namespace
      }
    }else {
      context.args.data.namespace = context.req.namespace;
    }
    next()
  })

  Video.beforeRemote('find', function (context, instace, next) {
    if (!context.args.filter) {
      context.args.filter = {
        namespace: context.req.namespace
      }
    }else {
      context.args.filter.namespace = context.req.namespace
    }
    next()
  })
};
