import { mount } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';

import App from '@/App.vue';
import { useGameStore } from '@/stores/game-store';

import { wait, buildRouter, wrapWithRouter } from './helpers';

describe('App', async () => {
  const gameStore = useGameStore();

  beforeEach(async () => this.router = await buildRouter());

  describe('handled errors', () => {
    beforeEach(async () => {
      this.error = 'You came here to play a maze. Instead, you got this expected error.  =(';
      gameStore.setError(error);

      this.wrapper = await wrapWithRouter(App, router);
    });

    it('displays the error', () => {
      expect(wrapper.text()).toContain(error);
    });

    it('can be closed', async () => {
      wrapper.find('.close').trigger('click');
      await wait(10);

      expect(wrapper.text()).not.toContain(error);
    });
  });
});