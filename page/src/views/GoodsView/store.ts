import { defineStore } from 'pinia';
import axios from 'axios';
import displayMsg from '../../library/displayMsg';
import type { RoomParams } from '../RoomMgt/store';
import type { GoodsParams } from '../GoodsMgt/store';
import type { Options } from '../interface';

export interface QueryCountsParmas {
  start: number;
  limit: number;
  roomId: string;
  goodsId: string;
}

export interface CountsParams {
  roomId?: string;
  goodsId?: string;
  operation?: number;
  target?: string;
  amount?: number;
  counts?: number;
}

export default defineStore('GoodsCountsMgt', {
  state: () => {
    return {
      goodsCounsList: [],
      total: 0,
      roomOptions: new Array<Options>(),
      goodsOptions: new Array<Options>(),
      records: [],
    };
  },

  actions: {
    async getGoodsCountsList(params: QueryCountsParmas) {
      const { data } = await axios.post('http://localhost:8080/counts/getList', {
        ...params,
        start: (params.start - 1) * params.limit,
      });
      this.goodsCounsList = data.result.list;
      this.total = data.result.total;
    },

    async getAllRooms() {
      const { data } = await axios.post('http://localhost:8080/room/getList', {
        start: 0,
        limit: 100,
        roomName: '',
      });
      this.roomOptions = [{ label: '全部', value: '' }].concat(
        data.result.list.map(({ id, roomName }: RoomParams) => ({
          label: roomName,
          value: id,
        }))
      );
    },

    async getAllGoods() {
      const { data } = await axios.post('http://localhost:8080/goods/getList', {
        start: 0,
        limit: 100,
        goodsName: '',
      });
      this.goodsOptions = [{ label: '全部', value: '' }].concat(
        data.result.list.map(({ id, goodsName }: GoodsParams) => ({
          label: goodsName,
          value: id,
        }))
      );
    },

    async addCounts(params: CountsParams) {
      const { data } = await axios.post('http://localhost:8080/counts/add', {
        ...params,
        operation: 0,
        target: params.roomId,
        amount: 0,
      });
      displayMsg(data.code, data.message);
    },

    async editCounts(params: CountsParams) {
      const { data } = await axios.post('http://localhost:8080/counts/update', params);
      displayMsg(data.code, data.message);
    },

    async deleteCounts({ roomId, goodsId }: CountsParams) {
      const { data } = await axios.post('http://localhost:8080/counts/delete', {
        roomId,
        goodsId,
      });
      displayMsg(data.code, data.message);
    },

    async queryRecords({ roomId, goodsId }: CountsParams) {
      const { data } = await axios.post('http://localhost:8080/records/getRecords', {
        roomId,
        goodsId,
      });
      this.records = data.result;
    }
  },
});
