<script setup lang="ts">
  const { mazeType } = defineProps(['mazeType']);
</script>

<template>
  <div class="maze-card">
    <h3>{{ mazeType.name }}</h3>
    <p>{{ mazeType.description }}</p>
  </div>
</template>

<style scoped>
  .maze-card {
    width: 250px;
    padding: 10px;
    cursor: pointer;
  }

  .maze-card:hover { border: 1px solid black; padding: 9px; }

  .maze-card h3 {
    font-weight: bold;
    margin-bottom: 5px;
  }
</style>
