/**
 * @type {import('vitepress').UserConfig}
 */
const themeConfig = require('./config/themeConfig')

module.exports = {
    lang: 'en-US',
    title: "EraserRain's Blog",
    description: 'Notes on AI, coding, and life.',
    appearance: 'dark',
    lastUpdated: true,
    cleanUrls: true,
    outDir: '../public',
    themeConfig,
}
