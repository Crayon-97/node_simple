const koa = require('koa')
const app = new koa()
const cors = require('koa2-cors')
const koaBody = require('koa-body')

app.use(
  koaBody({
    multipart: true,
  })
)
app.use(cors())

module.exports = app
