<template>
  <div class="modal fade" id="productModal" tabindex="-1" role="dialog"
   aria-labelledby="exampleModalLabel"
   aria-hidden="true" ref="modal">
    <div class="modal-dialog modal-xl" role="document">
      <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
          <h5 class="modal-title" id="exampleModalLabel">
            <span v-if="isNew">新增產品</span>
            <span v-else>編輯產品</span>
          </h5>
          <button type="button" class="btn-close" data-bs-dismiss="modal"
           aria-label="Close"></button>
        </div>
        <div class="modal-body">
          <div class="row">
            <div class="col-sm-4">
              <div class="mb-3">
                <label for="image" class="form-label">輸入圖片網址</label>
                <input type="text" class="form-control" id="image"
                 v-model="tempProduct.imageUrl" placeholder="請輸入圖片連結" />
              </div>
              <div class="mb-3">
                <label for="customFile" class="form-label">或 上傳圖片
                  <i class="fas fa-spinner fa-spin" v-if="status.fileUploading"></i>
                </label>
                <input type="file" id="customFile" class="form-control"
                 accept="image/jpeg,image/png,image/gif,image/webp"
                 ref="fileInput" @change="uploadFile" />
              </div>
              <img class="img-fluid" alt="產品圖" :src="tempProduct.imageUrl" />
                <!-- 延伸技巧，多圖 -->
              <div class="mt-5" v-if="tempProduct.imagesUrl">
                <div v-for="(image, key) in tempProduct.imagesUrl" class="mb-3" :key="key">
                  <input type="url" class="form-control form-control"
                   v-model="tempProduct.imagesUrl[key]"
                    placeholder="請輸入連結" />
                  <div>
                    <img class="img-fluid" alt="細部圖" :src="image" />
                  </div>
                  <button type="button" class="btn btn-outline-danger"
                   @click="tempProduct.imagesUrl.splice(key, 1)">
                    移除
                  </button>
                </div>
                <div v-if="tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1] ||
                  !tempProduct.imagesUrl.length
                ">
                  <button type="button" class="btn btn-outline-primary btn-sm d-block w-100"
                    @click="tempProduct.imagesUrl.push('')">
                    新增圖片
                  </button>
                </div>
              </div>
            </div>
            <div class="col-sm-8">
              <div class="mb-3">
                <label for="title" class="form-label">標題</label>
                <input type="text" class="form-control"
                 id="title" v-model="tempProduct.title" placeholder="請輸入標題" />
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="category" class="form-label">分類</label>
                  <input type="text" class="form-control"
                   id="category" v-model="tempProduct.category"
                    placeholder="請輸入分類" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">單位</label>
                  <input type="text" class="form-control"
                   id="unit" v-model="tempProduct.unit" placeholder="請輸入單位" />
                </div>
              </div>

              <div class="row gx-2">
                <div class="mb-3 col-md-6">
                  <label for="origin_price" class="form-label">原價</label>
                  <input type="number" class="form-control" id="origin_price" min="0"
                    v-model.number="tempProduct.origin_price" placeholder="請輸入原價" />
                </div>
                <div class="mb-3 col-md-6">
                  <label for="price" class="form-label">售價</label>
                  <input type="number" class="form-control" id="price"
                   v-model.number="tempProduct.price" min="0"
                    placeholder="請輸入售價" />
                </div>
              </div>
              <hr />

              <div class="mb-3">
                <label for="description" class="form-label">產品描述</label>
                <textarea type="text" class="form-control"
                 id="description" v-model="tempProduct.description"
                  placeholder="請輸入產品描述"></textarea>
              </div>
              <div class="mb-3">
                <label for="content" class="form-label">說明內容</label>
                <textarea type="text" class="form-control"
                 id="content" v-model="tempProduct.content"
                  placeholder="請輸入產品說明內容"></textarea>
              </div>
              <div class="mb-3">
                <div class="form-check">
                  <input class="form-check-input" type="checkbox"
                   v-model="tempProduct.is_enabled" :true-value="1"
                    :false-value="0" id="is_enabled" />
                  <label class="form-check-label" for="is_enabled">
                    是否啟用
                  </label>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
            取消
          </button>
          <button type="button" class="btn btn-primary"
           @click="$emit('update-product', tempProduct)">
            確認
          </button>
        </div>
      </div>
    </div>
  </div>
  </template>

<script>
import { mapActions } from 'pinia';
import toastMessage from '@/stores/toastMessage';

import modalMixin from '@/mixins/modalMixin';

const { VITE_URL, VITE_PATH } = import.meta.env;

export default {
  props: {
    product: Object,
    isNew: Boolean,
  },
  data() {
    return {
      status: {},
      modal: '',
      tempProduct: {},
    };
  },
  emits: ['update-product'],
  mixins: [modalMixin],
  watch: {
    product() {
      this.tempProduct = this.product;
      if (!this.tempProduct.imagesUrl) {
        this.tempProduct.imagesUrl = [];
      }
      if (!this.tempProduct.imageUrl) {
        this.tempProduct.imageUrl = '';
      }
    },
  },
  methods: {
    ...mapActions(toastMessage, ['pushMessage']),
    uploadFile() {
      const uploadedFile = this.$refs.fileInput.files[0];

      if (!uploadedFile) {
        this.pushMessage({
          style: 'danger',
          title: '文件上傳錯誤',
          content: '請選擇要上傳的文件',
        });
        return;
      }

      // 1. 文件類型驗證
      const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(uploadedFile.type)) {
        this.pushMessage({
          style: 'danger',
          title: '檔案類型錯誤',
          content: '僅支援 JPEG、PNG、GIF、WebP 格式',
        });
        this.$refs.fileInput.value = '';
        return;
      }

      // 2. 文件大小驗證 (5MB)
      const maxSize = 5 * 1024 * 1024;
      if (uploadedFile.size > maxSize) {
        this.pushMessage({
          style: 'danger',
          title: '檔案過大',
          content: '檔案大小不得超過 5MB',
        });
        this.$refs.fileInput.value = '';
        return;
      }

      // 3. 文件名稱清理
      const sanitizedName = uploadedFile.name.replace(/[^a-zA-Z0-9.-]/g, '_');

      const formData = new FormData();
      formData.append('file-to-upload', uploadedFile, sanitizedName);
      const url = `${VITE_URL}/api/${VITE_PATH}/admin/upload`;
      this.status.fileUploading = true;
      this.$http.post(url, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      }).then((response) => {
        this.status.fileUploading = false;
        this.tempProduct.imageUrl = response.data.imageUrl;
        this.$refs.fileInput.value = '';
        this.pushMessage({
          style: 'success',
          title: '圖片上傳成功',
          content: '圖片上傳完成',
        });
      }).catch((error) => {
        this.status.fileUploading = false;
        this.$refs.fileInput.value = '';

        // 安全的錯誤處理
        let errorMessage = '上傳失敗，請稍後再試';
        if (error.response?.status === 413) {
          errorMessage = '檔案過大，請選擇較小的圖片';
        } else if (error.response?.status === 415) {
          errorMessage = '不支援的檔案格式';
        } else if (error.response?.status >= 500) {
          errorMessage = '伺服器錯誤，請稍後再試';
        }

        this.pushMessage({
          style: 'danger',
          title: '圖片上傳失敗',
          content: errorMessage,
        });
      });
    },
  },
};
</script>
