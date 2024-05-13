import { defineStore } from 'pinia';
import { BridgeDirection } from '../lib/interfaces';
import type {
  Cell,
  Coordinate,
  MazeState,
  NeighboringCells,
  NewMaze,
  SolveTime,
} from '../lib/interfaces';

export const useMazeStore = defineStore('mazeStore', {
  state: () => ({
    currentPosition: { x: 0, y: 0 },
  } as MazeState),
  getters: {
    getCurrentCell: (state) => ((): Cell => {
      if (!state.cells) { return {} as Cell; }
      return state.cells[state.currentPosition.y][state.currentPosition.x];
    }),
    getCellByCoords: (state) => (({ x, y }: Coordinate): Cell => state.cells[y][x]),
    getNeighboringCells: (state) => {
      return ({ x, y }: Coordinate): NeighboringCells => {
        const neighbors = {
          up:    y === 0 ? null : state.cells[y - 1][x],
          right: x === state.mazeConfig.width - 1 ? null : state.cells[y][x + 1],
          down:  y === state.mazeConfig.height - 1 ? null : state.cells[y + 1][x],
          left:  x === 0 ? null : state.cells[y][x - 1],
        };

        if (neighbors.up    && neighbors.up.isBridge    && neighbors.up.bridgeDirection    === BridgeDirection.HORIZONTAL) { neighbors.up    = state.cells[y - 2][x]; }
        if (neighbors.right && neighbors.right.isBridge && neighbors.right.bridgeDirection === BridgeDirection.VERTICAL)   { neighbors.right = state.cells[y][x + 2]; }
        if (neighbors.down  && neighbors.down.isBridge  && neighbors.down.bridgeDirection  === BridgeDirection.HORIZONTAL) { neighbors.down  = state.cells[y + 2][x]; }
        if (neighbors.left  && neighbors.left.isBridge  && neighbors.left.bridgeDirection  === BridgeDirection.VERTICAL)   { neighbors.left  = state.cells[y][x - 2]; }

        return neighbors;
      };
    },
    getTimeInMaze: (state) => ((): SolveTime => {
      const start = state.mazeStats.enteredAt;
      const end   = state.mazeStats.solvedAt || (new Date()).getTime();

      const difference    = end - start;
      const diffInSeconds = Math.floor(difference / 1000);

      const hours        = Math.floor(diffInSeconds / 3600);
      const minutes      = Math.floor((diffInSeconds % 3600) / 60);
      const seconds      = Math.floor((diffInSeconds % 60));
      const milliseconds = difference % 1000;

      return { hours, minutes, seconds, milliseconds };
    }),
  },
  actions: {
    setNewMaze({ height, width, woven, maze }: NewMaze) {
      this.cells           = maze.board;
      this.currentPosition = { x: 0, y: 0 };
      this.mazeConfig      = { height, width, woven };

      this.mazeStats = {
        moves:          0,
        bonks:          0,
        visitedCount:   0,
        revisitedCount: 0,
        enteredAt:      (new Date()).getTime(),
      };

      this.setCellVisited(this.currentPosition);
    },
    setCellHeightInPixels(px: number) {
      this.mazeConfig.cellHeight = px;
    },
    setCellVisited({ x, y }: Coordinate) {
      if (this.getCellByCoords({ x, y }).playerVisited) {
        this.mazeStats.revisitedCount++;
        return;
      }

      this.mazeStats.visitedCount++;
      this.cells[y][x].playerVisited = true;
    },
    setCurrentPosition(currentPosition: Coordinate) {
      this.currentPosition = currentPosition;
    },
    incrementMoves() { this.mazeStats.moves++; },
    incrementBonks() { this.mazeStats.bonks++; },
    setEnteredAt() { this.mazeStats.enteredAt = (new Date()).getTime(); },
    setSolvedAt() { this.mazeStats.solvedAt = (new Date()).getTime(); },
  }
});