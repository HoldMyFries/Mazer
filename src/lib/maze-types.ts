import type { MazeType } from './interfaces';

export const Casual: MazeType = {
  id: 1,
  name: 'Casual',
  description: 'A relaxed maze with fewer branching paths.  Dead-ends tend to be fairly shallow.',
  minHeight: 15,
  maxHeight: 30,
  minWidth:  15,
  maxWidth:  30,
};

export const Easy: MazeType = {
  id: 2,
  name: 'Easy',
  description: 'Dead ends can be a little deeper than with Casual mazes.  May require some looking ahead.',
  minHeight: 10,
  maxHeight: 20,
  minWidth:  10,
  maxWidth:  20,
}

export const Medium: MazeType = {
  id: 3,
  name: 'Medium',
  description: 'Dead ends will likely require some looking ahead for optimal solving.',
  minHeight: 25,
  maxHeight: 35,
  minWidth:  25,
  maxWidth:  35,
}

export const Hard: MazeType = {
  id: 4,
  name: 'Hard',
  description: 'Dead ends will be lengthy.  Looking ahead may require significant memorization skills.',
  minHeight: 40,
  maxHeight: 60,
  minWidth:  40,
  maxWidth:  60,
}

export const Diabolical: MazeType = {
  id: 5,
  name: 'Diabolical',
  description: 'Abandon all hope, ye who enter.',
  minHeight: 80,
  maxHeight: 100,
  minWidth:  80,
  maxWidth:  100,
}

const allTypes = [
  Casual,
  Easy,
  Medium,
  Hard,
  Diabolical
];

export const getMazeType = (id: number): MazeType | undefined => allTypes.find((t) => t.id === id);
