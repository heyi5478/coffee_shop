<template>
     <div class="container">
    <VueLoading :active="isLoading" :z-index="1060" />
    <div class="mt-4">
      <!-- 購物車列表 -->
      <div class="text-end">
        <button class="btn btn-outline-danger" type="button" @click="deleteAllCarts">
          清空購物車
        </button>
      </div>
      <table class="table align-middle">
        <thead>
          <tr>
            <th></th>
            <th>品名</th>
            <th style="width: 110px">數量</th>
            <th>單價</th>
          </tr>
        </thead>
        <tbody>
          <template v-if="cart.carts">
            <tr v-for="item in cart.carts" :key="item.id">
              <td>
                <button type="button" class="btn btn-outline-danger btn-sm"
                 :disabled="status.loadingItem === item.id"
                  @click="removeCartItem(item.id)">
                  <i class="bi bi-x"></i>
                </button>
              </td>
              <td>
                {{ item.product.title }}
                <div class="text-success" v-if="item.coupon">已套用優惠券</div>
              </td>
              <td>
                <div class="input-group input-group-sm">
                  <input type="number" class="form-control" min="1"
                   v-model.number="item.qty" @blur="updateCart(item)" />
                  <div class="input-group-text">/ {{ item.product.unit }}</div>
                </div>
              </td>
              <td class="text-end">
                <small v-if="cart.final_total !== cart.total" class="text-success">折扣價：</small>
                {{ $filters.currency(item.final_total) }}
              </td>
            </tr>
          </template>
        </tbody>
        <tfoot>
          <tr>
            <td colspan="3" class="text-end">總計</td>
            <td class="text-end">{{ $filters.currency(cart.total) }}</td>
          </tr>
          <tr v-if="cart.final_total !== cart.total">
            <td colspan="3" class="text-end text-success">折扣價</td>
            <td class="text-end text-success">
              {{ $filters.currency(cart.final_total) }}
            </td>
          </tr>
        </tfoot>
      </table>
      <!-- 優惠卷 -->
      <!-- <div class="input-group mb-3 input-group-sm">
        <input type="text" class="form-control" v-model="coupon_code" placeholder="請輸入優惠碼" />
        <div class="input-group-append">
          <button class="btn btn-outline-secondary" type="button" @click="addCouponCode">
            套用優惠碼
          </button>
        </div>
      </div> -->
    </div>

    <div class="my-5 row justify-content-center">
      <VeeForm ref="form" class="col-md-6" v-slot="{ errors }" @submit="createOrder">
        <div class="mb-3">
          <label for="email" class="form-label">Email</label>
          <VeeField id="email" name="email" type="email"
           class="form-control" :class="{ 'is-invalid': errors['email'] }"
            placeholder="請輸入 Email" rules="email|required" v-model="form.user.email" />
          <ErrorMessage name="email" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="name" class="form-label">收件人姓名</label>
          <VeeField id="name" name="姓名" type="text"
           class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
            placeholder="請輸入姓名" rules="required" v-model="form.user.name" />
          <ErrorMessage name="姓名" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="tel" class="form-label">收件人電話</label>
          <VeeField id="tel" name="電話" type="tel"
           class="form-control" :class="{ 'is-invalid': errors['電話'] }"
            placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel" />
          <ErrorMessage name="電話" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="address" class="form-label">收件人地址</label>
          <VeeField id="address" name="地址" type="text"
           class="form-control" :class="{ 'is-invalid': errors['地址'] }"
            placeholder="請輸入地址" rules="required" v-model="form.user.address" />
          <ErrorMessage name="地址" class="invalid-feedback" />
        </div>

        <div class="mb-3">
          <label for="message" class="form-label">備註</label>
          <textarea name="" id="message" class="form-control"
           cols="30" rows="10" v-model="form.message"></textarea>
        </div>
        <div class="text-end">
          <button type="submit" class="btn btn-danger">送出訂單</button>
        </div>
      </VeeForm>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'pinia';
import toastMessage from '@/stores/toastMessage';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      product: {},
      status: {
        loadingItem: '',
      },
      form: {
        user: {
          name: '',
          email: '',
          tel: '',
          address: '',
        },
        message: '',
      },
      cart: {},
      isLoading: false,
      coupon_code: '',
    };
  },
  methods: {
    ...mapActions(toastMessage, ['pushMessage']),
    deleteAllCarts() {
      this.isLoading = true;
      const url = `${VITE_URL}/api/${VITE_PATH}/carts`;
      this.$http.delete(url).then((response) => {
        this.pushMessage({
          style: 'success',
          title: '清除購物車',
          content: response.data.message,
        });
        this.getCart();
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'danger',
          title: '清除購物車',
          content: error.response.data.message,
        });
      });
    },
    getCart() {
      const url = `${VITE_URL}/api/${VITE_PATH}/cart`;
      this.isLoading = true;
      this.$http.get(url).then((response) => {
        this.cart = response.data.data;
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'danger',
          title: '取得購物車資訊',
          content: error.response.data.message,
        });
      });
    },
    removeCartItem(id) {
      this.status.loadingItem = id;
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        this.pushMessage({
          style: 'success',
          title: '移除購物車品項',
          content: response.data.message,
        });
        this.status.loadingItem = '';
        this.isLoading = false;
        this.getCart();
      }).catch((error) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'danger',
          title: '移除購物車品項',
          content: error.response.data.message,
        });
      });
    },
    updateCart(data) {
      this.isLoading = true;
      const url = `${VITE_URL}/api/${VITE_PATH}/cart/${data.id}`;
      const cart = {
        product_id: data.product_id,
        qty: data.qty,
      };

      this.$http.put(url, { data: cart }).then((response) => {
        this.pushMessage({
          style: 'success',
          title: '更新購物車',
          content: response.data.message,
        });
        this.isLoading = false;
        this.getCart();
      }).catch((error) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'danger',
          title: '更新購物車',
          content: error.response.data.message,
        });
      });
    },
    addCouponCode() {
      const url = `${VITE_URL}/api/${VITE_PATH}/coupon`;
      const coupon = {
        code: this.coupon_code,
      };
      this.isLoading = true;
      this.$http.post(url, { data: coupon }).then((response) => {
        this.pushMessage({
          style: 'success',
          title: '加入優惠券',
          content: response.data.message,
        });
        this.getCart();
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'danger',
          title: '加入優惠券',
          content: error.response.data.message,
        });
      });
    },
    createOrder() {
      this.isLoading = true;
      const url = `${VITE_URL}/api/${VITE_PATH}/order`;
      const order = this.form;
      this.$http.post(url, { data: order }).then(() => {
        this.$router.push('/ordersuccess');
        this.$refs.form.resetForm();
        this.isLoading = false;
      }).catch((error) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'danger',
          title: '建立訂單',
          content: error.response.data.message,
        });
      });
    },
  },
  created() {
    // this.getProducts();
    this.getCart();
  },
};
</script>
