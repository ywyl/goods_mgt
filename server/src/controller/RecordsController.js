const { queryRecordsBySql, updateRecords } = require('../service/RecordsService');
const { recordsQueryError, recordsUpdateError } = require('../constError/recordsErrorType');

class RecordsController {
  async queryCountsRecords(ctx, next) {
    const { roomId, goodsId } = ctx.request.body;

    try {
      const res = await queryRecordsBySql(roomId, goodsId);

      ctx.body = {
        code: 0,
        message: '记录查询成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', recordsQueryError, ctx);
    }
  }
}

module.exports = new RecordsController();
