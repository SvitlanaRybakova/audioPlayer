import {addZero} from './supScript.js';
export const videoPlayerInit = () => {
  const videoPlayer = document.querySelector('.video-player');
  const videoButtonPlay = document.querySelector('.video-button__play');
  const videoButtonStop = document.querySelector('.video-button__stop');
  const videoTimePassed = document.querySelector('.video-time__passed');
  const videoProgress = document.querySelector('.video-progress');
  const videoTimeTotalt = document.querySelector('.video-time__total');
  const videoFullscreen = document.querySelector('.video-fullscreen');
  const videoVolume = document.querySelector('.video-volume');
  const volumeDown = document.querySelector('.volume-down');
  const  volumeUp = document.querySelector('.volume-up');
 
  let prevVideoVolume = 1;

  // меняю иконки на плеере
  const toggleIcon = () => {
    if (videoPlayer.paused) {
      videoButtonPlay.classList.remove('fa-pause');
      videoButtonPlay.classList.add('fa-play');
    } else {
      videoButtonPlay.classList.add('fa-pause');
      videoButtonPlay.classList.remove('fa-play');
    }

    
  };


  // запускаю или останавливаю проигрывание
  const togglePlay = () => {
    if (videoPlayer.paused) {
      videoPlayer.play();
    } else {
      videoPlayer.pause();
    }

    toggleIcon();
  };

  // останавливаю проигрывание 
  const stopPlay = () => {
    videoPlayer.pause();
    videoPlayer.currentTime = 0;
    toggleIcon();
  };


  videoPlayer.addEventListener('click', togglePlay);
  videoButtonPlay.addEventListener('click', togglePlay);
  videoButtonStop.addEventListener('click', stopPlay);

  // событие отслеживания времени проигравания
  videoPlayer.addEventListener('timeupdate', () => {
    const currentTime = videoPlayer.currentTime;
    const duration = videoPlayer.duration;

    videoProgress.value = (currentTime/duration) * 100;

    let minutesPassed = Math.floor(currentTime / 60);
    let secondsPassed = Math.floor(currentTime % 60);

    let minutesTotal = Math.floor(duration / 60);
    let secondsTotal = Math.floor(duration % 60);

    videoTimePassed.textContent = addZero(minutesPassed) + ':' + addZero(secondsPassed);
    videoTimeTotalt.textContent = addZero(minutesTotal) + ':' + addZero(secondsTotal);
  });


  // перемотка видео
  videoProgress.addEventListener('input', () => {
    const duration = videoPlayer.duration;
    const value = videoProgress.value;

    videoPlayer.currentTime = (value * duration)/ 100;
    console.log(videoPlayer.currentTime);
  });

  // регулировка звука
  videoVolume.addEventListener('input', () => {
    videoPlayer.volume = videoVolume.value / 100;
  
  });
    videoPlayer.volume = 0.1;
    videoVolume.value = videoPlayer.volume * 100;

    // выключение звука
    volumeDown.addEventListener('click', () => {
      volumeDown.classList.toggle("fa-bell-slash");
      

      if (videoPlayer.volume){
        prevVideoVolume = videoPlayer.volume;
        videoPlayer.volume = 0;
        
      } else {
        videoPlayer.volume = prevVideoVolume;
       
      }
      
    });

    volumeUp.addEventListener('click', () => {
      videoPlayer.volume = 1;
      videoVolume.value = 100;
    });

   //раскрытие плеера на весь экран
   videoFullscreen.addEventListener('click', () =>{
    videoPlayer.requestFullscreen();
  });

  videoPlayerInit.stop = () => {
    stopPlay();
  };


};
 
