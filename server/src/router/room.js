const Router = require('@koa/router');

const { roomValidator, checkRoomExist } = require('../middleware/roomMid');
const { addRoom } = require('../controller/RoomController');

const router = new Router({ prefix: '/room' });

// 注册
router.post('/add', roomValidator, checkRoomExist, addRoom);

// 登录
// router.get('/login', login);

module.exports = router;
