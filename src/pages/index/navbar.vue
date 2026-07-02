<script setup>
import config from '@/config'
const { staticBaseUrl } = config
// ========== 页面滚动 ==========
const scrollTop = ref(0)
onPageScroll(res => (scrollTop.value = res.scrollTop))

onLoad(options => {})
// 我的页面相关路由，用于我的页面分包加载
</script>
<template>
  <view class="pages-container bg-[#E9F0EF]">
    <custom-navbar title="自定义navbar演示" :scroll-top="scrollTop" />
    <view class="pages-content">
      <view class="flex gap-24rpx justify-center">
        <view class="text-[32rpx] font-bold text-center text-[#3f536e] bg-[#46c9d0] p-12rpx rounded-24rpx">顶部毛玻璃</view>
        <view class="text-[32rpx] font-bold text-center text-[#ffffff] bg-[#4609d0] p-12rpx rounded-24rpx">测试</view>
      </view>
    </view>
  </view>
</template>
<style lang="scss" scoped>
.pages-container {
  min-height: 120vh;
  .pages-content {
    padding-top: 24rpx;
  }
}
</style>
