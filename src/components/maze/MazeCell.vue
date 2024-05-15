<script setup lang="ts">
  import { useMazeStore } from '@/stores/maze-store';
  import { computed } from 'vue';

  const { x, y } = defineProps(['x', 'y']);

  const mazeStore  = useMazeStore();
  const cell       = mazeStore.getCellByCoords({ x, y });
  const neighbors  = mazeStore.getNeighboringCells({ x, y });
  const boundaries = cell.boundaries;

  const cssClasses = computed((): string => {
    const classes: string[] = ['maze-cell'];

    if (boundaries & 1 && neighbors.up) { classes.push('n-wall'); }
    if (boundaries & 2 && neighbors.right) { classes.push('e-wall'); }
    if (boundaries & 4 && neighbors.down) { classes.push('s-wall'); }
    if (boundaries & 8 && neighbors.left) { classes.push('w-wall'); }
    if (!neighbors.up && !cell.isStart) { classes.push('n-wall-thick'); }
    if (!neighbors.right) { classes.push('e-wall-thick'); }
    if (!neighbors.down && !cell.isGoal) { classes.push('s-wall-thick'); }
    if (!neighbors.left) { classes.push('w-wall-thick'); }
    if (isCurrentPosition()) {
      classes.push('current');
    } else if (cell.playerVisited) {
      classes.push('visited');
    }
    

    return classes.join(' ');
  });

  const isCurrentPosition = () => mazeStore.currentPosition.x === x && mazeStore.currentPosition.y === y;
</script>

<template>
  <div :class="cssClasses"></div>
</template>

<style scoped>
  .maze-cell.current { background-color: #54AAD3; }
  .maze-cell.visited { background-color: rgb(127, 127, 127, 0.5); }
  .maze-cell.n-wall { border-top:    1px solid black; }
  .maze-cell.e-wall { border-right:  1px solid black; }
  .maze-cell.s-wall { border-bottom: 1px solid black; }
  .maze-cell.w-wall { border-left:   1px solid black; }

  /* Used for cells on the outer edge in order to keep borders consistent */
  .maze-cell.n-wall-thick { border-top:    2px solid black; }
  .maze-cell.e-wall-thick { border-right:  2px solid black; }
  .maze-cell.s-wall-thick { border-bottom: 2px solid black; }
  .maze-cell.w-wall-thick { border-left:   2px solid black; }
</style>
