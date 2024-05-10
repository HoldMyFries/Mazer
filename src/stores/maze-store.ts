import { defineStore } from 'pinia';
import { Boundaries } from '../lib/interfaces';
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
      return ({ x, y }: Coordinate): NeighboringCells => ({
        up:    y === 0 ? null : state.cells[y - 1][x],
        right: x === state.mazeConfig.width - 1 ? null : state.cells[y][x + 1],
        down:  y === state.mazeConfig.height - 1 ? null : state.cells[y + 1][x],
        left:  x === 0 ? null : state.cells[y][x - 1],
      });
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
    setNewMaze({ height, width, maze }: NewMaze) {
      this.cells           = maze.board;
      this.currentPosition = { x: 0, y: 0 };
      this.mazeConfig      = { height, width };

      this.mazeStats = {
        moves:          0,
        bonks:          0,
        visitedCount:   0,
        revisitedCount: 0,
        enteredAt:      (new Date()).getTime(),
      };

      this.setCellVisited(this.currentPosition);
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
    // I wanted to tightly couple mutation with validation to eliminate a vector for cheating.
    moveUp() {
      const cell = this.getCurrentCell();

      if (this.currentPosition.y - 1 < 0 || cell.boundaries & Boundaries.UP ) { return this.incrementBonks(); }

      this.incrementMoves();
      this.currentPosition.y--;
      this.setCellVisited(this.currentPosition);
    },
    moveRight() {
      const cell = this.getCurrentCell();

      if (this.currentPosition.x + 1 >= this.mazeConfig.width || cell.boundaries & Boundaries.RIGHT ) { return this.incrementBonks(); }

      this.incrementMoves();
      this.currentPosition.x++;
      this.setCellVisited(this.currentPosition);
    },
    moveDown() {
      const cell = this.getCurrentCell();

      if (this.currentPosition.y + 1 >= this.mazeConfig.height || cell.boundaries & Boundaries.DOWN ) { return this.incrementBonks(); }

      this.incrementMoves();
      this.currentPosition.y++;
      this.setCellVisited(this.currentPosition);
    },
    moveLeft() {
      const cell = this.getCurrentCell();

      if (this.currentPosition.x - 1 < 0 || cell.boundaries & Boundaries.LEFT ) { return this.incrementBonks(); }

      this.incrementMoves();
      this.currentPosition.x--;
      this.setCellVisited(this.currentPosition);
    }
  }
});