'use strict'

import { Model } from 'sequelize'
import dayjs from 'dayjs'
import localizedFormat from 'dayjs/plugin/localizedFormat.js'
import 'dayjs/locale/zh-cn.js'

class BaseModel extends Model {
 
  constructor(values, options) {
    super(values, options)
  }

  static getDayjs() {
    dayjs.locale('zh-cn')
    dayjs.extend(localizedFormat)
    return dayjs;
  }
}

export { BaseModel }
