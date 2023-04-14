const Router = require('@koa/router');

const { userValidator, vertifyAccount, bcryptPassword } = require('../middleware/userMid');
const { login, getList, addUser, updateUser, deleteUser } = require('../controller/userController');

const router = new Router({ prefix: '/user' });

// 登录
router.post('/login', userValidator, login);

// 列表查询
router.post('/getList', getList);

// 添加
router.post('/add', userValidator, vertifyAccount, bcryptPassword, addUser);

// 编辑
router.post('/update', updateUser);

// 删除
router.post('/delete', deleteUser);

module.exports = router;
