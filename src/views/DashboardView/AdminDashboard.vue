<template>
    <DNavbarComponent />
    <div class="container-fluid mt-3 position-relative">
      <ToastMessages />
      <h2>歡迎來到管理人介面</h2>
      <RouterView v-if="status" />
    </div>
  </template>

<script>
import { mapActions } from 'pinia';
import toastMessage from '@/stores/toastMessage';

import ToastMessages from '@/components/ToastMessages.vue';
import DNavbarComponent from '@/components/DNavbarComponent.vue';

const { VITE_URL } = import.meta.env;

export default {
  components: { DNavbarComponent, ToastMessages },
  data() {
    return {
      status: false,
    };
  },
  methods: {
    ...mapActions(toastMessage, ['pushMessage']),
  },
  created() {
    const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*=\s*([^;]*).*$)|^.*$/, '$1');
    this.$http.defaults.headers.common.Authorization = `${token}`;
    const api = `${VITE_URL}/api/user/check`;
    this.$http.post(api)
      .then((res) => {
        this.pushMessage({
          style: 'success',
          title: '成功登入',
          content: res.data.message,
        });
        this.status = true;
      }).catch((error) => {
        this.pushMessage({
          style: 'danger',
          title: '錯誤訊息',
          content: error.response.data.message,
        });
        this.$router.push('/login');
      });
  },
};
</script>
