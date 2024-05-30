<script setup lang="ts">
  import { allMazeTypes } from '@/lib/maze-types'
  import MazeCard from '@/components/MazeCard.vue';
</script>

<template>
  <div id="main-menu">
    <div class="type">
      <h2>Standard Mazes</h2>
      <div class="type-row">
        <MazeCard
          v-for="mazeType in allMazeTypes.normal"
          :key="mazeType.id"
          :mazeType="mazeType"
        />
      </div>
    </div>
    <div class="type">
      <h2>Woven Mazes</h2>
      <div class="type-row">
        <MazeCard
          v-for="mazeType in allMazeTypes.woven"
          :key="mazeType.id"
          :mazeType="mazeType"
        />
      </div>
    </div>
  </div>
</template>

<style scoped>
  .type {
    display: flex;
    flex-direction: column;
    justify-content: left;
    margin-top: 20px;
  }

  .type-row {
    display: flex;
    flex-direction: row;
  }
</style>