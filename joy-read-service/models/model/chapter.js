'use strict'

import { BaseModel } from "../base-model.js"
export default (sequelize, DataTypes) => {
  class Chapter extends BaseModel {
    static associate(models) {
      // define association here
    }
  }
  Chapter.init(
    {
      courseId: DataTypes.INTEGER,
      title: DataTypes.STRING,
      content: DataTypes.TEXT,
      video: DataTypes.STRING,
      rank: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: 'Chapter',
    },
  )
  return Chapter
}
