import fs from 'node:fs'
import path from 'node:path'
import assert from 'node:assert/strict'

import { describe, it } from 'node:test'

import { VALID_SECTIONS } from '../../docs/lib/posts.mjs'

const postsDir = path.resolve('docs/posts')
const postFiles = fs.readdirSync(postsDir).filter((file) => file.endsWith('.md'))

function readFrontmatter(file) {
    const source = fs.readFileSync(path.join(postsDir, file), 'utf8')
    const match = source.match(/^---\r?\n([\s\S]*?)\r?\n---/)

    return match ? match[1] : ''
}

function readField(frontmatter, key) {
    const match = frontmatter.match(new RegExp(`^${key}:\\s*(.+)$`, 'm'))

    return match ? match[1].trim().replace(/^['"]|['"]$/g, '') : ''
}

describe('post frontmatter contracts', () => {
    it('requires every post to declare title, date, and section', () => {
        const missing = postFiles
            .map((file) => {
                const frontmatter = readFrontmatter(file)

                return {
                    file,
                    title: readField(frontmatter, 'title'),
                    date: readField(frontmatter, 'date'),
                    section: readField(frontmatter, 'section'),
                }
            })
            .filter(({ title, date, section }) => !title || !date || !section)

        assert.deepEqual(missing, [])
    })

    it('limits section values to the supported taxonomy', () => {
        const invalidSections = postFiles
            .map((file) => ({
                file,
                section: readField(readFrontmatter(file), 'section'),
            }))
            .filter(({ section }) => !VALID_SECTIONS.includes(section))

        assert.deepEqual(invalidSections, [])
    })

    it('uses ISO-like dates that parse cleanly', () => {
        const invalidDates = postFiles
            .map((file) => ({
                file,
                date: readField(readFrontmatter(file), 'date'),
            }))
            .filter(({ date }) => !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(+new Date(`${date}T00:00:00`)))

        assert.deepEqual(invalidDates, [])
    })
})
