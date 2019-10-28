function apiGetChannelList (axios, { url, method }) {
  return axios({
    url: url,
    method: method
  })
}

// 按需导出这个方法
export { apiGetChannelList }
