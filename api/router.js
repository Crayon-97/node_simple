const {
  haveUser,
  registerUser,
  notice,
  mark,
  memo,
  stime,
  getMemo,
  getTime,
} = require('./medthods')
const getUserId = require('../utils/user')
const response = require('../system/response')
const Router = require('koa-router')
const koa2Re = require('koa2-request')
const { dateFormat } = require('../utils/date')
let router = new Router()

// 用户登陆注册
router.post('/api/getUserInfo', async (ctx, next) => {
  let query = ctx.request.body
  if (!query.code) {
    return (ctx.body = response.error(false, 'code为空'))
  }
  // 获取用户openid
  let wxData = await koa2Re({
    url: `https://api.weixin.qq.com/sns/jscode2session?appid=${process.env.VUE_APP_APPID}&secret=${process.env.VUE_APP_SECRET}&js_code=${query.code}&grant_type=authorization_code`,
  })
  let JsonData = JSON.parse(wxData.body)
  // 判断该用户是否已经注册
  let isHave = await haveUser(JsonData)
  if (isHave.length === 0) {
    // 用户未注册
    let info = {
      userId: getUserId(),
      openId: JsonData.openid,
      lv: 1,
      time: dateFormat('YYYY-mm-dd HH:MM', new Date()),
    }
    let register = await registerUser(info)
    if (register.affectedRows === 1) {
      return (ctx.body = response.success(info, '登录成功'))
    } else {
      return (ctx.body = response.success(false, '注册失败'))
    }
  } else {
    let info = {
      userId: isHave[0].userId,
      openId: isHave[0].openId,
      lv: isHave[0].lv,
    }
    return (ctx.body = response.success(info, '登录成功'))
  }
})

// 公告
router.get('/api/getNotice', async (ctx, next) => {
  // 查询系统公告信息
  let data = await notice()
  if (data.length > 0) {
    return (ctx.body = response.success(data))
  } else {
    return (ctx.body = response.error(false, '查询失败'))
  }
})

// 建议
router.post('/api/saveMark', async (ctx, next) => {
  let userId = ctx.request.headers['userid']
  let query = ctx.request.body
  if (!query.text) {
    return (ctx.body = response.error(false, '建议不能为空'))
  }
  let info = {
    userId,
    text: query.text,
  }
  let data = await mark(info)
  if (data.affectedRows === 1) {
    return (ctx.body = response.success(true))
  } else {
    return (ctx.body = response.success(false))
  }
})

// 备忘录
router.post('/api/saveMemo', async (ctx, next) => {
  let userId = ctx.request.headers['userid']
  let query = ctx.request.body
  if (!query.text || !query.time) {
    return (ctx.body = response.error(false, '缺少参数'))
  }
  let info = {
    userId,
    text: query.text,
    time: query.time,
  }
  let data = await memo(info)
  if (data.affectedRows === 1) {
    return (ctx.body = response.success(true))
  } else {
    return (ctx.body = response.success(false, '添加备忘录失败'))
  }
})

// 时光机
router.post('/api/saveTime', async (ctx, next) => {
  let userId = ctx.request.headers['userid']
  let query = ctx.request.body
  if (!query.text || !query.time || !query.type) {
    return (ctx.body = response.error(false, '缺少参数'))
  }
  let info = {
    userId,
    text: query.text,
    time: query.time,
    type: query.type,
  }
  let data = await stime(info)
  if (data.affectedRows === 1) {
    return (ctx.body = response.success(true))
  } else {
    return (ctx.body = response.success(false, '添加时光机失败'))
  }
})

// 获取List
router.get('/api/getList', async (ctx, next) => {
  let userId = ctx.request.headers['userid']
  let memo = await getMemo(userId)
  let time = await getTime(userId)
  let data = {
    memo,
    time,
  }
  if (memo || time) {
    return (ctx.body = response.success(data))
  } else {
    return (ctx.body = response.error(false, '查询失败'))
  }
})

module.exports = router
