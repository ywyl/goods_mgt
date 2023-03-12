const Room = require('../model/RoomModel');

class RoomService {
  async getRoomList() {
    const res = await Room.findAll();
    return res;
  }

  async createRoom(roomName, address) {
    const { dataValues } = await Room.create({
      room_name: roomName,
      address,
    });
    return dataValues;
  }

  async getRoomInfo({ id, roomName }) {
    const whereOpt = {};

    id && Object.assign(whereOpt, { id });
    roomName && Object.assign(whereOpt, { room_name: roomName });

    const res = await Room.findOne({
      attributes: ['id', 'room_name'],
      where: whereOpt,
    });

    return res ? res.dataValues : '';
  }
}

module.exports = new RoomService();
