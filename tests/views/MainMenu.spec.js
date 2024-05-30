import { mount, flushPromises } from '@vue/test-utils';
import { createRouter, createMemoryHistory } from 'vue-router';

import App from '@/App.vue';
import { routes } from '@/router/index';
import { allMazeTypes, Casual, WovenMedium } from '@/lib/maze-types';

// Using createMemoryHistory() here prevents an obnoxious (but probably harmless)
// warning from getting spat out every time the route changes in a test.
// This is likely due to not actually using a browser, and instead just using node.
const router = createRouter({
  history: createMemoryHistory(),
  routes: routes,
});

describe('Main Menu', async () => {
  async function wrap() {
    return mount(App, { global: { plugins: [router] }});
  }

  beforeEach(async () => {
    router.push('/');
    await router.isReady();
  });

  it('renders maze cards in rows based on defined categorizations', async () => {
    const wrapper = await wrap();
    const normal  = wrapper.find('.type:nth-child(1) .type-row');
    const woven   = wrapper.find('.type:nth-child(2) .type-row');

    allMazeTypes.normal.forEach((type) => {
      const card = normal.find(`.maze-card[data-type=${type.type}][data-difficulty=${type.difficulty}]`);
      expect(card.exists()).toBe(true);
    });

    allMazeTypes.woven.forEach((type) => {
      const card = woven.find(`.maze-card[data-type=${type.type}][data-difficulty=${type.difficulty}]`);
      expect(card.exists()).toBe(true);
    });
  });

  describe('navigation', () => {
    async function clickCard(mazeType) {
      const wrapper  = await wrap();
      const card     = wrapper.find(`.maze-card[data-type=${mazeType.type}][data-difficulty=${mazeType.difficulty}]`);
      const cardLink = card.wrapperElement.parentNode;

      await cardLink.click();
      await flushPromises();
    }

    describe('clicking Standard/Casual', () => {
      it('navigates to /maze/normal/casual', async () => {
        await clickCard(Casual);
        expect(router.currentRoute.value.fullPath).toBe('/maze/normal/casual')
      });
    });

    describe('clicking Woven/Medium', () => {
      it('navigates to /maze/woven/medium', async () => {
        await clickCard(WovenMedium);
        expect(router.currentRoute.value.fullPath).toBe('/maze/woven/medium')
      });
    });
  });
});
