const { DataTypes, DATE, NOW } = require('sequelize');

const seq = require('../db/seq');

const User = seq.define('mgt_user', {
  account: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: '帐号',
    primaryKey: true,
  },
  user_name: {
    type: DataTypes.STRING(20),
    allowNull: false,
    comment: '用户名称',
  },
  password: {
    type: DataTypes.STRING(64),
    allowNull: false,
    comment: '密码',
  },
  is_admin: {
    type: DataTypes.INTEGER,
    allowNull: false,
    comment: '是否管理员',
  },
  create_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'create_time'
  },
  update_time: {
    type: DataTypes.DATE,
    defaultValue: DataTypes.NOW,
    field: 'update_time'
  }
}, {
  timestamps: false,
  freezeTableName:true,
});

// 强制同步数据库
// Room.sync({ force: true });

module.exports = User;