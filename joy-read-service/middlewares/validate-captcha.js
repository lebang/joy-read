import createHttpError from 'http-errors'

import { failure } from '../utils/responses.js'
import { getKey } from '../utils/redis.js'

const { BadRequest } = createHttpError

const validateCaptcha = async(req, res, next) => {
  const { captchKey, captchaText } = req.body
  if(!captchaText) {
    throw new BadRequest('验证码不能为空')
  }
  const captcha = await getKey(captchKey)
  if(!captcha) {
    throw new BadRequest('验证码已过期')
  }
  if(captcha.toLowerCase() !== captchaText.toLowerCase()) {
    throw new BadRequest('验证码错误')
  }
  next()
}

export default (req, res, next) => {
  try {
    validateCaptcha(req, res, next)
  } catch (error) {
    failure(res, error)
  }
}