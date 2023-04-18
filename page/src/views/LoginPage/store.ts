import { defineStore } from 'pinia';
import axios from 'axios';

export interface LoginParams {
  account: string;
  password: string;
}

export default defineStore('login', {
  state: () => {
    return {
      data: '',
    };
  },

  actions: {
    async login(params: LoginParams) {
      const { data } = await axios.post('http://localhost:8080/user/login', params);
      this.data = data;
    },
  },
});
