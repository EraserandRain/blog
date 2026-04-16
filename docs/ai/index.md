<script setup>
import PostList from '../components/PostList.vue'
import { filterPostsBySection } from '../lib/posts.mjs'
import { data as posts } from '../posts.data.mjs'

const aiPosts = filterPostsBySection(posts, 'ai')
</script>

# AI

Notes on prompts, agents, model evaluations, and practical AI workflows.

<PostList
  :posts="aiPosts"
  empty-title="No AI posts yet"
  empty-text="The section is ready for your first AI experiment, review, or workflow note."
/>
