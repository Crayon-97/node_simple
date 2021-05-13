function error(data, message, code) {
  return {
    data,
    message: message || '失败',
    status: code || 500
  }
}
function success(data, message, code) {
  return {
    data,
    message: message || '成功',
    status: code || 200
  }
}
module.exports = { error, success }
