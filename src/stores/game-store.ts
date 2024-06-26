import { defineStore } from 'pinia';
import type { GameStore } from '@/lib/interfaces';
import { GameState } from '@/lib/enums';

export const useGameStore = defineStore('gameStore', {
  state: () => ({
    state: GameState.BUILD,
    mazeTypeId: 0,
    error: null,
    keydownEvents: 0,
  } as GameStore ),
  getters: {
    getState: (state) => (() => state.state),
  },
  actions: {
    incrementKeydownEvents() { this.keydownEvents++; },
    setError(error: string) { this.error = error; },
    clearError() { this.error = null; },
    setSelectedMazeType(mazeTypeId: number) { this.mazeTypeId = mazeTypeId; },
    setState(state: GameState) { this.state = state; },
  },
});
