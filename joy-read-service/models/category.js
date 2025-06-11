'use strict'

import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Category extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
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
