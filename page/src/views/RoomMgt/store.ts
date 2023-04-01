import { defineStore } from 'pinia';
import axios from 'axios';
import displayMsg from '../../library/displayMsg';

export interface ListParams {
  start: number;
  limit: number;
  roomName: string;
}

export interface RoomParams {
  roomName: string;
  address: string;
}

export default defineStore('RoomMgt', {
  state: () => {
    return {
      roomList: [],
    };
  },

  actions: {
    async getRoomList() {
      const { data } = await axios.get('http://localhost:8080/room');
      this.roomList = data.result;
    },

    async addRoom(params: RoomParams) {
      const { data } = await axios.post('http://localhost:8080/room/add', params);
      console.log(data);
      displayMsg(data.code, data.message);
    },
  },
});
