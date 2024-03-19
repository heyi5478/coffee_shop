import { defineStore } from 'pinia';

export default defineStore('toastMessage', {
  state: () => ({
    messages: [],
  }),
  actions: {
    toastShow() {
      setTimeout(() => {
        this.messages.shift();
      }, 6000);
    },
    clearToast(index) {
      this.messages.splice(index, 1);
    },
    pushMessage(message) {
      const { style = 'success', title, content } = message;
      this.messages.push({ style, title, content });
      this.toastShow();
    },
  },
});
