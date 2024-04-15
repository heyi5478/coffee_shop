import { defineStore } from 'pinia';

import axios from 'axios';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';
// import useLoadingStore from './loadingStore';
import useToastMessageStore from './toastMessageStore';

const { VITE_URL, VITE_PATH } = import.meta.env;
const { pushMessages } = useToastMessageStore();

export default defineStore('checkoutStore', {
  state: () => ({
    cart: {},
    final_total: 0,
    total: 0,
    status: {
      loadingItem: '',
    },
    isLoading: false,
  }),
  actions: {
    // 取得購物車資料
    getCarts() {
      axios.get(`${VITE_URL}/api/${VITE_PATH}/cart`)
        .then((res) => {
        //   this.cart = res.data.data;
          this.cart = res.data.data;
          this.final_total = res.data.data.final_total;
          this.total = res.data.data.total;
          console.log('pinia cart', this.cart);
        }).catch((error) => {
          this.isLoading = false;
          pushMessages({
            style: 'danger',
            title: '取得購物車資訊',
            content: error.response.data.message,
          });
        });
    },

    // 清空購物車
    deleteAllCarts() {
      this.isLoading = true;
      const url = `${VITE_URL}/api/${VITE_PATH}/carts`;
      axios.delete(url).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '購物車已清空',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getCarts();
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
        pushMessages({
          style: 'danger',
          title: '清除購物車',
          content: error.response.data.message,
        });
      });
    },

    // 刪除購物車單一產品
    removeCartItem(id) {
      this.status.loadingItem = id;
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${id}`;
      this.isLoading = true;
      axios.delete(url).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '移除購物車品項',
          showConfirmButton: false,
          timer: 1500,
        });
        this.status.loadingItem = '';
        this.isLoading = false;
        this.getCarts();
      }).catch((error) => {
        this.isLoading = false;
        pushMessages({
          style: 'danger',
          title: '移除購物車品項',
          content: error.response.data.message,
        });
      });
    },
    // 更新購物車產品數量
    updateCart(data) {
      this.isLoading = true;
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${data.id}`;
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };

      if (data.qty === 0) {
        this.removeCartItem(data.id);
      } else if (data.qty >= 100) {
        cart.qty = 100;
        pushMessages({
          style: 'danger',
          title: '數量不可以超過 100',
        });
      } else if (data.qty < 0) {
        cart.qty = 1;
        pushMessages({
          style: 'danger',
          title: '數量不可以小於 1',
        });
      } else {
        axios.put(url, { data: cart }).then((response) => {
          pushMessages({
            style: 'success',
            title: '更新購物車',
            content: response.data.message,
          });
          this.isLoading = false;
          this.getCarts();
        }).catch((error) => {
          this.isLoading = false;
          pushMessages({
            style: 'danger',
            title: '更新購物車',
            content: error.response.data.message,
          });
        });
      }
    },
  },
});
