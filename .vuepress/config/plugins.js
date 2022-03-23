const plugins = [
    ['one-click-copy', {
        copySelector: ['div[class*="language-"] pre', 'div[class*="aside-code"] aside'],
        copyMessage: 'Copied successfully!', 
        toolTipMessage: 'COPY',
        duration: 600, 
    }],
    // ["vuepress-plugin-nuggets-style-copy", {
    //     copyText: "COPY",
    //     tip: {
    //         content: "Copied!",
    //     }
    // }],
    ["vuepress-plugin-auto-sidebar", {
        sort: {
            mode: "asc",
            readmeFirst: true,
        },
        title: {
            mode: "titlecase",
            map: {}
        },
        sidebarDepth: 2,
        collapse: {
            open: false,
            collapseList: [],
            uncollapseList: []
        },
        ignore: [],
        git: {
            trackStatus: 'all'
        }
    }],
    ["@vuepress-reco/vuepress-plugin-kan-ban-niang", {
        theme: ['wanko'],
        clean: true,
        modelStyle: { right: '50px', bottom: '-20px', opacity: '0.9' },
        width: 150,
        height: 192,
    }],
    ["@vuepress-reco/vuepress-plugin-pagation", {
        total: 10,
        perPage: 10,
        currentPage: 1,
    }],
    ["vuepress-plugin-cursor-effects", {
        size: 2,
        shape: 'circle',
        zIndex: 999999999,
    }],
]
module.exports = plugins