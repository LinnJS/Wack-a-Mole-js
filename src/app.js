const holes = document.querySelectorAll('.hole');
const scoreBoard = document.querySelector('.score');
const moles = document.querySelectorAll('.mole');

let duplicateHole;
let timeOut = false;
let score = 0;

/**
 * Generates random time
 * @param {number} max - maximum milliseconds
 * @param {number} min - minimum milliseconds
 * @return {number} amount of milliseconds with offset
 */
function randomTime(max, min) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * Randomizes hole selections
 * @param {object} holes - NodeList of holes on game board
 * @return {object} returns selected hole, re-runs function if there is a duplicate
 */
function randomHole(holes) {
  const index = Math.floor(Math.random() * holes.length);
  const hole = holes[index];
  if (hole === duplicateHole) {
    console.log('Duplicate hole, try again!'); /*eslint-disable-line*/
    return randomHole(holes);
  }
  duplicateHole = hole;
  return hole;
}

/**
 * Toggles CSS class `peek` corresponding to `randomTime` and `randomHole`
 */
function peek() {
  const time = randomTime(1000, 1400);
  const hole = randomHole(holes);
  hole.classList.add('peek');
  setTimeout(() => {
    hole.classList.remove('peek');
    if (!timeOut) peek();
  }, time);
}

/**
 * Sets score to zero and starts game for duration of `setTimeout
 */
function startGame() { /*eslint-disable-line*/
  scoreBoard.textContent = 0;
  timeOut = false;
  score = 0;
  peek();
  setTimeout(() => (timeOut = true), 10000);
}

/**
 * Increments score by 1 when onClick and checks to make sure input is valid (not a bot)
 */
function whack(event) {
  if (!event.isTrusted) return;
  score++;
  this.parentNode.classList.remove('peek');
  scoreBoard.textContent = score;
}

/**
 * Attaches eventListener to every mole so it can be WHACKED!
 */
moles.forEach(mole => mole.addEventListener('click', whack));
