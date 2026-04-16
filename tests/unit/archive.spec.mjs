import assert from 'node:assert/strict'
import { describe, it } from 'node:test'

import { groupPostsByYear } from '../../docs/lib/archive.mjs'

describe('archive helpers', () => {
    it('groups posts by year while preserving chronological order', () => {
        const groups = groupPostsByYear([
            { title: 'Newest', date: '2025-02-01' },
            { title: 'Next', date: '2025-01-15' },
            { title: 'Older', date: '2024-12-20' },
        ])

        assert.deepEqual(groups, [
            {
                year: '2025',
                posts: [
                    { title: 'Newest', date: '2025-02-01' },
                    { title: 'Next', date: '2025-01-15' },
                ],
            },
            {
                year: '2024',
                posts: [{ title: 'Older', date: '2024-12-20' }],
            },
        ])
    })
})
