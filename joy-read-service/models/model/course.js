'use strict'

import { BaseModel } from '../base-model.js'
export default (sequelize, DataTypes) => {
  class Course extends BaseModel {
    static associate(models) {
      // define association here
    }
  }
  Course.init(
    {
      categoryId: DataTypes.INTEGER,
      userId: DataTypes.INTEGER,
      name: DataTypes.STRING,
      image: DataTypes.STRING,
      recommended: DataTypes.BOOLEAN,
      introductory: DataTypes.BOOLEAN,
      content: DataTypes.TEXT,
      likesCount: DataTypes.INTEGER,
      chaptersCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Course',
    },
  )
  return Course
}
