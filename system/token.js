const response = require('./response')

async function rules(ctx, next) {
  let url = ctx.request.url
  let urlList = ['/api/getUserInfo', '/api/getNotice']
  if (urlList.indexOf(url) !== -1) {
    await next()
  } else {
    let userId = ctx.request.headers['userid']
    if (!userId) {
      return (ctx.body = response.error(false, 'userId is null'))
    }
    await next()
  }
}

module.exports = rules
