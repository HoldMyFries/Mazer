import type { Coordinate } from '@/lib/interfaces';
import { Generator } from '@/lib/generators/generator';

export class CasualMaze extends Generator {
  backtrack(path: Coordinate[]): Coordinate[] {
    while(path.length > 0) {
      path.pop();
  
      if (path.length === 0) {
        console.log(this.maze.board);
        throw new Error('Encountered a condition where no backtracking was possible!');
      }
  
      const neighbors = this.validNeighbors(path[path.length - 1]);
      if (neighbors.length > 0) { return path; }
    }

    // Just making typescript happy.  This will never happen due to the
    // throw condition when the path is empty.
    return [];
  }
}
