'use strict';
module.exports = function(Manager) {
    Manager.beforeRemote('create', function (context, instance, next) {
      var app = require('../../server/server')
      var Namespace = app.models.Namespace
      var namespace = context.args.data.namespace
      console.log(context.args)
      if (!namespace) return next(Error('namespace is required for register'))
      Namespace.findOne({'title': namespace}, function (err, result) {
        if (err) return next(err);
        if (result) return next(Error('namespace is not available'));
        Namespace.create({
          "title": namespace,
          "createTime": Date.now()
        }, function (error, re) {
          if (error) return next(error)
          context.args.data.namespaceId = re.id
          next()
        })
      })
    })

    Manager.afterRemote('create', function (context, instance, next) {
      // console.log('after create', context, instance);
      var app = require('../../server/server')
      var Role = app.models.Role
      var RoleMapping = app.models.RoleMapping
      Role.create({
        "name": "admin"
      }, function (error, role) {
        if (error) return next(error)
        console.log("create role: ", role)
        role.principals.create({
          principalType: RoleMapping.USER,
          principalId: instance.id
        }, function (err, principal) {
          if (err) return next(err)
          console.log("create principal: ", principal)
          next()
        })
      })
    })
};
