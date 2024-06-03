import { flushPromises } from '@vue/test-utils';

import App from '@/App.vue';
import { useMazeStore } from '@/stores/maze-store';
import { useGameStore } from '@/stores/game-store';
import { GameState } from '@/lib/enums';
import { Casual } from '@/lib/maze-types';

import { buildRouter, wait, wrapWithRouter } from '../helpers';

describe.sequential('MazePlayer', () => {
  const mazeStore = useMazeStore();
  const gameStore = useGameStore();

  async function clickCard() {
    const card     = wrapper.find(`.maze-card[data-type=${Casual.type}][data-difficulty=${Casual.difficulty}]`);
    const cardLink = card.wrapperElement.parentNode;

    await cardLink.click();
    await flushPromises();
  }

  beforeEach(async () => {
    this.router  = await buildRouter();
    this.wrapper = await wrapWithRouter(App, router);

    await clickCard();
  });

  it('generates a maze', async () => {
    expect(gameStore.getState()).toBe(GameState.PLAY);
    expect(mazeStore.cells.length).not.toBe(0);
  });

  describe('playing', async () => {
    function isStartOrGoal({ x, y }) {
      if (x === 0 && y === 0) { return true; }
      return x === mazeStore.mazeConfig.width - 1 && y === mazeStore.mazeConfig.height - 1;
    }

    const setCellWithOpenBoundary = (boundary) => {
      const candidates = mazeStore.cells.flat().filter((cell) => {
        return !isStartOrGoal(cell) && ((cell.boundaries & boundary) === 0);
      });

      this.cell = candidates[0];
      mazeStore.setCurrentPosition(cell);
    }

    function isEdgeCell({ x, y }) {
      if (x === 0 || y === 0) { return true; }
      if (x === mazeStore.mazeConfig.width - 1) { return true; }
      return y < mazeStore.mazeConfig.height - 1;
    }

    const setCellWithClosedBoundary = (boundary) => {
      const candidates = mazeStore.cells.flat().filter((cell) => {
        return (!isEdgeCell(cell)) && ((cell.boundaries & boundary) === boundary);
      });

      this.cell = candidates[0];
      mazeStore.setCurrentPosition(cell);
    }

    beforeEach(() => {
      // It feels dirty to access gameStore internals like this, but
      // it also feels dirty to add an action used only by tests.
      gameStore.keydownEvents = 0;
    });

    describe('moving north', () => {
      it('allows using the w key', () => {
        setCellWithOpenBoundary(1);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y - 1);
      });

      it('allows using the up arrow key', () => {
        setCellWithOpenBoundary(1);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowUp' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y - 1);
      });

      it('allows using the w key with capslock or shift key', () => {
        setCellWithOpenBoundary(1);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'W' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y - 1);
      });

      it('doesn\'t allow moving north from the starting point', () => {
        this.cell = mazeStore.getCellByCoords({ x: 0, y: 0 });
        mazeStore.setCurrentPosition(cell);

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y);
      });

      it('doesn\'t allow moving north through a boundary', () => {
        setCellWithClosedBoundary(1);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'w' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y);
      });
    });

    describe('moving east', () => {
      it('allows using the d key', () => {
        setCellWithOpenBoundary(2);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x + 1);
        expect(position.y).toBe(cell.y);
      });

      it('allows using the right arrow key', () => {
        setCellWithOpenBoundary(2);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowRight' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x + 1);
        expect(position.y).toBe(cell.y);
      });

      it('allows using the D key with capslock or shift key', () => {
        setCellWithOpenBoundary(2);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'D' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x + 1);
        expect(position.y).toBe(cell.y);
      });

      it('doesn\'t allow moving east through a boundary', () => {
        setCellWithClosedBoundary(2);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'd' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y);
      });
    });

    describe('moving south', () => {
      it('allows using the s key', () => {
        setCellWithOpenBoundary(4);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y + 1);
      });

      it('allows using the down arrow key', () => {
        setCellWithOpenBoundary(4);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowDown' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y + 1);
      });

      it('allows using the s key with capslock or shift key', () => {
        setCellWithOpenBoundary(4);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'S' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y + 1);
      });

      it('doesn\'t allow moving south from the goal', () => {
        this.cell = mazeStore.getCellByCoords({
          x: mazeStore.mazeConfig.width - 1,
          y: mazeStore.mazeConfig.height - 1,
        });
        mazeStore.setCurrentPosition(cell);

        document.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y);
      });

      it('doesn\'t allow moving south through a boundary', () => {
        setCellWithClosedBoundary(4);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 's' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y);
      });
    });

    describe('moving west', () => {
      it('allows using the a key', () => {
        setCellWithOpenBoundary(8);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x - 1);
        expect(position.y).toBe(cell.y);
      });

      it('allows using the left arrow key', () => {
        setCellWithOpenBoundary(8);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'ArrowLeft' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x - 1);
        expect(position.y).toBe(cell.y);
      });

      it('allows using the A key with capslock or shift key', () => {
        setCellWithOpenBoundary(8);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'A' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x - 1);
        expect(position.y).toBe(cell.y);
      });

      it('doesn\'t allow moving west through a boundary', () => {
        setCellWithClosedBoundary(8);
        document.dispatchEvent(new KeyboardEvent('keydown', { key: 'a' }));

        expect(gameStore.keydownEvents).toBe(1);

        const position = mazeStore.getCurrentCell();

        expect(position.x).toBe(cell.x);
        expect(position.y).toBe(cell.y);
      });
    });
  });

  function solveMaze() {
    const goal = mazeStore.getCellByCoords({
      x: mazeStore.mazeConfig.width - 1,
      y: mazeStore.mazeConfig.height - 1,
    });

    let destination;
    let key;

    if (goal.boundaries & 1) {
      destination = mazeStore.getCellByCoords({ x: goal.x - 1, y: goal.y });
      key = 'd';
    } else {
      destination = mazeStore.getCellByCoords({ x: goal.x, y: goal.y - 1 });
      key = 's';
    }

    mazeStore.setCurrentPosition(destination);
    document.dispatchEvent(new KeyboardEvent('keydown', { key }));
  }

  describe('solving the maze', () => {
    it('displays the win modal after a short delay', async () => {
      solveMaze();

      expect(wrapper.find('.a-winner-is-you').exists()).toBe(false);

      await wait(210);
      expect(wrapper.find('.a-winner-is-you').exists()).toBe(true);
    });
  });

  describe('interacting with the Win Modal', () => {
    async function clickButton(button) {
      wrapper.find(button).trigger('click');
      await wait(10);
    }

    describe('Main Menu button', () => {
      it('navigates to the main menu', async () => {
        solveMaze();
        await wait(210);

        expect(gameStore.getState()).toBe('win')
        
        await clickButton('#main-menu');
        expect(wrapper.find('.maze-card').exists()).toBeTruthy();
      });
    });
  
    describe('Play Again button', () => {
      it('generates a new maze of the same type', async () => {
        solveMaze();
  
        await wait(210);
        await clickButton('#play-again');
  
        expect(gameStore.mazeTypeId).toBe(Casual.id);
      });
    });  
  });
});