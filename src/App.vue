<script setup lang="ts">
  import { getMazeType, allMazeTypes, Casual, WovenCasual } from './lib/maze-types'
  import { inputReceived } from './lib/player-controls';
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

  const gameStore = useGameStore();
  const mazeStore = useMazeStore();

  watch(mazeStore.getCurrentCell, async (updatedValue, _) => {
    if (!updatedValue.isGoal) { return; }

    // It's a little jarring without a slight delay
    // This also gives us the opportunity to play some kind of
    // congratulatory animation in the future.
    setTimeout(() => gameStore.setState('win'), 200);
  });

  const makeSelection = async (mazeTypeId: number) => {
    // Used for "Play Again" functionality
    gameStore.setSelectedMazeType(mazeTypeId);
    const mazeType = getMazeType(mazeTypeId)!;
    gameStore.setState('build');
    buildMaze(mazeType);
  };

  const buildMaze = async (mazeType: MazeType) => {
    let generator: Generator;

    if (mazeType === Casual || mazeType === WovenCasual) {
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

  const showMaze = () => {
    return ['play', 'win'].some((s) => s === gameStore.state);
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
  <main @keydown="inputReceived" tabindex="0">
    <div v-if="gameStore.state === 'main-menu'">
      <div class="type">
        <h2>Standard Mazes</h2>
        <div class="type-row">
          <MazeCard
            v-for="mazeType in allMazeTypes.normal"
            :key="mazeType.id"
            :mazeType="mazeType"
            @click="makeSelection(mazeType.id)"
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
            @click="makeSelection(mazeType.id)"
          />
        </div>
      </div>
    </div>
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
    flex-direction: column;
  }

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
