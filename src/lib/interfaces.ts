import { BridgeDirection, ConstructionType, Difficulty, GameState, } from '@/lib/enums';

export interface MazeType {
  id:          number,
  name:        string,
  description: string,
  minHeight:   number,
  maxHeight:   number,
  minWidth:    number,
  maxWidth:    number,
  type:        ConstructionType,
  difficulty:  Difficulty,
}

export interface Maze {
  board: Cell[][],
}

export interface Coordinate {
  x: number, // row
  y: number, // column
}

export interface Cell extends Coordinate {
  id:               number,  // Needed for Vue v-for
  boundaries:       number,  // bitfield
  algoVisited:      boolean, // whether or not the algorithm has visited this cell
  playerVisited:    boolean, // whether or not the player has visited this cell
  isGoal:           boolean,
  isStart:          boolean,
  isBridge?:        boolean,
  bridgeDirection?: BridgeDirection,
}

export interface MazeConfiguration {
  width:       number,
  height:      number,
  cellHeight?: number,
  woven:       boolean,
}

export interface NewMaze {
  height: number,
  width:  number,
  woven:  boolean,
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

export interface GameStore {
  state: GameState,
  mazeTypeId: number,
  error: string | null,
}
