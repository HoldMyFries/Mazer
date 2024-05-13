<script setup lang="ts">
  import { useMazeStore } from '../../stores/maze-store';
  import { computed } from 'vue';
  import { BridgeDirection } from '../../lib/interfaces';

  const { x, y } = defineProps(['x', 'y']);

  const mazeStore  = useMazeStore();
  const cell       = mazeStore.getCellByCoords({ x, y });
  const neighbors  = mazeStore.getNeighboringCells({ x, y });

  const topLeftSquareClasses = computed(() => {
    const classes = ['corner'];
    if ((cell.boundaries & 1) === 0 || cell.isStart) { classes.push('right'); }
    if ((cell.boundaries & 8) === 0) { classes.push('down'); }
    if (cell.isBridge) {
      classes.push(cell.bridgeDirection === BridgeDirection.VERTICAL ? 'down' : 'right');
    }
  
    return classes.join(' ');
  });

  const topBarClasses = computed(() => {
    const classes = ['top bar'];

    if (cell.boundaries & 1 && !cell.isStart) {
      classes.push('closed');
    } else if (y > 0 && neighbors.up!.playerVisited && cell.playerVisited) {
      classes.push('visited');
    }

    if (cell.isBridge && cell.bridgeDirection === BridgeDirection.HORIZONTAL) {
      classes.push('bridge');

      const aSideCell = mazeStore.getCellByCoords({ x, y: y - 1 });
      const bSideCell = mazeStore.getCellByCoords({ x, y: y + 1 });
      if (aSideCell.playerVisited && bSideCell.playerVisited) { classes.push('visited'); }
    }

    return classes.join(' ');
  });

  const topRightSquareClasses = computed(() => {
    const classes = ['corner'];
    if ((cell.boundaries & 1) === 0 || cell.isStart) { classes.push('left'); }
    if ((cell.boundaries & 2) === 0) { classes.push('down'); }
    if (cell.isBridge) {
      classes.push(cell.bridgeDirection === BridgeDirection.VERTICAL ? 'down' : 'left');
    }

    return classes.join(' ');
  });

  const leftBarClasses = computed(() => {
    const classes = ['left bar'];

    if (cell.boundaries & 8) {
      classes.push('closed');
    } else if (x > 0 && neighbors.left!.playerVisited && cell.playerVisited) {
      classes.push('visited');
    }

    if (cell.isBridge && cell.bridgeDirection === BridgeDirection.VERTICAL) {
      classes.push('bridge');

      const aSideCell = mazeStore.getCellByCoords({ x: x - 1, y });
      const bSideCell = mazeStore.getCellByCoords({ x: x + 1, y });
      if (aSideCell.playerVisited && bSideCell.playerVisited) { classes.push('visited'); }
    }

    return classes.join(' ');
  });

  const centerSquareClasses = computed(() => {
    const classes = ['square'];
    if (cell.boundaries & 1 && !cell.isStart) { classes.push('up'); }
    if (cell.boundaries & 2) { classes.push('right'); }
    if (cell.boundaries & 4 && !cell.isGoal) { classes.push('down'); }
    if (cell.boundaries & 8) { classes.push('left'); }

    if (isCurrentPosition()) {
      classes.push('current');
    } else if (cell.playerVisited) {
      classes.push('visited');
    }

    return classes.join(' ');
  });

  const rightBarClasses = computed(() => {
    const classes = ['right bar'];

    if (cell.boundaries & 2) {
      classes.push('closed');
    } else if (x < mazeStore.mazeConfig.width - 1 && neighbors.right!.playerVisited && cell.playerVisited) {
      classes.push('visited');
    }

    if (cell.isBridge && cell.bridgeDirection === BridgeDirection.VERTICAL) {
      classes.push('bridge');

      const aSideCell = mazeStore.getCellByCoords({ x: x - 1, y });
      const bSideCell = mazeStore.getCellByCoords({ x: x + 1, y });
      if (aSideCell.playerVisited && bSideCell.playerVisited) { classes.push('visited'); }
    }

    return classes.join(' ');
  });

  const bottomLeftSquareClasses = computed(() => {
    const classes = ['corner'];
    if ((cell.boundaries & 8) === 0) { classes.push('up'); }
    if ((cell.boundaries & 4) === 0 || cell.isGoal) { classes.push('right'); }
    if (cell.isBridge) {
      classes.push(cell.bridgeDirection === BridgeDirection.VERTICAL ? 'up' : 'right');
    }

    return classes.join(' ');
  });

  const bottomBarClasses = computed(() => {
    const classes = ['bottom bar'];

    if (cell.boundaries & 4 && !cell.isGoal) {
      classes.push('closed');
    } else if (y < mazeStore.mazeConfig.height - 1 && neighbors.down!.playerVisited && cell.playerVisited) {
      classes.push('visited');
    }

    if (cell.isBridge && cell.bridgeDirection === BridgeDirection.HORIZONTAL) {
      classes.push('bridge');

      const aSideCell = mazeStore.getCellByCoords({ x, y: y - 1 });
      const bSideCell = mazeStore.getCellByCoords({ x, y: y + 1 });
      if (aSideCell.playerVisited && bSideCell.playerVisited) { classes.push('visited'); }
    }

    return classes.join(' ');
  });

  const bottomRightSquareClasses = computed(() => {
    const classes = ['corner'];
    if ((cell.boundaries & 2) === 0) { classes.push('up'); }
    if ((cell.boundaries & 4) === 0 || cell.isGoal) { classes.push('left'); }
    if (cell.isBridge) {
      classes.push(cell.bridgeDirection === BridgeDirection.VERTICAL ? 'up' : 'left');
    }

    return classes.join(' ');
  });

  const isCurrentPosition = () => mazeStore.currentPosition.x === x && mazeStore.currentPosition.y === y;
