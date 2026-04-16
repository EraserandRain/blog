import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import {
    buildPosts,
    createSummary,
    filterPostsBySection,
    formatDate,
    normalizeSection,
    sectionLabel,
    stripMarkdown,
    takeLatestPosts,
} from '../../docs/lib/posts.mjs'

describe('posts helpers', () => {
    it('strips frontmatter, links, images, code blocks, and headings from markdown', () => {
        const source = `---
title: Sample
date: '2026-04-14'
---

# Heading

Intro with [link](https://example.com) and ![image](img.png).

\`inline\`

\`\`\`js
console.log('hidden')
\`\`\`
`

        assert.equal(stripMarkdown(source), 'Heading Intro with link and inline')
    })

    it('creates a summary capped at 140 characters', () => {
        const summary = createSummary('a'.repeat(160))

        assert.equal(summary.length, 140)
        assert.equal(summary.endsWith('...'), true)
    })

    it('normalizes and sorts posts by date descending', () => {
        const posts = buildPosts([
            {
                url: '/older',
                frontmatter: { title: 'Older', date: '2024-01-01', section: 'life' },
                src: 'Older summary',
            },
            {
                url: '/newer',
                frontmatter: { title: 'Newer', date: '2024-04-01', section: 'ai', tags: ['agent'] },
                src: 'Newer summary',
            },
        ])

        assert.deepEqual(posts.map((post) => post.title), ['Newer', 'Older'])
        assert.deepEqual(posts[0], {
            title: 'Newer',
            url: '/newer',
            date: '2024-04-01',
            dateLabel: 'Apr 1, 2024',
            section: 'ai',
            tags: ['agent'],
            summary: 'Newer summary',
        })
    })

    it('filters posts by section and returns latest entries', () => {
        const posts = [
            { title: 'A', section: 'ai' },
            { title: 'B', section: 'coding' },
            { title: 'C', section: 'ai' },
        ]

        assert.deepEqual(
            filterPostsBySection(posts, 'ai').map((post) => post.title),
            ['A', 'C']
        )
        assert.deepEqual(
            takeLatestPosts(posts, 2).map((post) => post.title),
            ['A', 'B']
        )
    })

    it('formats yyyy-mm-dd dates for display', () => {
        assert.equal(formatDate('2024-01-02'), 'Jan 2, 2024')
    })

    it('falls back to the default section label for unknown sections', () => {
        assert.equal(normalizeSection('unknown'), 'coding')
        assert.equal(sectionLabel('unknown'), 'Coding')
    })
})
