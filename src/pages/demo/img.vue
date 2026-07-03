<script setup>
import { staticBaseUrl } from '@/config'
</script>
<template>
  <view class="pages-container bg-[#E9F0EF]">
    <view class="pages-content flex flex-col items-center justify-center">
      <image :src="staticBaseUrl + '/images/demo/img_01.png'" mode="aspectFill" />

      <!-- 背景示例 行内样式 -->
      <view class="bg-cover bg-center w-full h-[300rpx]" :style="{ backgroundImage: `url('${staticBaseUrl}/images/demo/img_01.png')` }"></view>
      <!-- 背景示例 类名 -->
      <view class="demo-bg bg-cover bg-center w-full h-[300rpx]"></view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.pages-container {
  min-height: 100vh;
  .pages-content {
    padding-top: 24rpx;

    .demo-bg {
      background-image: get_background_image('/images/demo/img_01.png');
    }
  }
}
</style>
