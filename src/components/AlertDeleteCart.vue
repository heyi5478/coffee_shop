<template>
    <div class="modal" ref="modal" data-focus="false">
      <div class="modal-dialog modal-dialog-centered">
        <div class="modal-content rounded-1" ref="modalContent">
          <div class="modal-header">
            <h5 v-if="deleteState === 'all'" class="modal-title">清空購物車</h5>
            <h5 v-else class="modal-title">移除商品</h5>
            <button type="button" class="btn-close" @click="closeModal"></button>
          </div>
          <div class="modal-body">
            <p v-if="deleteState === 'all'">請確認是否清空購物車商品？</p>
            <p v-else>
              請確認是否移除
              <span class="text-secondary">{{ cartItem?.product?.title }}</span>
              ？
            </p>
          </div>
          <div class="modal-footer">
            <button
              type="button"
              class="btn btn-primary rounded-1"
              @click="closeModal"
            >
              取消
            </button>
            <button
              type="button"
              class="btn btn-outline-secondary rounded-1"
              @click="deleteItems"
            >
              確認刪除
            </button>
          </div>
        </div>
      </div>
      <div class="modal-mask" @click="clickMaskAlert"></div>
    </div>
  </template>

<script>
import { mapActions } from 'pinia';
import toastMessage from '@/stores/toastMessage';
// eslint-disable-next-line import/no-extraneous-dependencies
import Swal from 'sweetalert2';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: ['deleteState', 'cartItem'],
  data() {
    return {
      modal: {},
      tempCartItem: {
        product: {},
      },
      cart: {},
      isLoading: false,
    };
  },
  methods: {
    ...mapActions(toastMessage, ['pushMessage']),

    // 取得購物車資料
    getCart() {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.cart = response.data.data;
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
        this.pushMessage({
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
      this.$http.delete(url).then(() => {
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '購物車已清空',
          showConfirmButton: false,
          timer: 1500,
        });
        this.getCart();
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'danger',
          title: '清除購物車',
          content: error.response.data.message,
        });
      });
    },

    // 刪除購物車單一產品
    removeCartItem(id) {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(url).then(() => {
        this.getCart();
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: '已刪除',
          showConfirmButton: false,
          allowOutsideClick: false,
          timer: 1500,
        });
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'danger',
          title: '移除購物車品項',
          content: error.response.data.message,
        });
      });
    },

    openModal() {
      this.modal.classList.add('d-block');
      this.$refs.modalContent.classList.add('animation-from-top');
    },

    closeModal() {
      this.modal.classList.remove('d-block');
    },

    // 刪除購物車商品
    deleteItems() {
      if (this.deleteState === 'all') {
        this.deleteAllCarts();
        this.closeModal();
      } else if (this.deleteState === 'item') {
        this.removeCartItem(this.cartItem.id);
        this.closeModal();
      }
    },

    // 刪除商品時的提示動畫
    clickMaskAlert() {
      const { modalContent } = this.$refs;
      if (modalContent.classList.contains('animation-from-top')) {
        modalContent.classList.remove('animation-from-top');
      }
      modalContent.classList.add('animation-zoom');
      setTimeout(() => {
        modalContent.classList.remove('animation-zoom');
      }, 500);
    },
  },
  mounted() {
    this.modal = this.$refs.modal;
    this.tempCartItem = { ...this.cartItem };
  },
};
</script>

  <style lang="scss" scoped>
  .modal {
    &-mask {
      position: absolute;
      left: 0;
      top: 0;
      bottom: 0;
      right: 0;
      background-color: rgba(0, 0, 0, 0.2);
      z-index: -1;
    }
  }
  </style>
