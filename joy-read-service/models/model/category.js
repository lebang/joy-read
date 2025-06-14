'use strict'

import { BaseModel } from '../base-model.js'
export default (sequelize, DataTypes) => {
  class Category extends BaseModel {
    static associate(models) {
      models.Category.hasMany(models.Course, { as: 'courses' })
    }
  }
  Category.init(
    {
      name: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: { msg: 'empty' },
          notEmpty: { msg: 'empty' },
          len: {
            args: [2, 45],
            msg: '2-45 length',
          },
          async isUnique(value) {
            const category = await Category.findOne({ where: { name: value } })
            if (category) {
              throw new Error('名称已存在，请选择其他名称。')
            }
          },
        },
      },
      rank: {
        type: DataTypes.INTEGER,
        allowNull: false,
        validate: {
          notNull: { msg: 'empty' },
          notEmpty: { msg: 'empty' },
          isInt: { msg: 'int required' },
          isPositive(value) {
            if (value <= 0) throw new Error('int error')
          },
        },
      },
    },
    {
      sequelize,
      modelName: 'Category',
    },
  )
  return Category
}
