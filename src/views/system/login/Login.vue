<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="flex items-center absolute right-4 top-4">
      <AppDarkModeToggle v-if="!sessionTimeout" class="enter-x mr-2" />
      <AppLocalePicker
        v-if="!sessionTimeout && showLocale"
        class="text-white enter-x xl:text-gray-600"
        :show-text="false"
      />
    </div>
  </div>
</template>

<script lang="ts" setup>
import AppDarkModeToggle from '@/components/Application/src/AppDarkModeToggle.vue'
import AppLocalePicker from '@/components/Application/src/AppLocalePicker.vue'
import { useDesign } from '@/hooks/web/useDesign'

defineProps({
  sessionTimeout: {
    type: Boolean,
  },
})
const showLocale = true
const { prefixCls } = useDesign('login')
console.log(prefixCls, 'pre')
</script>
<style lang="less" scoped>
@prefix-cls: ~'@{namespace}-login';
@logo-prefix-cls: ~'@{namespace}-app-logo';
@countdown-prefix-cls: ~'@{namespace}-countdown-input';
@dark-bg: #293146;

html[data-theme='dark'] {
  .@{prefix-cls} {
    background-color: @dark-bg;

    &::before {
      background-image: url(@/assets/svg/login-bg-dark.svg);
    }

    .ant-input,
    .ant-input-password {
      background-color: #232a3b;
    }

    .ant-btn:not(.ant-btn-link):not(.ant-btn-primary) {
      border: 1px solid #4a5569;
    }

    &-form {
      background: transparent !important;
    }

    .app-iconify {
      color: #fff;
    }
  }

  input.fix-auto-fill,
  .fix-auto-fill input {
    -webkit-text-fill-color: #c9d1d9 !important;
    box-shadow: inherit !important;
  }
}

.@{prefix-cls} {
  min-height: 100%;
  overflow: hidden;
  @media (max-width: @screen-xl) {
    background-color: #293146;

    .@{prefix-cls}-form {
      background-color: #fff;
    }
  }

  &::before {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    margin-left: -48%;
    background-image: url(@/assets/svg/login-bg.svg);
    background-position: 100%;
    background-repeat: no-repeat;
    background-size: auto 100%;
    content: '';
    @media (max-width: @screen-xl) {
      display: none;
    }
  }

  .@{logo-prefix-cls} {
    position: absolute;
    top: 12px;
    height: 30px;

    &__title {
      font-size: 16px;
      color: #fff;
    }

    img {
      width: 32px;
    }
  }

  .container {
    .@{logo-prefix-cls} {
      display: flex;
      width: 60%;
      height: 80px;

      &__title {
        font-size: 24px;
        color: #fff;
      }

      img {
        width: 48px;
      }
    }
  }

  &-sign-in-way {
    .anticon {
      font-size: 22px;
      color: #888;
      cursor: pointer;

      &:hover {
        color: @primary-color;
      }
    }
  }

  input:not([type='checkbox']) {
    min-width: 360px;

    @media (max-width: @screen-xl) {
      min-width: 320px;
    }

    @media (max-width: @screen-lg) {
      min-width: 260px;
    }

    @media (max-width: @screen-md) {
      min-width: 240px;
    }

    @media (max-width: @screen-sm) {
      min-width: 160px;
    }
  }

  .@{countdown-prefix-cls} input {
    min-width: unset;
  }

  .ant-divider-inner-text {
    font-size: 12px;
    color: @text-color-secondary;
  }
}
</style>
