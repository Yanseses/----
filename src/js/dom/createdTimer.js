export function createdTimer(timeContainer){
  let timeIsOver = false;
  let timer = setInterval(() => {
    let arrowTime = timeContainer.textContent.split(':');
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

    if(minute == '00' && seconds < 4){
      if(timeContainer.classList.contains('header__title--alert')){
        timeContainer.classList.remove('header__title--alert');
      }
      timeContainer.classList.add('header__title--alert')
    }
    if (result == '00:00') {
      timeIsOver = true;
    }
    timeContainer.textContent = result;
  }, 1000);
  return {timer, timeIsOver};
}
