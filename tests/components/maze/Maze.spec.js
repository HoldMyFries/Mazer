import { mount } from '@vue/test-utils';
import Maze from '@/components/maze/Maze.vue';
import { useMazeStore } from '@/stores/maze-store';
import { getSmallMaze, getMaximumEdgeCells } from '@/../tests/fixtures';

// TODO: Need to figure out how to test the contents of a CSS class
//       Since I'm doing v-bind and setting values, that needs to be tested.
//       Vue3's test utils don't appear to provide a means of doing that, which
//       means I should *probably* just find another way to do it.

describe('Maze', () => {
  const mazeStore = useMazeStore();

  function setMaze(maze, woven = false) {
    mazeStore.setNewMaze({
      height: maze.board.length,
      width: maze.board[0].length,
      woven,
      maze,
    });
  }

  describe('calculating cell dimensions', () => {
    beforeEach(() => setMaze(getMaximumEdgeCells()));

    it('bases cell dimensions on window dimensions and maze height/width', () => {
      window.innerWidth  = 180; // 20 * 6
      window.innerHeight = 160; // 100 + 20 * 3

      mount(Maze);

      expect(mazeStore.mazeConfig.cellDimensions).toBe(20);
    });

    it('uses the smaller of the two calculations based on width or height', () => {
      window.innerWidth = 66; // 11 * 6
      window.innerHeight = 250; // 100 + 50 * 3

      mount(Maze);

      expect(mazeStore.mazeConfig.cellDimensions).toBe(11);
    });

    it('sets cell dimensions to no more than 30px', () => {
      window.innerWidth  = 300; // 50 * 6
      window.innerHeight = 250; // 100 + 50 * 3

      mount(Maze);

      expect(mazeStore.mazeConfig.cellDimensions).toBe(30);
    });

    it('sets cell dimensions to no less than 10px', () => {
      window.innerWidth  = 54; // 9 * 6
      window.innerHeight = 127; // 100 + 9 * 3

      mount(Maze);

      expect(mazeStore.mazeConfig.cellDimensions).toBe(10);
    });
  });

  describe('standard style', () => {
    beforeEach(() => setMaze(getSmallMaze()));
  
    it('renders all of the maze cells', () => {
      const wrapper = mount(Maze);
      expect(wrapper.findAll('.maze-cell')).toHaveLength(9);
    });  
  });

  describe('woven style', () => {
    beforeEach(() => setMaze(getSmallMaze(), true));

    it('renders all of the maze cells', () => {
      const wrapper = mount(Maze);
      expect(wrapper.findAll('.weave-cell')).toHaveLength(9);
    });  
  });
});
