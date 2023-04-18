const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const Room = seq.define(
  'mgt_room',
  {
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      primaryKey: true,
    },
    roomName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      unique: true,
      field: 'room_name',
      comment: '仓库名称',
    },
    address: {
      type: DataTypes.STRING(120),
      allowNull: true,
      comment: '地址',
    },
    createTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'create_time',
    },
    updateTime: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW,
      field: 'update_time',
    },
  },
  {
    timestamps: false,
    freezeTableName: true,
  }
);

// 强制同步数据库
// Room.sync({ force: true });

module.exports = Room;
