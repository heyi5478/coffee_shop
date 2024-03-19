<!-- eslint-disable max-len -->
<template>
<div class="position-relative">
      <div class="container d-flex flex-column">
        <nav class="navbar navbar-expand-lg navbar-light">
          <RouterLink class="navbar-brand" to="/"><img style="height: 75px;" src="../assets/images/logo.png" alt=""></RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <!-- <RouterLink class="nav-item nav-link me-4 active" to="/">首頁 <span class="sr-only">(current)</span></RouterLink> -->
              <RouterLink class="nav-item nav-link me-4" to="/products">線上商店</RouterLink>
              <RouterLink class="nav-item nav-link me-4" to="/about">關於</RouterLink>
              <RouterLink class="btn position-relative" style="width: 44px;" to="/checkout">
                <i class="bi bi-cart"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ this.carts?.length }}
                    <span class="visually-hidden">unread messages</span>
                </span>
            </RouterLink>
            </div>
          </div>
        </nav>
      </div>
    </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import cartStore from '../stores/cartStore';

export default {
  computed: {
    ...mapState(cartStore, ['carts']),
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
  },
  mounted() {
    this.getCart();
  },
};
</script>
