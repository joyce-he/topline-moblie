// 封装一个请求函数
function getAticle (axios, { url, method, params }) {
  return axios({
    url: url,
    method: method,
    params: params
  })
}

export {
  getAticle
}
