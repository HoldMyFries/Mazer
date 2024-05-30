import { mount } from '@vue/test-utils';
import MazeCell from '@/components/maze/MazeCell.vue';
import { useMazeStore } from '@/stores/maze-store';
import { getVariedMaze, getMaximumEdgeCells, getSmallMaze } from '@/../tests/fixtures';

// This looks verbose and repetitive; however, I didn't want to use the same logic
// that determines what the border css classes should be to also be used in the test.
// That doesn't actually test anything due to the circular logic (using the answer as the question).

// Unfortunately, these specs are kind of slow, I assume due to the massive amount of mounting of MazeCell components.
// It might be more expedient to test this component through its parent component.
// Guess I can check that when I write the specs for the Maze component.
describe('MazeCell', () => {
  const mazeStore = useMazeStore();
  function setMaze(maze, woven = false) {
    mazeStore.setNewMaze({
      height: maze.board.length,
      width: maze.board[0].length,
      woven,
      maze,
    });
  }

  describe('inner cells', () => {
    beforeEach(() => setMaze(getVariedMaze()));
  
    it('inner cells have correct borders', () => {
      // boundaries: 0
      let wrapper = mount(MazeCell, { props: { x: 1, y: 1 }});
      expect(wrapper.classes('n-wall')).toBe(false);
      expect(wrapper.classes('e-wall')).toBe(false);
      expect(wrapper.classes('s-wall')).toBe(false);
      expect(wrapper.classes('w-wall')).toBe(false);
  
      // boundaries: 1
      wrapper = mount(MazeCell, { props: { x: 2, y: 1 }});
      expect(wrapper.classes('n-wall')).toBe(true);
      expect(wrapper.classes('e-wall')).toBe(false);
      expect(wrapper.classes('s-wall')).toBe(false);
      expect(wrapper.classes('w-wall')).toBe(false);
  
      // boundaries: 2
      wrapper = mount(MazeCell, { props: { x: 3, y: 1 }});
      expect(wrapper.classes('n-wall')).toBe(false);
      expect(wrapper.classes('e-wall')).toBe(true);
      expect(wrapper.classes('s-wall')).toBe(false);
      expect(wrapper.classes('w-wall')).toBe(false);
  
      // boundaries: 3
      wrapper = mount(MazeCell, { props: { x: 4, y: 1 }});
      expect(wrapper.classes('n-wall')).toBe(true);
      expect(wrapper.classes('e-wall')).toBe(true);
      expect(wrapper.classes('s-wall')).toBe(false);
      expect(wrapper.classes('w-wall')).toBe(false);
  
      // boundaries: 4
      wrapper = mount(MazeCell, { props: { x: 1, y: 2 }});
      expect(wrapper.classes('n-wall')).toBe(false);
      expect(wrapper.classes('e-wall')).toBe(false);
      expect(wrapper.classes('s-wall')).toBe(true);
      expect(wrapper.classes('w-wall')).toBe(false);
  
      // boundaries: 5
      wrapper = mount(MazeCell, { props: { x: 2, y: 2 }});
      expect(wrapper.classes('n-wall')).toBe(true);
      expect(wrapper.classes('e-wall')).toBe(false);
      expect(wrapper.classes('s-wall')).toBe(true);
      expect(wrapper.classes('w-wall')).toBe(false);
  
      // boundaries: 6
      wrapper = mount(MazeCell, { props: { x: 3, y: 2 }});
      expect(wrapper.classes('n-wall')).toBe(false);
      expect(wrapper.classes('e-wall')).toBe(true);
      expect(wrapper.classes('s-wall')).toBe(true);
      expect(wrapper.classes('w-wall')).toBe(false);
  
      // boundaries: 7
      wrapper = mount(MazeCell, { props: { x: 4, y: 2 }});
      expect(wrapper.classes('n-wall')).toBe(true);
      expect(wrapper.classes('e-wall')).toBe(true);
      expect(wrapper.classes('s-wall')).toBe(true);
      expect(wrapper.classes('w-wall')).toBe(false);
  
      // boundaries: 8
      wrapper = mount(MazeCell, { props: { x: 1, y: 3 }});
      expect(wrapper.classes('n-wall')).toBe(false);
      expect(wrapper.classes('e-wall')).toBe(false);
      expect(wrapper.classes('s-wall')).toBe(false);
      expect(wrapper.classes('w-wall')).toBe(true);
  
      // boundaries: 9
      wrapper = mount(MazeCell, { props: { x: 2, y: 3 }});
      expect(wrapper.classes('n-wall')).toBe(true);
      expect(wrapper.classes('e-wall')).toBe(false);
      expect(wrapper.classes('s-wall')).toBe(false);
      expect(wrapper.classes('w-wall')).toBe(true);
  
      // boundaries: 10
      wrapper = mount(MazeCell, { props: { x: 3, y: 3 }});
      expect(wrapper.classes('n-wall')).toBe(false);
      expect(wrapper.classes('e-wall')).toBe(true);
      expect(wrapper.classes('s-wall')).toBe(false);
      expect(wrapper.classes('w-wall')).toBe(true);
  
      // boundaries: 11
      wrapper = mount(MazeCell, { props: { x: 4, y: 3 }});
      expect(wrapper.classes('n-wall')).toBe(true);
      expect(wrapper.classes('e-wall')).toBe(true);
      expect(wrapper.classes('s-wall')).toBe(false);
      expect(wrapper.classes('w-wall')).toBe(true);
  
      // boundaries: 12
      wrapper = mount(MazeCell, { props: { x: 1, y: 4 }});
      expect(wrapper.classes('n-wall')).toBe(false);
      expect(wrapper.classes('e-wall')).toBe(false);
      expect(wrapper.classes('s-wall')).toBe(true);
      expect(wrapper.classes('w-wall')).toBe(true);
  
      // boundaries: 13
      wrapper = mount(MazeCell, { props: { x: 2, y: 4 }});
      expect(wrapper.classes('n-wall')).toBe(true);
      expect(wrapper.classes('e-wall')).toBe(false);
      expect(wrapper.classes('s-wall')).toBe(true);
      expect(wrapper.classes('w-wall')).toBe(true);
  
      // boundaries: 14
      wrapper = mount(MazeCell, { props: { x: 3, y: 4 }});
      expect(wrapper.classes('n-wall')).toBe(false);
      expect(wrapper.classes('e-wall')).toBe(true);
      expect(wrapper.classes('s-wall')).toBe(true);
      expect(wrapper.classes('w-wall')).toBe(true);
  
      // boundaries: 15 -- this should never happen
      wrapper = mount(MazeCell, { props: { x: 4, y: 4 }});
      expect(wrapper.classes('n-wall')).toBe(true);
      expect(wrapper.classes('e-wall')).toBe(true);
      expect(wrapper.classes('s-wall')).toBe(true);
      expect(wrapper.classes('w-wall')).toBe(true);
    });
  });

  describe('edge cells', () => {
    beforeEach(() => setMaze(getMaximumEdgeCells()));

    it('only flags 0,0 cell as current', () => {
      for(let x = 0; x < 6; x++) {
        for(let y = 0; y < 3; y++) {
          let wrapper = mount(MazeCell, { props: { x, y }});
          expect(wrapper.classes('current')).toBe(x === 0 && y === 0);  
        }
      }
    });

    it('edge cells have correct edge-borders', () => {
      // Boundaries: 8
      let wrapper = mount(MazeCell, { props: { x: 0, y: 0 }});
      expect(wrapper.classes('n-wall-thick')).toBe(false);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(false);
      expect(wrapper.classes('w-wall-thick')).toBe(true);

      // Boundaries: 1
      wrapper = mount(MazeCell, { props: { x: 1, y: 0 }});
      expect(wrapper.classes('n-wall-thick')).toBe(true);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(false);
      expect(wrapper.classes('w-wall-thick')).toBe(false);

      // Boundaries: 3
      wrapper = mount(MazeCell, { props: { x: 2, y: 0 }});
      expect(wrapper.classes('n-wall-thick')).toBe(true);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(false);
      expect(wrapper.classes('w-wall-thick')).toBe(false);
      
      // Boundaries: 11
      wrapper = mount(MazeCell, { props: { x: 3, y: 0 }});
      expect(wrapper.classes('n-wall-thick')).toBe(true);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(false);
      expect(wrapper.classes('w-wall-thick')).toBe(false);

      // Boundaries: 9
      wrapper = mount(MazeCell, { props: { x: 4, y: 0 }});
      expect(wrapper.classes('n-wall-thick')).toBe(true);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(false);
      expect(wrapper.classes('w-wall-thick')).toBe(false);

      // Boundaries: 15
      wrapper = mount(MazeCell, { props: { x: 5, y: 0 }});
      expect(wrapper.classes('n-wall-thick')).toBe(true);
      expect(wrapper.classes('e-wall-thick')).toBe(true);
      expect(wrapper.classes('s-wall-thick')).toBe(false);
      expect(wrapper.classes('w-wall-thick')).toBe(false);

      // Boundaries: 13
      wrapper = mount(MazeCell, { props: { x: 0, y: 1 }});
      expect(wrapper.classes('n-wall-thick')).toBe(false);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(false);
      expect(wrapper.classes('w-wall-thick')).toBe(true);

      // Boundaries: 14
      wrapper = mount(MazeCell, { props: { x: 5, y: 1 }});
      expect(wrapper.classes('n-wall-thick')).toBe(false);
      expect(wrapper.classes('e-wall-thick')).toBe(true);
      expect(wrapper.classes('s-wall-thick')).toBe(false);
      expect(wrapper.classes('w-wall-thick')).toBe(false);

      // Boundaries: 12
      wrapper = mount(MazeCell, { props: { x: 0, y: 2 }});
      expect(wrapper.classes('n-wall-thick')).toBe(false);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(true);
      expect(wrapper.classes('w-wall-thick')).toBe(true);

      // Boundaries: 4
      wrapper = mount(MazeCell, { props: { x: 1, y: 2 }});
      expect(wrapper.classes('n-wall-thick')).toBe(false);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(true);
      expect(wrapper.classes('w-wall-thick')).toBe(false);

      // Boundaries: 5
      wrapper = mount(MazeCell, { props: { x: 2, y: 2 }});
      expect(wrapper.classes('n-wall-thick')).toBe(false);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(true);
      expect(wrapper.classes('w-wall-thick')).toBe(false);

      // Boundaries: 6
      wrapper = mount(MazeCell, { props: { x: 3, y: 2 }});
      expect(wrapper.classes('n-wall-thick')).toBe(false);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(true);
      expect(wrapper.classes('w-wall-thick')).toBe(false);

      // Boundaries: 7
      wrapper = mount(MazeCell, { props: { x: 4, y: 2 }});
      expect(wrapper.classes('n-wall-thick')).toBe(false);
      expect(wrapper.classes('e-wall-thick')).toBe(false);
      expect(wrapper.classes('s-wall-thick')).toBe(true);
      expect(wrapper.classes('w-wall-thick')).toBe(false);

      // Boundaries: 2
      wrapper = mount(MazeCell, { props: { x: 5, y: 2 }});
      expect(wrapper.classes('n-wall-thick')).toBe(false);
      expect(wrapper.classes('e-wall-thick')).toBe(true);
      expect(wrapper.classes('s-wall-thick')).toBe(false);
      expect(wrapper.classes('w-wall-thick')).toBe(false);
    });
  });

  describe('visited cells', () => {
    beforeEach(() => setMaze(getSmallMaze()));

    it('doesn\'t flag the current position as "visited"', () => {
      const wrapper = mount(MazeCell, { props: { x: 0, y: 0 }});
      expect(wrapper.classes('visited')).toBe(false);
    });

    it('flags visited cells as "visited"', () => {
      for(let x = 0; x < 3; x++) {
        for(let y = 0; y < 3; y++) {
          if (x !== 0 || y !== 0) {
            const wrapper = mount(MazeCell, { props: { x, y }});
            expect(wrapper.classes('visited')).toBe(mazeStore.getCellByCoords({ x, y }).playerVisited)
          }
        }
      }
    });
  });
});
