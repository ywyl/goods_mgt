import { defineStore } from 'pinia';
import axios from 'axios';
import displayMsg from '../../library/displayMsg';

export interface QueryRoomParmas {
  start: number;
  limit: number;
  roomName: string;
}

export interface RoomParams {
  id?: string;
  roomName: string;
  address: string;
}

export default defineStore('RoomMgt', {
  state: () => {
    return {
      roomList: [],
      total: 0,
    };
  },

  actions: {
    async getRoomList(params: QueryRoomParmas) {
      const { data } = await axios.post('http://localhost:8080/room/getList', {
        ...params,
        start: (params.start - 1) * params.limit,
      });
      this.roomList = data.result.list;
      this.total = data.result.total;
    },

    async addRoom(params: RoomParams) {
      const { data } = await axios.post('http://localhost:8080/room/add', params);
      displayMsg(data.code, data.message);
    },

    async updateRoom(params: RoomParams) {
      const { data } = await axios.post('http://localhost:8080/room/update', params);
      displayMsg(data.code, data.message);
    },

    async deleteRoom(id: string) {
      const { data } = await axios.post('http://localhost:8080/room/delete', { id });
      displayMsg(data.code, data.message);
    },
  },
});
