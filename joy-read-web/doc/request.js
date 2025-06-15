/**
 * 请求， 返回Promise
 * @param { string } url 请求地址
 * @param  { number } maxCount 最大请求数
 */

function request(url, maxCount = 3) {
  return fetch(url).catch((err) => {
    return maxCount <= 0 ? Promise.reject(err) : request(url, maxCount - 1)
  })
}

request('https://www.baidu.com').then((res) => {
  console.log('res:', res)
})
