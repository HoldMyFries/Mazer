import { mount } from '@vue/test-utils';
import WeaveCell from '@/components/maze/WeaveCell.vue';
import { useMazeStore } from '@/stores/maze-store';
import { smallMaze, withBridges } from '@/../tests/fixtures';

describe('WeaveCell', () => {
  const mazeStore = useMazeStore();
  function setMaze(maze, woven = false) {
    mazeStore.setNewMaze({
      height: maze.board.length,
      width: maze.board[0].length,
      woven,
      maze,
    });
  }

  describe('building path boundaries', () => {
    beforeEach(() => setMaze(smallMaze));

    it('has grid-aligned divs for displaying path boundaries', () => {
      const wrapper = mount(WeaveCell, { props: { x: 0, y: 0 }});

      expect(wrapper.findAll('.square')).toHaveLength(1);
      expect(wrapper.findAll('.corner')).toHaveLength(4);
      expect(wrapper.findAll('.bar')).toHaveLength(4);
    });

    it('sets closed north-wall CSS classes appropriately based on cell.boundaries', () => {
      const wrapper = mount(WeaveCell, { props: { x: 2, y: 1 }});

      expect(wrapper.findAll('.corner')[0].element.classList).not.toContain('right');
      expect(wrapper.find('.bar.top').element.classList).toContain('closed')
      expect(wrapper.findAll('.corner')[1].element.classList).not.toContain('left');
    });

    it('sets closed east-wall CSS classes appropriately based on cell.boundaries', () => {
      const wrapper = mount(WeaveCell, { props: { x: 2, y: 1 }});

      expect(wrapper.findAll('.corner')[1].element.classList).not.toContain('down');
      expect(wrapper.find('.bar.right').element.classList).toContain('closed')
      expect(wrapper.findAll('.corner')[3].element.classList).not.toContain('up');
    });

    it('sets closed south-wall CSS classes appropriately based on cell.boundaries', () => {
      const wrapper = mount(WeaveCell, { props: { x: 2, y: 1 }});

      expect(wrapper.findAll('.corner')[2].element.classList).not.toContain('right');
      expect(wrapper.find('.bar.bottom').element.classList).toContain('closed')
      expect(wrapper.findAll('.corner')[3].element.classList).not.toContain('left');
    });

    it('sets closed west-wall CSS classes appropriately based on cell.boundaries', () => {
      const wrapper = mount(WeaveCell, { props: { x: 2, y: 1 }});

      expect(wrapper.findAll('.corner')[0].element.classList).not.toContain('down');
      expect(wrapper.find('.bar.left').element.classList).toContain('closed')
      expect(wrapper.findAll('.corner')[2].element.classList).not.toContain('up');
    });

    it('sets open north-wall CSS classes appropriately based on cell.boundaries', () => {
      const wrapper = mount(WeaveCell, { props: { x: 1, y: 2 }});

      expect(wrapper.findAll('.corner')[0].element.classList).toContain('right');
      expect(wrapper.find('.bar.top').element.classList).not.toContain('closed')
      expect(wrapper.findAll('.corner')[1].element.classList).toContain('left');
    });

    it('sets open east-wall CSS classes appropriately based on cell.boundaries', () => {
      const wrapper = mount(WeaveCell, { props: { x: 1, y: 2 }});

      expect(wrapper.findAll('.corner')[1].element.classList).toContain('down');
      expect(wrapper.find('.bar.right').element.classList).not.toContain('closed')
      expect(wrapper.findAll('.corner')[3].element.classList).toContain('up');
    });

    it('sets open south-wall CSS classes appropriately based on cell.boundaries', () => {
      const wrapper = mount(WeaveCell, { props: { x: 1, y: 2 }});

      expect(wrapper.findAll('.corner')[2].element.classList).toContain('right');
      expect(wrapper.find('.bar.bottom').element.classList).not.toContain('closed')
      expect(wrapper.findAll('.corner')[3].element.classList).toContain('left');
    });

    it('sets open west-wall CSS classes appropriately based on cell.boundaries', () => {
      const wrapper = mount(WeaveCell, { props: { x: 1, y: 2 }});

      expect(wrapper.findAll('.corner')[0].element.classList).toContain('down');
      expect(wrapper.find('.bar.left').element.classList).not.toContain('closed')
      expect(wrapper.findAll('.corner')[2].element.classList).toContain('up');
    });
  });

  describe('building bridges', () => {
    beforeEach(() => setMaze(withBridges));

    it('handles boundaries for horizontal bridges', () => {
      const wrapper       = mount(WeaveCell, { props: { x: 1, y: 2 }});
      const cornerClasses = wrapper.findAll('.corner').map((corner) => corner.element.classList);

      expect(cornerClasses[0]).toContain('right');
      expect(cornerClasses[0]).toContain('down');
      expect(wrapper.find('.bar.top').element.classList).toContain('bridge');
      expect(cornerClasses[1]).toContain('left');
      expect(cornerClasses[1]).toContain('down');

      expect(cornerClasses[2]).toContain('right');
      expect(cornerClasses[2]).toContain('up');
      expect(wrapper.find('.bar.bottom').element.classList).toContain('bridge');
      expect(cornerClasses[3]).toContain('left');
      expect(cornerClasses[3]).toContain('up');
    });

    it('handles boundaries for vertical bridges', () => {
      const wrapper       = mount(WeaveCell, { props: { x: 1, y: 1 }});
      const cornerClasses = wrapper.findAll('.corner').map((corner) => corner.element.classList);

      expect(cornerClasses[0]).toContain('right');
      expect(cornerClasses[0]).toContain('down');
      expect(wrapper.find('.bar.left').element.classList).toContain('bridge');
      expect(cornerClasses[1]).toContain('left');
      expect(cornerClasses[1]).toContain('down');

      expect(cornerClasses[2]).toContain('right');
      expect(cornerClasses[2]).toContain('up');
      expect(wrapper.find('.bar.right').element.classList).toContain('bridge');
      expect(cornerClasses[3]).toContain('left');
      expect(cornerClasses[3]).toContain('up');
    });
  });

  describe('visited bridge cells (over vertical, under horizontal)', () => {
    beforeEach(() => {
      const fixture = structuredClone(withBridges);

      fixture.board[0][0].playerVisited = true;
      fixture.board[0][1].playerVisited = true;
      fixture.board[1][1].playerVisited = true;
      fixture.board[3][1].playerVisited = true;
      fixture.board[3][2].playerVisited = true;
      fixture.board[3][3].playerVisited = true;

      setMaze(fixture, true);
    });

    describe('player went over a vertical bridge', () => {
      // Is there a way to define this as a lazy-loaded variable?
      // e.g. rspec's `let(:wrapper) { mount(...) }
      function wrapper() {
        return mount(WeaveCell, { props: { x: 1, y: 1 }});
      }

      it('flags the over path as visited', () => {
        expect(wrapper().find('.square').element.classList).toContain('visited');
      });

      it('doesn\'t flag the under path as visited', () => {
        expect(wrapper().find('.bar.left').element.classList).not.toContain('visited');
        expect(wrapper().find('.bar.right').element.classList).not.toContain('visited');
      });
    });

    describe('player went under a horizontal bridge', () => {
      function wrapper() {
        return mount(WeaveCell, { props: { x: 1, y: 2 }});
      }

      it('flags the under path as visited', () => {
        expect(wrapper().find('.bar.top').element.classList).toContain('visited');
        expect(wrapper().find('.bar.bottom').element.classList).toContain('visited');
      });

      it('doesn\'t flag the over path as visited', () => {
        expect(wrapper().find('.square').element.classList).not.toContain('visited');
      });
    });
  });

  describe('visited bridge cells (over horizontal, under vertical)', () => {
    beforeEach(() => {
      const fixture = structuredClone(withBridges);

      fixture.board[0][0].playerVisited = true;
      fixture.board[1][0].playerVisited = true;
      fixture.board[1][2].playerVisited = true;
      fixture.board[1][3].playerVisited = true;
      fixture.board[2][3].playerVisited = true;
      fixture.board[3][3].playerVisited = true;

      setMaze(fixture, true);
    });

    describe('player went under a vertical bridge', () => {
      // Is there a way to define this as a lazy-loaded variable?
      // e.g. rspec's `let(:wrapper) { mount(...) }
      function wrapper() {
        return mount(WeaveCell, { props: { x: 1, y: 1 }});
      }

      it('doesn\'t flag the over path as visited', () => {
        console.log(mazeStore.cells[1][1].playerVisited);
        expect(wrapper().find('.square').element.classList).not.toContain('visited');
      });

      it('flags the under path as visited', () => {
        expect(wrapper().find('.bar.left').element.classList).toContain('visited');
        expect(wrapper().find('.bar.right').element.classList).toContain('visited');
      });
    });

    describe('player went over a horizontal bridge', () => {
      function wrapper() {
        return mount(WeaveCell, { props: { x: 2, y: 1 }});
      }

      it('flags the over path as visited', () => {
        expect(wrapper().find('.square').element.classList).toContain('visited');
      });

      it('doesn\'t flag the under path as visited', () => {
        expect(wrapper().find('.bar.top').element.classList).not.toContain('visited');
        expect(wrapper().find('.bar.bottom').element.classList).not.toContain('visited');
      });
    });
  });
});
