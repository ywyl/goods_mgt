const { getCountsInfoById } = require('../service/CountsService');
const { countsFormatError, countsExisted, countsNotExisted, countsGetError } = require('../constError/countsErrorType');

const countsValidator = async (ctx, next) => {
  const { roomId, goodsId } = ctx.request.body;

  if (!roomId || !goodsId) {
    console.error('仓库名称为空', ctx.request.body);
    ctx.app.emit('error', countsFormatError, ctx);
    return;
  }

  await next();
};

const checkCountsExist = async (ctx, next) => {
  const { roomId, goodsId } = ctx.request.body;

  try {
    const res = await getCountsInfoById(roomId, goodsId);
    if (!res) {
      console.error('数据不存在', { roomId, goodsId });
      ctx.app.emit('error', countsNotExisted, ctx);
      return;
    }
  } catch (err) {
    console.error('信息获取错误', { roomId, goodsId });
    ctx.app.emit('error', countsGetError, ctx);
    return;
  }

  await next();
};

const checkCountsNotExist = async (ctx, next) => {
  const { roomId, goodsId } = ctx.request.body;
  try {
    const res = await getCountsInfoById(roomId, goodsId);
    if (res) {
      console.error('物资条目已存在', { roomId, goodsId });
      ctx.app.emit('error', countsExisted, ctx);
      return;
    }
  } catch (err) {
    console.error('信息获取错误', { roomId, goodsId });
    ctx.app.emit('error', countsGetError, ctx);
    return;
  }

  await next();
};

module.exports = {
  countsValidator,
  checkCountsExist,
  checkCountsNotExist,
};
