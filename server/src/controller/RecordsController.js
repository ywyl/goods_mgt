const { updateRecords } = require('../service/RecordsService');

class RecordsController {
  async updateCountsRecords(roomId, goodsId, operation, target, amount) {
    await updateRecords(roomId, goodsId, operation, target, amount);

    if (target !== roomId) {
      const operationEffect = operation ? 0 : 1;
      await updateRecords(target, goodsId, operationEffect, roomId, amount);
    }
  }
}

module.exports = new RecordsController();
