(() => {
    const main = document.getElementById('main');
    const gameContainer = document.getElementById('container');
    const objHeadings = {
        looseHead: 'Поражение!',
        winHead: 'Победа!',
        descr: 'Вы можете начать новую игру, или вернуться к выбору колличества карточек'
        };
    const timers = {
        standartTimer: '01:00',
        bigTimer: '05:00'
        };
    let createdWindow = createStartWindow();

    function createStartWindow(value = 4){
        const heading = document.createElement('h2');
        const description = document.createElement('p');
        const form = document.createElement('form');
        const inputFieldset = document.createElement('fieldset');
        const submitFieldset = document.createElement('fieldset');
        const inputLabel = document.createElement('label');
        const input = document.createElement('input');
        const numberUp = document.createElement('button');
        const numberDown = document.createElement('button');
        const submit = document.createElement('input');

        heading.classList.add('game-heading');
        heading.textContent = 'Игра в пары';
        gameContainer.append(heading);

        description.classList.add('game-description');
        description.textContent = 'Выберите колличество клеток по горизонтали и вертикали для игры, в диапазоне от 2 до 10. На игру отводится 1 минута';
        gameContainer.append(description);

        form.setAttribute('method', 'POST');
        form.setAttribute('enctype', 'multipart/form-data');
        form.setAttribute('action', '#');
        form.classList.add('game-form');

        inputLabel.setAttribute('for', 'maxСouple');
        inputLabel.classList.add('game-form__label');
        inputFieldset.append(inputLabel);

        numberUp.innerHTML = '&#43;';
        numberUp.classList.add('game-form__btn', 'up-btn');
        numberDown.innerHTML = '&#8722;';
        numberDown.classList.add('game-form__btn', 'down-btn');
        inputLabel.append(numberDown);
        
        inputFieldset.classList.add('game-form__container');
        inputLabel.append(input);
        inputLabel.append(numberUp);

        input.setAttribute('type', 'number');
        input.setAttribute('value', value);
        input.setAttribute('readonly', '');
        input.setAttribute('id', 'maxСouple');
        input.classList.add('game-form__input');

        submitFieldset.classList.add('game-form__container');
        submitFieldset.append(submit);

        submit.setAttribute('type', 'submit');
        submit.setAttribute('value', 'Начать');
        submit.classList.add('game-form__submit');

        form.append(inputFieldset);
        form.append(submitFieldset);
        gameContainer.append(form);
        
        return {numberUp, numberDown, submit, input}
        }

    createdWindow.numberDown.addEventListener('click', function(e){
        e.preventDefault();

        let inputValue = createdWindow.input.value;
        if(inputValue == 2){
            return createdWindow.input.value = 2;
            }
        inputValue -= 2;
        createdWindow.input.value = inputValue;
        });

    createdWindow.numberUp.addEventListener('click', function(e){
        e.preventDefault();

        let inputValue = Number(createdWindow.input.value);
        if(inputValue == 10){
            return createdWindow.input.value = 10;
            }
        inputValue += 2;
        createdWindow.input.value = inputValue;
        });

    createdWindow.submit.addEventListener('click', function(e){
        e.preventDefault();

        let inputValue = createdWindow.input.value;
        
        if(inputValue > 7){
            createQuastionWindow(inputValue);
            } else {
                gameContainer.innerHTML = '';
                createGameWindow(inputValue, timers.standartTimer);
            }
        });

    function createQuastionWindow(inputValue){
        const backBlock = document.createElement('div');
        const block = document.createElement('div');
        const headText = document.createElement('h3');
        const moreTimeBtn = document.createElement('button');
        const noMoreTimeBtn = document.createElement('button');

        backBlock.classList.add('question');
        block.classList.add('question__container');

        headText.innerText = 'Вы уверены, что вам хватит 1 минуты для игры?';
        headText.classList.add('question__heading');

        noMoreTimeBtn.setAttribute('type', 'button');
        noMoreTimeBtn.innerText = 'Оставить как есть';
        noMoreTimeBtn.classList.add('game-form__submit');

        moreTimeBtn.classList.add('game-form__submit');
        moreTimeBtn.setAttribute('type', 'button');
        moreTimeBtn.innerText = 'Добавить 4 минуты';

        block.append(headText)
        block.append(moreTimeBtn);
        block.append(noMoreTimeBtn);
        backBlock.append(block);

        main.append(backBlock);

        noMoreTimeBtn.addEventListener('click', function(e){
            e.preventDefault();

            backBlock.remove();
            gameContainer.innerHTML = '';
            createGameWindow(inputValue, timers.standartTimer);
            });

        moreTimeBtn.addEventListener('click', function(e){
            e.preventDefault();

            backBlock.remove();
            gameContainer.innerHTML = '';
            createGameWindow(inputValue, timers.bigTimer);
            });
        }   


    // Генерация окна с игрой
    function createGameWindow(maxSize, timerVal = '01:00'){
        const timer = document.createElement('h2');
        const container = document.createElement('ul');
        let maxCards = maxSize * maxSize;
        let arrayCards = [];
        let arrayNums = [];

        container.setAttribute('id', 'card-container');
        container.classList.add('card-container');
        timer.classList.add('timer');
        timer.textContent = timerVal;

        // Создание элементов карточек и запись их в отдельный массив
        for(let i = 0; i < maxCards; i++){
            var card = document.createElement('li');
            const scene = document.createElement('ul');
            const frontCard = document.createElement('li');
            const backCard = document.createElement('li');

            scene.classList.add('card-container__scene');
            frontCard.classList.add('card-container__front-scene');
            backCard.classList.add('card-container__back-scene');
            scene.append(frontCard);
            scene.append(backCard);
            card.append(scene);

            card.setAttribute('id', 'card');
            card.classList.add('card-container__item');

            arrayCards.push(card);

            if(maxSize == 2){
                card.classList.add('size2');
                }
            if(maxSize == 4){
                card.classList.add('size4');
                }
            if(maxSize == 6){
                backCard.classList.add('back6');
                }
            if(maxSize == 8){
                card.classList.add('size8');
                backCard.classList.add('back8');
                }
            if(maxSize == 10){
                card.classList.add('size10');
                timer.classList.add('timer10');
                gameContainer.classList.add('container10');
                backCard.classList.add('back10');
                }
            }
  

        // Создание массива номеров
        for(let i = 0; i < maxCards; i++){
            if(arrayNums.indexOf(i)){
                arrayNums.push(i);
                }
            arrayNums.push(i);
            }

        // Запись значений массива номеров в массив карточек (добавление текстовых значений)
        for(let a = 0; a < arrayCards.length; a++){
            let scene = arrayCards[a].children;
            let backCardContainer = scene[0].getElementsByClassName('card-container__back-scene');
            backCardContainer[0].textContent = arrayNums[a];
            }

        // Тасование Фишшера Йетса массива с карточками
        for (let i = arrayCards.length - 1; i > 0; i--) {
            let j = Math.floor(Math.random() * (i + 1));
            let temp = arrayCards[i];
            arrayCards[i] = arrayCards[j];
            arrayCards[j] = temp;
            }
        
        // Перебор массива с карточками и запись их в контейнер
        for(let e of arrayCards){
            container.append(e);
            }
        
        gameContainer.append(timer);
        gameContainer.append(container);

        // Проверка ширины экрана
        checkWidth(maxSize);
        startGame(timer, maxSize);
        return timer;
        }

    
    // Код действий игры
    function startGame(timer, inputVal){
        const allCards = document.querySelectorAll('.card-container__scene');
        let timerId;
        let timerOut = false;
        let checkFlipedCard = false;
        let lockCard = false;
        let firstCard;
        let lastCard;

        allCards.forEach(card => card.addEventListener('click', addedFlipCard));

        // Проверка чтоб у всех карт был класс disabled (т.е. победа)
        function checkWin(){
            let arrayOpen = [];

            for(let i = 0; i < allCards.length; i++){
                if(allCards[i].classList.contains('disabled') == true){
                    arrayOpen.push(allCards[i].classList.contains('disabled'));
                    if(allCards.length == arrayOpen.length){
                        clearInterval(timerId);
                        setTimeout(createWinWindow, 1500, inputVal, objHeadings.winHead, objHeadings.descr);
                        }
                    }
                }
            }
        
        // Функция поворота карты
        function addedFlipCard(){
            if (lockCard) return;

            this.classList.add('fliped');

            if(!checkFlipedCard){
                checkFlipedCard = true;
                firstCard = this;
                return;
                }

            checkFlipedCard = false;
            lastCard = this;

            chekedMatchCard();
            checkWin();
            };

        // Проверка соответствия значений карт
        function chekedMatchCard(){
            let first = firstCard.querySelectorAll('.card-container__back-scene')[0].textContent;
            let last = lastCard.querySelectorAll('.card-container__back-scene')[0].textContent;

            if(first === last){
                disabledCard();
                return;
                }

            unflipedCard();
            };

        // Удаление обработчика при повторном нажатии на совпавшие карты
        function disabledCard(){
            firstCard.removeEventListener('click', addedFlipCard);
            firstCard.classList.add('disabled');
            lastCard.removeEventListener('click', addedFlipCard);
            lastCard.classList.add('disabled');
            };

        // Переворот карт в случае несовпадения
        function unflipedCard(){
            lockCard = true;

            setTimeout(() => {
                lastCard.classList.remove('fliped');
                firstCard.classList.remove('fliped');

                removeValue();
                }, 1000);
            };

        // Сброс значений для корректной проверки условий
        function removeValue(){
            [firstCard, lastCard] = [null, null];
            [checkFlipedCard, lockCard] = [false, false];
            };

        
        // Запуск счетчика времени
        timerId = setInterval(gameTimer, 1000, timer);

        // Таймер обратного отсчета
        function gameTimer(time){
            let arrowTime = time.textContent.split(':');
            let minute = arrowTime[0];
            let seconds = arrowTime[1];
            arrowTime = [];
        
            if(minute > 0 && seconds == 0){
                minute -= 1;
                minute = '0' + minute;
                seconds = 59;
                } else {
                    if(seconds > 0){
                        seconds -= 1;
                        if(seconds < 10){
                            seconds = '0' + seconds;
                            }
                        }
                    }
        
            arrowTime.push(minute);
            arrowTime.push(seconds);
        
            let result = arrowTime.join(':');
            if(result == '00:00'){
                gameEnd();
                }
            time.textContent = result;
            }

        // Игра окончена. Таймер закончился
        function gameEnd(){
            clearInterval(timerId);
            setTimeout(createWinWindow, 1000, inputVal, objHeadings.looseHead, objHeadings.descr);
            }
        }


    // Проверка ширины экрана
    function checkWidth(val){
        const card = document.getElementById('card');

        let marginCard = getComputedStyle(card).margin;
        let marginCardVal = Number(marginCard.split('').splice(0, 2).join(''));
        container.style.width = (card.clientWidth) * val + ((marginCardVal * 2) * val) + 'px';
        }    

    // Генерация окна при завершении игры
    function createWinWindow(oldInput, head, descr){
        const winHeading = document.createElement('h2');
        const winDescription = document.createElement('p');
        const btnContainer = document.createElement('div');
        const replayBtn = document.createElement('button');
        const startWindowBtn = document.createElement('button');

        winHeading.classList.add('game-heading');
        winHeading.textContent = head;

        winDescription.textContent = descr;
        winDescription.classList.add('game-description');

        btnContainer.classList.add('button-container');

        replayBtn.classList.add('game-form__submit');
        replayBtn.setAttribute('type', 'button');
        replayBtn.textContent = 'Новая игра';
        startWindowBtn.classList.add('game-form__submit');
        startWindowBtn.setAttribute('type', 'button');
        startWindowBtn.textContent = 'В начало';

        btnContainer.append(replayBtn);
        btnContainer.append(startWindowBtn);

        gameContainer.style.width = '';
        gameContainer.innerHTML = '';
        gameContainer.append(winHeading);
        gameContainer.append(winDescription);
        gameContainer.append(btnContainer);

        replayBtn.addEventListener('click', function(e){
            e.preventDefault();

            gameContainer.innerHTML = '';
            createGameWindow(oldInput);
            });

        startWindowBtn.addEventListener('click', function(e){
            e.preventDefault();

            gameContainer.innerHTML = '';
            createdWindow = createStartWindow();

            createdWindow.numberDown.addEventListener('click', function(e){
                e.preventDefault();
        
                let inputValue = createdWindow.input.value;
                if(inputValue == 2){
                    return createdWindow.input.value = 2;
                    }
                inputValue -= 2;
                createdWindow.input.value = inputValue;
                });

            createdWindow.numberUp.addEventListener('click', function(e){
                e.preventDefault();
            
                let inputValue = Number(createdWindow.input.value);
                if(inputValue == 10){
                    return createdWindow.input.value = 10;
                    }
                inputValue += 2;
                createdWindow.input.value = inputValue;
                });
            
            createdWindow.submit.addEventListener('click', function(e){
                e.preventDefault();
            
                let inputValue = createdWindow.input.value;
                
                if(inputValue > 7){
                    createQuastionWindow(inputValue);
                    } else {
                        gameContainer.innerHTML = '';
                        createGameWindow(inputValue, timers.standartTimer);
                    }
                });
            });
        }

})();