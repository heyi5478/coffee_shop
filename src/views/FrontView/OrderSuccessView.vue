<template>
<div class="container">
  <!-- 訂單進度 -->
  <div class="mb-4">
    <OrderTimeLine :step="step" />
  </div>
  <h2 class="text-center">訂單已送出</h2>
  <RouterLink to="/" class="text-decoration-none"><h3 class="text-center">回首頁</h3></RouterLink>
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
