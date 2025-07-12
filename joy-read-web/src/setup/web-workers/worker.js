// 加载 Comlink 从 CDN
import * as Comlink from 'comlink'

const obj = {
  counter: 0,
  inc(num = 2) {
    console.log('inc', num)
    this.counter += num
  },
}

Comlink.expose(obj)
