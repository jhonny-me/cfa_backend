/**
 * Created by johnny on 01/05/2017.
 */

module.exports = function (server) {
  var remotes = server.remotes()
  remotes.after('**', function (ctx, next) {
    console.log('context: ', ctx)
    ctx.result = {
      data: ctx.result
    }
    next()
  })
}
