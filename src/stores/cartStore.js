import { defineStore } from 'pinia';

import axios from 'axios';

// console.log(import.meta.env.VITE_URL, import.meta.env.VITE_PATH);
const { VITE_URL, VITE_PATH } = import.meta.env;

export default defineStore('cartStore', {
  state: () => ({
    carts: [],
    final_total: 0,
    total: 0,
  }),
  actions: {
    getCart() {
      axios.get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
        //   this.cart = res.data.data;
          this.carts = res.data.data.carts;
          this.final_total = res.data.data.final_total;
          this.total = res.data.data.total;
          // console.log('pinia cart', this.carts);
        });
    },
    addToCart(id) {
      const order = {
        product_id: id,
        qty: 1,
      };

      axios.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: order })
        .then(() => {
          // console.log(res);
          this.getCart();
        });
    },
  },
});
