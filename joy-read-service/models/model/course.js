'use strict'

import { BaseModel } from '../base-model.js'
export default (sequelize, DataTypes) => {
  class Course extends BaseModel {
    static associate(models) {
      models.Course.belongsTo(models.Category, { foreignKey: 'categoryId', as: 'category' })
      models.Course.belongsTo(models.User, { foreignKey: 'userId', as: 'user' })
      models.Course.hasMany(models.Chapter, { as: 'chapters' })
    }
  }
  Course.init(
    {
      categoryId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: '分类ID必须填写。' },
          notEmpty: { msg: '分类ID不能为空。' },
          async isPresent(value) {
            const category = await sequelize.models.Category.findByPk(value)
            if (!category) {
              throw new Error(`ID为：${value} 的分类不存在。`)
            }
          },
        },
      },
      userId: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: '用户ID必须填写。' },
          notEmpty: { msg: '用户ID不能为空。' },
          async isPresent(value) {
            const user = await sequelize.models.User.findByPk(value)
            if (!user) {
              throw new Error(`ID为：${value} 的用户不存在。`)
            }
          },
        },
      },
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: '名称必须填写。' },
          notEmpty: { msg: '名称不能为空。' },
          len: { args: [2, 45], msg: '名称长度必须是2 ~ 45之间。' },
        },
      },
      image: {
        type: DataTypes.STRING,
        validate: {
          isUrl: { msg: '图片地址不正确。' },
        },
      },
      recommended: {
        type: DataTypes.BOOLEAN,
        validate: {
          isIn: { args: [[true, false]], msg: '是否推荐的值必须是，推荐：true 不推荐：false。' },
        },
      },
      introductory: {
        type: DataTypes.BOOLEAN,
        validate: {
          isIn: {
            args: [[true, false]],
            msg: '是否入门课程的值必须是，推荐：true 不推荐：false。',
          },
        },
      },
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
