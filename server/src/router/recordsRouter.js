const Router = require('@koa/router');

const { queryCountsRecords } = require('../controller/RecordsController');

const router = new Router({ prefix: '/records' });

// 记录查询
router.post('/getRecords', queryCountsRecords);

module.exports = router;
