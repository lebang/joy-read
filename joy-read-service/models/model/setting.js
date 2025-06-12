'use strict'

import { BaseModel } from "../base-model.js"
export default (sequelize, DataTypes) => {
  class Setting extends BaseModel {
    static associate(models) {
      // define association here
    }
  }
  Setting.init(
    {
      name: DataTypes.STRING,
      icp: DataTypes.STRING,
      copyright: DataTypes.STRING,
      extra: DataTypes.STRING,
    },
    {
      sequelize,
      modelName: 'Setting',
    },
  )
  return Setting
}
