<script setup>
import ArchiveList from '../components/ArchiveList.vue'
import { groupPostsByYear } from '../lib/archive.mjs'
import { data as posts } from '../posts.data.mjs'

const groups = groupPostsByYear(posts)
</script>

# Archive

Everything in one chronological stream, regardless of section.

<ArchiveList :groups="groups" />
