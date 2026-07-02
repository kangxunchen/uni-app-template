/**
 * 说明：仅对微信小程序、H5平台兼容，微信小程序开发专用，兼容H5是因为Web端热更新响应快。
 * @property {string} baseUrl - 基础URL
 * @property {string} staticBaseUrl - 静态资源URL，本地开发时需要启动nginx代理，转发项目根目录的 www 文件夹，所有静态资源都放到 www 文件夹下统一维护。
 * static目录下的所有文件，无论是否被引用，uniapp都会直接打包，微信小程序主包最大2M，所以需要将静态资源放到 www 文件夹下。
 */

// 接口请求地址，从 .env.development / .env.production 中读取
let baseUrl = import.meta.env.VITE_BASE_URL

// #ifdef WEB
baseUrl = import.meta.env.VITE_PROXY_PREFIX
// #endif

const staticBaseUrl = import.meta.env.VITE_STATIC_BASE_URL

export { baseUrl, staticBaseUrl }

// 应用全局配置
export default {
  // 应用信息
  appInfo: {
    // 应用名称
    name: 'ruoyi-app',
    // 应用版本
    version: '1.2.0',
    // 应用logo
    logo: '/static/logo.png',
    // 官方网站
    site_url: 'http://ruoyi.vip',
    // 政策协议
    agreements: [
      {
        title: '隐私政策',
        url: 'https://ruoyi.vip/protocol.html'
      },
      {
        title: '用户服务协议',
        url: 'https://ruoyi.vip/protocol.html'
      }
    ]
  }
}
