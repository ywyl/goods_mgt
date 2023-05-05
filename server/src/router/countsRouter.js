const Router = require('@koa/router');

const { countsValidator, checkCountsExist, checkCountsNotExist } = require('../middleware/countsMid');
const { getList, addCounts, updateCounts, deleteCounts } = require('../controller/CountsController');

const router = new Router({ prefix: '/counts' });

// 列表查询
router.post('/getList', getList);

// 新增条目
router.post('/add', countsValidator, checkCountsNotExist, addCounts);

// 更新数量
router.post('/update', checkCountsExist, updateCounts);

// 删除
router.post('/delete', checkCountsExist, deleteCounts);

module.exports = router;
