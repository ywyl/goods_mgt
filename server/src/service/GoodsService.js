const { Op } = require('sequelize');
const Goods = require('../model/GoodsModel');

class GoodsService {
  async getGoodsList(params) {
    const list = await Goods.findAll({
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
    const total = await Goods.count();
    return { list, total };
  }

  async createGoods(goodsName, description, type) {
    const updateTime = new Date().getTime();
    const { dataValues } = await Goods.create({
      goodsName,
      description,
      type,
      updateTime,
    });
    return dataValues;
  }

  async updateGoods(id, goodsName, description, type) {
    const res = await Goods.update(
      { goodsName, description, type },
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
