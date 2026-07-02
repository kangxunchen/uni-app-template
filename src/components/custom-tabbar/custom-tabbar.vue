<script>
import config from '@/config'
export default {
  data() {
    return {
      currentPath: '',
      tabList: [
        {
          name: '首页',
          icon: `${config.staticBaseUrl}/images/common/icon_tab10.png`,
          activeIcon: `${config.staticBaseUrl}/images/common/icon_tab11.png`,
          path: '/pages/home/index'
        },
        {
          icon: `${config.staticBaseUrl}/images/common/icon_tab-mid.png`
        }, // 中间空位
        {
          name: '我的',
          icon: `${config.staticBaseUrl}/images/common/icon_tab20.png`,
          activeIcon: `${config.staticBaseUrl}/images/common/icon_tab21.png`,
          path: '/pages/mine/index'
        }
      ]
    }
  },
  created() {
    // 获取页面栈
    const pages = getCurrentPages()
    // 当前页面实例
    const currentPage = pages[pages.length - 1]
    // 页面路径（加上前缀 /）
    this.currentPath = `/${currentPage.route}`
  },
  methods: {
    // 扫码
    scanCode() {
      // #ifdef H5
      this.$tab.navigateTo('/pages-periphery/discount/index')
      // #endif
      uni.scanCode({
        success: res => {
          const scannedUrl = res.result
          // 必须是优惠买单专属链接格式，否则提示并终止
          if (!/^https:\/\/ailutrip\.inspurwenlv\.com\/discount\?id=/.test(scannedUrl)) {
            uni.showToast({ title: '二维码格式不正确，请扫描商家优惠码', icon: 'none', duration: 2000 })
            return
          }
          this.$tab.navigateTo(`/pages-periphery/discount/index?url=${encodeURIComponent(scannedUrl)}`)
        }
      })
    }
  }
}
</script>
<template>
  <view class="com-tabbar">
    <template v-for="(item, index) in tabList" :key="item.name">
      <view v-if="index !== 1" :class="{ active: item.path === currentPath }" class="tab-item" @click="$tab.switchTab(item.path)">
        <image :src="item.path === currentPath ? item.activeIcon : item.icon" class="tab-icon"></image>
        <view class="tab-name">{{ item.name }}</view>
      </view>
      <view v-else class="tab-mid" @tap="scanCode">
        <image class="size-196rpx" :src="item.icon" />
      </view>
    </template>
  </view>
</template>
<style lang="scss" scoped>
.com-tabbar {
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  backdrop-filter: blur(15px);
  -webkit-backdrop-filter: blur(15px);
  // height: 100rpx;
  // padding-bottom: calc(constant(safe-area-inset-bottom) + 20rpx); // 兼容 IOS<11.2
  // padding-bottom: calc(env(safe-area-inset-bottom) + 20rpx); // 兼容 IOS>11.2
  display: flex;
  justify-content: space-around;
  align-items: center;
  padding: 0 20rpx;
  .tab-item {
    &.active {
      .tab-name {
        font-weight: 500;
        color: #00958a;
      }
    }
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    padding: 0 46rpx 46rpx;
    .tab-icon {
      width: 60rpx;
      height: 60rpx;
    }
    .tab-name {
      font-weight: 400;
      font-size: 22rpx;
      color: #9c9c9c;
      line-height: 24rpx;
    }
  }
  .tab-mid {
    transform: translateY(-26rpx);
  }
}
</style>
