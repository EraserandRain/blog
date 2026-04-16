import { createContentLoader } from 'vitepress'

import { buildPosts } from './lib/posts.mjs'

export default createContentLoader('posts/*.md', {
    includeSrc: true,
    transform(raw) {
        return buildPosts(raw)
    },
})
