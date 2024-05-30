import { mount } from '@vue/test-utils';
import MazeCard from '@/components/MazeCard.vue';
import { WovenMedium, Diabolical } from '@/lib/maze-types';

import router from '@/router/index';

describe('MazeCard', () => {
  function wrap(mazeType) {
    return mount(
      MazeCard,
      {
        props: { mazeType },
        global: {
          plugins: [router],
        },
      }
    );
  }

  describe('Diabolical', () => {
    it('displays the maze type name and description', () => {
      const wrapper = wrap(Diabolical);
      expect(wrapper.find('h3').text()).toContain(Diabolical.name);
      expect(wrapper.find('p').text()).toContain(Diabolical.description);
    });  
  });

  describe('WovenMedium', () => {
    it('displays the maze type name and description', () => {
      const wrapper = wrap(WovenMedium);
      expect(wrapper.find('h3').text()).toContain(WovenMedium.name);
      expect(wrapper.find('p').text()).toContain(WovenMedium.description);
    });  
  });
});