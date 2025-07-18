import createHttpError from 'http-errors'
import processEnv from './process-env.js'

/**
 *
 */
function success(res, message, data = {}, code = 200) {
  res.status(code).json({
    status: true,
    code,
    message,
    data,
    querySql: res.querySql,
  })
}

/**
 * 请求失败
 * @param res
 * @param err
 */
function failure(res, err) {
  let statusCode = 500
  let errors = '服务器错误。'
  const { HttpError } = createHttpError

  // 如果是开发环境，显示详细错误信息
  if (processEnv.NODE_ENV === 'development') {
    console.log(err)
    errors = err.message
  }

  if (err.name === 'SequelizeValidationError') {
    // Sequelize 验证错误
    statusCode = 400
    errors = err.errors.map((e) => e.message)
  } else if (err.name === 'JsonWebTokenError' || err.name === 'TokenExpiredError') {
    // Token 验证错误
    statusCode = 401
    errors = '您提交的 token 错误或已过期。'
  } else if (err instanceof HttpError) {
    // http-errors 库创建的错误
    statusCode = err.status
    errors = err.message
  }

  res.status(statusCode).json({
    status: false,
    code: statusCode,
    message: `请求失败: ${err.name}`,
    errors: Array.isArray(errors) ? errors : [errors],
  })
}

export { success, failure }
