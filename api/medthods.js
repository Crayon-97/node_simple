const conn = require('../system/mysql')

// 判断openid是否存在数据库
function haveUser(e) {
  return new Promise(function (resolve, reject) {
    conn.query(
      `select * from user where openId = '${e.openid}'`,
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

// 注册
function registerUser(e) {
  return new Promise(function (resolve, reject) {
    conn.query(
      `insert into user (userId, openId, time) values ('${e.userId}', '${e.openId}', '${e.time}')`,
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

// 公告
function notice() {
  return new Promise(function (resolve, reject) {
    conn.query(`select * from notice`, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

// 保存公告
function mark(e) {
  return new Promise(function (resolve, reject) {
    conn.query(
      `insert into proposal (userId, text) values ('${e.userId}', '${e.text}')`,
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

// 保存备忘录
function memo(e) {
  return new Promise(function (resolve, reject) {
    conn.query(
      `insert into memo (userId, text, time) values ('${e.userId}', '${e.text}', '${e.time}')`,
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

// 保存时光机
function stime(e) {
  return new Promise(function (resolve, reject) {
    conn.query(
      `insert into time (userId, text, time, type) values ('${e.userId}', '${e.text}', '${e.time}', '${e.type}')`,
      (err, result) => {
        if (err) reject(err)
        resolve(result)
      }
    )
  })
}

// 查询备忘录
function getMemo(e) {
  return new Promise(function (resolve, reject) {
    conn.query(`select * from memo where userId = '${e}'`, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

// 查询备忘录
function getTime(e) {
  return new Promise(function (resolve, reject) {
    conn.query(`select * from time where userId = '${e}'`, (err, result) => {
      if (err) reject(err)
      resolve(result)
    })
  })
}

module.exports = {
  haveUser,
  registerUser,
  notice,
  mark,
  memo,
  stime,
  getMemo,
  getTime,
}
