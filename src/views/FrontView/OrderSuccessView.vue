<template>
<div class="container">
  <!-- 訂單進度 -->
  <div class="mb-4">
    <OrderTimeLine :step="step" />
  </div>
  <div class="text-center mb-5">
    <h2 class="mb-3">訂單已送出</h2>
    <RouterLink to="/products"
    class="text-decoration-none"><h3 class="">繼續購物</h3></RouterLink>
  </div>
</div>
</template>

<script>
import OrderTimeLine from '@/components/OrderTimeLine.vue';

export default {
  components: { OrderTimeLine },
  data() {
    return {
      step: 3,
    };
  },
};
</script>
