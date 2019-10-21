// 管理所有与用户相关 的网络请求

// 用来进来 用户的登录
// axios: 发起网站请求的对象
// options: 发起网络请求的参数
//   url:
//   method:
//   data

function userLogin (axios, { url, method, data }) {
  return axios({
    url: url + 'ext',
    method: method,
    data: data
  })
  // return 返回了一个promise
}

export {
  userLogin
}
