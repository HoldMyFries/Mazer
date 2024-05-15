import type { Coordinate } from '@/lib/interfaces';
import { Generator } from '@/lib/generators/generator';

export class ComplexMaze extends Generator {
  backtrack(_: Coordinate[]): Coordinate[] {
    const validSpots = this.visitedCells.filter((c) => this.validNeighbors({ x: c.x, y: c.y }).length > 0);
    return [validSpots[Math.floor(Math.random() * validSpots.length)]];
  }
}
