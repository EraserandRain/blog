export const DEFAULT_SECTION = 'coding'
export const VALID_SECTIONS = ['ai', 'coding', 'life']
export const POST_SUMMARY_MAX_LENGTH = 140

const SECTION_LABELS = {
    ai: 'AI',
    coding: 'Coding',
    life: 'Life',
}

export function formatDate(input) {
    const date = new Date(`${input}T00:00:00`)

    return new Intl.DateTimeFormat('en', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
    }).format(date)
}

export function stripMarkdown(source) {
    return source
        .replace(/^---[\s\S]*?---/, '')
        .replace(/```[\s\S]*?```/g, ' ')
        .replace(/`([^`]+)`/g, '$1')
        .replace(/!\[[^\]]*\]\([^)]+\)/g, ' ')
        .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
        .replace(/^#{1,6}\s+/gm, '')
        .replace(/<[^>]+>/g, ' ')
        .replace(/^\s*[-*+]\s+/gm, '')
        .replace(/\s+[.,!?;:](?=\s)/g, ' ')
        .replace(/\s+/g, ' ')
        .trim()
}

export function createSummary(source) {
    if (!source) {
        return ''
    }

    const plain = stripMarkdown(source)

    if (plain.length <= POST_SUMMARY_MAX_LENGTH) {
        return plain
    }

    return `${plain.slice(0, POST_SUMMARY_MAX_LENGTH - 3).trimEnd()}...`
}

export function normalizeSection(input) {
    const section = String(input || DEFAULT_SECTION)

    return VALID_SECTIONS.includes(section) ? section : DEFAULT_SECTION
}

export function sectionLabel(section) {
    return SECTION_LABELS[normalizeSection(section)]
}

export function normalizePost({ url, frontmatter = {}, src = '' }) {
    return {
        title: String(frontmatter.title || 'Untitled'),
        url,
        date: String(frontmatter.date || ''),
        dateLabel: formatDate(String(frontmatter.date || '1970-01-01')),
        section: normalizeSection(frontmatter.section),
        tags: Array.isArray(frontmatter.tags) ? frontmatter.tags.map(String) : [],
        summary: String(frontmatter.summary || createSummary(src)),
    }
}

export function sortPostsByDateDesc(posts) {
    return [...posts].sort((a, b) => +new Date(`${b.date}T00:00:00`) - +new Date(`${a.date}T00:00:00`))
}

export function buildPosts(rawPosts) {
    return sortPostsByDateDesc(rawPosts.map(normalizePost).filter((post) => post.title && post.date))
}

export function filterPostsBySection(posts, section) {
    return posts.filter((post) => post.section === section)
}

export function takeLatestPosts(posts, count = 6) {
    return posts.slice(0, count)
}
