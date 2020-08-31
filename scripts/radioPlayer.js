export const radioPlayerInit = () => {

  const radio = document.querySelector('.radio');
  const radioCoverImg = document.querySelector('.radio-cover__img');
  const radioNavigation = document.querySelector('.radio-navigation');
  const radioHeaderBig = document.querySelector('.radio-header__big');
  const radioItem = document.querySelectorAll('.radio-item');
  const radioStop = document.querySelector('.radio-stop');
  const radioVolume = document.querySelector('.radio-volume');
  const radioMute = document.querySelector('.volume-radio-down');
  const volumeRadioUp = document.querySelector('.volume-radio-up');

  let prevVolume = 0.2;

  const audio = new Audio();
  audio.type = 'audio/aac';

  radioStop.disabled = true;

  // меняю иконку кнопки проигрывания
  const changeIconPlay = () => {
    if (audio.paused) {
      radio.classList.remove('play');
      radioStop.classList.add('fa-play');
      radioStop.classList.remove('fa-stop');
    } else {
      radio.classList.add('play');
      radioStop.classList.add('fa-stop');
      radioStop.classList.remove('fa-play');
    }
  }

  //добавляю-удаляю активный класс у иконки выбора радиостанции
  const selectItem = elem => {
    radioItem.forEach(item => item.classList.remove('select'));
    elem.classList.add('select');
  }

  // выбор радиостанции
  radioNavigation.addEventListener('change', (event) => {
    const target = event.target;
    const parent = target.closest('.radio-item');
    selectItem(parent);

    const title = parent.querySelector('.radio-name').textContent;
    radioHeaderBig.textContent = title;

    const urlImg = parent.querySelector('.radio-img').src;
    radioCoverImg.src = urlImg;

    radioStop.disabled = false;

    audio.src = target.dataset.radioStation; // console.log(target.dataset.radioStation);

    audio.play();
    changeIconPlay();
  });

  // кнопка остановки проигрывания
  radioStop.addEventListener('click', () => {
    if (audio.paused) {
      audio.play();
    } else {
      audio.pause();
    }
    changeIconPlay();
  });

  radioVolume.addEventListener('click', () => {
      audio.volume = radioVolume.value / 100;
  });

// кнопка отключения-включения звука,  prevVolume - что бы при включении звука, уровень громкости оставался на том же месте
  radioMute.addEventListener('click', () =>{
    radioMute.classList.toggle("fa-bell-slash");
    if(audio.volume){
      prevVolume = audio.volume;
      audio.volume = 0;
      radioVolume.value = 0;
    } else {
      audio.volume = prevVolume;
    }
  })

  volumeRadioUp.addEventListener('click', () => {
    audio.volume = 1;
    radioVolume.value = 100;
  });

  radioPlayerInit.stop = () => {
    audio.pause();
    changeIconPlay();
  };

};