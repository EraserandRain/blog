import { defineUserConfig } from 'vuepress'
import type { DefaultThemeOptions } from 'vuepress'
import recoTheme from 'vuepress-theme-reco'
const themeConfig = require('./config/themeConf')

export default defineUserConfig({
  title: "EraserRain's Blog",
  description: '',
  head: [
    ["link", { rel: "icon", href: "/toad.jpg" }],
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }]
  ],
  locales: {
    '/': {
      lang: 'zh-CN'
    },
  },
  theme: recoTheme(themeConfig),
  // debug: true,
})
