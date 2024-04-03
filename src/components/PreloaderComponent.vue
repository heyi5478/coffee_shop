<template>
  <div class="loader-wrap" ref="loaderWrap">
    <div class="preloader">
      <div class="preloader-close" @click="handleClosePreloader">Loading</div>
      <div id="handle-preloader" class="handle-preloader">
        <div class="animation-preloader">
          <div class="spinner"></div>
          <div class="txt-loading">
            <span data-text-preloader="泡" class="letters-loading">
              泡
            </span>
            <span data-text-preloader="咖" class="letters-loading">
              咖
            </span>
            <span data-text-preloader="啡" class="letters-loading">
              啡
            </span>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from 'vue';

export default {
  setup() {
    const loaderWrap = ref(null);

    function handlePreloader() {
      if (loaderWrap.value) {
        setTimeout(() => {
          loaderWrap.value.style.display = 'none';
        }, 1000);
      }
    }

    function handleClosePreloader() {
      if (loaderWrap.value) {
        setTimeout(() => {
          loaderWrap.value.style.display = 'none';
        }, 200);
      }
    }

    onMounted(() => {
      handlePreloader();
    });

    return {
      loaderWrap,
      handlePreloader,
      handleClosePreloader,
    };
  },
};
</script>

<style lang="scss">
@import '../assets/_preloader.scss';
</style>
