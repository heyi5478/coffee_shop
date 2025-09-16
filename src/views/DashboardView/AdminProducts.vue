<template>
    <div>
      <VueLoading :active="isLoading" :z-index="1060" />
      <div class="text-end mt-4">
        <button class="btn btn-primary" type="button" @click="openModal(true)">
          建立新的產品
        </button>
      </div>
      <table class="table mt-4">
        <thead>
          <tr>
            <th width="120">分類</th>
            <th>產品名稱</th>
            <th width="120">原價</th>
            <th width="120">售價</th>
            <th width="100">是否啟用</th>
            <th width="200">編輯</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="item in products" :key="item.id">
            <td>{{ item.category }}</td>
            <td>{{ item.title }}</td>
            <td class="text-right">
              {{ $filters.currency(item.origin_price) }}
            </td>
            <td class="text-right">
              {{ $filters.currency(item.price) }}
            </td>
            <td>
              <span v-if="item.is_enabled" class="text-success">啟用</span>
              <span v-else>未啟用</span>
            </td>
            <td>
              <div class="btn-group">
                <button
                  class="btn btn-outline-primary btn-sm"
                  type="button"
                  @click="openModal(false, item)"
                >
                  編輯
                </button>
                <button
                  class="btn btn-outline-danger btn-sm"
                  type="button"
                  @click="openDelProductModal(item)"
                >
                  刪除
                </button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
      <PaginationComponent :pages="pagination" @emit-pages="getProducts" />
      <!-- ProductModal -->
      <ProductModalComponent
        @update-product="updateProduct"
        :product="tempProduct"
        :isNew="isNew"
        ref="productModal"
      />
      <!-- DelModal -->
      <DelModalComponent :item="tempProduct" ref="delModal" @del-item="delProduct" />
    </div>
  </template>

<script>
import { mapActions } from 'pinia';
import toastMessage from '@/stores/toastMessage';

import PaginationComponent from '@/components/PaginationComponent.vue';
import DelModalComponent from '@/components/DelModalComponent.vue';
import ProductModalComponent from '../../components/ProductModalComponent.vue';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  data() {
    return {
      products: [],
      pagination: {},
      tempProduct: {},
      isNew: false,
      isLoading: false,
      status: {
        fileUploading: false,
      },
      modal: {
        editModal: '',
        delModal: '',
      },
      currentPage: 1,
    };
  },
  components: {
    ProductModalComponent,
    DelModalComponent,
    PaginationComponent,
  },
  methods: {
    // 可以使用 mapAction 取得 Pinia 的方法
    ...mapActions(toastMessage, ['pushMessage']),
    getProducts(page = 1) {
      this.currentPage = page;
      const api = `${VITE_URL}/api/${VITE_PATH}/admin/products?page=${page}`;
      this.isLoading = true;
      this.$http.get(api).then((response) => {
        this.products = response.data.products;
        this.pagination = response.data.pagination;
        this.isLoading = false;
        // 在此可以搭配 Pinia 發送成功資訊
        this.pushMessage({
          style: 'success',
          title: '成功取得產品資訊',
          content: response.data.message,
        });
      }).catch((error) => {
        this.isLoading = false;

        let errorMessage = '無法取得產品資料';
        if (error.response?.status === 401) {
          errorMessage = '權限不足，請重新登入';
        } else if (error.response?.status >= 500) {
          errorMessage = '系統錯誤，請稍後再試';
        }

        this.pushMessage({
          style: 'danger',
          title: '取得產品資訊失敗',
          content: errorMessage,
        });
      });
    },
    openModal(isNew, item) {
      if (isNew) {
        this.tempProduct = {};
        this.isNew = true;
      } else {
        this.tempProduct = { ...item };
        this.isNew = false;
      }
      const productComponent = this.$refs.productModal;
      productComponent.openModal();
    },
    updateProduct(item) {
      this.tempProduct = item;
      let api = `${VITE_URL}/api/${VITE_PATH}/admin/product`;
      this.isLoading = true;
      let httpMethod = 'post';
      let status = '新增產品';
      if (!this.isNew) {
        api = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
        httpMethod = 'put';
        status = '更新產品';
      }
      const productComponent = this.$refs.productModal;
      this.$http[httpMethod](api, { data: this.tempProduct }).then((response) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'success',
          title: status,
          content: response.data.message,
        });
        productComponent.hideModal();
        this.getProducts(this.currentPage);
      }).catch((error) => {
        this.isLoading = false;

        let errorMessage = '產品操作失敗';
        if (error.response?.status === 400) {
          errorMessage = '產品資料有誤，請檢查後再試';
        } else if (error.response?.status === 401) {
          errorMessage = '權限不足，請重新登入';
        } else if (error.response?.status === 404) {
          errorMessage = '產品不存在';
        } else if (error.response?.status >= 500) {
          errorMessage = '系統錯誤，請稍後再試';
        }

        this.pushMessage({
          style: 'danger',
          title: status,
          content: errorMessage,
        });
      });
    },
    openDelProductModal(item) {
      this.tempProduct = { ...item };
      const delComponent = this.$refs.delModal;
      delComponent.openModal();
    },
    delProduct() {
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/product/${this.tempProduct.id}`;
      this.isLoading = true;
      this.$http.delete(url).then((response) => {
        this.isLoading = false;
        this.pushMessage({
          style: 'success',
          title: '刪除產品',
          content: response.data.message,
        });
        const delComponent = this.$refs.delModal;
        delComponent.hideModal();
        this.getProducts(this.currentPage);
      }).catch((error) => {
        this.isLoading = false;

        let errorMessage = '刪除產品失敗';
        if (error.response?.status === 401) {
          errorMessage = '權限不足，請重新登入';
        } else if (error.response?.status === 404) {
          errorMessage = '產品不存在';
        } else if (error.response?.status >= 500) {
          errorMessage = '系統錯誤，請稍後再試';
        }

        this.pushMessage({
          style: 'danger',
          title: '刪除產品',
          content: errorMessage,
        });
      });
    },
  },
  created() {
    this.getProducts();
  },
};
</script>
