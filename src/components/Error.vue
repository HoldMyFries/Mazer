<script setup lang="ts">
  import { useGameStore } from '@/stores/game-store';

  const gameStore = useGameStore();
</script>

<template>
  <div id="error">
    <h3>
      {{ gameStore.error }}
      <span class="close" @click="gameStore.clearError">X</span>
    </h3>
  </div>
</template>

<style scoped>
  #error {
    background-color: rgb(255, 0, 0, 0.75);
    min-height: 45px;
    width: 100%;
    padding: 10px;
    color: white;
    font-weight: bold;
  }

  .close { float: right; cursor: pointer; }
</style>