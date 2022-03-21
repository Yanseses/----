import '../scss/style.scss';
import { TIMERS } from './constants.js';
import { createHeader } from './dom/createHeader.js';
import { createMain } from './dom/createMain.js';
import { createStartWindow } from './dom/createStart.js';
import { createPopUp } from './dom/createPopUp.js';
import { createFinish } from './dom/createFinish.js';
import { createCards } from './dom/createCards.js';
import { checkWinGame } from './checkWinGame.js';

const header = createHeader(false);
const main = createMain(false);
const gameContainer = main.section;
const createdWindow = createStartWindow();

document.body.append(header.head, main.container);
gameContainer.append(createdWindow.form);

createdWindow.submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  let inputValue = createdWindow.input.value;
  sessionStorage.setItem('size', inputValue);

  if (inputValue > 7) {
    const createdQuastion = createPopUp();
    main.container.append(createdQuastion.backBlock);
    sessionStorage.setItem('timer', TIMERS.standartTimer);

    createdQuastion.noMoreTimeBtn.addEventListener('click', function () {
      createdQuastion.backBlock.remove();
      gameStart();
    });

    createdQuastion.moreTimeBtn.addEventListener('click', function () {
      createdQuastion.backBlock.remove();
      sessionStorage.setItem('timer', TIMERS.bigTimer);
      gameStart();
    });
  } else {
    sessionStorage.setItem('timer', TIMERS.standartTimer);
    gameStart();
  }
});

function gameStart() {
  document.body.innerHTML = '';
  const createdHead = createHeader(true);
  const createdMain = createMain(true);
  const createdCardList = createCards();
  const listScene = createdCardList.arrCards;
  let timeOver = false;
  let lockerCards = false;
  let firstCard = new Object();
  let secondCard = new Object();

  listScene.forEach((card) => card.addEventListener('click', flipper));

  createdMain.section.append(createdCardList.list);
  document.body.append(createdHead.head, createdMain.container);

  createdHead.toStartBtn.addEventListener('click', () => {
    location.reload();
  });

  createdHead.replayBtn.addEventListener('click', () => {
    gameStart();
  });

  let timer = setInterval(function () {
    let arrowTime = createdHead.headTitle.textContent.split(':');
    let minute = arrowTime[0];
    let seconds = arrowTime[1];
    arrowTime = new Array();

    if (minute > 0 && seconds == 0) {
      minute -= 1;
      minute = '0' + minute;
      seconds = 59;
    } else {
      if (seconds > 0) {
        seconds -= 1;
        if (seconds < 10) {
          seconds = '0' + seconds;
        }
      }
    }

    arrowTime.push(minute, seconds);

    let result = arrowTime.join(':');

    if (minute == '00' && seconds < 4) {
      if (createdHead.headTitle.classList.contains('header__title--alert')) {
        createdHead.headTitle.classList.remove('header__title--alert');
      }
      createdHead.headTitle.classList.add('header__title--alert');
    }
    if (result == '00:00') {
      timeOver = true;
      clearInterval(timer);
    }
    createdHead.headTitle.textContent = result;
  }, 1000);

  let intervalWin = setInterval(() => {
    const checkWin = checkWinGame(createdCardList.cards);

    if (timeOver || checkWin) {
      clearInterval(intervalWin);

      document.body.innerHTML = '';
      const header = createHeader(false);
      const createdMain = createMain(false);
      const final = createFinish(checkWin);

      final.replayBtn.addEventListener('click', function (e) {
        e.preventDefault();

        gameStart();
      });

      final.startWindowBtn.addEventListener('click', function () {
        window.location.reload();
      });

      createdMain.section.append(final.finalContainer);
      document.body.append(header.head, createdMain.container);
    }
  }, 2000);

  // Функция поворота карты
  function flipper() {
    if (this.classList.contains('fliped') || lockerCards) return;

    for (let e in createdCardList.cards) {
      if (createdCardList.cards[e].element == this) {
        if (createdCardList.cards[e].fliped) return;
        createdCardList.cards[e].fliped = true;
        this.classList.add('fliped');
        if (Object.keys(firstCard).length == 0) {
          firstCard.element = this;
          firstCard.val = createdCardList.cards[e].value;
          firstCard.index = e;
        } else {
          secondCard.element = this;
          secondCard.val = createdCardList.cards[e].value;
          secondCard.index = e;
          const checked = checkMatch(firstCard, secondCard, lockerCards);
          if (!checked) {
            createdCardList.cards[firstCard.index].fliped = false;
            createdCardList.cards[secondCard.index].fliped = false;
          }
          Object.keys(firstCard).forEach((el) => delete firstCard[el]);
          Object.keys(secondCard).forEach((el) => delete secondCard[el]);
        }
        break;
      }
    }
  }

  function checkMatch() {
    const first = firstCard.element;
    const second = secondCard.element;

    if (firstCard.val == secondCard.val) {
      first.removeEventListener('click', flipper);
      second.removeEventListener('click', flipper);
      return true;
    } else {
      lockerCards = true;

      setTimeout(() => {
        first.classList.remove('fliped');
        setTimeout(() => {
          second.classList.remove('fliped');
        }, 200);

        lockerCards = false;
      }, 1000);
      return false;
    }
  }
}

// New version
async function renderPage(page) {
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

// function changePage(page) {
//   switch(page){
//     case '': {}
//   }
// }
