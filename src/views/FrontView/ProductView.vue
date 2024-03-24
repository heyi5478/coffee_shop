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

      <div class="row justify-content-center bg-primary">
        <div class="col-12 col-sm-12 col-md-12 col-lg-2 mt-5 text-center">
          <h2 style="color:white">類似商品</h2>
        </div>
      </div>
      <div class="row justify-content-between px-2 py-4 bg-primary"> <!--card-->
        <div class="col-12 col-lg-3 col-md-3 col-sm-12 mb-2"  v-for=" item in sameProduct" :key="item.id">
          <RouterLink :to="`/product/${item.id}`" class="link text-primary">
            <div class="card border-0 w-80 bg-primary">
              <div class="pic w-100 px-2 overflow-hidden rounded-1">
                <img :src="item.imageUrl" class="card-img w-100 object-fit-cover overflow-hidden" height="200px" :alt="item.title">
              </div>
              <div class=" over card-img-overlay">
                <h3 class="link text-white">了解更多</h3>
              </div>
              <div class="card-body px-5 py-2 text-center mt-2 ">
                <h5 class="card-title mb-2 text-white">{{ item.title }}</h5>
              </div>
            </div>
          </RouterLink>
        </div>
      </div>
    </div>
</template>

<script>
import axios from 'axios';
import { mapActions } from 'pinia';

import toastMessage from '@/stores/toastMessage';
import cartStore from '@/stores/cartStore';

// console.log(import.meta.env.VITE_URL, import.meta.env.VITE_PATH);
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      product: {},
      productNum: 1,
      sameProduct: [],
      sameCategory: '',
      pageId: this.$route.params.id,
    };
  },
  methods: {
    getProduct() {
      const { id } = this.$route.params;

      axios.get(`${VITE_URL}/api/${VITE_PATH}/product/${id}`)
        .then((res) => {
          // console.log(res);
          this.product = res.data.product;
          this.sameCategory = this.product.category;
          this.getSameProduct(this.sameCategory);
        });
    },
    ...mapActions(cartStore, ['addToCart']),
    ...mapActions(toastMessage, ['pushMessage']),
    getSameProduct(sameCategory) {
      const { id } = this.$route.params;

      axios.get(`${VITE_URL}/api/${VITE_PATH}/products?category=${sameCategory}`)
        .then((res) => {
          // console.log(res);
          this.sameProduct = res.data.products.filter((item) => item.id !== id);
          // console.log(res.data.products);
        })
        .catch((err) => {
          this.pushMessage({
            style: 'danger',
            title: '沒有相同商品',
            content: err.response.data.message,
          });
        });
    },
    // 點擊 + - 按鈕做數量判斷
    changeQty(num) {
      const qty = this.productNum + num;
      this.changeNumber(qty);
    },
    // 商品數量欄位變動時判斷
    changeNumber(num) {
      if (num >= 10) {
        this.productNum = 10;
        this.pushMessage({
          style: 'danger',
          title: '數量不可超過10喔!',
        });
      } else if (num <= 1) {
        this.productNum = 1;
        this.pushMessage({
          style: 'danger',
          title: '數量不可低於1喔!',
        });
      } else {
        this.productNum = num;
      }
    },
  },
  watch: {
    $route(to) {
      this.pageId = to.params.id;
      this.getProduct(this.pageId);
    },
  },
  mounted() {
    // console.log(this.$route);
    this.getProduct(this.$route.params.id);
  },
};
</script>

<style lang="scss" scoped>
@import '../../assets/_sameProduct.scss';
</style>
