const Router = require('@koa/router');

// const { goodsValidator, checkIdExist, checkGoodsExist } = require('../middleware/goodsMid');
const { getList, addGoods, updateGoods, deleteGoods } = require('../controller/GoodsController');

const router = new Router({ prefix: '/goods' });

// 列表查询
router.post('/getList', getList);

// 添加
router.post('/add', addGoods);

// 编辑
router.post('/update', updateGoods);

// 删除
router.post('/delete', deleteGoods);

module.exports = router;
