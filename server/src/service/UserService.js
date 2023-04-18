const { Op } = require('sequelize');
const User = require('../model/UserModel');

class UserService {
  async getUserList(params) {
    const list = await User.findAll({
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
    const total = await User.count();
    return { list, total };
  }

  async createUser(account, userName, password, isAdmin) {
    const updateTime = new Date().getTime();
    const { dataValues } = await User.create({
      account,
      userName,
      password,
      isAdmin,
      updateTime,
    });
    return dataValues;
  }

  async updateUser(account, userName, password, isAdmin) {
    const res = await User.update(
      { userName, password, isAdmin },
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
