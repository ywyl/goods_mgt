const { getRoomInfoById, getRoomInfo } = require('../service/RoomService');
const { roomFormatError, roomExisted, idNotExisted, roomAddedError } = require('../const/roomErrorType');

const roomValidator = async (ctx, next) => {
  const { roomName } = ctx.request.body;

  if (!roomName) {
    console.error('仓库名称为空', ctx.request.body);
    ctx.app.emit('error', roomFormatError, ctx);
    return;
  }

  await next();
};

const checkIdExist = async (ctx, next) => {
  const { id } = ctx.request.body;
  if (!id) {
    console.error('数据不存在', { id });
    ctx.app.emit('error', idNotExisted, ctx);
  }

  try {
    const res = await getRoomInfoById(id);
    if (!res) {
      console.error('数据不存在', { id });
      ctx.app.emit('error', idNotExisted, ctx);
      return;
    }
  } catch (err) {
    console.error('获取仓库信息错误', { id });
    ctx.app.emit('error', roomAddedError, ctx);
    return;
  }

  await next();
};

const checkRoomExist = async (ctx, next) => {
  const { roomName } = ctx.request.body;

  try {
    const res = await getRoomInfo({ roomName });
    if (res) {
      console.error('仓库名称已存在', { roomName });
      ctx.app.emit('error', roomExisted, ctx);
      return;
    }
  } catch (err) {
    console.error('获取仓库信息错误', { roomName });
    ctx.app.emit('error', roomAddedError, ctx);
    return;
  }

  await next();
};

module.exports = {
  roomValidator,
  checkRoomExist,
  checkIdExist,
};
