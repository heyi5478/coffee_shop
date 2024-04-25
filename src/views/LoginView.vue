<template>
  <NavbarComponent></NavbarComponent>

    <!-- banner -->
  <div class="position-relative mb-7 mb-md-9">
    <img class="d-lg-none d-block w-100 object-fit-cover " style="height: 30vh;"
     src="@/assets/images/banner2.png" alt="banner">
    <img class="d-lg-block d-none w-100 object-fit-cover " style="height: 80vh;"
     src="@/assets/images/banner2.png" alt="banner">
    <h2
      class="position-absolute translate-middle top-50
       start-50 h2 fw-bold text-white pageBanner-text"
    >
    登入
    </h2>
  </div>
  <div class="container mt-5 mb-5 text-center">
    <VueLoading :active="isLoading" :z-index="1060" />
    <ToastMessages />
    <form class="row justify-content-center" @submit.prevent="signIn">
      <div class="col-md-6">
        <h1 class="h3 mb-3 font-weight-normal">管理員登入</h1>
        <div class="mb-2">
          <label for="inputEmail" class="sr-only">Email address</label>
          <input
            type="email"
            id="inputEmail"
            class="form-control"
            placeholder="Email address"
            v-model="user.username"
            required
            autofocus
          />
        </div>
        <div class="mb-2">
          <label for="inputPassword" class="sr-only">Password</label>
          <input
            type="password"
            id="inputPassword"
            class="form-control"
            v-model="user.password"
            placeholder="Password"
            required
          />
        </div>
        <div class="text-center mt-4">
          <button class="btn btn-lg btn-primary btn-block" type="submit">
            登入
          </button>
        </div>
      </div>
    </form>
  </div>

    <FooterComponent></FooterComponent>

</template>

<script>
import { mapActions } from 'pinia';
import toastMessage from '@/stores/toastMessage';

import ToastMessages from '../components/ToastMessages.vue';
import NavbarComponent from '../components/NavbarComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

const { VITE_URL } = import.meta.env;

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    ToastMessages,
  },
  data() {
    return {
      isLoading: false,
      user: {},
    };
  },
  methods: {
    ...mapActions(toastMessage, ['pushMessage']),
    signIn() {
      const api = `${VITE_URL}/admin/signin`;
      this.isLoading = true;
      this.$http.post(api, this.user).then((response) => {
        const { token, expired } = response.data;
        document.cookie = `hexToken=${token};expires=${new Date(expired)};`;
        this.isLoading = false;
        this.$router.push('/admin/products');
        this.pushMessage({
          title: '登入成功',
        });
      }).catch((error) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'danger',
          title: '登入失敗',
          content: error.response.data.message,
        });
      });
    },
  },
};
</script>