</script>

<template>
  <div class="maze-cell">
    <div :class="topLeftSquareClasses"></div>
    <div :class="topBarClasses"></div>
    <div :class="topRightSquareClasses"></div>
    <div :class="leftBarClasses"></div>
    <div :class="centerSquareClasses"></div>
    <div :class="rightBarClasses"></div>
    <div :class="bottomLeftSquareClasses"></div>
    <div :class="bottomBarClasses"></div>
    <div :class="bottomRightSquareClasses"></div>
  </div>
</template>

<style scoped>
  .maze-cell {
    display: grid;
    grid-template-columns: 1fr 3fr 1fr;
    grid-template-rows: 1fr 3fr 1fr;
  }

  .maze-cell .square.left  { border-left: 1px solid black; }
  .maze-cell .square.right { border-right: 1px solid black; }
  .maze-cell .square.up    { border-top: 1px solid black; }
  .maze-cell .square.down  { border-bottom: 1px solid black; }

  .maze-cell .bar.left.closed   { border-right: 1px solid black; }
  .maze-cell .bar.right.closed  { border-left: 1px solid black; }
  .maze-cell .bar.top.closed    { border-bottom: 1px solid black; }
  .maze-cell .bar.bottom.closed { border-top: 1px solid black; }

  .maze-cell .bar.left:not(.closed)   { border-top: 1px solid black; border-bottom: 1px solid black; }
  .maze-cell .bar.right:not(.closed)  { border-top: 1px solid black; border-bottom: 1px solid black; }
  .maze-cell .bar.top:not(.closed)    { border-left: 1px solid black; border-right: 1px solid black; }
  .maze-cell .bar.bottom:not(.closed) { border-left: 1px solid black; border-right: 1px solid black; }

  .maze-cell .bar.left.bridge { border-top: 1px solid black; border-bottom: 1px solid black; }
  .maze-cell .bar.right.bridge { border-top: 1px solid black; border-bottom: 1px solid black; }
  .maze-cell .bar.top.bridge { border-left: 1px solid black; border-right: 1px solid black; }
  .maze-cell .bar.bottom.bridge { border-left: 1px solid black; border-right: 1px solid black; }

  .maze-cell .bar.visited { background-color: rgb(127, 127, 127, 0.5); }
  .maze-cell .square.visited { background-color: rgb(127, 127, 127, 0.5); }

  .maze-cell .square.current { background-color: #54AAD3; }

  .maze-cell .corner.left  { border-left: 1px solid black; }
  .maze-cell .corner.right { border-right: 1px solid black; }
  .maze-cell .corner.up    { border-top: 1px solid black; }
  .maze-cell .corner.down  { border-bottom: 1px solid black; }
</style>
