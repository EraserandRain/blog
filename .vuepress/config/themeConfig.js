const nav = require('./nav')
const themeConfig = {
    type: "blog",
    logo: "/toad.jpg",
    mode: 'dark',
    blogConfig: {
        category: { location: 2, text: "Category" },
        tag: { location: 3, text: "Tag" }
    },
    authorAvatar: "/toad.jpg",
    search: true,
    searchMaxSuggestions: 10,
    lastUpdated: "Last Updated",
    nav,
    subSidebar: 'auto',
    smoothScroll: true
}
module.exports = themeConfig