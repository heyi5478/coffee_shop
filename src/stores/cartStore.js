import { defineStore } from 'pinia';

import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';
import useLoadingStore from './loadingStore';
// import toastMessage from './toastMessage';

// console.log(import.meta.env.VITE_URL, import.meta.env.VITE_PATH);
const { VITE_URL, VITE_PATH } = import.meta.env;
const { loadingState } = useLoadingStore();

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
          loadingState(false);
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
          // 在此處調用 pushMessage 方法
          // console.log(toastMessage.pushMessage);
          // toastMessage.pushMessage({
          //  style: 'success',
          //  title: 'Success',
          //  ontent: 'Product added to cart successfully!' });
          // console.log(res);
          this.getCart();
        });
    },
    // 更新購物車產品數量
    updateCartItem(item) {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${item.id}`;
      const cart = {
        product_id: item.product_id,
        qty: item.qty,
      };

      if (item.qty === 0) {
        this.deleteCartItem(item.id);
      } else if (item.qty >= 100) {
        cart.qty = 100;
        Swal.fire({
          position: 'center',
          icon: 'warning',
          title: '商品數量不得大於 100 個',
          showConfirmButton: true,
          timer: 2000,
        });
      } else {
        this.loadingItem = item.id;
        axios
          .put(url, { data: cart })
          .then(() => {
            this.getCarts();
            // pushMessage({
            //   style: "success",
            //   title: "產品數量更新成功",
            // });
            this.loadingItem = '';
          })
          .catch(() => {
            // pushMessage({
            //   style: "danger",
            //   title: "產品數量更新失敗",
            //   content: `${err.response.data.message}`,
            // });
          });
      }
    },
  },
});
