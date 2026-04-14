<script setup>
import PostList from '../components/PostList.vue'
import { data as posts } from '../posts.data.mjs'

const aiPosts = posts.filter((post) => post.section === 'ai')
</script>

# AI

Notes on prompts, agents, model evaluations, and practical AI workflows.

<PostList
  :posts="aiPosts"
  empty-title="No AI posts yet"
  empty-text="The section is ready for your first AI experiment, review, or workflow note."
/>
