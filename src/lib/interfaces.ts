export interface MazeType {
  id: number,
  name: string,
  description: string,
  minHeight: number,
  maxHeight: number,
  minWidth:  number,
  maxWidth:  number,
}

export interface Maze {
  board: Cell[][],
}

export interface Coordinate {
  x: number, // row
  y: number, // column
}

export interface Cell extends Coordinate {
  id:            number,  // Needed for Vue v-for
  boundaries:    number,  // bitfield
  algoVisited:   boolean, // whether or not the algorithm has visited this cell
  playerVisited: boolean, // whether or not the player has visited this cell
  isGoal:        boolean,
}

export enum Boundaries {
  UP    = 1,
  RIGHT = 2,
  DOWN  = 4,
  LEFT  = 8,
}

export interface MazeConfiguration {
  width:  number,
  height: number,
}

export interface NewMaze {
  height: number,
  width:  number,
  maze:   Maze,
}

export interface MazeState {
  cells:           Cell[][],
  mazeConfig:      MazeConfiguration,
  currentPosition: Coordinate,
  zoom:            number,
  cameraX:         number,
  cameraY:         number,
  mazeStats:       MazeStats,  
}

export interface MazeStats {
  moves:          number,
  bonks:          number,
  enteredAt:      number,
  visitedCount:   number,
  revisitedCount: number,
  solvedAt?:      number,
}

export interface SolveTime {
  hours:        number,
  minutes:      number,
  seconds:      number,
  milliseconds: number,
}

export interface NeighboringCells {
  up:    Cell | null,
  right: Cell | null,
  down:  Cell | null,
  left:  Cell | null,
}
