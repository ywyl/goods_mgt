import { defineStore } from 'pinia';
import axios from 'axios';
import displayMsg from '../../library/displayMsg';

export interface QueryGoodsParmas {
  start: number;
  limit: number;
  goodsName: string;
}

export interface GoodsParams {
  id?: string;
  goodsName: string;
  description: string;
  type: number;
}

export default defineStore('GoodsMgt', {
  state: () => {
    return {
      goodsList: [],
      total: 0,
    };
  },

  actions: {
    async getGoodsList(params: QueryGoodsParmas) {
      const { data } = await axios.post('http://localhost:8080/goods/getList', {
        ...params,
        start: (params.start - 1) * params.limit,
      });
      this.goodsList = data.result.list;
      this.total = data.result.total;
    },

    async addGoods(params: GoodsParams) {
      const { data } = await axios.post('http://localhost:8080/goods/add', params);
      displayMsg(data.code, data.message);
    },

    async updateGoods(params: GoodsParams) {
      const { data } = await axios.post('http://localhost:8080/goods/update', params);
      displayMsg(data.code, data.message);
    },

    async deleteGoods(id: string) {
      const { data } = await axios.post('http://localhost:8080/goods/delete', { id });
      displayMsg(data.code, data.message);
    },
  },
});
