export function groupPostsByYear(posts) {
    const groups = new Map()

    for (const post of posts) {
        const year = post.date.slice(0, 4)

        if (!groups.has(year)) {
            groups.set(year, [])
        }

        groups.get(year).push(post)
    }

    return [...groups.entries()].map(([year, yearPosts]) => ({
        year,
        posts: yearPosts,
    }))
}
