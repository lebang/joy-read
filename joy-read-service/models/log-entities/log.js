'use strict';
const {
  Model
} = require('sequelize');
export default (sequelize, DataTypes) => {
  class Log extends Model {
    static associate(models) {
      // define association here
    }
  }
  Log.init({
    level: DataTypes.STRING,
    messsage: DataTypes.STRING,
    meta: {
      type: DataTypes.STRING,
      get() {
        return JSON.parse(this.getDataValue('meta'));
      },
    },
    timestamp: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'Log',
    timestamps: false, // 禁用默认的 createdAt 与 updatedAt 字段
  });
  return Log;
};