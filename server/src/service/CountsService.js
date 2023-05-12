const { Op } = require('sequelize');
const Counts = require('../model/CountsModel');
const Goods = require('../model/GoodsModel');
const Room = require('../model/RoomModel');

class CountsService {
  async getCountsList(params) {
    const { rows, count } = await Counts.findAndCountAll({
      attributes: ['roomId', 'goodsId', 'counts', 'updateTime'],
      offset: params.start,
      limit: params.limit,
      order: [['updateTime', 'DESC']],
      where: {
        roomId: {
          [Op.like]: `%${params.roomId}%`,
        },
        goodsId: {
          [Op.like]: `%${params.goodsId}%`,
        },
      },
      include: [
        {
          attributes: ['goodsName'],
          model: Goods,
        },
        {
          attributes: ['roomName'],
          model: Room,
        },
      ],
    });
    return { list: rows, total: count };
  }

  async createCounts(roomId, goodsId, counts) {
    const createTime = new Date().getTime();
    const updateTime = new Date().getTime();
    const { dataValues } = await Counts.create({
      roomId,
      goodsId,
      counts,
      createTime,
      updateTime,
    });
    return dataValues;
  }

  async updateCounts(roomId, goodsId, counts) {
    const updateTime = new Date().getTime();
    const res = await Counts.update(
      { counts, updateTime },
      {
        where: {
          roomId,
          goodsId,
        },
      }
    );
    return res;
  }

  async deleteCounts(roomId, goodsId) {
    const res = await Counts.destroy({
      where: {
        roomId,
        goodsId,
      },
    });
    return res;
  }

  async getCountsInfoById(roomId, goodsId) {
    const res = await Counts.findOne({
      attributes: ['roomId', 'goodsId', 'counts'],
      where: { roomId, goodsId },
    });

    return res ? res.dataValues : '';
  }
}

module.exports = new CountsService();
