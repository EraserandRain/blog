<script setup>
import PostList from '../components/PostList.vue'
import { filterPostsBySection } from '../lib/posts.mjs'
import { data as posts } from '../posts.data.mjs'

const lifePosts = filterPostsBySection(posts, 'life')
</script>

# Life

Personal notes, routines, reading fragments, and the non-technical side of the notebook.

<PostList
  :posts="lifePosts"
  empty-title="No life posts yet"
  empty-text="When you are ready, add a post with section: life and it will appear here."
/>
