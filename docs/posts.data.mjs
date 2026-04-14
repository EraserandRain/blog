import { createContentLoader } from 'vitepress'

function formatDate(input) {
    const date = new Date(`${input}T00:00:00`)
    return new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date)
}

function stripMarkdown(source) {
    return source
        .replace(/^---[\s\S]*?---/, '')
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/^\s*[-*+]\s+/gm, '')
        .replace(/\s+/g, ' ')
        .trim()
}

function createSummary(source) {
    if (!source) {
        return ''
    }

    const plain = stripMarkdown(source)
    if (plain.length <= 140) {
        return plain
    }

    return `${plain.slice(0, 137).trimEnd()}...`
}

export default createContentLoader('posts/*.md', {
    includeSrc: true,
    transform(raw) {
        return raw
            .map(({ url, frontmatter, src }) => {
                const section = String(frontmatter.section || 'coding')
                const tags = Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : []

                return {
                    title: String(frontmatter.title || 'Untitled'),
                    url,
                    date: String(frontmatter.date || ''),
                    dateLabel: formatDate(String(frontmatter.date || '1970-01-01')),
                    section,
                    tags,
                    summary: String(frontmatter.summary || createSummary(src)),
                }
            })
            .filter((post) => post.title && post.date)
            .sort((a, b) => +new Date(`${b.date}T00:00:00`) - +new Date(`${a.date}T00:00:00`))
    },
})
