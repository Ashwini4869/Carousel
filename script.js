var slides = document.querySelectorAll(".slide img");
var carousel = document.querySelector(".carousel");
var buttons = document.querySelector(".buttons");

console.log(slides);
let forward = true;
let currentIndex = 0;
let indicators = [];
let slideWidth = slides[0].clientWidth;
console.log(slideWidth);
let intervalId;

function toggleDirection() {
  forward = !forward;
}

function updateSlide() {
  carousel.style.marginLeft = `-${currentIndex * slideWidth}px`;
  console.log("updateslide");

  indicators.forEach((indicator, index) => {
    indicator.classList.toggle("button-active", index == currentIndex);
  });
}

function prevSlide() {
  currentIndex = (currentIndex - 1 + slides.length) % slides.length;
  updateSlide();
}

function nextSlide() {
  if (forward) {
    currentIndex++;
  } else {
    currentIndex--;
  }
  if (currentIndex <= 0) {
    currentIndex = 0;
    toggleDirection();
  }
  if (currentIndex >= slides.length - 1) {
    currentIndex = slides.length - 1;
    toggleDirection();
  }
  updateSlide();
}

function initSlide() {
  intervalId = setInterval(nextSlide, 2000);

  slides.forEach((slide, index) => {
    const indicator = document.createElement("div");
    indicator.classList.add("button");
    indicator.addEventListener("click", () => {
      currentIndex = index;
      updateSlide();
      clearInterval(intervalId);
      intervalId = setInterval(nextSlide, 2000);
    });
    indicators.push(indicator);
    buttons.appendChild(indicator);
  });
  updateSlide();
}

initSlide();
