const { queryRecords, updateRecords } = require('../service/RecordsService');

class RecordsController {
  async queryCountsRecords(ctx, next) {
    const { roomId, goodsId } = ctx.request.body;
    const res = await queryRecords(roomId, goodsId);

    ctx.body = {
      code: 0,
      message: '记录查询成功',
      result: res,
    };
  }

  async updateCountsRecords(roomId, goodsId, operation, target, amount) {
    await updateRecords(roomId, goodsId, operation, target, amount);

    if (target !== roomId) {
      const operationEffect = operation ? 0 : 1;
      await updateRecords(target, goodsId, operationEffect, roomId, amount);
    }
  }
}

module.exports = new RecordsController();
