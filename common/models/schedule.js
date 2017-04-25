'use strict';

module.exports = function(Schedule) {
  Schedule.beforeRemote('*', function (context, instance, next) {
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

  Schedule.beforeRemote('find', function (context, instace, next) {
    if (!context.args.filter) {
      context.args.filter = {
        namespace: context.req.namespace
      }
    }else {
      context.args.filter.namespace = context.req.namespace
    }
    next()
  })

  Schedule.beforeRemote('create', function (context, instance, next) {
    context.args.data.namespace = context.req.namespace;
    next()
  })
};
