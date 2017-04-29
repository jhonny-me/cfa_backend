'use strict';

module.exports = function(Namespace) {

    Namespace.available = function (namespace, cb) {
        console.log(namespace)
        Namespace.findOne({
            title: namespace
        }, function (err, result) {
            if (err) return cb(err)
            cb(null, result == null )
        })
    }

    Namespace.remoteMethod(
        'available', {
            accepts: {arg: 'title', type: 'string', required: true},
            returns: {arg: 'result', type: 'bool'}
        }
    )
};
