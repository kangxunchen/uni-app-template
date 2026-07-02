<script setup>
import { getToken } from '@/utils/auth'
import { getCurrentInstance } from 'vue'
import { onLaunch } from '@dcloudio/uni-app'

const { proxy } = getCurrentInstance()

onLaunch(() => {
  initApp()
})

// 初始化应用
function initApp() {
  // 检查用户登录状态
  //#ifdef H5
  checkLogin()
  //#endif
}

function checkLogin() {
  if (!getToken()) {
    proxy.$tab.reLaunch('/pages/login')
  }
}
</script>

<style lang="scss">
@import '@/static/scss/index.scss';
</style>
