/* eslint-env browser */
/* eslint no-console: ["error", { allow: ["warn", "error", "log"] }] */
/* eslint no-use-before-define: ["error", { "functions": false }] */

const toReplay = [];
const played = [];
let gameOn = false;

function onOff() {
  if (gameOn) {
    gameOn = false;
    document.getElementById('start').removeEventListener('click', () => {
      start();
    });

    document.getElementById('reset').removeEventListener('click', () => {
      reset();
    });
  } else {
    gameOn = true;
    document.getElementById('start').addEventListener('click', () => {
      start();
    });

    document.getElementById('reset').addEventListener('click', () => {
      reset();
    });
  }
}

function reset() {

}

function start() {
  computerPlays();
  document.getElementById('buttons').addEventListener('click', (e) => {
    const colorPlayed = e.target.id;
    check(colorPlayed);
  });
}

function computerPlays() {
  const chosenColor = choosingColor();
  toReplay.push(chosenColor);
  displayChosenColor(chosenColor);
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
}

document.getElementById('on-off').addEventListener('click', () => {
  onOff();
});
