import '../scss/style.scss';
import { TIMERS } from './constants.js';
import { createHeader } from './dom/createHeader.js';
import { createMain } from './dom/createMain.js';
import { checkWinGame } from './checkWinGame.js';

async function renderPage(page) {
  const header = createHeader(false);
  const main = createMain(false);
  const gameContainer = main.section;

  document.body.append(header.head, main.container);

  switch (page) {
    case 'start': {
      let { createPopUp } = await import('./dom/createPopUp.js');
      let { createStart } = await import('./dom/createStart.js');

      break;
    }
    case 'game': {
      let { createCards } = await import('./dom/createCards.js');

      break;
    }
    case 'finish': {
      let { createFinish } = await import('./dom/createFinish.js');

      break;
    }
  }
}
