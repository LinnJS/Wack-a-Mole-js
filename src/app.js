/** Selects NodeList of all holes */
const holes = document.querySelectorAll('.hole');

/** Selects NodeList of all beaver */
const beavers = document.querySelectorAll('.beaver');

/** Selects score so it can be manipulated by startGame() and whack() to reflect current score */
const scoreBoard = document.querySelector('.score');

/** Selects startButton */
const startButton = document.querySelector('.start');

/** Global variable that gets reassigned to current index of selected hole to find duplicates */
let duplicateHole;

/** Global variable to end game */
let endGameTimeout;

/** Global variable stop all beaver movement */
let peekTimeout;

/** Global variable that gets reassigned to reflect current score */
let score = 0;

/** Global boolean value that gives current state of game */
let isTimeout = false;

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

  clearTimeout(peekTimeout);
  peekTimeout = setTimeout(() => {
    hole.classList.remove('peek');
    if (!isTimeout) peek();
  }, time);
}

/** createInGameButtons() - Creates inGame buttons and only displays them while game is in play mode */
function createInGameButtons() {
  const container = document.querySelector('.button-container');
  const resetButton = document.createElement('button');
  const stopButton = document.createElement('button');
  stopButton.id = 'stop';

  function resetButtons() {
    resetButton.style.display = 'none';
    stopButton.style.display = 'none';
    startButton.style.display = 'flex';
    isTimeout = true;
  }

  /** onReset() - Resets score, timeOuts, adds games intermission, and auto plays a new round */
  function onReset() {
    resetButtons();
    startButton.style.display = 'none';
    // Start counting, 1..2..3..
    const counter = document.createElement('div');
    counter.classList.add('counter');
    counter.textContent = 3;
    container.prepend(counter);
    setTimeout(() => {
      counter.textContent = 2;
    }, 2000);
    setTimeout(() => {
      counter.textContent = 1;
    }, 3000);
    setTimeout(() => {
      counter.textContent = 'GO!!';
    }, 4000);
    setTimeout(() => {
      startGame();
      resetButton.style.display = 'inline';
      stopButton.style.display = 'inline';
      counter.style.display = 'none';
    }, 4500);
  }

  resetButton.innerHTML = 'Reset?';
  resetButton.onclick = onReset;
  resetButton.classList.add('.reset');
  if (!isTimeout) {
    container.prepend(resetButton);
  }

  stopButton.innerHTML = 'Stop';
  stopButton.onclick = resetButtons;
  stopButton.classList.add('.reset');
  if (!isTimeout) {
    container.prepend(stopButton);
  }
}

startButton.addEventListener('click', createInGameButtons);

/** startGame() - Set score to zero, removes start button
 * and starts game for duration of setTimeout */
function startGame() { /*eslint-disable-line*/
  holes.forEach(hole => hole.classList.remove('.peek'));

  // End the game. after 30s
  clearTimeout(endGameTimeout);
  clearTimeout(peekTimeout);
  endGameTimeout = setTimeout(() => {
    // Ensure any existing moles on UI are removed
    isTimeout = true;

    // Remove stop button from DOM
    document.getElementById('stop').style.display = 'none';

    // Run the game 60 seconds
  }, 30000);
  scoreBoard.textContent = 0;

  //   clears pre-existing beavers
  isTimeout = true;
  isTimeout = false;
  score = 0;

  peek();
  if (startButton) startButton.style.display = 'none';
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
