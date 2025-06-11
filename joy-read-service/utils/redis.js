import { createClient } from 'redis'

let client

const redisClient = async () => {
  if (client) return

  client = await createClient()
    .on('error', (err) => console.log('redis error', err))
    .connect()
}

/**
 * 存入数组或对象，并可选地设置过期时间
 * @param key 键名
 * @param value 要存储的值
 * @param ttl 可选，以秒为单位的过期时间，默认不设置
 */

const setKey = async (key, value, ttl = null) => {
  if (!client) await redisClient()
  value = JSON.stringify(value)
  await client.set(key, value)

  if (ttl !== null) {
    await client.expire(key, ttl)
  }
}

/**
 * 读取数组或对象
 * @param key 键名
 * @returns {Promise<any>} 解析后的JSON对象或数组
 */
const getKey = async (key) => {
  if (!client) await redisClient() // 确保客户端已初始化
  const value = await client.get(key) // 将获取到的JSON字符串转换回对象
  return value ? JSON.parse(value) : null // 如果value为空，返回null而不是抛出错误
}

/**
 * 清除缓存数据
 * @param key
 * @returns {Promise<void>}
 */
const delKey = async (key) => {
  if (!client) await redisClient() // 确保客户端已初始化
  await client.del(key)
}

export { redisClient, setKey, getKey, delKey }
