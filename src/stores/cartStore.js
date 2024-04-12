import { defineStore } from 'pinia';

import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';
// import useLoadingStore from './loadingStore';
// import toastMessage from './toastMessage';

// console.log(import.meta.env.VITE_URL, import.meta.env.VITE_PATH);
const { VITE_URL, VITE_PATH } = import.meta.env;
// const { loadingState } = useLoadingStore();

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
          // loadingState(false);
          // console.log('pinia cart', this.carts);
        });
    },
    addToCart(id, num) {
      const data = {
        product_id: id,
        qty: num,
      };

      axios.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data })
        .then(() => {
          Swal.fire({
            position: 'center',
            icon: 'success',
            title: '已加入購物車',
            showConfirmButton: false,
            timer: 1500,
          });
          this.getCart();
        });
    },
    // 更新購物車產品數量
  },
});
