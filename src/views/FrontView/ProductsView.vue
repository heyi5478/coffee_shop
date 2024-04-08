<!-- eslint-disable max-len -->
<template>
  <div class="container mt-md-5 mt-3 mb-7">
    <div class="row">
      <div class="col-md-4">
        <div class="accordion border border-bottom border-top-0 border-start-0 border-end-0 mb-3" id="accordionExample">
          <div class="card border-0">
            <div class="card-header px-0 py-4 bg-white border border-bottom-0 border-top border-start-0 border-end-0 rounded-0" id="headingOne" data-bs-toggle="collapse" data-bs-target="#collapseOne">
              <div class="d-flex justify-content-between align-items-center pe-1">
                <h4 class="mb-0">
                  商品分類
                </h4>
                <i class="fas fa-chevron-down"></i>
              </div>
            </div>
            <div id="collapseOne" class="collapse show" aria-labelledby="headingOne" data-bs-parent="#accordionExample">
              <div class="card-body py-0">
                <ul class="list-unstyled">
                  <li>
                      <RouterLink class="py-2 d-block text-muted text-decoration-none" :to="`/products`">全部</RouterLink>
                  </li>
                  <li v-for="item in categories" :key="item">
                      <RouterLink class="py-2 d-block text-muted text-decoration-none" :to="`/products?category=${item}`">{{ item }}</RouterLink>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div class="col-md-8">
        <div class="row">
          <div class="col-md-6" v-for="product in products" :key="product.id">
            <div class="card border-0 mb-4 position-relative position-relative">
              <img :src="product.imageUrl" class="card-img-top object-fit-cover rounded-1" height="300" alt="...">
              <a href="#" class="text-dark">
                <i class="far fa-heart position-absolute" style="right: 16px; top: 16px"></i>
              </a>
              <div class="card-body p-0 text-center">
                <h4 class="mb-0 mt-3"><RouterLink :to="`/product/${product.id}`" class="text-decoration-none">{{ product.title }}</RouterLink></h4>
                <p class="card-text mb-0">NT${{ product.price }} <span class="text-muted "><del>NT${{ product.origin_price }}</del></span></p>
                <p class="text-muted mt-3"></p>
              </div>
            </div>
          </div>
        </div>
          <!-- <nav class="d-flex justify-content-center">
            <ul class="pagination">
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Previous">
                  <span aria-hidden="true">&laquo;</span>
                </a>
              </li>
              <li class="page-item active"><a class="page-link" href="#">1</a></li>
              <li class="page-item"><a class="page-link" href="#">2</a></li>
              <li class="page-item"><a class="page-link" href="#">3</a></li>
              <li class="page-item">
                <a class="page-link" href="#" aria-label="Next">
                  <span aria-hidden="true">&raquo;</span>
                </a>
              </li>
            </ul>
            <pagination-component @emit-pages="getAllProducts" :pages="pagination" v-if="category == ''"/>
            <pagination-component @emit-pages="getProducts" :pages="pagination" v-else/>
          </nav> -->
      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios';

// console.log(import.meta.env.VITE_URL, import.meta.env.VITE_PATH);
const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      categories: ['咖啡', '咖啡豆', '蛋糕'],
    };
  },
  watch: {
    '$route.query': {
      handler() {
        this.getData();
      },
      deep: true,
    },
  },
  methods: {
    getData() {
      const { category = '' } = this.$route.query;
      const url = `${VITE_URL}/api/${VITE_PATH}/products?category=${category}`;
      axios.get(url).then((res) => {
        // console.log(res);
        this.products = res.data.products;
        // console.log(this.products);
      });
    },
  },
  mounted() {
    this.getData();
  },
};
</script>
