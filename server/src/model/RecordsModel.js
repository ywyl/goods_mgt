const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const Records = seq.define(
  'goods_records',
  {
    id: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    roomId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      field: 'room_id',
    },
    goodsId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      field: 'goods_id',
    },
    operation: {
      type: DataTypes.INTEGER,
      allowNull: false,
      comment: '操作类型: 0-增加; 1-减少',
    },
    target: {
      type: DataTypes.STRING(36),
      allowNull: false,
      comment: '操作对象：仓库',
    },
    amount: {
      type: DataTypes.INTEGER,
      allowNull: false,
      defaultValue: 0,
      comment: '物资变化数量',
    },
    recordTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'record_time',
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// 强制同步数据库
// Records.sync({ force: true });

module.exports = Records;
