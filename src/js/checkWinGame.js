export function checkWinGame(obj) {
  const checkArray = new Array();

  Object.keys(obj).forEach((el) => {
    checkArray.push(obj[el].fliped);
  });

  if (checkArray.includes(false)) {
    return false;
  } else {
    return true;
  }
}
