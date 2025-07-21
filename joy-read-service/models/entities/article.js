'use strict'

import { BaseModel } from '../base-model.js'

export default (sequelize, DataTypes) => {
  class Article extends BaseModel {
    static associate(models) {
      Article.belongsTo(models.User, {
        foreignKey: 'userId',
        as: 'user',
      })

      Article.belongsTo(models.User, {
        foreignKey: 'approvedBy',
        as: 'approver',
      })
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
      status: {
        type: DataTypes.ENUM('draft', 'pending_review', 'approved', 'rejected'),
        allowNull: false,
        defaultValue: 'draft',
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
      approvedBy: {
        type: DataTypes.INTEGER.UNSIGNED,
        allowNull: true,
        references: {
          model: 'Users',
          key: 'id',
        },
      },
      approvedAt: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      rejectionReason: {
        type: DataTypes.TEXT,
        allowNull: true,
      },
      deletedAt: {
        type: DataTypes.DATE,
      },
    },
    {
      sequelize,
      paranoid: true, // 启用软删除 deletedAt字段
      modelName: 'Article',
    },
  )

  return Article
}
