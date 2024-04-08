<template>
    <section class="order-process pt-4 pb-3 mb-3 mb-lg-7">
      <div class="container">
        <div class="row justify-content-center">
          <div class="col-8 col-md-7 timeline"></div>
        </div>
        <div class="row">
          <div class="col-4 col-md-5">
            <div class="timeline-pointer text-center step-1 active">
              <p>購物車</p>
            </div>
          </div>
          <div class="col-4 col-md-2">
            <div class="timeline-pointer text-center step-2" :class="stepCheck">
              <p>確認結帳</p>
            </div>
          </div>
          <div class="col-4 col-md-5">
            <div
              class="timeline-pointer text-center step-3"
              :class="stepComplete"
            >
              <p>訂單成立</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  </template>

<script>
export default {
  props: ['step'],
  computed: {
    stepCheck() {
      if (this.step === 2 || this.step === 3) {
        return 'active';
      }
      return '';
    },
    stepComplete() {
      if (this.step === 3) {
        return 'active';
      }
      return '';
    },
  },
};
</script>

  <style scope lang="scss">
  @import "../assets/all.scss";

  .timeline {
    position: relative;
    &::after {
      content: "";
      position: absolute;
      top: 9px;
      left: 0;
      right: 0;
      height: 2px;
      background-color: $primary;
    }
    &-step-2 {
      position: relative;
      &::before {
        content: "";
        position: absolute;
        top: 9px;
        left: 0;
        right: 50%;
        height: 2px;
        background-color: $primary;
      }
      &::after {
        content: "";
        position: absolute;
        top: 9px;
        left: 50%;
        right: 0;
        height: 2px;
        background-color: $primary;
      }
    }
    &-step-3 {
      position: relative;
      &::after {
        content: "";
        position: absolute;
        top: 9px;
        left: 0;
        right: 0;
        height: 2px;
        background-color: $primary;
      }
    }

    &-pointer {
      position: relative;
      color: $neutral-500;
      p {
        padding-top: 24px;
        margin-bottom: 0;
        line-height: 1.5;
      }
      &::before {
        position: absolute;
        top: 0;
        left: 50%;
        transform: translate(-50%, -10%);
        width: 25px;
        height: 25px;
        border: 3px solid gray;
        border-radius: 50%;
        background-color: $neutral-700;
        display: flex;
        align-items: center;
        justify-content: center;
        font-size: 12px;
        z-index: 1;
      }
      &.step-1::before {
        content: "1";
      }
      &.step-2::before {
        content: "2";
      }
      &.step-3::before {
        content: "3";
      }
      &.active {
        color: $primary;
        &::before {
          color: white;
          background-color: $primary;
          border-color: $primary;
        }
      }
    }
  }
  </style>
