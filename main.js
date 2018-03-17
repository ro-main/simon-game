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
  const colorPlayed = e.target.id;
  check(colorPlayed);
  computerPlays();
});

function reset() {
  toReplay = [];
  played = [];
  steps = 0;
  computerPlays();
}

function computerPlays() {
  const chosenColor = choosingColor();
  toReplay.push(chosenColor);
  displayChosenColor(chosenColor);
  playSound(chosenColor);
}

function check() {

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

function displayChosenColor(color) {
  document.getElementById(color).style.backgroundColor = color;
  setTimeout(() => {
    if (color === 'red') {
      document.getElementById(color).style.backgroundColor = redDefaultColor;
    } else if (color === 'blue') {
      document.getElementById(color).style.backgroundColor = blueDefaultColor;
    } else if (color === 'green') {
      document.getElementById(color).style.backgroundColor = greenDefaultColor;
    }
    document.getElementById(color).style.backgroundColor = yellowDefaultColor;
  }, 1000);
}

function playSound(color) {
  if (color === 'red') {
    redSound.play();
  } else if (color === 'blue') {
    blueSound.play();
  } else if (color === 'green') {
    greenSound.play();
  }
  yellowSound.play();
}
