const { getCountsList, createCounts, updateCounts, deleteCounts } = require('../service/CountsService');
const { updateRecords } = require('../service/RecordsService');

const { countsAddedError, countsUpdatedError, countsDeletedError } = require('../constError/countsErrorType');

const updateCountsRecords = async (roomId, goodsId, operation, target, amount) => {
    // 更新本仓库的记录
    await updateRecords(roomId, goodsId, operation, target, amount);

    // 如果不是添加和消耗，还需要添加相关仓库的记录
    if (target !== roomId) {
      const operationEffect = operation ? 0 : 1;
      await updateRecords(target, goodsId, operationEffect, roomId, amount);
    }
}

class CountsController {
  async getList(ctx, next) {
    const res = await getCountsList(ctx.request.body);

    ctx.body = {
      code: 0,
      message: '物资数量列表获取成功',
      result: res,
    };
  }

  async addCounts(ctx, next) {
    const { roomId, goodsId, operation, target, amount, counts } = ctx.request.body;

    try {
      const res = await createCounts(roomId, goodsId, counts);
      updateCountsRecords(roomId, goodsId, operation, target, amount);

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
    const { roomId, goodsId, operation, target, amount, counts } = ctx.request.body;

    try {
      const res = await updateCounts(roomId, goodsId, counts);
      updateCountsRecords(roomId, goodsId, operation, target, amount);

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
