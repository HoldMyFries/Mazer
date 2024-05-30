<script setup lang="ts">
  const { mazeType } = defineProps(['mazeType']);
</script>

<template>
  <RouterLink :to="`/maze/${mazeType.type}/${mazeType.difficulty}`">
    <div class="maze-card" :data-type="`${mazeType.type}`" :data-difficulty="`${mazeType.difficulty}`">
      <h3>{{ mazeType.name }}</h3>
      <p>{{ mazeType.description }}</p>
    </div>
  </RouterLink>
</template>

<style scoped>
  .maze-card {
    width: 250px;
    height: 150px;
    padding: 10px;
    cursor: pointer;
  }

  a { color: inherit; text-decoration: none; }

  .maze-card:hover { border: 1px solid black; padding: 9px; }

  .maze-card h3 {
    font-weight: bold;
    margin-bottom: 5px;
  }
</style>
