<script setup lang="ts">
  import { getMazeTypeByTypeAndDifficulty } from '@/lib/maze-types';
  import { ConstructionType, Difficulty, GameState } from '@/lib/enums';

  import { Generator } from '@/lib/generators/generator';
  import { CasualMaze } from '@/lib/generators/casual';
  import { ComplexMaze } from '@/lib/generators/complex';

  import Loading from '@/components/Loading.vue';
  import Maze from '@/components/maze/Maze.vue';
  import WinModal from '@/components/maze/WinModal.vue';

  import { useGameStore } from '@/stores/game-store';
  import { useMazeStore } from '@/stores/maze-store';

  import { useRoute, useRouter } from 'vue-router';
  import { computed, watch } from 'vue';

  const gameStore = useGameStore();
  const mazeStore = useMazeStore();
  const router    = useRouter();

  watch(gameStore.getState, (updatedValue, _) => {
    if (updatedValue === GameState.PLAY) { document.getElementsByTagName('main')[0].focus(); }
  });

  const { type, difficulty } = useRoute().params;
  const mazeType = getMazeTypeByTypeAndDifficulty(type as ConstructionType, difficulty as Difficulty);

  const buildMaze = () => {
    gameStore.setSelectedMazeType(mazeType!.id);

    let generator: Generator;

    if (mazeType!.difficulty === Difficulty.CASUAL) {
      generator = new CasualMaze(mazeType!);
    } else {
      generator = new ComplexMaze(mazeType!);
    }

    generator.generate();

    mazeStore.setNewMaze(generator);
    gameStore.setState(GameState.PLAY);
  };

  const playAgain = () => {
    gameStore.setState(GameState.BUILD);

    // Vue needs time to teardown the old <Maze />
    // 10 milliseconds seems to be sufficient.
    setTimeout(buildMaze, 10);
  }

  watch(mazeStore.getCurrentCell, async (updatedValue, _) => {
    if (!updatedValue.isGoal) { return; }

    // It's a little jarring without a slight delay
    // This also gives us the opportunity to play some kind of
    // congratulatory animation in the future.
    setTimeout(() => gameStore.setState(GameState.WIN), 200);
  });

  const showMaze = computed(() => gameStore.state === GameState.PLAY || gameStore.state === GameState.WIN);

  if (!mazeType) {
    gameStore.setError(`No maze type found for configuration ${type} => ${difficulty}`);
    router.push('/');
  } else {
    gameStore.setState(GameState.BUILD);
    buildMaze();
  }

</script>

<template>
  <Loading v-if="gameStore.state === GameState.BUILD" />
  <Maze v-if="showMaze" />
  <WinModal v-if="gameStore.state === GameState.WIN" @playAgain="playAgain" />
</template>

<style scoped>
  #player { outline: none; }
</style>