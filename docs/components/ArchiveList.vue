<template>
  <div class="archive-list">
    <section v-for="group in groups" :key="group.year" class="year-group">
      <header class="year-header">
        <h2>{{ group.year }}</h2>
        <span>{{ group.posts.length }} post<span v-if="group.posts.length > 1">s</span></span>
      </header>
      <ol class="entries">
        <li v-for="post in group.posts" :key="post.url" class="entry">
          <time :datetime="post.date">{{ post.dateLabel }}</time>
          <a :href="post.url">{{ post.title }}</a>
          <span class="section">{{ sectionLabel(post.section) }}</span>
        </li>
      </ol>
    </section>
  </div>
</template>

<script setup>
import { sectionLabel } from '../lib/posts.mjs'

defineProps({
  groups: {
    type: Array,
    default: () => [],
  },
})
</script>

<style scoped>
.archive-list {
  display: grid;
  gap: 1.5rem;
}

.year-group {
  border-top: 1px solid var(--vp-c-divider);
  padding-top: 1rem;
}

.year-header {
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  align-items: baseline;
  margin-bottom: 0.85rem;
}

.year-header h2 {
  margin: 0;
  font-size: 1.35rem;
}

.year-header span {
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
}

.entries {
  display: grid;
  gap: 0.75rem;
  margin: 0;
  padding: 0;
  list-style: none;
}

.entry {
  display: grid;
  grid-template-columns: 7.5rem 1fr auto;
  gap: 0.85rem;
  align-items: start;
}

.entry time {
  color: var(--vp-c-text-2);
  font-size: 0.92rem;
}

.entry a {
  color: var(--vp-c-text-1);
  text-decoration: none;
}

.entry a:hover {
  color: var(--vp-c-brand-1);
}

.section {
  color: var(--vp-c-brand-1);
  font-size: 0.85rem;
  font-weight: 600;
}

@media (max-width: 640px) {
  .entry {
    grid-template-columns: 1fr;
    gap: 0.25rem;
  }
}
</style>
