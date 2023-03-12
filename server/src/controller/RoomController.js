const { getRoomList, createRoom } = require('../service/RoomService');

const { roomAddedError } = require('../const/errorType');

class RoomController {
  async getList(ctx, next) {
    const res = await getRoomList();
    console.log(res);

    ctx.body = {
      code: 0,
      message: '仓库列表获取成功',
      // result: res
    };
  }

  async addRoom(ctx, next) {
    const { roomName, address } = ctx.request.body;

    try {
      const res = await createRoom(roomName, address);

      ctx.body = {
        code: 0,
        message: '仓库添加成功',
        result: {
          id: res.id,
          roomName: res.room_name,
        },
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', roomAddedError, ctx);
    }
  }
}

module.exports = new RoomController();
