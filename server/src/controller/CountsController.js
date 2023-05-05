const { getCountsList, createCounts, updateCounts, deleteCounts } = require('../service/CountsService');

const { countsAddedError, countsUpdatedError, countsDeletedError } = require('../constError/countsErrorType');

class CountsController {
  async getList(ctx, next) {
    const res = await getCountsList(ctx.request.body);

    ctx.body = {
      code: 0,
      message: '物资数量列表获取成功',
      result: res
    };
  }

  async addCounts(ctx, next) {
    const { roomId, goodsId, counts } = ctx.request.body;
    console.log(roomId, goodsId, counts);

    try {
      const res = await createCounts(roomId, goodsId, counts);

      ctx.body = {
        code: 0,
        message: '物资条目添加成功',
        result: {
          roomId: res.roomId,
          goodsId: res.goodsId,
          counts: res.counts,
        },
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', countsAddedError, ctx);
    }
  }

  async updateCounts(ctx, next) {
    const { roomId, goodsId, counts } = ctx.request.body;

    try {
      const res = await updateCounts(roomId, goodsId, counts);

      ctx.body = {
        code: 0,
        message: '物资数量更新成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', countsUpdatedError, ctx);
    }
  }

  async deleteCounts(ctx, next) {
    const { roomId, goodsId } = ctx.request.body;

    try {
      const res = await deleteCounts(roomId, goodsId);

      ctx.body = {
        code: 0,
        message: '物资条目删除成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', countsDeletedError, ctx);
    }
  }
}

module.exports = new CountsController();
