import { defineStore } from 'pinia';

const acceptedStates = [ 'main-menu', 'build', 'play', 'win' ];

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    state: 'main-menu',
    mazeTypeId: 0,
  }),
  actions: {
    setSelectedMazeType(mazeTypeId: number) {
      this.mazeTypeId = mazeTypeId;
    },
    setState(state: string) {
      if (!acceptedStates.find((s) => s === state)) {
        throw new Error(`Unrecognized state: '${state}'`);
      }

      this.state = state;
    }
  },
});
