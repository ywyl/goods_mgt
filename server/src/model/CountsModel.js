const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const Goods = require('../model/GoodsModel');
const Room = require('../model/RoomModel');

const Counts = seq.define(
  'goods_counts',
  {
    roomId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      field: 'room_id',
      primaryKey: true,
    },
    goodsId: {
      type: DataTypes.STRING(36),
      allowNull: false,
      field: 'goods_id',
      primaryKey: true,
    },
    counts: {
      type: DataTypes.INTEGER,
      defaultValue: 0,
      allowNull: false,
      comment: '数量',
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
// Counts.sync({ force: true });

Counts.belongsTo(Goods, {
  foreignKey: 'goodsId',
  targetKey: 'id',
});

Counts.belongsTo(Room, {
  foreignKey: 'roomId',
  targetKey: 'id',
});

module.exports = Counts;
