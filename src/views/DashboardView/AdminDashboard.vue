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
    getCookie(name) {
      const cookies = document.cookie.split(';');
      const foundCookie = cookies.find((cookie) => {
        const [cookieName] = cookie.trim().split('=');
        return cookieName === name;
      });
      if (foundCookie) {
        const [, cookieValue] = foundCookie.trim().split('=');
        return decodeURIComponent(cookieValue);
      }
      return null;
    },
  },
  created() {
    const token = this.getCookie('hexToken');
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
        let errorMessage = '身份驗證失敗，請重新登入';
        if (error.response?.status === 401) {
          errorMessage = '登入已過期，請重新登入';
        } else if (error.response?.status >= 500) {
          errorMessage = '系統暫時無法使用，請稍後再試';
        }

        this.pushMessage({
          style: 'danger',
          title: '錯誤訊息',
          content: errorMessage,
        });
        this.$router.push('/login');
      });
  },
};
</script>
