const { Op } = require('sequelize');
const User = require('../model/UserModel');

class UserService {
  async getUserList(params) {
    const { rows, count } = await User.findAndCountAll({
      attributes: ['account', 'userName', 'isAdmin', 'updateTime'],
      offset: params.start,
      limit: params.limit,
      order: [['updateTime', 'DESC']],
      order: [['updateTime', 'DESC']],
      where: {
        userName: {
          [Op.like]: `%${params.userName}%`,
        },
      },
    });
    return { list: rows, total: count };
  }

  async createUser(account, userName, password, isAdmin) {
    const createTime = new Date().getTime();
    const updateTime = new Date().getTime();
    const { dataValues } = await User.create({
      account,
      userName,
      password,
      isAdmin,
      createTime,
      updateTime,
    });
    return dataValues;
  }

  async updateUser(account, userName, password, isAdmin) {
    const updateTime = new Date().getTime();
    const res = await User.update(
      { userName, password, isAdmin, updateTime },
      {
        where: {
          account,
        },
      }
    );
    return res;
  }

  async deleteUser(account) {
    const res = await User.destroy({
      where: {
        account,
      },
    });
    return res;
  }

  async getUserInfoByAccount(account) {
    const res = await User.findOne({
      attributes: ['account', 'userName', 'password'],
      where: { account },
    });

    return res ? res.dataValues : '';
  }
}

module.exports = new UserService();
