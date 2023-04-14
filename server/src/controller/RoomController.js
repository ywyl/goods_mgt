const { getRoomList, createRoom, updateRoom, deleteRoom } = require('../service/RoomService');

const { roomAddedError, roomUpdatedError, roomDeletedError } = require('../constError/roomErrorType');

class RoomController {
  async getList(ctx, next) {
    const res = await getRoomList(ctx.request.body);

    ctx.body = {
      code: 0,
      message: '仓库列表获取成功',
      result: res
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
          address: res.address,
        },
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', roomAddedError, ctx);
    }
  }

  async updateRoom(ctx, next) {
    const { id, roomName, address } = ctx.request.body;

    try {
      const res = await updateRoom(id, roomName, address);

      ctx.body = {
        code: 0,
        message: '仓库修改成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', roomUpdatedError, ctx);
    }
  }

  async deleteRoom(ctx, next) {
    const { id } = ctx.request.body;

    try {
      const res = await deleteRoom(id);

      ctx.body = {
        code: 0,
        message: '仓库删除成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', roomDeletedError, ctx);
    }
  }
}

module.exports = new RoomController();
