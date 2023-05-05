const { Op } = require('sequelize');
const Goods = require('../model/GoodsModel');

class GoodsService {
  async getGoodsList(params) {
    const { rows, count } = await Goods.findAndCountAll({
      attributes: ['id', 'goodsName', 'description', 'type', 'updateTime'],
      offset: params.start,
      limit: params.limit,
      order: [['updateTime', 'DESC']],
      where: {
        goodsName: {
          [Op.like]: `%${params.goodsName}%`,
        },
      },
    });
    return { list: rows, total: count };
  }

  async createGoods(goodsName, description, type) {
    const createTime = new Date().getTime();
    const updateTime = new Date().getTime();
    const { dataValues } = await Goods.create({
      goodsName,
      description,
      type,
      createTime,
      updateTime,
    });
    return dataValues;
  }

  async updateGoods(id, goodsName, description, type) {
    const updateTime = new Date().getTime();
    const res = await Goods.update(
      { goodsName, description, type, updateTime },
      {
        where: {
          id,
        },
      }
    );
    return res;
  }

  async deleteGoods(id) {
    const res = await Goods.destroy({
      where: {
        id,
      },
    });
    return res;
  }

  async getGoodsInfo({ id, goodsName }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    goodsName && Object.assign(whereOpt, { goodsName });

    const res = await Room.findOne({
      attributes: ['id', 'goodsName'],
      where: whereOpt,
    });

    return res ? res.dataValues : '';
  }

  async getGoodsInfoById(id) {
    const res = await Room.findOne({
      attributes: ['id', 'goodsName'],
      where: { id },
    });

    return res ? res.dataValues : '';
  }
}

module.exports = new GoodsService();
