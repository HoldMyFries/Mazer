export enum GameState {
  BUILD = 'build',
  PLAY  = 'play',
  WIN   = 'win',
}

export enum Boundaries {
  UP    = 1,
  RIGHT = 2,
  DOWN  = 4,
  LEFT  = 8,
}

export enum BridgeDirection {
  HORIZONTAL = 'h',
  VERTICAL   = 'v',
}

export enum ConstructionType {
  NORMAL = 'normal',
  WOVEN  = 'woven',
}

export enum Difficulty {
  CASUAL     = 'casual',
  EASY       = 'easy',
  MEDIUM     = 'medium',
  HARD       = 'hard',
  DIABOLICAL = 'diabolical',
}
