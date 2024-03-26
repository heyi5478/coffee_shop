<!-- eslint-disable import/extensions -->
<!-- eslint-disable comma-dangle -->
<!-- eslint-disable no-trailing-spaces -->
<!-- eslint-disable max-len -->
<template>
<!-- preloader -->
<PreloaderComponent></PreloaderComponent>

<NavbarComponent></NavbarComponent>

<RouterView></RouterView>

<footerComponent></footerComponent>

</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import PreloaderComponent from '../components/PreloaderComponent.vue';
import footerComponent from '../components/footerComponent.vue';

export default {
  components: {
    NavbarComponent,
    footerComponent,
    PreloaderComponent,
  },
};
</script>
