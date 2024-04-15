import { defineStore } from 'pinia';

const useToastMessageStore = defineStore('toastMessageStore', {
  state: () => ({
    messages: [],
  }),
  actions: {
    // 新增 Toast 內容
    pushMessages(message) {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      this.shiftToast();
    },
    // 5 秒後將 Toast 移除，關閉 Toast 訊息
    shiftToast() {
      setTimeout(() => {
        this.messages.shift();
      }, 5000);
    },
    // 按鈕關閉單一 Toast
    clearToast(key) {
      this.messages.splice(key, 1);
    },
  },
});

export default useToastMessageStore;
