const { Op } = require('sequelize');
const Room = require('../model/RoomModel');

class RoomService {
  async getRoomList(params) {
    const { rows, count } = await Room.findAndCountAll({
      attributes: ['id', 'roomName', 'address', 'updateTime'],
      offset: params.start,
      limit: params.limit,
      order: [['updateTime', 'DESC']],
      where: {
        roomName: {
          [Op.like]: `%${params.roomName}%`,
        },
      },
    });
    return { list: rows, total: count };
  }

  async createRoom(roomName, address) {
    const createTime = new Date().getTime();
    const updateTime = new Date().getTime();
    const { dataValues } = await Room.create({
      roomName,
      address,
      createTime,
      updateTime,
    });
    return dataValues;
  }

  async updateRoom(id, roomName, address) {
    const updateTime = new Date().getTime();
    const res = await Room.update(
      { roomName, address, updateTime },
      {
        where: {
          id,
        },
      }
    );
    return res;
  }

  async deleteRoom(id) {
    const res = await Room.destroy({
      where: {
        id,
      },
    });
    return res;
  }

  async getRoomInfo({ id, roomName }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    roomName && Object.assign(whereOpt, { roomName });

    const res = await Room.findOne({
      attributes: ['id', 'roomName'],
      where: whereOpt,
    });

    return res ? res.dataValues : '';
  }

  async getRoomInfoById(id) {
    console.log(id);
    const res = await Room.findOne({
      attributes: ['id', 'roomName'],
      where: { id },
    });

    return res ? res.dataValues : '';
  }
}

module.exports = new RoomService();
