/** Selects NodeList of all holes */
const holes = document.querySelectorAll('.hole');

/** Selects NodeList of all beaver */
const beavers = document.querySelectorAll('.beaver');

/** Selects score so it can be manipulated by startGame() and whack() to reflect current score */
const scoreBoard = document.querySelector('.score');

/** Global variable that gets reassigned to current index of selected hole to find duplicates */
let duplicateHole;

/** Global variable that gets reassigned to reflect current score */
let score = 0;

/** Global boolean value that gives current state of game */
let timeOut = false;

/**
 * randomTime() - Generates random time
 * @param {number} max - Maximum milliseconds
 * @param {number} min - Minimum milliseconds
 * @return {number} Amount of milliseconds with offset
 */
function randomTime(max, min) {
  return Math.round(Math.random() * (max - min) + min);
}

/**
 * randomHole() - Randomize hole selections
 * @param {object} holes - NodeList of holes on game board
 * @return {object} randomHole - Selected hole, re-runs function if there is a duplicate
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

/** peek() - Toggles CSS class `peek` corresponding to `randomTime` and `randomHole` */
function peek() {
  const time = randomTime(1000, 1400);
  const hole = randomHole(holes);
  hole.classList.add('peek');
  setTimeout(() => {
    hole.classList.remove('peek');
    if (!timeOut) peek();
  }, time);
}

/** startGame() - Set score to zero and starts game for duration of `setTimeout */
function startGame() { /*eslint-disable-line*/
  scoreBoard.textContent = 0;
  timeOut = false;
  score = 0;
  peek();
  setTimeout(() => (timeOut = true), 15000);
}

/** whack() - Increments score by 1 when onClick and checks to make sure input is valid (not a bot) */
function whack(event) {
  if (!event.isTrusted) return;
  score++;
  this.parentNode.classList.remove('peek');
  scoreBoard.textContent = score;
}

/** forEach() beaver - Attach eventListener to every beaver so it can be WHACKED! */
beavers.forEach(beaver => beaver.addEventListener('click', whack));
