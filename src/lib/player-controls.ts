import type { Cell, Coordinate } from '@/lib/interfaces';
import { BridgeDirection, Boundaries, GameState } from '@/lib/enums';

import { useGameStore } from '@/stores/game-store';
import { useMazeStore } from '@/stores/maze-store';

const relevantBoundary = (source: Cell, destination: Cell): number => {
  if (source.y > destination.y) { return Boundaries.UP; }
  if (source.x < destination.x) { return Boundaries.RIGHT; }
  if (source.y < destination.y) { return Boundaries.DOWN; }
  if (source.x > destination.x) { return Boundaries.LEFT; }
  throw new Error('Attempted to move to current cell.');
};

const goingUnderBridge = (source: Cell, destination: Cell): boolean => {
  if (!destination.isBridge) { return false; }
  if (source.y > destination.y && destination.bridgeDirection === BridgeDirection.HORIZONTAL) { return true; }
  if (source.x < destination.x && destination.bridgeDirection === BridgeDirection.VERTICAL)   { return true; }
  if (source.y < destination.y && destination.bridgeDirection === BridgeDirection.HORIZONTAL) { return true; }
  if (source.x > destination.x && destination.bridgeDirection === BridgeDirection.VERTICAL)   { return true; }
  return false;
};

const move = (destination: Coordinate) => {
  const mazeStore = useMazeStore();
  const currentCell = mazeStore.getCurrentCell();
  let destinationCell = mazeStore.getCellByCoords(destination);

  if (currentCell.boundaries & relevantBoundary(currentCell, destinationCell)) { return mazeStore.incrementBonks(); }
  mazeStore.incrementMoves();

  if (goingUnderBridge(currentCell, destinationCell)) {
    destination.y -= (currentCell.y - destinationCell.y);
    destination.x -= (currentCell.x - destinationCell.x);
    destinationCell = mazeStore.getCellByCoords(destination);
  }

  mazeStore.setCurrentPosition(destination);
  mazeStore.setCellVisited(destinationCell);
};

export const inputReceived = (event: any) => {
  const gameStore = useGameStore();
  const mazeStore = useMazeStore();

  gameStore.incrementKeydownEvents();

  if (gameStore.state !== GameState.PLAY) { return; }

  const acceptedKeys = [ 'w', 'W', 'a', 'A', 's', 'S', 'd', 'D', 'ArrowUp', 'ArrowRight', 'ArrowDown', 'ArrowLeft' ];
  const supportedKeypress = acceptedKeys.find((k) => k === event.key);

  if (!supportedKeypress) { return; }

  const destination = { ...mazeStore.currentPosition };
  if (event.key === 'w' || event.key === 'W' || event.key === 'ArrowUp') { destination.y--; }
  if (event.key === 'd' || event.key === 'D' || event.key === 'ArrowRight') { destination.x++; }
  if (event.key === 's' || event.key === 'S' || event.key === 'ArrowDown') { destination.y++; }
  if (event.key === 'a' || event.key === 'A' || event.key === 'ArrowLeft') { destination.x--; }

  if (destination.x < 0 || destination.x >= mazeStore.mazeConfig.width) { return mazeStore.incrementBonks(); }
  if (destination.y < 0 || destination.y >= mazeStore.mazeConfig.height) { return mazeStore.incrementBonks(); }

  move(destination);
};