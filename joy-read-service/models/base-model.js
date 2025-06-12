'use strict'

import { Model } from 'sequelize'

class BaseModel extends Model {
  static associate(models) {
    // define association here
  }
}

export { BaseModel } 