const { DataTypes } = require('sequelize');

const seq = require('../db/seq');

const Goods = seq.define('mgt_goods', {
  id: {
    type: DataTypes.UUID,
    defaultValue: DataTypes.UUIDV4,
    primaryKey: true,
  },
  goodsName: {
    type: DataTypes.STRING(20),
    allowNull: false,
    unique: true,
    comment: '物品名称',
    field: 'goods_name'
  },
  description: {
    type: DataTypes.STRING(120),
    allowNull: true,
    comment: '描述',
  },
  type: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '类型',
  },
  createTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'create_time'
  },
  updateTime: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'update_time'
  }
}, {
  timestamps: false,
  freezeTableName:true,
});

// 强制同步数据库
// Goods.sync({ force: true });

module.exports = Goods;