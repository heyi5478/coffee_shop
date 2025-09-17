<template>
<header class="header fixed-top"
 :class="[{ 'bg-light': !isScrolled,'bg-opacity-50': !isScrolled },
  { 'bg-opacity-100': isScrolled, 'bg-primary': isScrolled, 'shadow-sm': isScrolled }]">
  <div class="container d-flex flex-column">
    <nav class="navbar navbar-expand-lg navbar-light">
      <RouterLink class="navbar-brand" to="/">
        <img style="height: 75px;" src="../assets/images/logo.png" alt="logo">
      </RouterLink>
      <button class="navbar-toggler" type="button" @click="toggleCollapse">
          <span class="navbar-toggler-icon"></span>
      </button>
      <div class="collapse navbar-collapse justify-content-end"
       :class="{ 'show': isCollapsed }" id="navbarNavAltMarkup">
        <div class="navbar-nav">
              <!-- <RouterLink class="nav-item nav-link me-4 active" to="/">
                首頁
                 <span class="sr-only">(current)</span>
                </RouterLink> -->
          <RouterLink class="nav-item nav-link me-4"
           to="/products" @click="closeMobileMenu">線上商店</RouterLink>
          <RouterLink class="nav-item nav-link me-4"
           to="/about" @click="closeMobileMenu">關於</RouterLink>
          <RouterLink class="btn position-relative"
           style="width: 44px;" to="/checkout" @click="closeMobileMenu">
            <i class="bi bi-cart"></i>
            <span class="position-absolute top-0
             start-100 translate-middle badge rounded-pill bg-danger">
              {{ this.carts?.length }}
              <span class="visually-hidden">unread messages</span>
            </span>
          </RouterLink>
        </div>
      </div>
    </nav>
  </div>
</header>
</template>

<script>
import { mapActions, mapState } from 'pinia';

import cartStore from '../stores/cartStore';

export default {
  data() {
    return {
      isScrolled: false,
      lastScrollY: 0,
      ticking: false,
      isCollapsed: false,
    };
  },
  computed: {
    ...mapState(cartStore, ['carts']),
  },
  methods: {
    ...mapActions(cartStore, ['getCart']),
    handleScroll() {
      this.lastScrollY = window.scrollY;
      if (!this.ticking) {
        window.requestAnimationFrame(() => {
          this.isScrolled = this.lastScrollY > 0;
          this.ticking = false;
        });
        this.ticking = true;
      }
    },
    toggleCollapse() {
      this.isCollapsed = !this.isCollapsed;
    },
    closeMobileMenu() {
      this.isCollapsed = false;
    },
  },
  mounted() {
    this.getCart();
    window.addEventListener('scroll', this.handleScroll);
  },
  beforeUnmount() {
    window.removeEventListener('scroll', this.handleScroll);
  },
};
</script>

<style scoped>
.header {
  transition: background-color .5s ease;
}
</style>
