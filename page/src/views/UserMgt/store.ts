import { defineStore } from 'pinia';
import axios from 'axios';
import displayMsg from '../../library/displayMsg';

export interface QueryUserParmas {
  start: number;
  limit: number;
  userName: string;
}

export interface UserParams {
  account: string;
  userName: string;
  password?: string;
  isAdmin: number;
}

export default defineStore('UserMgt', {
  state: () => {
    return {
      userList: [],
      total: 0,
    };
  },

  actions: {
    async getUserList(params: QueryUserParmas) {
      const { data } = await axios.post('http://localhost:8080/user/getList', {
        ...params,
        start: (params.start - 1) * params.limit,
      });
      this.userList = data.result.list;
      this.total = data.result.total;
    },

    async addUser(params: UserParams) {
      const { data } = await axios.post('http://localhost:8080/user/add', params);
      displayMsg(data.code, data.message);
    },

    async updateUser(params: UserParams) {
      const { data } = await axios.post('http://localhost:8080/user/update', params);
      displayMsg(data.code, data.message);
    },

    async deleteUser(account: string) {
      const { data } = await axios.post('http://localhost:8080/user/delete', { account });
      console.log(data);
      displayMsg(data.code, data.message);
    },
  },
});