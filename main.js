/* eslint-env browser */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
/* eslint no-use-before-define: ["error", { "functions": false }] */

const redDefaultColor = 'rgba(255, 0, 0, 0.6)';
const blueDefaultColor = 'rgba(0, 0, 255, 0.6)';
const greenDefaultColor = 'rgba(0, 128, 0, 0.6)';
const yellowDefaultColor = 'rgba(255, 255, 0, 0.6)';

let playerTurn = false;
let toReplay = [];
let played = [];
let steps = 0;
let strictMode = false;
let colorPlayed;

document.getElementById('reset').addEventListener('click', (e) => {
  const resetId = e.target.id;
  document.getElementById(resetId).innerHTML = 'Reset';
  reset();
});

document.getElementById('strict').addEventListener('click', (e) => {
  const strictId = e.target.id;
  if (strictMode) {
    strictMode = false;
    document.getElementById(strictId).innerHTML = 'Strict mode (off)';
  } else {
    strictMode = true;
    document.getElementById(strictId).innerHTML = 'Strict mode (on)';
  }
});

document.getElementById('buttons').addEventListener('mousedown', (e) => {
  if (playerTurn) {
    colorPlayed = e.target.id;
    emphasizeColor(colorPlayed);
    // playSound(colorPlayed);
  }
});

document.getElementById('buttons').addEventListener('mouseup', () => {
  resetColor(colorPlayed);
  // stopSound(colorPlayed);
  const correct = check(colorPlayed);
  if (correct) {
    played.push(colorPlayed);
  } else if (strictMode) {
    gameOver();
  } else {
    playSequence();
  }

  if (played.length === toReplay.length) {
    increaseScore();
    played = [];
    computerPlays();
  }
});

function check(currentColor) {
  const toReplayCurrentItem = toReplay[played.length];
  if (currentColor === toReplayCurrentItem) {
    return true;
  }
  return false;
}

function reset() {
  toReplay = [];
  steps = 0;
  document.getElementById('score').innerHTML = '0';
  computerPlays();
}

function gameOver() {
  reset();
}

function computerPlays() {
  playerTurn = false;
  incrementSequence();
  playSequence();
  playerTurn = true;
}

function incrementSequence() {
  const chosenColor = choosingColor();
  toReplay.push(chosenColor);
}

function playSequence() {
  for (let i = 0; i < toReplay.length; i += 1) {
    playSequenceItem(toReplay[i]);
  }
}

function playSequenceItem(item) {
  emphasizeColor(item);
  // playSound(item);
  setTimeout(() => {
    resetColor(item);
    // stopSound(item);
  }, 500);
}

function emphasizeColor(color) {
  document.getElementById(color).style.backgroundColor = color;
}

function resetColor(color) {
  if (color === 'red') {
    document.getElementById(color).style.backgroundColor = redDefaultColor;
  } else if (color === 'blue') {
    document.getElementById(color).style.backgroundColor = blueDefaultColor;
  } else if (color === 'green') {
    document.getElementById(color).style.backgroundColor = greenDefaultColor;
  } else {
    document.getElementById(color).style.backgroundColor = yellowDefaultColor;
  }
}

/* function playSound(color) {
  const audioId = `'audio' + ${color}`;
  document.getElementById(audioId).play();
}

function stopSound(color) {
  const audioId = `'audio' + ${color}`;
  document.getElementById(audioId).pause();
} */

function increaseScore() {
  steps += 1;
  document.getElementById('score').innerHTML = steps;
}

function choosingColor() {
  const nb = Math.floor((Math.random() * 4) + 1);
  if (nb === 1) {
    return 'red';
  } else if (nb === 2) {
    return 'blue';
  } else if (nb === 3) {
    return 'green';
  }
  return 'yellow';
}
