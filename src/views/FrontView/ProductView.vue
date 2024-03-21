<!-- eslint-disable max-len -->
<template>
    <div class="container">
      <div class="row align-items-center">
        <div class="col-md-7">
          <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
            <div class="carousel-inner pdImg">
              <div class="carousel-item active">
                <img :src="product.imageUrl" class="d-block w-100 object-fit-cover" alt="...">
              </div>
              <!-- <div class="carousel-item" v-for="(item, index) in imagesUrl" :key="index">
                <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" class="d-block w-100" alt="...">
              </div> -->
              <!-- <div class="carousel-item">
                <img src="https://images.unsplash.com/photo-1502743780242-f10d2ce370f3?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1916&q=80" class="d-block w-100" alt="...">
              </div> -->
            </div>
            <!-- <a class="carousel-control-prev" href="#carouselExampleControls" role="button" data-slide="prev">
              <span class="carousel-control-prev-icon" aria-hidden="true"></span>
              <span class="sr-only">Previous</span>
            </a>
            <a class="carousel-control-next" href="#carouselExampleControls" role="button" data-slide="next">
              <span class="carousel-control-next-icon" aria-hidden="true"></span>
              <span class="sr-only">Next</span>
            </a> -->
          </div>
        </div>
        <div class="col-md-5">
          <nav aria-label="breadcrumb">
            <ol class="breadcrumb bg-white px-0 mb-0 py-3">
              <li class="breadcrumb-item"><RouterLink class="text-muted" to="/">首頁</RouterLink></li>
              <li class="breadcrumb-item"><RouterLink class="text-muted" to="/products">商店</RouterLink></li>
              <li class="breadcrumb-item active" aria-current="page">Detail</li>
            </ol>
          </nav>
          <h2 class="fw-bold h1 mb-1">{{ product.title }}</h2>
          <p class="mb-0 text-muted text-end"><del>NT${{ product.origin_price }}</del></p>
          <p class="h4 fw-bold text-end">{{ product.price }}</p>
          <div class="row align-items-center">
            <div class="col-6">
              <div class="input-group my-3 bg-light rounded">
                <div class="input-group-prepend">
                  <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon1" @click="changeQty(-1)">
                    <font-awesome-icon icon="fa-solid fa-minus" />
                  </button>
                </div>
                <input type="number" class="form-control border-0 text-center my-auto shadow-none bg-light"
                max="10" min="1" v-model="productNum" @change="changeNumber(productNum)" />
                <div class="input-group-append">
                  <button class="btn btn-outline-dark border-0 py-2" type="button" id="button-addon2" @click="changeQty(1)">
                    <font-awesome-icon icon="fa-solid fa-plus" />
                  </button>
                </div>
              </div>
            </div>
            <div class="col-6">
              <a class="text-nowrap btn btn-dark w-100 py-2" @click.prevent="addToCart(product.id)">加入購物車</a>
            </div>
          </div>
        </div>
      </div>
      <div class="row my-5">
        <div class="col-md-4">
          <p>{{ product.description }}</p>
        </div>
        <div class="col-md-3">
          <p class="text-muted">{{ product.content }}</p>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';

import cartStore from '@/stores/cartStore';

// console.log(import.meta.env.VITE_URL, import.meta.env.VITE_PATH);
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      productNum: 1,
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;

      axios.get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          // console.log(res);
          this.product = res.data.product;
        });
    },
    ...mapActions(cartStore, ['addToCart']),
    // addToCart(id) {
    //   const order = {
    //     product_id: id,
    //     qty: 1,
    //   };

    //   axios.post(`${VITE_URL}/api/${VITE_PATH}/cart`, { data: order })
    //     .then((res) => {
    //       console.log(res);
    //       // this.product = res.data.product;
    //     });
    // },
    // 點擊 + - 按鈕做數量判斷
    changeQty(num) {
      const qty = this.productNum + num;
      this.changeNumber(qty);
    },
    // 商品數量欄位變動時判斷
    changeNumber(num) {
      if (num >= 10) {
        this.productNum = 10;
        this.$bus.$emit('message:push', '數量不可超過10喔!', 'info');
      } else if (num <= 1) {
        this.productNum = 1;
        this.$bus.$emit('message:push', '數量不可低於1喔!', 'info');
      } else {
        this.productNum = num;
      }
    },
  },
  mounted() {
    // console.log(this.$route);
    this.getProduct();
  },
};
</script>
