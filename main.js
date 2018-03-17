/* eslint-env browser */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
/* eslint no-use-before-define: ["error", { "functions": false }] */

const redSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound1.mp3');
const blueSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound2.mp3');
const greenSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound3.mp3');
const yellowSound = new Audio('https://s3.amazonaws.com/freecodecamp/simonSound4.mp3');

const redDefaultColor = 'rgba(255, 0, 0, 0.6)';
const blueDefaultColor = 'rgba(0, 0, 255, 0.6)';
const greenDefaultColor = 'rgba(0, 128, 0, 0.6)';
const yellowDefaultColor = 'rgba(255, 255, 0, 0.6)';

let playerTurn = false;
let toReplay = [];
let played = [];
let steps = 0;
let strictMode = false;

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

document.getElementById('buttons').addEventListener('click', (e) => {
  if (playerTurn) {
    const colorPlayed = e.target.id;
    const correct = check(colorPlayed);
    const correctSequence = false;
    if (correct) {
      increaseScore();
      computerPlays();
    } else if (strictMode) {
      gameOver();
    } else {
      playSequence();
    }
  }
});

function reset() {
  toReplay = [];
  played = [];
  steps = 0;
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
    playSequenceItem(i);
  }
}

function playSequenceItem(color) {
  document.getElementById(color).style.backgroundColor = color;
  if (color === 'red') {
    document.getElementById(color).style.backgroundColor = redDefaultColor;
    redSound.play();
  } else if (color === 'blue') {
    document.getElementById(color).style.backgroundColor = blueDefaultColor;
    blueSound.play();
  } else if (color === 'green') {
    document.getElementById(color).style.backgroundColor = greenDefaultColor;
    greenSound.play();
  }
  yellowSound.play();

  setTimeout(() => {
    resetColor(color);
  }, 1000);
}

function resetColor(color) {
  if (color === 'red') {
    document.getElementById(color).style.backgroundColor = redDefaultColor;
  } else if (color === 'blue') {
    document.getElementById(color).style.backgroundColor = blueDefaultColor;
  } else if (color === 'green') {
    document.getElementById(color).style.backgroundColor = greenDefaultColor;
  }
  document.getElementById(color).style.backgroundColor = yellowDefaultColor;
}

function check() {

}

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
