/**
 * @type {import('vitepress').DefaultTheme.Config}
 */
const themeConfig = {
    lastUpdatedText: 'Last Updated',
    siteTitle: "EraserRain's Blog",
    search: {
        provider: 'local',
    },
    nav: [
        { text: 'Home', link: '/' },
        { text: 'AI', link: '/ai/' },
        { text: 'Coding', link: '/coding/' },
        { text: 'Life', link: '/life/' },
        { text: 'Archive', link: '/archive/' },
    ],
    sidebar: false,
    socialLinks: [{ icon: 'github', link: 'https://github.com/EraserandRain' }],
    outline: [2, 3],
}

module.exports = themeConfig
