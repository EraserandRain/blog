<script setup>
import ArchiveList from '../components/ArchiveList.vue'
import { data as posts } from '../posts.data.mjs'

const groups = Object.entries(
  posts.reduce((result, post) => {
    const year = post.date.slice(0, 4)
    if (!result[year]) {
      result[year] = []
    }
    result[year].push(post)
    return result
  }, {})
).map(([year, yearPosts]) => ({
  year,
  posts: yearPosts,
}))
</script>

# Archive

Everything in one chronological stream, regardless of section.

<ArchiveList :groups="groups" />
