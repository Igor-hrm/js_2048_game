/* eslint-disable prettier/prettier */
'use strict';

import Game from '../modules/Game.class.js';

const game = new Game([
  [2, 0, 0, 2],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
]);

const startButton = document.querySelector('.start');

/* ========= RENDER DO TABULEIRO ========= */
function render(board) {
  const cells = document.querySelectorAll('.field-cell');

  board.flat().forEach((value, index) => {
    const cell = cells[index];

    // reseta visual da célula
    cell.className = 'field-cell';
    cell.textContent = '';

    // renderiza número e classe quando tiver valor
    if (value > 0) {
      cell.textContent = value;
      cell.classList.add(`field-cell--${value}`);
    }
  });

  const score = document.querySelector('.game-score');

  score.textContent = game.getScore();
}

/* ========= RENDER DAS MENSAGENS ========= */
function renderStatus() {
  const stats = game.getStatus();

  const messages = {
    idle: document.querySelector('.message-start'),
    playing: document.querySelector('.message-playing'),
    win: document.querySelector('.message-win'),
    lose: document.querySelector('.message-lose'),
  };

  Object.values(messages).forEach((message) =>
    message.classList.add('hidden'));

  messages[stats].classList.remove('hidden');
}

/* ========= RENDER DO BOTÃO ========= */
function renderButton() {
  const stats = game.getStatus();

  if (stats === 'lose' || stats === 'win') {
    startButton.textContent = 'Reset';
  } else {
    startButton.textContent = 'Start';
  }
}

/* ========= CLICK NO BOTÃO ========= */
startButton.addEventListener('click', () => {
  const stats = game.getStatus();

  if (stats === 'idle') {
    game.start();
  } else if (stats === 'lose' || stats === 'win') {
    game.restart();
  }

  render(game.getState());
  renderStatus();
  renderButton();
});

/* ========= CONTROLES DO TECLADO ========= */
document.addEventListener('keydown', (thisEvent) => {
  if (game.getStatus() !== 'playing') {
    return;
  }

  switch (thisEvent.key) {
    case 'ArrowLeft':
      game.moveLeft();
      break;

    case 'ArrowRight':
      game.moveRight();
      break;

    case 'ArrowUp':
      game.moveUp();
      break;

    case 'ArrowDown':
      game.moveDown();
      break;

    default:
      return;
  }

  render(game.getState());
  renderStatus();
  renderButton();
});

/* ========= ESTADO INICIAL ========= */
render(game.getState());
renderStatus();
renderButton();
