<script setup lang="ts">
  import { useMazeStore } from '@/stores/maze-store';

  import MazeCell from '@/components/maze/MazeCell.vue';
  import WeaveCell from '@/components/maze/WeaveCell.vue';

  import { ref } from 'vue';

  const mazeStore   = useMazeStore();

  const cells       = mazeStore.cells.flat();
  const gridRows    = `repeat(${mazeStore.mazeConfig.height}, 1fr)`;
  const gridColumns = `repeat(${mazeStore.mazeConfig.width}, 1fr)`;
  const mazeWidth   = ref('');
  const mazeHeight  = ref('');

  const setMazeDimensions = () => {
    const sHeight = window.innerHeight - 100;
    const sWidth  = window.innerWidth;

    let px = Math.min(
      Math.floor(sHeight / mazeStore.mazeConfig.height),
      Math.floor(sWidth / mazeStore.mazeConfig.width)
    );

    px = Math.min(px, 30);
    px = Math.max(px, 10);

    mazeStore.setCellHeightInPixels(px);

    mazeWidth.value = `${mazeStore.mazeConfig.width * px}px`;
    mazeHeight.value = `${mazeStore.mazeConfig.height * px}px`;
  };

  window.addEventListener('resize', setMazeDimensions);
  setMazeDimensions();
</script>

<template>
  <div class='maze casual'>
    <WeaveCell
      v-if="mazeStore.mazeConfig.woven"
      v-for="cell in cells"
      :key="`${cell.id}-woven`"
      :x="cell.x"
      :y="cell.y"
    />
    <MazeCell
      v-else
      v-for="cell in cells"
      :key="cell.id"
      :x="cell.x"
      :y="cell.y"
    />
  </div>
</template>

<style scoped>
  .maze {
    margin: auto;
    display: grid;
    width: v-bind(mazeWidth);
    height: v-bind(mazeHeight);
    grid-template-columns: v-bind(gridColumns);
    grid-template-rows: v-bind(gridRows);
    outline: none;
  }
</style>
