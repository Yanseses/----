/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/constants.js
var START_WINDOW = {
  head: 'Игра в пары',
  description: 'Выберите колличество клеток по горизонтали и вертикали для игры, в диапазоне от 2 до 10. Стандартно на игру отводится 1 минута.',
  buttons: {
    up: '&#43;',
    down: '&#8722;',
    start: 'Начать'
  }
};
var QUASTION = {
  heading: 'Вы уверены, что вам хватит 1 минуты для игры?',
  moreTime: 'Добавить 4 минуты',
  noMoreTime: 'Оставить как есть'
};
var FINAL_WINDOW = {
  looseHead: 'Поражение!',
  winHead: 'Победа!',
  descr: 'Вы можете начать новую игру, или вернуться к выбору колличества карточек',
  buttons: {
    "new": 'Новая игра',
    repeat: 'В начало'
  }
};
var TIMERS = {
  standartTimer: '01:00',
  bigTimer: '05:00'
};
;// CONCATENATED MODULE: ./src/js/creatorTags.js
function _toConsumableArray(arr) { return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread(); }

function _nonIterableSpread() { throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _iterableToArray(iter) { if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter); }

function _arrayWithoutHoles(arr) { if (Array.isArray(arr)) return _arrayLikeToArray(arr); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function creatorTags(tag) {
  var _element$classList;

  var className = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var settings = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var text = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : null;
  var element = document.createElement(tag);

  (_element$classList = element.classList).add.apply(_element$classList, _toConsumableArray(className));

  if (settings !== null) {
    for (var key in settings) {
      element.setAttribute(key, settings[key]);
    }
  }

  if (text !== null) {
    element.innerHTML = text;
  }

  return element;
}
;// CONCATENATED MODULE: ./src/js/dom/createHeader.js


function createHeader(game) {
  var timer = sessionStorage.getItem('timer');
  var head = creatorTags('header', ['header']);
  var fixer = creatorTags('div', ['header__container']);
  var headTitle = creatorTags('h2', ['header__title'], null, game ? timer : START_WINDOW.head);
  var toStartBtn = creatorTags('button', game ? ['header__btn', 'header__btn--quit'] : ['header__btn', 'header__btn--hide'], {
    type: 'button',
    title: 'В начало'
  });
  var replayBtn = creatorTags('button', game ? ['header__btn', 'header__btn--restart'] : ['header__btn', 'header__btn--hide'], {
    type: 'button',
    title: 'Рестарт'
  });
  fixer.append(toStartBtn, headTitle, replayBtn);
  head.append(fixer);
  return {
    head: head,
    headTitle: headTitle,
    toStartBtn: toStartBtn,
    replayBtn: replayBtn
  };
}
;// CONCATENATED MODULE: ./src/js/dom/createMain.js

function createMain(game) {
  var container = creatorTags('main', ['main'], {
    id: 'main'
  });
  var section = creatorTags('section', game ? ['main__container', 'main__container--game'] : ['main__container', 'main__container--settings'], {
    id: 'container'
  });
  container.append(section);
  return {
    container: container,
    section: section
  };
}
;// CONCATENATED MODULE: ./src/js/dom/createStart.js


function createStart() {
  var value = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 4;
  var form = creatorTags('div', ['settings']);
  var description = creatorTags('p', ['settings__description'], null, START_WINDOW.description);
  var inputFieldset = creatorTags('div', ['settings__container']);
  var submitFieldset = creatorTags('div', ['settings__container']);
  var inputLabel = creatorTags('label', ['settings__label'], {
    "for": 'maxСouple'
  });
  var input = creatorTags('input', ['settings__input'], {
    type: 'number',
    value: value,
    readonly: '',
    id: 'maxСouple'
  });
  var numberUp = creatorTags('button', ['settings__calc-btn', 'settings__calc-btn--up'], null, START_WINDOW.buttons.up);
  var numberDown = creatorTags('button', ['settings__calc-btn', 'settings__calc-btn--down'], null, START_WINDOW.buttons.down);
  var submitBtn = creatorTags('input', ['settings__button'], {
    type: 'submit',
    value: START_WINDOW.buttons.start
  });
  inputFieldset.append(inputLabel);
  inputLabel.append(numberDown, input, numberUp);
  submitFieldset.append(submitBtn);
  form.append(description, inputFieldset, submitFieldset);
  numberDown.addEventListener('click', function (e) {
    e.preventDefault();
    var inputValue = input.value;

    if (inputValue == 2) {
      return input.value = 2;
    }

    inputValue -= 2;
    input.value = inputValue;
  });
  numberUp.addEventListener('click', function (e) {
    e.preventDefault();
    var inputValue = Number(input.value);

    if (inputValue == 10) {
      return input.value = 10;
    }

    inputValue += 2;
    input.value = inputValue;
  });
  return {
    form: form,
    submitBtn: submitBtn,
    input: input
  };
}
;// CONCATENATED MODULE: ./src/js/dom/createPopUp.js


function createPopUp() {
  var backBlock = creatorTags('div', ['question']);
  var block = creatorTags('div', ['question__container']);
  var headText = creatorTags('h3', ['question__heading'], null, QUASTION.heading);
  var wrapperBtn = creatorTags('div', ['question__btn-wrapper']);
  var moreTimeBtn = creatorTags('button', ['question__button'], {
    type: 'button'
  }, QUASTION.moreTime);
  var noMoreTimeBtn = creatorTags('button', ['question__button'], {
    type: 'button'
  }, QUASTION.noMoreTime);
  backBlock.addEventListener('click', function (e) {
    if (e.target == this) {
      this.remove();
    }
  });
  wrapperBtn.append(moreTimeBtn, noMoreTimeBtn);
  block.append(headText, wrapperBtn);
  backBlock.append(block);
  return {
    backBlock: backBlock,
    noMoreTimeBtn: noMoreTimeBtn,
    moreTimeBtn: moreTimeBtn
  };
}
;// CONCATENATED MODULE: ./src/js/dom/createFinish.js


function createFinish(win) {
  var finalContainer = creatorTags('div', ['settings']);
  var finalHeading = creatorTags('h2', ['settings__heading'], null, win ? FINAL_WINDOW.winHead : FINAL_WINDOW.looseHead);
  var finalDescription = creatorTags('p', ['settings__description'], null, FINAL_WINDOW.descr);
  var btnContainer = creatorTags('div', ['settings__container']);
  var replayBtn = creatorTags('button', ['settings__button'], {
    type: 'button'
  }, FINAL_WINDOW.buttons["new"]);
  var startWindowBtn = creatorTags('button', ['settings__button'], {
    type: 'button'
  }, FINAL_WINDOW.buttons.repeat);
  btnContainer.append(replayBtn, startWindowBtn);
  finalContainer.append(finalHeading, finalDescription, btnContainer);
  return {
    finalContainer: finalContainer,
    replayBtn: replayBtn,
    startWindowBtn: startWindowBtn
  };
}
;// CONCATENATED MODULE: ./src/js/dom/createCards.js

function createCards() {
  var list = creatorTags('ul', ['card-list']);
  var gameSize = Number(sessionStorage.getItem('size'));
  var maxCards = Math.pow(gameSize, 2);
  var cards = new Object();
  var arrBack = new Array();
  var arrCards = new Array(); // Создание массива задней сцены

  for (var i = 0; i < maxCards / 2; i++) {
    if (arrBack.indexOf(i)) {
      arrBack.push(i);
    }

    arrBack.push(i);
  } // Тасование Фишшера Йетса массива с числами


  for (var _i = arrBack.length - 1; _i > 0; _i--) {
    var randomNum = Math.floor(Math.random() * (_i + 1));
    var cardElem = arrBack[_i];
    arrBack[_i] = arrBack[randomNum];
    arrBack[randomNum] = cardElem;
  }

  switch (gameSize) {
    case 2:
      {
        document.documentElement.style.setProperty('--max-width', '49.5%');
        document.documentElement.style.setProperty('--max-height', '320px');
        document.documentElement.style.setProperty('--font-card', '8em');
        break;
      }

    case 6:
      {
        document.documentElement.style.setProperty('--max-width', '16%');
        document.documentElement.style.setProperty('--max-height', '104px');
        document.documentElement.style.setProperty('--font-card', '4em');
        break;
      }

    case 8:
      {
        document.documentElement.style.setProperty('--max-width', '12%');
        document.documentElement.style.setProperty('--max-height', '76.5px');
        document.documentElement.style.setProperty('--font-card', '3em');
        break;
      }

    case 10:
      {
        document.documentElement.style.setProperty('--max-width', '9.6%');
        document.documentElement.style.setProperty('--max-height', '60px');
        document.documentElement.style.setProperty('--font-card', '2em');
        break;
      }

    default:
      {
        document.documentElement.style.setProperty('--max-width', '24.5%');
        document.documentElement.style.setProperty('--max-height', '158px');
        document.documentElement.style.setProperty('--font-card', '6em');
        break;
      }
  } // Создание массива карточек


  for (var _i2 = 0; _i2 < maxCards; _i2++) {
    var card = creatorTags('li', ['card-list__item']);
    var scene = creatorTags('ul', ['card-list__scene']);
    var frontCard = creatorTags('li', ['card-list__scene-front']);
    var backCard = creatorTags('li', ['card-list__scene-back'], null, arrBack[_i2]);
    cards[_i2] = new Object();
    scene.append(frontCard, backCard);
    card.append(scene);
    arrCards.push(scene);
    list.append(card);
    cards[_i2].element = scene;
    cards[_i2].value = arrBack[_i2];
    cards[_i2].fliped = false;
  }

  return {
    list: list,
    cards: cards,
    arrCards: arrCards
  };
}
;// CONCATENATED MODULE: ./src/js/checkWinGame.js
function checkWinGame(obj) {
  var checkArray = new Array();
  Object.keys(obj).forEach(function (el) {
    checkArray.push(obj[el].fliped);
  });

  if (checkArray.includes(false)) {
    return false;
  } else {
    return true;
  }
}
;// CONCATENATED MODULE: ./src/js/main.js









var header = createHeader(false);
var main = createMain(false);
var gameContainer = main.section;
var createdWindow = createStart();
document.body.append(header.head, main.container);
gameContainer.append(createdWindow.form);
createdWindow.submitBtn.addEventListener('click', function (e) {
  e.preventDefault();
  var inputValue = createdWindow.input.value;
  sessionStorage.setItem('size', inputValue);

  if (inputValue > 7) {
    var createdQuastion = createPopUp();
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
  var createdHead = createHeader(true);
  var createdMain = createMain(true);
  var createdCardList = createCards();
  var listScene = createdCardList.arrCards;
  var timeOver = false;
  var lockerCards = false;
  var firstCard = new Object();
  var secondCard = new Object();
  listScene.forEach(function (card) {
    return card.addEventListener('click', flipper);
  });
  createdMain.section.append(createdCardList.list);
  document.body.append(createdHead.head, createdMain.container);
  createdHead.toStartBtn.addEventListener('click', function () {
    location.reload();
  });
  createdHead.replayBtn.addEventListener('click', function () {
    gameStart();
  });
  var timer = setInterval(function () {
    var arrowTime = createdHead.headTitle.textContent.split(':');
    var minute = arrowTime[0];
    var seconds = arrowTime[1];
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
    var result = arrowTime.join(':');

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
  var intervalWin = setInterval(function () {
    var checkWin = checkWinGame(createdCardList.cards);

    if (timeOver || checkWin) {
      clearInterval(intervalWin);
      document.body.innerHTML = '';

      var _header = createHeader(false);

      var _createdMain = createMain(false);

      var _final = createFinish(checkWin);

      _final.replayBtn.addEventListener('click', function (e) {
        e.preventDefault();
        gameStart();
      });

      _final.startWindowBtn.addEventListener('click', function () {
        window.location.reload();
      });

      _createdMain.section.append(_final.finalContainer);

      document.body.append(_header.head, _createdMain.container);
    }
  }, 2000); // Функция поворота карты

  function flipper() {
    if (this.classList.contains('fliped') || lockerCards) return;

    for (var e in createdCardList.cards) {
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
          var checked = checkMatch(firstCard, secondCard, lockerCards);

          if (!checked) {
            createdCardList.cards[firstCard.index].fliped = false;
            createdCardList.cards[secondCard.index].fliped = false;
          }

          Object.keys(firstCard).forEach(function (el) {
            return delete firstCard[el];
          });
          Object.keys(secondCard).forEach(function (el) {
            return delete secondCard[el];
          });
        }

        break;
      }
    }
  }

  function checkMatch() {
    var first = firstCard.element;
    var second = secondCard.element;

    if (firstCard.val == secondCard.val) {
      first.removeEventListener('click', flipper);
      second.removeEventListener('click', flipper);
      return true;
    } else {
      lockerCards = true;
      setTimeout(function () {
        first.classList.remove('fliped');
        setTimeout(function () {
          second.classList.remove('fliped');
        }, 200);
        lockerCards = false;
      }, 1000);
      return false;
    }
  }
}
/******/ })()
;