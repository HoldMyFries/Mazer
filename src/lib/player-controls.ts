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
  
  if (gameStore.state !== GameState.PLAY) { return; }

  const acceptedKeyCodes = [ 87, 65, 83, 68, 38, 37, 40, 39 ];
  const supportedKeypress = acceptedKeyCodes.find((c) => c === event.keyCode);

  if (!supportedKeypress) { return; }

  const destination = { ...mazeStore.currentPosition };
  if (event.keyCode === 87 || event.keyCode === 38) { destination.y--; }
  if (event.keyCode === 68 || event.keyCode === 39) { destination.x++; }
  if (event.keyCode === 65 || event.keyCode === 37) { destination.x--; }
  if (event.keyCode === 83 || event.keyCode === 40) { destination.y++; }

  if (destination.x < 0 || destination.x >= mazeStore.mazeConfig.width) { return mazeStore.incrementBonks(); }
  if (destination.y < 0 || destination.y >= mazeStore.mazeConfig.height) { return mazeStore.incrementBonks(); }

  move(destination);
};