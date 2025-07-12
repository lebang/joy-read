import express from 'express'
import svgCaptcha from 'svg-captcha'
import { v4 as uuidv4 } from 'uuid'

import { success } from '../utils/responses.js'
import { setKey } from '../utils/redis.js'

const router = express.Router()

/**
 * 获取验证码
 * GET /captcha
 */

router.get('/', async (req, res) => {
  const captcha = svgCaptcha.create({
    size: 4, // 验证码长度
    ignoreChars: '0O1Il9quv', // 验证码字符中排除 0O1Il9quv
    noise: 2, // 干扰线条数量
    color: true, // 是否有颜色，
    width: 100, // 宽
    height: 38, // 高
  })

  const captchaKey = `captcha:${uuidv4()}`
  await setKey(captchaKey, captcha.text, 60 * 10) // 10分钟
  // res.type('svg')
  // res.status(200).send(captcha.data)
  success(res, 'success', {
    captchaKey,
    captchaData: captcha.data,
  })
})

export default router
