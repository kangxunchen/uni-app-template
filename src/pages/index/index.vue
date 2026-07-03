<template>
  <view class="page-container">
    <view class="flex gap-1 flex-wrap">
      <t-button @click="$tab.navigateTo('/pages/login')">登录</t-button>
      <t-button @click="$tab.navigateTo('/pages/demo/navbar')">自定义navbar演示</t-button>
      <t-button theme="primary" @click="$tab.navigateTo('/pages/demo/img')">图片演示</t-button>
    </view>
  </view>
</template>

<script></script>

<style></style>
