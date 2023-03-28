const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const Room = seq.define('mgt_room', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  room_name: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    comment: '仓库名称',
  },
  address: {
    type: DataTypes.STRING,
    allowNull: true,
    comment: '地址',
  },
}, {
  timestamps: false,
  freezeTableName:true,
});

// 强制同步数据库
// Room.sync({ force: true });

module.exports = Room;
