const { DataTypes, DATE, NOW } = require('sequelize');

const seq = require('../db/seq');

const User = seq.define(
  'mgt_user',
  {
    account: {
      type: DataTypes.STRING(20),
      allowNull: false,
      comment: '帐号',
      primaryKey: true,
    },
    userName: {
      type: DataTypes.STRING(20),
      allowNull: false,
      field: 'user_name',
      comment: '用户名称',
    },
    password: {
      type: DataTypes.STRING(64),
      allowNull: false,
      comment: '密码',
    },
    isAdmin: {
      type: DataTypes.INTEGER,
      allowNull: false,
      field: 'is_admin',
      comment: '是否管理员',
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
// User.sync({ force: true });

module.exports = User;
