<!-- eslint-disable max-len -->
<template>
<header class="position-relative">
  <div class="container d-flex flex-column">
    <nav class="navbar navbar-expand-lg navbar-light">
      <RouterLink class="navbar-brand" to="/"><img src="../assets/images/logo.png" style="height: 75px;" alt="logo"></RouterLink>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
        <div class="navbar-nav">
          <RouterLink class="nav-item nav-link me-4 active" to="/admin/products">產品列表 <span class="sr-only">(current)</span></RouterLink>
          <RouterLink class="nav-item nav-link me-4" to="/admin/orders">訂單</RouterLink>
          <RouterLink @click.prevent="logout" class="nav-item nav-link me-4" to="/login">登出</RouterLink>
        </div>
      </div>
    </nav>
  </div>
</header>
</template>

<script>
import { mapActions } from 'pinia';
import toastMessage from '@/stores/toastMessage';

const { VITE_URL } = import.meta.env;

export default {
  methods: {
    ...mapActions(toastMessage, ['pushMessage']),
    logout() {
      const api = `${VITE_URL}/logout`;
      this.$http.post(api)
        .then((response) => {
          this.pushMessage({
            style: 'success',
            title: '登出狀態',
            content: response.data.message,
          });
          this.$router.push('/login');
        }).catch((error) => {
          this.pushMessage({
            style: 'danger',
            title: '登出狀態',
            content: error.response.data.message,
          });
        });
    },
  },
};
</script>
