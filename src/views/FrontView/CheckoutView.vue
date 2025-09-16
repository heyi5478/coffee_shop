<template>
  <div class="container">
    <!-- 有商品頁面 -->
    <template v-if="cart?.carts?.length">
      <VueLoading :active="isLoading" :z-index="1060" />
      <div class="mt-4 row justify-content-center">
     <!-- 訂單進度 -->
        <div class="mb-4 mt-9">
          <OrderTimeLine :step="step" />
        </div>
     <!-- 購物車列表 -->
        <div class="col-md-8">
          <div class="text-end">
            <button class="btn btn-outline-danger" type="button"
             @click="deleteAllCarts">
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
                      <input type="number" class="form-control" min="1" max="99" step="1"
                       v-model.number="item.qty"
                       @blur="updateCart(item)"
                       @input="validateQuantity" />
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
        </div>
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
        <p class="text-center text-danger">星號欄位必填</p>
        <VeeForm ref="form" class="col-md-8" v-slot="{ errors }" @submit="createOrder">
          <div class="mb-3">
            <label for="email" class="form-label">Email<span class="text-danger">*</span></label>
            <VeeField id="email" name="email" type="email"
             class="form-control" :class="{ 'is-invalid': errors['email'] }"
             placeholder="請輸入 Email" rules="email|required" v-model="form.user.email" />
            <ErrorMessage name="email" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="name" class="form-label">收件人姓名<span class="text-danger">*</span></label>
            <VeeField id="name" name="姓名" type="text"
             class="form-control" :class="{ 'is-invalid': errors['姓名'] }"
             placeholder="請輸入姓名" rules="required" v-model="form.user.name" />
            <ErrorMessage name="姓名" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="tel" class="form-label">收件人電話<span class="text-danger">*</span></label>
            <VeeField id="tel" name="電話" type="tel"
             class="form-control" :class="{ 'is-invalid': errors['電話'] }"
             placeholder="請輸入電話" rules="required|min:8|max:10" v-model="form.user.tel" />
            <ErrorMessage name="電話" class="invalid-feedback" />
          </div>

          <div class="mb-3">
            <label for="address" class="form-label">收件人地址<span class="text-danger">*</span></label>
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
            <button type="submit" class="btn btn-primary">送出訂單</button>
          </div>
        </VeeForm>
      </div>
    </template>

   <!-- 無商品頁面 -->
   <template v-else>
    <div class="py-10 text-center">
      <p class="fs-5 mb-14">購物車無商品，快去購買喜歡的甜點吧！</p>
        <button
          type="button"
          class="btn btn-secondary text-white rounded-1 px-6 px-md-10 py-2 py-md-4"
          @click="$router.push('/products')"
        >
          購物去
        </button>
    </div>
   </template>
  </div>
</template>

