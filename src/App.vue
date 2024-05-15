<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { inputReceived } from '@/lib/player-controls';

  import Error from '@/components/Error.vue';

  import { useGameStore } from '@/stores/game-store';

  const gameStore = useGameStore();
</script>

<template>
  <Error v-if="gameStore.error" />
  <header>
    <h1>Mazer</h1>
  </header>
  <main @keydown="inputReceived" tabindex="0">
    <RouterView />
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-wrap: wrap;
    outline: none;
    flex-direction: column;
  }
</style>
