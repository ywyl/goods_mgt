const { QueryTypes } = require('sequelize');
const Records = require('../model/RecordsModel');
const seq = require('../db/seq');

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

  async queryRecordsBySql(roomId, goodsId) {
    const result = await seq.query(
      "SELECT " + 
        "room_main.room_name AS `operator`, " +
        "room_target.room_name AS `target`, " +
        "goods_records.operation AS `operation`, " +
        "goods_records.amount AS `amount`, " +
        "goods_records.record_time AS `recordTime` " +
      "FROM goods_records " +
        "LEFT JOIN mgt_room AS room_main ON goods_records.room_id = room_main.id " +
        "LEFT JOIN mgt_room AS room_target ON goods_records.target = room_target.id " +
        "LEFT JOIN mgt_goods ON goods_records.goods_id = mgt_goods.id " +
        "WHERE goods_records.room_id = ? " +
        "AND goods_records.goods_id = ?",
        {
          replacements: [roomId, goodsId],
          type: QueryTypes.SELECT
        }
      );
    return result;
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
