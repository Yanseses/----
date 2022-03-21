import { creatorTags } from '../creatorTags.js';
import { START_WINDOW } from '../constants.js';

export function createHeader(game) {
  const timer = sessionStorage.getItem('timer');
  const head = creatorTags('header', ['header']);
  const fixer = creatorTags('div', ['header__container']);
  const headTitle = creatorTags(
    'h2',
    ['header__title'],
    null,
    game ? timer : START_WINDOW.head
  );
  const toStartBtn = creatorTags(
    'button',
    game
      ? ['header__btn', 'header__btn--quit']
      : ['header__btn', 'header__btn--hide'],
    { type: 'button', title: 'В начало' }
  );
  const replayBtn = creatorTags(
    'button',
    game
      ? ['header__btn', 'header__btn--restart']
      : ['header__btn', 'header__btn--hide'],
    { type: 'button', title: 'Рестарт' }
  );

  fixer.append(toStartBtn, headTitle, replayBtn);
  head.append(fixer);

  return { head, headTitle, toStartBtn, replayBtn };
}