<script>
import { mapActions, mapState } from 'pinia';
import toastMessage from '@/stores/toastMessage';
import OrderTimeLine from '@/components/OrderTimeLine.vue';
import cartStore from '@/stores/cartStore';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  components: { OrderTimeLine },
  data() {
    return {
      step: 1,
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
      isLoading: false,
      coupon_code: '',
    };
  },
  computed: {
    ...mapState(cartStore, ['cart', 'carts']),
  },
  methods: {
    ...mapActions(toastMessage, ['pushMessage']),
    ...mapActions(cartStore, [
      'getCart',
      'deleteAllCarts',
      'removeCartItem',
      'updateCart',
    ]),
    validateQuantity(event) {
      const value = parseInt(event.target.value, 10);
      const { target } = event;

      if (Number.isNaN(value) || value < 1) {
        target.value = 1;
      } else if (value > 99) {
        target.value = 99;
        this.pushMessage({
          style: 'warning',
          title: '數量限制',
          content: '單項商品數量不得超過 99',
        });
      }
    },

    // deleteAllCarts() {
    //   this.isLoading = true;
    //   const url = `${VITE_URL}/api/${VITE_PATH}/carts`;
    //   this.$http.delete(url).then(() => {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: '購物車已清空',
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     this.getCart();
    //     this.isLoading = false;
    //   }).catch((error) => {
    //     this.isLoading = false;
    //     this.pushMessage({
    //       style: 'danger',
    //       title: '清除購物車',
    //       content: error.response.data.message,
    //     });
    //   });
    // },
    // getCart() {
    //   const url = `${VITE_URL}/api/${VITE_PATH}/cart`;
    //   this.isLoading = true;
    //   this.$http.get(url).then((response) => {
    //     this.cart = response.data.data;
    //     console.log('getcart', this.cart);
    //     this.isLoading = false;
    //   }).catch((error) => {
    //     this.isLoading = false;
    //     this.pushMessage({
    //       style: 'danger',
    //       title: '取得購物車資訊',
    //       content: error.response.data.message,
    //     });
    //   });
    // },
    // removeCartItem(id) {
    //   this.status.loadingItem = id;
    //   const url = `${VITE_URL}/api/${VITE_PATH}/cart/${id}`;
    //   this.isLoading = true;
    //   this.$http.delete(url).then(() => {
    //     Swal.fire({
    //       position: 'center',
    //       icon: 'success',
    //       title: '移除購物車品項',
    //       showConfirmButton: false,
    //       timer: 1500,
    //     });
    //     this.status.loadingItem = '';
    //     this.isLoading = false;
    //     this.getCart();
    //   }).catch((error) => {
    //     this.isLoading = false;
    //     this.pushMessage({
    //       style: 'danger',
    //       title: '移除購物車品項',
    //       content: error.response.data.message,
    //     });
    //   });
    // },
    // updateCart(data) {
    //   this.isLoading = true;
    //   const url = `${VITE_URL}/api/${VITE_PATH}/cart/${data.id}`;
    //   const cart = {
    //     product_id: data.product_id,
    //     qty: data.qty,
    //   };

    //   if (data.qty === 0) {
    //     this.removeCartItem(data.id);
    //   } else if (data.qty >= 100) {
    //     cart.qty = 100;
    //     this.pushMessage({
    //       style: 'danger',
    //       title: '數量不可以超過 100',
    //     });
    //   } else if (data.qty < 0) {
    //     cart.qty = 1;
    //     this.pushMessage({
    //       style: 'danger',
    //       title: '數量不可以小於 1',
    //     });
    //   } else {
    //     this.$http.put(url, { data: cart }).then((response) => {
    //       this.pushMessage({
    //         style: 'success',
    //         title: '更新購物車',
    //         content: response.data.message,
    //       });
    //       this.isLoading = false;
    //       this.getCart();
    //     }).catch((error) => {
    //       this.isLoading = false;
    //       this.pushMessage({
    //         style: 'danger',
    //         title: '更新購物車',
    //         content: error.response.data.message,
    //       });
    //     });
    //   }
    // },
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

        let errorMessage = '優惠券驗證失敗';
        if (error.response?.status === 400) {
          errorMessage = '優惠券無效或已過期';
        } else if (error.response?.status >= 500) {
          errorMessage = '系統錯誤，請稍後再試';
        }

        this.pushMessage({
          style: 'danger',
          title: '加入優惠券',
          content: errorMessage,
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

        let errorMessage = '訂單建立失敗，請稍後再試';
        if (error.response?.status === 400) {
          errorMessage = '訂單資料有誤，請檢查資料';
        } else if (error.response?.status === 401) {
          errorMessage = '請先登入後再下訂單';
        } else if (error.response?.status >= 500) {
          errorMessage = '系統錯誤，請稍後再試';
        }

        this.pushMessage({
          style: 'danger',
          title: '建立訂單',
          content: errorMessage,
        });
      });
    },
  },
  created() {
    this.getCart();
  },
};
</script>
