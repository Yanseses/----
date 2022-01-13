import { creatorTags } from '../creatorTags.js';

export function createCardList() {
  const list = creatorTags('ul', ['card-list']);
  const gameSize = Number(sessionStorage.getItem('size'));
  let maxCards = Math.pow(gameSize, 2);
  let cards = new Object();
  let arrBack = new Array();
  let arrCards = new Array();

  // Создание массива задней сцены
  for (let i = 0; i < maxCards / 2; i++) {
    if (arrBack.indexOf(i)) {
      arrBack.push(i);
    }
    arrBack.push(i);
  }

  // Тасование Фишшера Йетса массива с числами
  for (let i = arrBack.length - 1; i > 0; i--) {
    let randomNum = Math.floor(Math.random() * (i + 1));
    let cardElem = arrBack[i];
    arrBack[i] = arrBack[randomNum];
    arrBack[randomNum] = cardElem;
  }

  switch (gameSize) {
    case 2: {
      document.documentElement.style.setProperty('--max-width', '49.5%');
      document.documentElement.style.setProperty('--max-height', '320px');
      document.documentElement.style.setProperty('--font-card', '8em');
      break;
    }
    case 6: {
      document.documentElement.style.setProperty('--max-width', '16%');
      document.documentElement.style.setProperty('--max-height', '104px');
      document.documentElement.style.setProperty('--font-card', '4em');
      break;
    }
    case 8: {
      document.documentElement.style.setProperty('--max-width', '12%');
      document.documentElement.style.setProperty('--max-height', '76.5px');
      document.documentElement.style.setProperty('--font-card', '3em');
      break;
    }
    case 10: {
      document.documentElement.style.setProperty('--max-width', '9.6%');
      document.documentElement.style.setProperty('--max-height', '60px');
      document.documentElement.style.setProperty('--font-card', '2em');
      break;
    }
    default: {
      document.documentElement.style.setProperty('--max-width', '24.5%');
      document.documentElement.style.setProperty('--max-height', '158px');
      document.documentElement.style.setProperty('--font-card', '6em');
      break;
    }
  }

  // Создание массива карточек
  for (let i = 0; i < maxCards; i++) {
    const card = creatorTags('li', ['card-list__item']);
    const scene = creatorTags('ul', ['card-list__scene']);
    const frontCard = creatorTags('li', ['card-list__scene-front']);
    const backCard = creatorTags(
      'li',
      ['card-list__scene-back'],
      null,
      arrBack[i]
    );
    cards[i] = new Object();

    scene.append(frontCard, backCard);
    card.append(scene);
    arrCards.push(scene);
    list.append(card);
    cards[i].element = scene;
    cards[i].value = arrBack[i];
    cards[i].fliped = false;
  }

  return { list, cards, arrCards };
}
