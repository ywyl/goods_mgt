const jwt = require('jsonwebtoken');

const { getUserList, createUser, updateUser, deleteUser, getUserInfoByAccount } = require('../service/UserService');

const { userAddedError, userUpdatedError, userDeletedError } = require('../constError/userErrorType');

const { JWT_SECRET } = require('../config/config');

class UserController {
  async login(ctx, next) {
    const { account } = ctx.request.body;

    try {
      const { password, ...res } = await getUserInfoByAccount(account);

      ctx.body = {
        code: 0,
        message: '用户登录成功',
        result: {
          token: jwt.sign(res, JWT_SECRET, { expiresIn: '1d' }),
        },
      };
    } catch (err) {
      console.error('用户登录失败', err);
    }
  }

  async getList(ctx, next) {
    const res = await getUserList(ctx.request.body);

    ctx.body = {
      code: 0,
      message: '用户列表获取成功',
      result: res,
    };
  }

  async addUser(ctx, next) {
    const { account, userName, password, isAdmin } = ctx.request.body;

    try {
      const res = await createUser(account, userName, password, isAdmin);

      ctx.body = {
        code: 0,
        message: '用户添加成功',
        result: {
          account: res.account,
          userName: res.user_name,
          isAdmin: res.is_admin,
        },
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', userAddedError, ctx);
    }
  }

  async updateUser(ctx, next) {
    const { account, userName, password, isAdmin } = ctx.request.body;

    try {
      const res = await updateUser(account, userName, password, isAdmin);

      ctx.body = {
        code: 0,
        message: '用户修改成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', userUpdatedError, ctx);
    }
  }

  async deleteUser(ctx, next) {
    const { account } = ctx.request.body;

    try {
      const res = await deleteUser(account);

      ctx.body = {
        code: 0,
        message: '用户删除成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', userDeletedError, ctx);
    }
  }
}

module.exports = new UserController();
