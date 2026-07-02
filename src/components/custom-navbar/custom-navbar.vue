<script setup>
const props = defineProps({
  icon: { type: String, default: 'chevron-left' },
  iconColor: { type: String, default: '#3D3D3D' },
  title: { type: String, default: '' },
  titleColor: { type: String, default: '#000000' },
  disableDefaultBack: { type: Boolean, default: false },
  scrollTop: { type: Number, default: 0 }, // 页面滚动距离
  placeholder: { type: Boolean, default: true }, // 是否占位
  background: { type: String, default: 'transparent' } // 背景颜色
})

const emit = defineEmits(['back']) // 抛出的事件

const navHeight = ref(44) // navbar高度
const contentStyle = ref('padding-left: 15px;') // navbar内容样式
const centerY = ref('50%') // navbar内容 - Y轴中心
// 将 hex 颜色转为 "r, g, b" 字符串，供 rgba() 使用；非 hex 格式回退白色
function hexToRgb(hex) {
  const m = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return m ? `${parseInt(m[1], 16)}, ${parseInt(m[2], 16)}, ${parseInt(m[3], 16)}` : '255, 255, 255'
}

const navbarStyle = computed(() => {
  let opacityNum = 0
  const { scrollTop } = props

  // 导航条颜色透明渐变
  if (scrollTop > 0 && scrollTop <= 240) {
    opacityNum = scrollTop / 300
  } else if (scrollTop > 240) {
    opacityNum = 0.8
  }

  // 非 transparent 时将传入颜色转为 rgb，保持半透明渐变效果
  const rgb = props.background !== 'transparent' ? hexToRgb(props.background) : '255, 255, 255'
  return `background-color: rgba(${rgb}, ${opacityNum});opacity: ${opacityNum > 0 ? 1 : 0};`
})

// #ifdef MP-WEIXIN
const menuButtonInfo = uni.getMenuButtonBoundingClientRect() // 胶囊按钮的布局位置信息
// width  宽度，单位：px
// height 高度，单位：px
// top    上边界坐标，单位：px
// right  右边界坐标，单位：px
// bottom 下边界坐标，单位：px
// left   左边界坐标，单位：px
const { width, height, top, right, bottom, left } = menuButtonInfo
const systemInfo = uni.getSystemInfoSync() // 获取系统信息的同步接口
// statusBarHeight  手机状态栏的高度
// screenWidth    屏幕宽度
const { statusBarHeight, screenWidth } = systemInfo
const styleData = {
  navbarHeight: bottom + top - statusBarHeight, // navbar容器高度
  maxWidth: left, // 微信小程序中 navbar 内容最大宽度
  padding: `${statusBarHeight}px 0 0 ${screenWidth - right + 8}px` // 左边距太窄，加 8px
}
{
  const { navbarHeight, maxWidth, padding } = styleData
  navHeight.value = navbarHeight
  contentStyle.value = `width: ${maxWidth}px;padding: ${padding}`
  centerY.value = `${(top + bottom) / 2}px`
}
// #endif

// 抛出 navbar 高度供父组件使用
defineExpose({ navHeight })

function goBack() {
  emit('back')
  if (!props.disableDefaultBack) {
    if (props.icon === 'home') {
      uni.switchTab({ url: '/pages/home/index' })
      return
    }
    uni.navigateBack({
      delta: 1,
      fail() {
        uni.switchTab({ url: '/pages/home/index' })
      }
    })
  }
}
</script>

<!-- 通用 navbar
  icon: home enum('home', 'chevron-left')
  title: '' 页面标题
  scrollTop: 0 页面滚动距离

  也可传入 slot (位置与胶囊垂直对齐) -->
<template>
  <view v-if="placeholder" :style="{ height: `${navHeight}px`, background: background }" />
  <!-- 脱离文档流 fixed 定位，毛玻璃效果 -->
  <view class="com-navbar" :style="{ height: `${navHeight}px` }">
    <!-- 背景效果：为兼容微信小程序iOS端 backdrop-filter 属性不支持动态变化，故另加元素动态控制 opacity 变化 -->
    <view class="com-navbar_bg" :style="navbarStyle" />
    <!-- 留出胶囊位置的内容。高度同navbar，有padding-left，垂直居中 -->
    <view class="com-navbar_content flex items-center gap-x-4" :style="contentStyle">
      <slot name="left">
        <t-icon v-if="icon" custom-style="{font-weight: bold;padding: 0 12rpx;}" :color="iconColor" :name="icon" size="54rpx" @click="goBack" />
      </slot>
    </view>
    <!-- title 绝对定位居中，相对屏幕水平居中、垂直对齐胶囊中心 -->
    <view class="com-navbar_title" :style="{ top: centerY }">
      <slot name="title">
        <view :style="{ color: titleColor }">{{ title }}</view>
      </slot>
    </view>
  </view>
</template>

<style lang="scss" scoped>
.com-navbar {
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  z-index: 999;

  &_bg {
    width: 100%;
    height: 100%;
    backdrop-filter: blur(25px);
  }

  &_title {
    position: absolute;
    left: 50%;
    transform: translate(-50%, -50%);
    pointer-events: none;
  }

  &_content {
    height: 100%;
    transform: translateY(-100%);
    box-sizing: border-box;
  }
}
</style>
