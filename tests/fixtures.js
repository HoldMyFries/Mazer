// *Probably* not solvable mazes =P
const variedMaze = {
  board: [[
    { id:  1, x: 0, y: 0, boundaries:  8, algoVisited: true, playerVisited: false, isGoal: false, isStart: true  },
    { id:  2, x: 1, y: 0, boundaries:  1, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  3, x: 2, y: 0, boundaries:  3, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  4, x: 3, y: 0, boundaries:  5, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  5, x: 4, y: 0, boundaries:  7, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  6, x: 5, y: 0, boundaries: 11, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
  ], [
    { id:  7, x: 0, y: 1, boundaries: 15, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  8, x: 1, y: 1, boundaries:  0, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  9, x: 2, y: 1, boundaries:  1, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 10, x: 3, y: 1, boundaries:  2, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 11, x: 4, y: 1, boundaries:  3, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 12, x: 5, y: 1, boundaries:  2, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
  ], [
    { id: 13, x: 0, y: 2, boundaries: 14, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 14, x: 1, y: 2, boundaries:  4, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 15, x: 2, y: 2, boundaries:  5, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 16, x: 3, y: 2, boundaries:  6, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 17, x: 4, y: 2, boundaries:  7, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 18, x: 5, y: 2, boundaries:  6, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
  ], [
    { id: 19, x: 0, y: 3, boundaries: 10, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 20, x: 1, y: 3, boundaries:  8, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 21, x: 2, y: 3, boundaries:  9, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 22, x: 3, y: 3, boundaries: 10, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 23, x: 4, y: 3, boundaries: 11, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 24, x: 5, y: 3, boundaries:  7, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
  ], [
    { id: 25, x: 0, y: 4, boundaries:  8, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 26, x: 1, y: 4, boundaries: 12, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 27, x: 2, y: 4, boundaries: 13, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 28, x: 3, y: 4, boundaries: 14, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 29, x: 4, y: 4, boundaries: 15, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 30, x: 5, y: 4, boundaries:  3, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
  ], [
    { id: 31, x: 0, y: 5, boundaries:  9, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 32, x: 1, y: 5, boundaries:  4, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 33, x: 2, y: 5, boundaries: 12, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 34, x: 3, y: 5, boundaries: 13, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 35, x: 4, y: 5, boundaries:  5, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 36, x: 5, y: 5, boundaries: 14, algoVisited: true, playerVisited: false, isGoal: true,  isStart: false },
  ]],
};

const maximumEdgeCells = {
  board: [[
    { id:  1, x: 0, y: 0, boundaries:  8, algoVisited: true, playerVisited: false, isGoal: false, isStart: true  },
    { id:  2, x: 1, y: 0, boundaries:  1, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  3, x: 2, y: 0, boundaries:  3, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  4, x: 3, y: 0, boundaries: 11, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  5, x: 4, y: 0, boundaries:  9, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  6, x: 5, y: 0, boundaries: 15, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
  ],[
    { id:  7, x: 0, y: 1, boundaries: 13, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  8, x: 1, y: 1, boundaries:  0, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  9, x: 2, y: 1, boundaries:  0, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 10, x: 3, y: 1, boundaries:  0, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 11, x: 4, y: 1, boundaries:  0, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 12, x: 5, y: 1, boundaries: 14, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
  ], [
    { id: 13, x: 0, y: 2, boundaries: 12, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 14, x: 1, y: 2, boundaries: 4,  algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 15, x: 2, y: 2, boundaries: 5,  algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 16, x: 3, y: 2, boundaries: 6,  algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 17, x: 4, y: 2, boundaries: 7,  algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id: 18, x: 5, y: 2, boundaries: 2,  algoVisited: true, playerVisited: false, isGoal: true,  isStart: false },
  ]],
}

const smallMaze = {
  board: [[
    { id:  1, x: 0, y: 0, boundaries:  8, algoVisited: true, playerVisited: true,  isGoal: false, isStart: true  },
    { id:  2, x: 1, y: 0, boundaries:  1, algoVisited: true, playerVisited: true,  isGoal: false, isStart: false },
    { id:  3, x: 2, y: 0, boundaries:  3, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
  ], [
    { id:  4, x: 3, y: 0, boundaries: 11, algoVisited: true, playerVisited: true,  isGoal: false, isStart: false },
    { id:  5, x: 4, y: 0, boundaries:  9, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  6, x: 5, y: 0, boundaries: 15, algoVisited: true, playerVisited: true,  isGoal: false, isStart: false },
  ], [
    { id:  7, x: 0, y: 1, boundaries: 13, algoVisited: true, playerVisited: false, isGoal: false, isStart: false },
    { id:  8, x: 1, y: 1, boundaries:  0, algoVisited: true, playerVisited: true,  isGoal: false, isStart: false },
    { id:  9, x: 2, y: 1, boundaries:  0, algoVisited: true, playerVisited: true,  isGoal: true, isStart: false },
  ]],
};

export {
  variedMaze,
  maximumEdgeCells,
  smallMaze,
};
