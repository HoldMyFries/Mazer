import type { MazeType } from '@/lib/interfaces';
import { ConstructionType, Difficulty } from '@/lib/enums';

export const Casual: MazeType = {
  id: 1,
  name: 'Casual',
  description: 'A relaxed maze with fewer branching paths.  Dead-ends tend to be fairly shallow.',
  minHeight: 15,
  maxHeight: 30,
  minWidth:  15,
  maxWidth:  30,
  type: ConstructionType.NORMAL,
  difficulty: Difficulty.CASUAL,
};

export const Easy: MazeType = {
  id: 2,
  name: 'Easy',
  description: 'Dead ends can be a little deeper than with Casual mazes.  May require some looking ahead.',
  minHeight: 10,
  maxHeight: 20,
  minWidth:  10,
  maxWidth:  20,
  type: ConstructionType.NORMAL,
  difficulty: Difficulty.EASY,
}

export const Medium: MazeType = {
  id: 3,
  name: 'Medium',
  description: 'Dead ends will likely require some looking ahead for optimal solving.',
  minHeight: 25,
  maxHeight: 35,
  minWidth:  25,
  maxWidth:  35,
  type: ConstructionType.NORMAL,
  difficulty: Difficulty.MEDIUM,
}

export const Hard: MazeType = {
  id: 4,
  name: 'Hard',
  description: 'Dead ends will be lengthy.  Looking ahead may require significant memorization skills.',
  minHeight: 40,
  maxHeight: 60,
  minWidth:  40,
  maxWidth:  60,
  type: ConstructionType.NORMAL,
  difficulty: Difficulty.HARD,
}

export const Diabolical: MazeType = {
  id: 5,
  name: 'Diabolical',
  description: 'Abandon all hope, ye who enter.',
  minHeight: 80,
  maxHeight: 100,
  minWidth:  80,
  maxWidth:  100,
  type: ConstructionType.NORMAL,
  difficulty: Difficulty.DIABOLICAL,
}

export const WovenCasual: MazeType = {
  id: 6,
  name: 'Casual Woven',
  description: 'A relaxed, woven maze with fewer branching paths. ',
  minHeight: 10,
  maxHeight: 20,
  minWidth:  10,
  maxWidth:  20,
  type: ConstructionType.WOVEN,
  difficulty: Difficulty.CASUAL,
};

export const WovenEasy: MazeType = {
  id: 7,
  name: 'Easy Woven',
  description: 'Dead ends can be a little deeper than with Casual mazes.  May require some looking ahead.',
  minHeight: 7,
  maxHeight: 14,
  minWidth:  7,
  maxWidth:  14,
  type: ConstructionType.WOVEN,
  difficulty: Difficulty.EASY,
}

export const WovenMedium: MazeType = {
  id: 8,
  name: 'Medium Woven',
  description: 'Dead ends will likely require some looking ahead for optimal solving.',
  minHeight: 15,
  maxHeight: 30,
  minWidth:  15,
  maxWidth:  30,
  type: ConstructionType.WOVEN,
  difficulty: Difficulty.MEDIUM,
}

export const WovenHard: MazeType = {
  id: 9,
  name: 'Hard Woven',
  description: 'Dead ends will be lengthy.  Looking ahead may require significant memorization skills.',
  minHeight: 35,
  maxHeight: 50,
  minWidth:  35,
  maxWidth:  50,
  type: ConstructionType.WOVEN,
  difficulty: Difficulty.HARD,
}

export const allMazeTypes = {
  normal: [
    Casual,
    Easy,
    Medium,
    Hard,
    Diabolical,  
  ],
  woven: [
    WovenCasual,
    WovenEasy,
    WovenMedium,
    WovenHard,
  ]
};

export const getMazeTypeById = (id: number): MazeType | undefined => {
  return allMazeTypes.normal.find((t) => t.id === id) || allMazeTypes.woven.find((t) => t.id === id);
};

export const getMazeTypeByTypeAndDifficulty = (type: ConstructionType, difficulty: Difficulty): MazeType | undefined => {
  return allMazeTypes.normal.find((t) => t.type === type && t.difficulty === difficulty) ||
         allMazeTypes.woven.find((t)  => t.type === type && t.difficulty === difficulty);
};
