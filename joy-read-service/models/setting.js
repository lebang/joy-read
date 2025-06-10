'use strict'

import { Model } from 'sequelize'
export default (sequelize, DataTypes) => {
  class Setting extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
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
