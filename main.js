/* eslint-env browser */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
/* eslint no-use-before-define: ["error", { "functions": false }] */

const redDefaultColor = 'rgba(255, 0, 0, 0.6)';
const blueDefaultColor = 'rgba(0, 0, 255, 0.6)';
const greenDefaultColor = 'rgba(0, 128, 0, 0.6)';
const yellowDefaultColor = 'rgba(255, 255, 0, 0.6)';

const colorList = ['red', 'blue', 'green', 'yellow'];

const redSound = new Audio('http://chiptape.com/chiptape/sounds/short/MinerAttack1.ogg');
const blueSound = new Audio('http://chiptape.com/chiptape/sounds/short/MinerAttack2.ogg');
const greenSound = new Audio('http://chiptape.com/chiptape/sounds/short/MinerAttack3.ogg');
const yellowSound = new Audio('http://chiptape.com/chiptape/sounds/short/MinerAttack4.ogg');

const sounds = [redSound, blueSound, greenSound, yellowSound];

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
    document.getElementById(strictId).style.color = 'black';
  } else {
    strictMode = true;
    document.getElementById(strictId).innerHTML = 'Strict mode (on)';
    document.getElementById(strictId).style.color = 'green';
  }
});

document.getElementById('buttons').addEventListener('mousedown', (e) => {
  if (playerTurn) {
    colorPlayed = e.target.id;
    emphasizeColor(colorPlayed);
    playSound(colorPlayed);
  }
});

document.getElementById('buttons').addEventListener('mouseup', () => {
  resetColor(colorPlayed);
  const correct = check(colorPlayed);
  if (correct) {
    played.push(colorPlayed);
  } else if (strictMode) {
    gameOver();
  } else {
    errorPrompt();
    setTimeout(() => {
      resetColor('error');
      playSequence();
    }, 1000);
  }

  if (played.length === toReplay.length) {
    played = [];
    if (correct) {
      increaseScore();
    }
    if (steps === 2) {
      victory();
    } else {
      computerPlays();
    }
  }
});

function check(currentColor) {
  const toReplayCurrentItem = toReplay[played.length];
  if (currentColor === toReplayCurrentItem) {
    return true;
  }
  return false;
}

function errorPrompt() {
  document.getElementById('error').style.backgroundColor = 'red';
}

function reset() {
  toReplay = [];
  steps = 0;
  document.getElementById('score').innerHTML = '0';
  document.getElementById('victory').style.visibility = 'hidden';
  resetAllColors();
  computerPlays();
}

function gameOver() {
  reset();
}

function victory() {
  document.getElementById('red').style.backgroundColor = '#9C27B0';
  document.getElementById('blue').style.backgroundColor = '#9C27B0';
  document.getElementById('yellow').style.backgroundColor = '#9C27B0';
  document.getElementById('green').style.backgroundColor = '#9C27B0';
  document.getElementById('victory').style.visibility = 'visible';
  setTimeout(() => {
    reset();
  }, 3000);
}


function computerPlays() {
  playerTurn = false;
  incrementSequence();
  setTimeout(() => {
    playSequence();
  }, 500);
  playerTurn = true;
}

function incrementSequence() {
  const chosenColor = choosingColor();
  toReplay.push(chosenColor);
}

function playSequence() {
  const toReplayLength = toReplay.length;
  function playingSmoothly(currentStep) {
    if (currentStep < toReplayLength) {
      const currentColor = toReplay[currentStep];
      playSequenceItem(currentColor);
      setTimeout(() => {
        resetColor(currentColor);
      }, 500);
      setTimeout(() => {
        const n = currentStep + 1;
        playingSmoothly(n);
      }, 1000);
    }
  }
  playingSmoothly(0);
}

function playSequenceItem(item) {
  emphasizeColor(item);
  playSound(item);
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
  } else if (color === 'yellow') {
    document.getElementById(color).style.backgroundColor = yellowDefaultColor;
  } else {
    document.getElementById(color).style.backgroundColor = 'grey';
  }
}

function resetAllColors() {
  for (let i = 0; i < colorList.length; i += 1) {
    resetColor(colorList[i]);
  }
}

function playSound(color) {
  const audioElement = sounds[colorList.indexOf(color)];
  audioElement.play();
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
