<!-- eslint-disable max-len -->
<template>
<!-- preloader -->
<PreloaderComponent></PreloaderComponent>

<NavbarComponent></NavbarComponent>

<RouterView></RouterView>

<FooterComponent></FooterComponent>

</template>

<script>
import NavbarComponent from '../components/NavbarComponent.vue';
import PreloaderComponent from '../components/PreloaderComponent.vue';
import FooterComponent from '../components/FooterComponent.vue';

export default {
  components: {
    NavbarComponent,
    FooterComponent,
    PreloaderComponent,
  },
};
</script>
