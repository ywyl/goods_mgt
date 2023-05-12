const Records = require('../model/RecordsModel');

const RECORDS_LIMIT = 10;

class RecordsService {
  async queryRecords(roomId, goodsId) {
    const res = await Records.findAll({
      where: {
        roomId,
        goodsId,
      },
      order: [['recordTime', 'DESC']],
    });
    return res;
  }

  async updateRecords(roomId, goodsId, operation, target, amount) {
    // 首先查找记录条数
    const { rows, counts } = await Records.findAndCountAll({
      where: {
        roomId,
        goodsId,
      },
      order: [['recordTime', 'DESC']],
    });

    // 如果超出记录限制条数(10)则进行删除
    // 如果等于限制条数的记录，也需要先删除1条
    if (counts >= RECORDS_LIMIT) {
      const delRecordsIds = rows.slice(RECORDS_LIMIT - 1).map(({ id }) => id);
      const res = await Counts.destroy({
        where: {
          id: delRecordsIds,
        },
      });
      console.log(res);
    }

    // 此时插入最新的记录
    const recordTime = new Date().getTime();
    const { dataValues } = await Records.create({
      roomId,
      goodsId,
      operation,
      target,
      amount,
      recordTime,
    });
    return dataValues;
  }
}

module.exports = new RecordsService();
