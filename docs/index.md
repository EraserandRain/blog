---
layout: home

hero:
  name: EraserRain
  text: Notes on AI, coding, and life
  tagline: A personal notebook for experiments, debugging sessions, and the quieter parts of everyday work.
features:
  - title: AI
    details: Prompts, agent workflows, model experiments, and practical notes.
    link: /ai/
  - title: Coding
    details: Programming write-ups, tooling references, debugging notes, and DevOps scraps.
    link: /coding/
  - title: Life
    details: Daily observations, routines, reading notes, and work-life fragments.
    link: /life/
  - title: Archive
    details: Browse every post in one reverse-chronological list.
    link: /archive/
---

<script setup>
import PostList from './components/PostList.vue'
import { takeLatestPosts } from './lib/posts.mjs'
import { data as posts } from './posts.data.mjs'

const latestPosts = takeLatestPosts(posts, 6)
</script>

## Latest Notes

<PostList
  :posts="latestPosts"
  empty-title="No posts yet"
  empty-text="Start by adding your first note under docs/posts/."
/>
