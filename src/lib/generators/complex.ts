import type { Coordinate } from '../interfaces.js';
import { Generator } from './generator.js';

export class ComplexMaze extends Generator {
  backtrack(_: Coordinate[]): Coordinate[] {
    const validSpots = this.visitedCells.filter((c) => this.validNeighbors({ x: c.x, y: c.y }).length > 0);
    return [validSpots[Math.floor(Math.random() * validSpots.length)]];
  }
}
