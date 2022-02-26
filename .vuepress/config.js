module.exports = {
  title: "EraserRain's Blog",
  description: "blog",
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
  themeConfig: {
    nav: [
      { text: "Home", link: "/", icon: "reco-home" },
      { text: "TimeLine", link: "/timeline/", icon: "reco-date" },
      { text: "GitHub", link: "https://github.com/EraserandRain", icon: "reco-github" }
    ],
    sidebar: {
      "/docs/theme-reco/": ["", "theme", "plugin", "api"]
    },
    subSidebar: 'auto',
    type: "blog",
    blogConfig: {
      category: { location: 2, text: "Category" },
      tag: { location: 3, text: "Tag" }
    },
    logo: "/toad.jpg",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    authorAvatar: "/toad.jpg",
  },
  markdown: {
    "lineNumbers": true
  },
  plugins: [
    ["vuepress-plugin-nuggets-style-copy", {
      copyText: "COPY",
    }]
  ]
}