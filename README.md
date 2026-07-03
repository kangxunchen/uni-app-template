# uni-app-template

uniapp 模板项目，用于快速启动 uniapp 项目，进行客制化开发。

相关配置见：`/src/config.js`
TDesign 自定义主题色 `src\static\scss\tdesign-theme.scss`

## 运行

```bash
npm install --registry=http://registry.npmmirror.com

# 运行 h5 环境
npm run dev:h5
# 运行 mp-weixin 环境
npm run dev:mp-weixin
```

## 示例代码

获取配置变量

```js
import { staticBaseUrl } from '@/config'
```

图片背景

```scss
.demo-bg {
  background-image: get_background_image('/images/demo/img_01.png');
}
```
