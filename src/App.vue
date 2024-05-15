<script setup lang="ts">
  import { RouterView } from 'vue-router';
  import { inputReceived } from '@/lib/player-controls';

  import Error from '@/components/Error.vue';

  import { useGameStore } from '@/stores/game-store';

  const gameStore = useGameStore();

  // Don't want the user to have to click the maze to play.
  // Don't want to do funky focus() and blur() gymnastics to make it work.
  document.addEventListener('keydown', inputReceived);
</script>

<template>
  <Error v-if="gameStore.error" />
  <header>
    <h1>Mazer</h1>
  </header>
  <main>
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
