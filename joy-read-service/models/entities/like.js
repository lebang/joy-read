'use strict'

import { BaseModel } from '../base-model.js'
export default (sequelize, DataTypes) => {
  class Like extends BaseModel {
    static associate(models) {
      // define association here
    }
  }
  Like.init(
    {
      courseId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Like',
    },
  )
  return Like
}
