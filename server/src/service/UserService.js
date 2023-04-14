const { Op } = require('sequelize');
const User = require('../model/UserModel');

class UserService {
  async getUserList(params) {
    const list = await User.findAll({
      attributes: ['account', ['user_name', 'userName'], ['is_admin', 'isAdmin'], ['update_time', 'updateTime']],
      offset: params.start,
      limit: params.limit,
      order: [['update_time', 'DESC']],
      where: {
        user_name: {
          [Op.like]: `%${params.userName}%`,
        },
      },
    });
    const total = await User.count();
    return { list, total };
  }

  async createUser(account, userName, password, isAdmin) {
    const { dataValues } = await User.create({
      account,
      user_name: userName,
      password,
      is_admin: isAdmin,
    });
    return dataValues;
  }

  async updateUser(account, userName, password, isAdmin) {
    const res = await User.update(
      { user_name: userName, password, is_admin: isAdmin },
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
      attributes: ['account', ['user_name', 'userName'], 'password'],
      where: { account },
    });

    return res ? res.dataValues : '';
  }
}

module.exports = new UserService();
