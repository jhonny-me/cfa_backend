/**
 * Created by johnny on 25/04/2017.
 */
var app = require('../server');
var Manager = app.models.Manager;

module.exports = function () {
    return function (req, res, next) {
        // register
        if (req.method == 'POST' && req.url.includes('managers')) {
            return next()
        }
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
            return next('You should put namespace in the header.')
        }
        var Namespace = app.models.Namespace;
        Namespace.findOne({
            title: namespace
        }, function (err, result) {
            if (err) return next(err)
            if (!result) return next("No such namesapce");
            req.namespace = result.id
            next()
        })
    }
}
