import { radioPlayerInit } from './radioPlayer.js';
import { videoPlayerInit } from './videoPlayer.js';
import { musicPlayerInit } from './musicPlayer.js';

const playerBtn = document.querySelectorAll('.player-btn');
const playerBlock = document.querySelectorAll('.player-block');
const temp = document.querySelector('.temp');

const deactivationPlayer = () => {
  playerBtn.forEach((item) => { item.classList.remove('active') });
  playerBlock.forEach((item) => { item.classList.remove('active') });
  temp.style.display = 'none';

  musicPlayerInit.stop();
  videoPlayerInit.stop();
  radioPlayerInit.stop();
}
// перебираю все кнопки(радио, видео, аудио), что бы на них навесить событие клика. Связываю (с помощью индекса btn и i (index) всегда совпадают) блоки с кнопками
playerBtn.forEach((btn, i) => {
  // console.log('i: ',playerBlock[i]);
  // console.log(btn);
  btn.addEventListener('click', () => {
    deactivationPlayer();
    btn.classList.add('active');
    playerBlock[i].classList.add('active');
  });
});


videoPlayerInit();
musicPlayerInit();
radioPlayerInit();