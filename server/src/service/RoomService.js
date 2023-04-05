const { Op } = require('sequelize');
const Room = require('../model/RoomModel');

class RoomService {
  async getRoomList(params) {
    const list = await Room.findAll({
      attributes: ['id', ['room_name', 'roomName'], 'address'],
      offset: params.start,
      limit: params.limit,
      where: {
        room_name: {
          [Op.like]: `%${params.roomName}%`,
        },
      },
    });
    const total = await Room.count();
    return { list, total };
  }

  async createRoom(roomName, address) {
    const { dataValues } = await Room.create({
      room_name: roomName,
      address,
    });
    return dataValues;
  }

  async updateRoom(id, roomName, address) {
    const res = await Room.update(
      { room_name: roomName, address },
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
    roomName && Object.assign(whereOpt, { room_name: roomName });

    const res = await Room.findOne({
      attributes: ['id', ['room_name', 'roomName']],
      where: whereOpt,
    });

    return res ? res.dataValues : '';
  }

  async getRoomInfoById(id) {
    const res = await Room.findOne({
      attributes: ['id', ['room_name', 'roomName']],
      where: { id },
    });

    return res ? res.dataValues : '';
  }
}

module.exports = new RoomService();
