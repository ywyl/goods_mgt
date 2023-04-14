const bcrypt = require('bcryptjs');

const { getUserInfoByAccount } = require('../service/UserService');
const {
  userFormatError,
  userExisted,
  userGetError,
  userNotExisted,
  userLoginError,
} = require('../constError/userErrorType');

const userValidator = async (ctx, next) => {
  const { account, password } = ctx.request.body;

  if (!account || !password) {
    console.error('用户名或密码为空', ctx.request.body);
    ctx.app.emit('error', userFormatError, ctx);
  }

  await next();
};

const vertifyAccount = async (ctx, next) => {
  const { account } = ctx.request.body;

  try {
    console.log(account);
    const res = await getUserInfoByAccount(account);
    console.log(111);
    if (res) {
      console.error('用户帐号已存在', { account });
      ctx.app.emit('error', userExisted, ctx);
      return;
    }
  } catch (err) {
    console.error('获取用户信息错误', { account });
    ctx.app.emit('error', userGetError, ctx);
    return;
  }

  await next();
};

const bcryptPassword = async (ctx, next) => {
  const { password } = ctx.request.body;

  const salt = bcrypt.genSaltSync(10);

  const hash = bcrypt.hashSync(password, salt);

  ctx.request.body.password = hash;

  await next();
};

const vertifyLogin = async (ctx, next) => {
  const { account, password } = ctx.request.body;

  try {
    const res = await getUserInfoByAccount(account);

    if (!res) {
      console.error('用户帐号不存在', { account });
      ctx.app.emit('error', userNotExisted, ctx);
      return;
    }

    if (!bcrypt.compareSync(password, res.password)) {
      console.error('密码错误', { account });
      ctx.app.emit('error', userFormatError, ctx);
      return;
    }
  } catch (err) {
    console.error(err);
    return ctx.app.emit('error', userLoginError, ctx);
  }

  await next();
};

module.exports = {
  userValidator,
  vertifyAccount,
  bcryptPassword,
  vertifyLogin,
};
