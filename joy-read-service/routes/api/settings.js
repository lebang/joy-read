import express from 'express'
import createHttpError from 'http-errors'
import db from '../../models/index.js'
import { success } from '../../utils/responses.js'
import { setKey, getKey } from '../../utils/redis.js'

const router = express.Router()
const { Setting } = db
const { NotFound } = createHttpError

/**
 * 查询
 */
const getSetting = async (req) => {
  const setting = await Setting.findOne({ logging: console.log })
  console.info('setting:', setting)
  if (!setting) {
    throw new NotFound(`ID:${id}未找到`)
  }

  return setting
}

/**
 * 过滤参数
 * @param req
 * @returns {{name, icp, copyright, extra: (string|string|DocumentFragment|*)}}
 */
const filterBody = (req) => {
  const { name, icp, copyright, extra } = req?.body || {}
  return {
    name,
    icp,
    copyright,
    extra,
  }
}

/**
 * 查询详情
 * GET /api/settings/
 */
router.get('/', async (req, res) => {
  const cacheKey = 'setting'
  let setting = await getKey(cacheKey)

  if (!setting) {
    setting = await getSetting(req)
    await setKey(cacheKey, setting)
  }
  success(res, '查询成功', { setting })
})

/**
 * update
 */
router.put('/', async (req, res) => {
  const body = filterBody(req)
  const setting = await getSetting(req)

  await setting.update(body)
  success(res, '更新成功', { setting })
})

export default router
