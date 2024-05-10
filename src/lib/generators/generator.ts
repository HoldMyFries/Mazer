import type { Cell, Coordinate, Maze, MazeType } from '../interfaces';

// Inherited by difficulty-specific generators
// Not intended to be used directly
export class Generator {
  maze: Maze;
  width: number;
  height: number;
  visitedCells: Cell[];

  constructor(mazeType: MazeType) {
    this.width        = Math.floor(Math.random() * (mazeType.maxWidth - mazeType.minWidth )) + mazeType.minWidth;
    this.height       = Math.floor(Math.random() * (mazeType.maxHeight - mazeType.minHeight )) + mazeType.minHeight;
    this.maze         = this.buildInitialMaze();
    this.visitedCells = [];
  }

  buildInitialMaze(): Maze {
    const board = [];
  
    for (let h = 0; h < this.height; h++) {
      const row = [];
  
      for (let w = 0; w < this.width; w++) {
        row.push({
          id: h + w,
          x: w,
          y: h,
          boundaries: 15, // All boundaries are present until torn down
          algoVisited: false,
          playerVisited: false,
          isGoal: false,
        } as Cell);
      }
  
      board.push(row);
    }
  
    board[this.height - 1][this.width - 1].isGoal = true;

    return { board } as Maze;
  }

  generate() {
    let path: Coordinate[] = [{ x: 0, y: 0 } as Coordinate];

    this.maze.board[0][0].algoVisited = true;
    let visitedCells = 1;
  
    while(visitedCells < this.width * this.height) {
      const currentPosition = path[path.length - 1];
      const { x, y }        = currentPosition;
      const neighbors       = this.validNeighbors({ x, y });
  
      if (neighbors.length === 0) {
        path = this.backtrack(path);
        continue;
      }
  
      const nextStep = neighbors[Math.floor(Math.random() * neighbors.length)];

      if (!nextStep.algoVisited) { this.visitedCells.push(nextStep); }

      this.maze.board[nextStep.y][nextStep.x].algoVisited = true;
      this.adjustBoundaries(currentPosition, nextStep);

      path.push({ x: nextStep.x, y: nextStep.y });

      visitedCells++;
    }
  }

  adjustBoundaries(currentPosition: Coordinate, nextStep: Cell) {
    if (currentPosition.x < nextStep.x) {
      this.maze.board[nextStep.y][nextStep.x].boundaries -= 8;
      this.maze.board[currentPosition.y][currentPosition.x].boundaries -= 2;
    } else if (currentPosition.x > nextStep.x) {
      this.maze.board[nextStep.y][nextStep.x].boundaries -= 2;
      this.maze.board[currentPosition.y][currentPosition.x].boundaries -= 8;
    } else if (currentPosition.y < nextStep.y) {
      this.maze.board[nextStep.y][nextStep.x].boundaries -= 1;
      this.maze.board[currentPosition.y][currentPosition.x].boundaries -= 4;
    } else if (currentPosition.y > nextStep.y) {
      this.maze.board[nextStep.y][nextStep.x].boundaries -= 4;
      this.maze.board[currentPosition.y][currentPosition.x].boundaries -= 1;
    } 
  }

  validNeighbors({ x, y }: Coordinate): Cell[] {
    const neighbors = [];
    if (y > 0) { neighbors.push(this.maze.board[y - 1][x]); }
    if (x < this.width - 1) { neighbors.push(this.maze.board[y][x + 1]); }
    if (y < this.height - 1) { neighbors.push(this.maze.board[y + 1][x]); }
    if (x > 0) { neighbors.push(this.maze.board[y][x - 1]); }
    return neighbors.filter((n) => !n.algoVisited);  
  }

  backtrack(path: Coordinate[]): Coordinate[] {
    throw new Error('Define in subclass');
  }
}