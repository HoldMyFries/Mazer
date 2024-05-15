<script setup lang="ts">
  import { useMazeStore } from '@/stores/maze-store';
  import { useRouter } from 'vue-router';

  const mazeStore = useMazeStore();
  const height = `${mazeStore.mazeConfig.height * mazeStore.mazeConfig.cellHeight!}px`;
  const { hours, minutes, seconds, milliseconds } = mazeStore.getTimeInMaze();
  const mazeStats = mazeStore.mazeStats;

  const visitedPercent = Math.round(mazeStats.visitedCount / (mazeStore.mazeConfig.height * mazeStore.mazeConfig.width) * 100);

  let solveTime = '';
  solveTime    += `${hours.toString().padStart(2, '0')}:`;
  solveTime    += `${minutes.toString().padStart(2, '0')}:`;
  solveTime    += `${seconds.toString().padStart(2, '0')}.`;
  solveTime    += milliseconds.toString().padStart(3, '0');

  const router = useRouter();
  const mainMenu = () => {
    router.push('/');
  };
</script>

<template>
  <div class="modal">
    <div class="a-winner-is-you">
      <div class="congrats">Maze: SOLVED!</div>
      <div class="stats">
        <h3>Stats for your maze:</h3>
        <ul>
          <li><div class="label">Solve Time:</div> {{ solveTime }}</li>
          <li><div class="label">Cells Visited:</div> {{ mazeStats.visitedCount }} ({{ visitedPercent }}%)</li>
          <li><div class="label">Cells Backtracked:</div> {{ mazeStats.revisitedCount }}</li>
          <li><div class="label">Moves Made:</div> {{ mazeStats.moves }}</li>
          <li><div class="label">Walls Bonked:</div> {{ mazeStats.bonks }}</li>
        </ul>

        <div class="buttons">
          <button @click="$emit('playAgain')">Play Again!</button>
          <button @click="mainMenu">Main Menu</button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
  .modal {
    z-index: 1000;
    width: 100%;
    max-width: 100%;
    height: v-bind(height);
    position: fixed;
    display: flex;
    justify-content: center;
    align-items: center;
  }

  .a-winner-is-you {
    width: 500px;
    height: 350px;
    border: 2px solid black;
    background-color: rgb(30, 30, 30, 0.9);
    padding: 20px;
  }

  .congrats {
    font-size: 2em;
    font-weight: bold;
    width: 100%;
    text-align: center;
  }

  .stats {
    margin-top: 30px;
    font-size: 1.2em;
  }

  .stats ul {
    margin-top: 20px;
  }

  .stats li .label {
    display: inline-block;
    font-weight: bold;
    width: 170px;
  }

  .buttons {
    margin-top: 10px;
    width: 100%;
    display: flex;
    justify-content: space-around;
    align-content: center;
  }

  button { cursor: pointer; }
</style>