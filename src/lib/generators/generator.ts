import type { Cell, Coordinate, Maze, MazeType } from '@/lib/interfaces';
import { BridgeDirection, ConstructionType } from '@/lib/enums';

// Inherited by difficulty-specific generators
// Not intended to be used directly
export abstract class Generator {
  maze: Maze;
  width: number;
  height: number;
  woven: boolean;
  visitedCells: Cell[];

  constructor(mazeType: MazeType) {
    this.width        = Math.floor(Math.random() * (mazeType.maxWidth - mazeType.minWidth )) + mazeType.minWidth;
    this.height       = Math.floor(Math.random() * (mazeType.maxHeight - mazeType.minHeight )) + mazeType.minHeight;
    this.woven        = mazeType.type === ConstructionType.WOVEN;
    this.maze         = this.buildInitialMaze();
    this.visitedCells = [];
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
  
      let nextStep = neighbors[Math.floor(Math.random() * neighbors.length)];
      if (nextStep.algoVisited) { // bridge time!
        this.maze.board[nextStep.y][nextStep.x].isBridge = true;
        this.maze.board[nextStep.y][nextStep.x].bridgeDirection = (x !== nextStep.x ? BridgeDirection.VERTICAL : BridgeDirection.HORIZONTAL );
        nextStep = this.otherSideOfTheBridge(currentPosition, nextStep);
      }

      if (!nextStep.algoVisited) { this.visitedCells.push(nextStep); }

      this.maze.board[nextStep.y][nextStep.x].algoVisited = true;
      this.adjustBoundaries(currentPosition, nextStep);

      path.push({ x: nextStep.x, y: nextStep.y });

      visitedCells++;
    }
  }

  private buildInitialMaze(): Maze {
    const board = [];
  
    for (let h = 0; h < this.height; h++) {
      const row = [];
  
      for (let w = 0; w < this.width; w++) {
        row.push(this.defaultCellParams(h + w, w, h));
      }
  
      board.push(row);
    }
  
    board[0][0].isStart = true;
    board[this.height - 1][this.width - 1].isGoal = true;

    return { board } as Maze;
  }

  private defaultCellParams(id: number, x: number, y: number): Cell {
    return { id, x, y, boundaries: 15, algoVisited: false, playerVisited: false, isStart: false, isGoal: false };
  }

  private adjustBoundaries(currentPosition: Coordinate, nextStep: Cell) {
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

  protected validNeighbors({ x, y }: Coordinate): Cell[] {
    if (this.woven) { return this.validNeighborsWithBridges({ x, y }); }

    const neighbors = [];

    if (y > 0) { neighbors.push(this.maze.board[y - 1][x]); }
    if (x < this.width - 1) { neighbors.push(this.maze.board[y][x + 1]); }
    if (y < this.height - 1) { neighbors.push(this.maze.board[y + 1][x]); }
    if (x > 0) { neighbors.push(this.maze.board[y][x - 1]); }  

    return neighbors.filter((n) => !n.algoVisited);
  }

  // TODO: condense this logic somehow.  lookin' a little repetitive
  private validNeighborsWithBridges({ x, y }: Coordinate): Cell[] {
    const neighbors = [];

    if (y > 0) {
      const candidate = this.maze.board[y - 1][x];

      if (!candidate.algoVisited || this.validBridge({ x, y }, { x, y: y - 1 }, { x: x - 1, y: y - 1 }, { x: x + 1, y: y - 1 }, { x, y: y - 2 })) {
        neighbors.push(candidate);
      }
    }

    if (y < this.height - 1) {
      const candidate = this.maze.board[y + 1][x];

      if (!candidate.algoVisited || this.validBridge({ x, y }, { x, y: y + 1 }, { x: x - 1, y: y + 1 }, { x: x + 1, y: y + 1 }, { x, y: y + 2 })) {
        neighbors.push(candidate);
      }
    }

    if (x > 0) {
      const candidate = this.maze.board[y][x - 1];

      if (!candidate.algoVisited || this.validBridge({ x, y }, { x: x - 1, y }, { x: x - 1, y: y - 1 }, { x: x - 1, y: y + 1 }, { x: x - 2, y })) {
        neighbors.push(candidate);
      }
    }

    if (x < this.width - 1) {
      const candidate = this.maze.board[y][x + 1];

      if (!candidate.algoVisited || this.validBridge({ x, y }, { x: x + 1, y }, { x: x + 1, y: y - 1 }, { x: x + 1, y: y + 1 }, { x: x + 2, y })) {
        neighbors.push(candidate);
      }
    }

    return neighbors;
  }

  // If the adjacent cell in a given direction is visited already, it can still be used
  // if certain conditions are met.
  //  - The neighbor must be a valid "bridge"
  //    - It must be in the middle of a set of at least three previously visited cells
  //      going perpendicular to the direction we would be going over/under it
  //  - There must be a cell to land in on the other side
  //  - That landing cell must not be visited yet
  //  - The source cell must not already be a valid path directly to the bridge cell
  // TODO: Clean up these arguments, and clean up this method.  There's a mathy way to do this
  private validBridge(source: Coordinate, bridge: Coordinate, aSide: Coordinate, bSide: Coordinate, destination: Coordinate): boolean {
    if ([bridge, aSide, bSide, destination].some((c) => this.outOfBounds(c))) { return false; }
    if (this.maze.board[destination.y][destination.x].algoVisited) { return false; }
    if ([bridge, aSide, bSide].some((c) => !this.maze.board[c.y][c.x].algoVisited)) { return false; }

    const sourceCell = this.maze.board[source.y][source.x];
    const bridgeCell = this.maze.board[bridge.y][bridge.x];

    // For these four if statements, we're making sure the bridge cell isn't already open to the source cell.
    if (sourceCell.x > bridgeCell.x && (sourceCell.boundaries & 8) === 0) { return false; }
    if (sourceCell.x < bridgeCell.x && (sourceCell.boundaries & 2) === 0) { return false; }
    if (sourceCell.y > bridgeCell.y && (sourceCell.boundaries & 1) === 0) { return false; }
    if (sourceCell.y < bridgeCell.y && (sourceCell.boundaries & 4) === 0) { return false; }

    // For these four if statements, we're checking horizontally to make sure
    // the pathing supports a bridge.
    if (bridge.x < aSide.x && bridgeCell.boundaries & 2) { return false; }
    if (bridge.x > aSide.x && bridgeCell.boundaries & 8) { return false; }
    if (bridge.x < bSide.x && bridgeCell.boundaries & 2) { return false; }
    if (bridge.x > bSide.x && bridgeCell.boundaries & 8) { return false; }

    // For these four if statements, we're checking vertically to make sure
    // the pathing supports a bridge.
    if (bridge.y < aSide.y && bridgeCell.boundaries & 4) { return false; }
    if (bridge.y > aSide.y && bridgeCell.boundaries & 1) { return false; }
    if (bridge.y < bSide.y && bridgeCell.boundaries & 4) { return false; }
    if (bridge.y > bSide.y && bridgeCell.boundaries & 1) { return false; }

    return true;
  }

  private outOfBounds({ x, y }: Coordinate): boolean {
    return x < 0 || x >= this.width || y < 0 || y >= this.height;
  }

  private otherSideOfTheBridge(current: Coordinate, next: Cell): Cell {
    if (current.x > next.x) { return this.maze.board[next.y][next.x - 1]; }
    if (current.x < next.x) { return this.maze.board[next.y][next.x + 1]; }
    if (current.y > next.y) { return this.maze.board[next.y - 1][next.x]; }
    if (current.y < next.y) { return this.maze.board[next.y + 1][next.x]; }

    // Literally impossible.
    throw new Error('Unable to find the other side of the bridge.');
  }

  abstract backtrack(path: Coordinate[]): Coordinate[];
}