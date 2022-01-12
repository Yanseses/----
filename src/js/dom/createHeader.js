import { creatorTags } from '../creatorTags.js';
import { START_WINDOW } from '../constants.js';

export function createHeader(game){
  const timer = sessionStorage.getItem('timer');
  const head = creatorTags('header', ['header']);
  const fixer = creatorTags('div', ['header__container']);
  const headTitle = creatorTags('h2', ['header__title'], null, game ? timer : START_WINDOW.head);
  const toStartBtn = creatorTags('button', game ? ['header__btn'] : ['header__btn', 'header__btn--hide']);
  const replayBtn = creatorTags('button', game ? ['header__btn'] : ['header__btn', 'header__btn--hide']);

  fixer.append(toStartBtn, headTitle, replayBtn);

  toStartBtn.addEventListener('click', () => {
    // Выход на главную
  });

  replayBtn.addEventListener('click', () => {
    location.reload();
  });

  head.append(fixer);

  return {head, headTitle};
}
