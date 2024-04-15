<template>
    <div class="toast-container p-3" style="z-index: 1500">
      <div
        class="toast show"
        :class="`toast${key}`"
        role="alert"
        aria-live="assertive"
        aria-atomic="true"
        v-for="(msg, key) in messages"
        :key="key"
      >
        <div class="toast-header">
          <span
            :class="`bg-${msg.style}`"
            class="rounded p-2 me-2 d-inline-block"
          ></span>
          <strong class="me-auto">{{ msg.title }}</strong>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="toast"
            aria-label="Close"
            @click="clearToast(key)"
          ></button>
        </div>
        <div class="toast-body" v-if="msg.content">{{ msg.content }}</div>
      </div>
    </div>
  </template>

<script>
import useToastMessageStore from '@/stores/toastMessageStore';
import { mapState, mapActions } from 'pinia';

export default {
  computed: {
    ...mapState(useToastMessageStore, ['messages']),
  },
  methods: {
    ...mapActions(useToastMessageStore, ['clearToast']),
  },
};
</script>

  <style>
  .toast-container {
    position: fixed;
    top: 60px;
    right: 0;
  }
  </style>
