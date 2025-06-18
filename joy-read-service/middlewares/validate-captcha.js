import createHttpError from 'http-errors'

import { failure } from '../utils/responses.js'
import { getKey } from '../utils/redis.js'

const { BadRequest } = createHttpError

const validateCaptcha = async(req, res) => {
  const { captchaKey, captchaText } = req.body
  if(!captchaText) {
    throw new BadRequest('验证码不能为空')
  }
  const captcha = await getKey(captchaKey)
  if(!captcha) {
    throw new BadRequest('验证码已过期')
  }
  if(captcha.toLowerCase() !== captchaText.toLowerCase()) {
    throw new BadRequest('验证码错误')
  }
  
}

export default async (req, res, next) => {
  try {
    await validateCaptcha(req, res)
    next()
  } catch (error) {
    failure(res, error)
  }
}