'use strict';

module.exports = function(Namespace) {

    Namespace.available = function (namespace, cb) {
        Namespace.findOne({
            title: namespace
        }, function (err, result) {
            if (err) return cb(err)
            cb(null, result == null )
        })
    }

    Namespace.remoteMethod(
        'available', {
            accepts: {arg: 'namespace', type: 'string'},
            returns: {arg: 'result', type: 'bool'}
        }
    )
};
