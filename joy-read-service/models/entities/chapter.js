'use strict'

import { BaseModel } from '../base-model.js'
export default (sequelize, DataTypes) => {
  class Chapter extends BaseModel {
    static associate(models) {
      models.Chapter.belongsTo(models.Course, { as: 'course' })
    }
  }
  Chapter.init(
    {
      courseId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: '课程ID必须填写。' },
          notEmpty: { msg: '课程ID不能为空。' },
          async isPresent(value) {
            const course = await sequelize.models.Course.findByPk(value)
            if (!course) {
              throw new Error(`ID为：${value} 的课程不存在。`)
            }
          },
        },
      },
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: '标题必须填写。' },
          notEmpty: { msg: '标题不能为空。' },
          len: { args: [2, 45], msg: '标题长度必须是2 ~ 45之间。' },
        },
      },
      content: DataTypes.TEXT,
      video: {
        type: DataTypes.STRING,
        validate: {
          isUrl: { msg: '视频地址不正确。' },
        },
      },
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: '排序必须填写。' },
          notEmpty: { msg: '排序不能为空。' },
          isInt: { msg: '排序必须为整数。' },
          isPositive(value) {
            if (value <= 0) {
              throw new Error('排序必须是正整数。')
            }
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Chapter',
    },
  )
  return Chapter
}
