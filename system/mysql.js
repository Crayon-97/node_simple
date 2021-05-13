// 创建数据库
const mysql = require('mysql')

const conn = mysql.createConnection({
  host: '127.0.0.1',
  user: process.env.VUE_APP_USERNAME,
  password: process.env.VUE_APP_PASSWORD,
  database: 'minibook',
})

module.exports = conn
