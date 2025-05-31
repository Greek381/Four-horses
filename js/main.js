//слайдер этапы преображения

const slider = document.querySelector('.s4-slider');
const prevButton = document.querySelector('.s4-prev-button');
const nextButton = document.querySelector('.s4-next-button');
const slideCount = 5;
let slideIndex = 0;

let pagIndex = 0;
let pagLimit = 1;
const paginations = document.querySelectorAll('.s4-pagination__item');

prevButton.setAttribute('disabled', 'disabled')

prevButton.addEventListener('click', () => {
  slideIndex = (slideIndex - 1 + slideCount) % slideCount;
  
  slide();
  if (slideIndex === 0) {
    prevButton.setAttribute('disabled', 'disabled')
  }
  if (slideIndex < 4) {
    nextButton.removeAttribute('disabled')
    nextButton.classList.remove('s4-prev-next_disabled')
  }

  for (; pagIndex < pagLimit && pagIndex < paginations.length; pagIndex++) {
    paginations[pagIndex].previousElementSibling.classList.add('active')
    paginations[pagIndex].classList.remove('active')
  }
  pagLimit--
  pagIndex = pagLimit - 1
});

nextButton.addEventListener('click', () => {
  slideIndex = (slideIndex + 1) % slideCount;

  slide();
  if (slideIndex > 0) {
    prevButton.removeAttribute('disabled')
  } 
  if (slideIndex === 4) {
    nextButton.setAttribute('disabled', 'disabled')
    nextButton.classList.add('s4-prev-next_disabled')
  } 

  for (; pagIndex < pagLimit && pagIndex < paginations.length; pagIndex++) {
    paginations[pagIndex].nextElementSibling.classList.add('active')
    paginations[pagIndex].classList.remove('active')
  }
  pagLimit++
});

const slide = () => {
  const imageWidth = slider.clientWidth;
  const slideOffset = -slideIndex * imageWidth;
  slider.style.transform = `translateX(${slideOffset}px)`;
}

window.addEventListener('load', () => {
  slide();
});


//слайдер участники турнира

let position = 0;
let slidesToShow = 3;
const slidesToScroll = 1;
let slidesOffset = 130;
const slider2 = document.querySelector('.s5-slider');
const container = document.querySelector('.s5-slider-container');
const items = document.querySelectorAll('.s5-item');
const itemsCount = items.length;
const btnPrev = document.querySelector('.s5-prev-button');
const btnNext = document.querySelector('.s5-next-button');
let itemWidth = (container.clientWidth - slidesOffset*2) / slidesToShow;
let moviePosition = slidesToScroll * itemWidth + slidesOffset;
const currentNumber = document.querySelector('.s5-counts__current');
const endNumber = document.querySelector('.s5-counts__end');

const mediaBreak768 = window.matchMedia('(max-width: 768px)');
const mediaBreak1300 = window.matchMedia('(max-width: 1300px)');

items.forEach((item) => {
  item.style.minWidth = `${itemWidth}px`
})

btnNext.addEventListener('click', () => {
  const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;

  position -= itemsLeft >= slidesToScroll ? moviePosition : itemsLeft * itemWidth + slidesOffset*3;
  
  currentNumber.innerHTML++;
  if (currentNumber.innerHTML === 6) {
    currentNumber.innerHTML = 1
  }

  setPosition();
  checkBtns();
})

btnPrev.addEventListener('click', () => {
  const itemsLeft = Math.abs(position) / itemWidth;

  position += itemsLeft >= slidesToScroll ? moviePosition : itemsLeft * itemWidth + slidesOffset*3;

  currentNumber.innerHTML--;
  setPosition();
  checkBtns();
})

const setPosition = () => {
  container.style.transform = `translateX(${position}px)` 
}

const checkBtns = () => {
  btnPrev.disabled = position === 0;
  btnNext.disabled = position <= -(itemsCount - slidesToShow) * itemWidth;
}

checkBtns();

let timer = 0;
makeTimer();

function makeTimer(){
  clearInterval(timer)
  timer = setInterval(function() {
    const itemsLeft = itemsCount - (Math.abs(position) + slidesToShow * itemWidth) / itemWidth;
    position -= itemsLeft >= slidesToScroll ? moviePosition : itemsLeft * itemWidth + slidesOffset*3;
    currentNumber.innerHTML++;
    if (currentNumber.innerHTML > 6 && window.innerWidth < 768) {
      position = 0;
      currentNumber.innerHTML = 1;
    } else if (currentNumber.innerHTML > 6 && window.innerWidth < 1300) {
      position = 0;
      currentNumber.innerHTML = 2;
    } else if (currentNumber.innerHTML > 6 && window.innerWidth > 768) {
      position = 0;
      currentNumber.innerHTML = 3;
    }
    setPosition();
    checkBtns();
  }, 4000);
}

function change1300(e) {
  if (e.matches) {
    slidesToShow = 2;
    slidesOffset = 60;
    currentNumber.innerHTML = 2;
    itemWidth = 300;
    moviePosition = 300;
    items.forEach((item) => {
      item.style.minWidth = `${itemWidth}px`
    });
  }
}
  
function change768(e) {
  if (e.matches) {
    slidesToShow = 1;
    slidesOffset = 20;
    currentNumber.innerHTML = 1;
    itemWidth = 290;
    moviePosition = 290;
    items.forEach((item) => {
      item.style.minWidth = `${itemWidth}px`
    });
  }
}

mediaBreak1300.addListener(change1300)
change1300(mediaBreak1300)

mediaBreak768.addListener(change768)
change768(mediaBreak768)