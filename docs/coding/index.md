<script setup>
import PostList from '../components/PostList.vue'
import { filterPostsBySection } from '../lib/posts.mjs'
import { data as posts } from '../posts.data.mjs'

const codingPosts = filterPostsBySection(posts, 'coding')
</script>

# Coding

Programming notes, infrastructure references, debugging write-ups, and toolchain scraps.

<PostList
  :posts="codingPosts"
  empty-title="No coding posts yet"
  empty-text="Add a technical note under docs/posts/ and mark it with section: coding."
/>
