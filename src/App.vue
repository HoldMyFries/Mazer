<script setup lang="ts">
  import { getMazeType, Casual, Easy, Medium, Hard, Diabolical } from './lib/maze-types'
  import type { MazeType } from './lib/interfaces';

  import MazeCard from './components/MazeCard.vue';
  import Loading from './components/Loading.vue';
  import Maze from './components/maze/Maze.vue';
  import WinModal from './components/maze/WinModal.vue';

  import { useGameStore } from './stores/game-store';
  import { useMazeStore } from './stores/maze-store';

  import { Generator } from './lib/generators/generator';
  import { CasualMaze } from './lib/generators/casual';
  import { ComplexMaze } from './lib/generators/complex';

  import { watch, nextTick } from 'vue';

  const allTypes = [ Casual, Easy, Medium, Hard, Diabolical ];
  const gameStore = useGameStore();
  const mazeStore = useMazeStore();

  watch(mazeStore.getCurrentCell, async (updatedValue, _) => {
    if (!updatedValue.isGoal) { return; }

    // It's a little jarring without a slight delay
    // This also gives us the opportunity to play some kind of
    // congratulatory animation in the future.
    await nextTick();
    gameStore.setState('win');
  });

  const makeSelection = async (mazeTypeId: number) => {
    // Used for "Play Again" functionality
    gameStore.setSelectedMazeType(mazeTypeId);
    const mazeType = getMazeType(mazeTypeId)!;
    gameStore.setState('build');
    await buildMaze(mazeType);
  };

  const buildMaze = async (mazeType: MazeType) => {
    let generator: Generator;

    if (mazeType === Casual) {
      generator = new CasualMaze(mazeType);
    } else {
      generator = new ComplexMaze(mazeType);
    }

    generator.generate();
    mazeStore.setNewMaze(generator);

    await nextTick();
    gameStore.setState('play');
    document.getElementsByTagName('main')[0].focus();
  }

  const onKeyPressed = (e: any) => {
    if (gameStore.state !== 'play') { return; }

    const keyCodes = [ 87, 65, 83, 68, 38, 37, 40, 39 ];
    const supportedKeypress = Object.values(keyCodes).find((c) => c === e.keyCode);
    if (!supportedKeypress) { return; }

    if (e.keyCode === 87 || e.keyCode === 38) { return mazeStore.moveUp(); }
    if (e.keyCode === 65 || e.keyCode === 37) { return mazeStore.moveLeft(); }
    if (e.keyCode === 83 || e.keyCode === 40) { return mazeStore.moveDown(); }
    if (e.keyCode === 68 || e.keyCode === 39) { return mazeStore.moveRight(); }
  };

  const showMaze = () => {
    return ['play', 'win'].indexOf(gameStore.state) > -1;
  };

  const playAgain = async () => {
    const mazeType = getMazeType(gameStore.mazeTypeId)!;
    gameStore.setState('build');
    await buildMaze(mazeType);
  };
</script>

<template>
  <header>
    <h1>Mazer</h1>
  </header>
  <!--
    I put the keybind event up here because I didn't want the user to have
    to click on the maze specifically.  They should be able to "focus" just
    about anywhere and be able to play the game.
  -->
  <main @keydown="onKeyPressed" tabindex="0">
    <MazeCard
      v-if="gameStore.state === 'main-menu'"
      v-for="mazeType in allTypes"
      :key="mazeType.id"
      :mazeType="mazeType"
      @click="makeSelection(mazeType.id)"
    />
    <Loading v-if="gameStore.state === 'build'" />
    <Maze v-if="showMaze()" />
    <WinModal v-if="gameStore.state === 'win'" @play-again="playAgain" />
  </main>
</template>

<style scoped>
  main {
    display: flex;
    flex-wrap: wrap;
    outline: none;
  }
</style>
