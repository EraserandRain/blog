const themeConfig = require('./config/themeConfig')
const plugins = require('./config/plugins')
module.exports = {
  title: "EraserRain's Blog",
  description: '',
  dest: "public",
  head: [
    ["link", { rel: "icon", href: "/toad.jpg" }],
    ["meta", { name: "viewport", content: "width=device-width,initial-scale=1,user-scalable=no" }]
  ],
  locales: {
    '/': {
      lang: 'zh-CN'
    }
  },
  theme: "reco",
  themeConfig,
  plugins,
  markdown: {
    "lineNumbers": true
  },
}