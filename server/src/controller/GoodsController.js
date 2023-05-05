const { getGoodsList, createGoods, updateGoods, deleteGoods } = require('../service/GoodsService');

const { goodsAddedError, goodsUpdatedError, goodsDeletedError } = require('../constError/goodsErrorType');

class GoodsController {
  async getList(ctx, next) {
    const res = await getGoodsList(ctx.request.body);

    ctx.body = {
      code: 0,
      message: '物资列表获取成功',
      result: res
    };
  }

  async addGoods(ctx, next) {
    const { goodsName, description, type } = ctx.request.body;

    try {
      const res = await createGoods(goodsName, description, type);

      ctx.body = {
        code: 0,
        message: '物资添加成功',
        result: {
          id: res.id,
          goodsName: res.goodsName,
          description: res.description,
          type: res.type,
        },
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', goodsAddedError, ctx);
    }
  }

  async updateGoods(ctx, next) {
    const { id, goodsName, description, type } = ctx.request.body;

    try {
      const res = await updateGoods(id, goodsName, description, type);

      ctx.body = {
        code: 0,
        message: '物资修改成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', goodsUpdatedError, ctx);
    }
  }

  async deleteGoods(ctx, next) {
    const { id } = ctx.request.body;

    try {
      const res = await deleteGoods(id);

      ctx.body = {
        code: 0,
        message: '物资删除成功',
        result: res,
      };
    } catch (err) {
      console.error(err);
      ctx.app.emit('error', goodsDeletedError, ctx);
    }
  }
}

module.exports = new GoodsController();
