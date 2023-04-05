const Router = require('@koa/router');

const { roomValidator, checkIdExist, checkRoomExist } = require('../middleware/roomMid');
const { getList, addRoom, updateRoom, deleteRoom } = require('../controller/RoomController');

const router = new Router({ prefix: '/room' });

// 列表查询
router.post('/getList', getList);

// 添加
router.post('/add', roomValidator, checkRoomExist, addRoom);

// 编辑
router.post('/update', roomValidator, checkIdExist, updateRoom);

// 删除
router.post('/delete', checkIdExist, deleteRoom);

// 登录
// router.get('/login', login);

module.exports = router;
