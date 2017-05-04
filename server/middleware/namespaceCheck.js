/**
 * Created by johnny on 25/04/2017.
 */
var app = require('../server');
var Manager = app.models.Manager;
const {ERRORS} = require('../../common/lib/constant');

module.exports = function () {
    return function (req, res, next) {
        // loggin
        if (req.accessToken && req.accessToken.userId) {
            var userId = req.accessToken.userId;
            Manager.findById(userId, function (err, result) {
                if (err) return next(err)
                req.namespace = result.namespace
                next()
            })
            return
        }
        var namespace = req.headers.namespace;
        if (!namespace || namespace === "") {
            return next(ERRORS.namespaceNeeded)
        }
        var Namespace = app.models.Namespace;
        Namespace.findOne({
            title: namespace
        }, function (err, result) {
            if (err) return next(err)
            if (!result) return next(ERRORS.namespaceNotFound);
            req.namespace = result.id
            next()
        })
    }
}
