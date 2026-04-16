<template>
  <div class="post-list">
    <div v-if="posts.length" class="post-grid">
      <article v-for="post in posts" :key="post.url" class="post-card">
        <p class="meta">
          <span class="section">{{ sectionLabel(post.section) }}</span>
          <span class="dot">·</span>
          <time :datetime="post.date">{{ post.dateLabel }}</time>
        </p>
        <h2 class="title">
          <a :href="post.url">{{ post.title }}</a>
        </h2>
        <p v-if="post.summary" class="summary">{{ post.summary }}</p>
        <ul v-if="post.tags.length" class="tags">
          <li v-for="tag in post.tags" :key="`${post.url}-${tag}`">#{{ tag }}</li>
        </ul>
      </article>
    </div>
    <div v-else class="empty-state">
      <h2>{{ emptyTitle }}</h2>
      <p>{{ emptyText }}</p>
    </div>
  </div>
</template>

<script setup>
import { sectionLabel } from '../lib/posts.mjs'

defineProps({
  posts: {
    type: Array,
    default: () => [],
  },
  emptyTitle: {
    type: String,
    default: 'Nothing here yet',
  },
  emptyText: {
    type: String,
    default: 'Add a new post and it will show up automatically.',
  },
})
</script>

<style scoped>
.post-grid {
  display: grid;
  gap: 1rem;
}

.post-card {
  border: 1px solid var(--vp-c-divider);
  border-radius: 20px;
  padding: 1.1rem 1.2rem;
  background:
    radial-gradient(circle at top right, rgba(49, 120, 198, 0.12), transparent 32%),
    var(--vp-c-bg-soft);
}

.meta {
  margin: 0 0 0.45rem;
  color: var(--vp-c-text-2);
  font-size: 0.9rem;
}

.section {
  color: var(--vp-c-brand-1);
  font-weight: 600;
}

.dot {
  margin: 0 0.35rem;
}

.title {
  margin: 0;
  font-size: 1.15rem;
  line-height: 1.35;
}

.title a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.title a:hover {
  color: var(--vp-c-brand-1);
}

.summary {
  margin: 0.65rem 0 0;
  color: var(--vp-c-text-2);
}

.tags {
  display: flex;
  flex-wrap: wrap;
  gap: 0.45rem;
  margin: 0.8rem 0 0;
  padding: 0;
  list-style: none;
}

.tags li {
  border-radius: 999px;
  padding: 0.2rem 0.6rem;
  background: var(--vp-c-default-soft);
  color: var(--vp-c-text-2);
  font-size: 0.82rem;
}

.empty-state {
  border: 1px dashed var(--vp-c-divider);
  border-radius: 20px;
  padding: 1.2rem;
  background: var(--vp-c-bg-soft);
}

.empty-state h2 {
  margin: 0;
  font-size: 1.05rem;
}

.empty-state p {
  margin: 0.45rem 0 0;
  color: var(--vp-c-text-2);
}
</style>
