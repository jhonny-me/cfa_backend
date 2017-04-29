'use strict';
var CONTAINERS_URL = '/api/containers/';
module.exports = function(Resource) {
    Resource.upload = function (context, options, cb) {
        if(!options) options = {};
        context.req.params.container = 'common';
        Resource.app.models.container.upload(context.req,context.result,options,function (err,fileObj) {
            if(err) {
                cb(err);
            } else {
                var fileInfo = fileObj.files.file[0];
                Resource.create({
                    name: fileInfo.name,
                    type: fileInfo.type,
                    container: fileInfo.container,
                    size: fileInfo.size,
                    description: context.req.params.description,
                    coverUrl: null,
                    url: CONTAINERS_URL+ fileInfo.container+'/download/'+fileInfo.name
                },function (err,obj) {
                    if (err !== null) {
                        cb(err);
                    } else {
                        cb(null, obj);
                    }
                });
            }
        });
    }

    Resource.remoteMethod(
        'upload',
        {
            description: 'Uploads a file',
            accepts: [
                { arg: 'context', type: 'object', http: { source:'context' } },
                { arg: 'options', type: 'object', http:{ source: 'query'} }
            ],
            returns: {
                arg: 'fileObject', type: 'object', root: true
            },
            http: {verb: 'post'}
        }
    );
};
