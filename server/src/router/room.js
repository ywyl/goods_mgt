const Router = require('@koa/router');

const { roomValidator, checkRoomExist } = require('../middleware/roomMid');
const { getList, addRoom } = require('../controller/RoomController');

const router = new Router({ prefix: '/room' });

// 列表查询
router.get('/', getList);

// 添加
router.post('/add', checkRoomExist, addRoom);

// 登录
// router.get('/login', login);

module.exports = router;
