'use strict'

import { BaseModel } from '../base-model.js'

export default (sequelize, DataTypes) => {
  class Article extends BaseModel {
    static associate(models) {
      // define association here
    }
  }
  Article.init(
    {
      title: {
        type: DataTypes.STRING,
        allowNull: false,
        validate: {
          notNull: {
            msg: '标题不能为空1',
          },
          notEmpty: {
            msg: '标题不能为空2',
          },
          len: {
            args: [2, 45],
            msg: '标题长度在2~45个字符之间',
          },
        },
      },
      content: DataTypes.TEXT,
      deletedAt: {
        type: DataTypes.DATE
      }
    },
    {
      sequelize,
      paranoid: true,
      modelName: 'Article',
    },
  )

  return Article
}
