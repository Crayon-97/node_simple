const app = require('./system/http')
const token = require('./system/token')
const api = require('./api/router')

app.use(token)
app.use(api.routes())

// 配置服务端口
const server = app.listen(8088, () => {
  console.log('服务启动成功')
})
