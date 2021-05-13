// 生成唯一用户ID
function getUserId() {
  let date = new Date()
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? '0' + m : m
  let d = date.getDate()
  d = d < 10 ? '0' + d : d
  let h = date.getHours()
  let minute = date.getMinutes()
  let second = date.getSeconds()
  let uustring = Math.random().toString(36).substr(2)
  return y + m + d + h + minute + second + uustring
}

module.exports = getUserId
