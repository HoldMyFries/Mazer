import type { MazeType } from './interfaces';

export const Casual: MazeType = {
  id: 1,
  name: 'Casual',
  description: 'A relaxed maze with fewer branching paths.  Dead-ends tend to be fairly shallow.',
  minHeight: 15,
  maxHeight: 30,
  minWidth:  15,
  maxWidth:  30,
  woven: false,
};

export const Easy: MazeType = {
  id: 2,
  name: 'Easy',
  description: 'Dead ends can be a little deeper than with Casual mazes.  May require some looking ahead.',
  minHeight: 10,
  maxHeight: 20,
  minWidth:  10,
  maxWidth:  20,
  woven: false,
}

export const Medium: MazeType = {
  id: 3,
  name: 'Medium',
  description: 'Dead ends will likely require some looking ahead for optimal solving.',
  minHeight: 25,
  maxHeight: 35,
  minWidth:  25,
  maxWidth:  35,
  woven: false,
}

export const Hard: MazeType = {
  id: 4,
  name: 'Hard',
  description: 'Dead ends will be lengthy.  Looking ahead may require significant memorization skills.',
  minHeight: 40,
  maxHeight: 60,
  minWidth:  40,
  maxWidth:  60,
  woven: false,
}

export const Diabolical: MazeType = {
  id: 5,
  name: 'Diabolical',
  description: 'Abandon all hope, ye who enter.',
  minHeight: 80,
  maxHeight: 100,
  minWidth:  80,
  maxWidth:  100,
  woven: false,
}

export const WovenCasual: MazeType = {
  id: 6,
  name: 'Casual Woven',
  description: 'A relaxed, woven maze with fewer branching paths. ',
  minHeight: 10,
  maxHeight: 20,
  minWidth:  10,
  maxWidth:  20,
  woven: true,
};

export const WovenEasy: MazeType = {
  id: 7,
  name: 'Easy Woven',
  description: 'Dead ends can be a little deeper than with Casual mazes.  May require some looking ahead.',
  minHeight: 7,
  maxHeight: 14,
  minWidth:  7,
  maxWidth:  14,
  woven: true,
}

export const WovenMedium: MazeType = {
  id: 8,
  name: 'Medium Woven',
  description: 'Dead ends will likely require some looking ahead for optimal solving.',
  minHeight: 15,
  maxHeight: 30,
  minWidth:  15,
  maxWidth:  30,
  woven: true,
}

export const WovenHard: MazeType = {
  id: 9,
  name: 'Hard Woven',
  description: 'Dead ends will be lengthy.  Looking ahead may require significant memorization skills.',
  minHeight: 35,
  maxHeight: 50,
  minWidth:  35,
  maxWidth:  50,
  woven: true,
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

export const getMazeType = (id: number): MazeType | undefined => {
  return allMazeTypes.normal.find((t) => t.id === id) || allMazeTypes.woven.find((t) => t.id === id);
};
