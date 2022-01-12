import '../scss/style.scss';
import { TIMERS } from './constants.js';
import { createHeader } from './dom/createHeader.js';
import { createMain } from './dom/createMain.js';
import { createStartWindow } from './dom/createStartWindow.js';
import { createQuastionWindow } from './dom/createQuastionWindow.js';
import { createFinalWindow } from './dom/createFinalWindow.js';
import { createCardList } from './dom/createCardList.js';
import { createdTimer } from './dom/createdTimer.js';

const header = createHeader(false);
const main = createMain(false);
const gameContainer = main.section;
const createdWindow = createStartWindow();

document.body.append(header.head, main.container)
gameContainer.append(createdWindow.form);

createdWindow.submitBtn.addEventListener('click', function (e) {
  e.preventDefault();

  let inputValue = createdWindow.input.value;
  sessionStorage.setItem('size', inputValue);

  if (inputValue > 7) {
    const createdQuastion = createQuastionWindow();
    main.container.append(createdQuastion.backBlock);
    sessionStorage.setItem('timer', TIMERS.standartTimer);

    createdQuastion.noMoreTimeBtn.addEventListener('click', function() {
      createdQuastion.backBlock.remove();
      gameStart();
    });
  
    createdQuastion.moreTimeBtn.addEventListener('click', function() {  
      createdQuastion.backBlock.remove();
      sessionStorage.setItem('timer', TIMERS.bigTimer);
      gameStart();
    });
  } else {
    sessionStorage.setItem('timer', TIMERS.standartTimer);
    gameStart();
  }
});

function gameStart(){
  document.body.innerHTML = '';
  const createdHead = createHeader(true);
  const createdMain = createMain(true);
  const createdCardList = createCardList();
  const listScene = createdCardList.arrCards;
  let lockerCards = false;
  let firstCard = new Object();
  let secondCard = new Object();

  listScene.forEach((card) => card.addEventListener('click', flipper));

  createdMain.section.append(createdCardList.list)
  document.body.append(createdHead.head, createdMain.container);

  let timerChecker = createdTimer(createdHead.headTitle);

  let intervalWin = setInterval(() => {
    const checkWin = checkWinGame(createdCardList.cards);

    if(timerChecker.timeIsOver || checkWin){
      clearInterval(timerChecker.timer);
      clearInterval(intervalWin);

      document.body.innerHTML = '';
      const header = createHeader(false);
      const createdMain = createMain(false);
      const final = createFinalWindow(checkWin);

      createdMain.section.append(final);
      document.body.append(header.head, createdMain.container);
    }

    
  }, 2000);

  // Функция поворота карты
  function flipper(){
    if (this.classList.contains('fliped') || lockerCards) return;

    for(let e in createdCardList.cards){
      if(createdCardList.cards[e].element == this){
        if(createdCardList.cards[e].fliped) return;
        createdCardList.cards[e].fliped = true;
        this.classList.add('fliped');
        if(Object.keys(firstCard).length == 0){
          firstCard.element = this;
          firstCard.val = createdCardList.cards[e].value;
          firstCard.index = e;
        } else {
          secondCard.element = this;
          secondCard.val = createdCardList.cards[e].value;
          secondCard.index = e;
          const checked = checkMatch(firstCard, secondCard, lockerCards);
          if(!checked){
            createdCardList.cards[firstCard.index].fliped = false;
            createdCardList.cards[secondCard.index].fliped = false;
          }
          Object.keys(firstCard).forEach( el => delete firstCard[el]);
          Object.keys(secondCard).forEach( el => delete secondCard[el]);
        }
        break;
      }
    }
  }

  function checkMatch(){
    const first = firstCard.element;
    const second = secondCard.element;
  
    if(firstCard.val == secondCard.val){
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

function checkWinGame(obj){
  const checkArray = new Array();

  Object.keys(obj).forEach(el => {
    checkArray.push(obj[el].fliped);
  });

  if(checkArray.includes(false)){
    return false;
  } else {
    return true;
  }
}
