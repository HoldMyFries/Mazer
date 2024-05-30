import { mount } from '@vue/test-utils';

import WinModal from '@/components/maze/WinModal.vue';
import { useMazeStore } from '@/stores/maze-store';
import { getVariedMaze } from '@/../tests/fixtures';
import router from '@/router/index';

describe('WinModal', () => {
  const mazeStore = useMazeStore();
  function setMaze(woven = false) {
    const maze = getVariedMaze();
    mazeStore.setNewMaze({
      height: maze.board.length,
      width: maze.board[0].length,
      woven,
      maze,
    });
  }

  function setWinStats({ moved, bonked, enteredAt, solvedAt, visited, revisited }) {
    for (let x = 0; x < moved; x++)  { mazeStore.incrementMoves(); }
    for (let x = 0; x < bonked; x++) { mazeStore.incrementBonks(); }
    mazeStore.setEnteredAt(enteredAt.getTime());
    mazeStore.setSolvedAt(solvedAt.getTime());

    let currentX = 0;
    let currentY = 0;

    for (let x = 0; x < visited - 1; x++) {
      if (++currentX >= mazeStore.mazeConfig.width) { currentX = 0; currentY++; }
      mazeStore.setCellVisited({ x: currentX, y: currentY });
    }

    for (let x = 0; x < revisited; x++) {
      mazeStore.setCellVisited({ x: 0, y: 0 });
    }
  }

  beforeEach(() => {
    setMaze();
    const enteredAt = new Date();
    enteredAt.setHours(0, 0, 0, 0);

    const solvedAt = new Date();
    solvedAt.setHours(1, 17, 33, 459);

    setWinStats({ moved: 99, bonked: 100, enteredAt, solvedAt, visited: 18, revisited: 42 });
  });

  it('properly displays number of times moved', () => {
    const wrapper = mount(WinModal, { global: { plugins: [router] }});
    expect(wrapper.find('#moves').text()).toContain('99');
  });

  it('properly displays number of times bonked', () => {
    const wrapper = mount(WinModal, { global: { plugins: [router] }});
    expect(wrapper.find('#bonks').text()).toContain('100');
  });

  it('properly displays amount of time spent solving', () => {
    const wrapper = mount(WinModal, { global: { plugins: [router] }});
    expect(wrapper.find('#solve-time').text()).toContain('01:17:33.459')
  });

  it('properly displays count and percentage of cells visited', () => {
    const wrapper = mount(WinModal, { global: { plugins: [router] }});
    expect(wrapper.find('#visited').text()).toContain('18 (50%)');
  });

  it('properly displays number of cells revisited', () => {
    const wrapper = mount(WinModal, { global: { plugins: [router] }});
    expect(wrapper.find('#revisited').text()).toContain('42');
  });
});
