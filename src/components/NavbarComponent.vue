<!-- eslint-disable max-len -->
<template>
<div class="position-relative">
      <div class="position-absolute" style="top:0; bottom:0; left:0; right:0; background-image: url(https://images.unsplash.com/photo-1480399129128-2066acb5009e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1950&q=80);
      background-position: center center; opacity: 0.1;"></div>
      <div class="container d-flex flex-column" style="min-height: 100vh;">
        <nav class="navbar navbar-expand-lg navbar-light">
          <RouterLink class="navbar-brand" to="/">Navbar</RouterLink>
          <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavAltMarkup" aria-controls="navbarNavAltMarkup" aria-expanded="false" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse justify-content-end" id="navbarNavAltMarkup">
            <div class="navbar-nav">
              <RouterLink class="nav-item nav-link me-4 active" to="/">Home <span class="sr-only">(current)</span></RouterLink>
              <RouterLink class="nav-item nav-link me-4" to="/products">Products</RouterLink>
              <RouterLink class="nav-item nav-link me-4" to="/about">About</RouterLink>
              <RouterLink class="btn btn-outline-primary position-relative" to="/">
                <i class="bi bi-cart"></i>
                <span class="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
                    {{ this.carts?.length }}
                    <span class="visually-hidden">unread messages</span>
                </span>
            </RouterLink>
            </div>
          </div>
        </nav>
        <div class="row justify-content-center my-auto">
          <div class="col-md-4 text-center">
            <h2>Lorem ipsum.</h2>
            <p class="text-muted mb-0">Lorem ipsum dolor sit amet, consetetur sadipscing elitr, sed diam nonumy eirmod.</p>
            <button class="btn btn-dark rounded-0 mt-6">Lorem ipsum.</button>
          </div>
        </div>
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
