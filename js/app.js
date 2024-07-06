// variables
const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const title = document.querySelector("#title");
const step1Svg = document.querySelectorAll(".step-1-svg");
const step2Svg = document.querySelectorAll(".step-2-svg");
const dropdown = document.querySelector(".dropdown");
const select = dropdown.querySelector(".select");
const caret = dropdown.querySelector(".caret");
const menu = dropdown.querySelector(".usage-menu");
const options = dropdown.querySelectorAll(".usage-menu li");
const selected = dropdown.querySelector(".selected");
const paymentCards = document.querySelectorAll(".payment-card");
const numbers = document.querySelectorAll(".selected-num");

let formStepsNum = 0;
let payment = "";
let number = "";
let formData = { username: "", email: "", number: "", usage: "" };

// packages
var swiper = new Swiper(".mySwiper", {
  effect: "coverflow",
  grabCursor: true,
  centeredSlides: true,
  loop: true,
  initialSlide: 1,
  speed: 600,
  preventClicks: true,
  slidesPerView: "auto",
  coverflowEffect: {
    rotate: 0,
    stretch: 80,
    depth: 350,
    modifier: 1,
    slideShadows: true,
  },
  on: {
    click(event) {
      swiper.slideTo(this.clickedIndex);
    },
  },
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
});

// eventlisteners
// buttons
nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    if (formStepsNum === 0) {
      title.classList.remove("block");
      title.classList.add("hidden");
      // step 1 svg display
      step1Svg.forEach((svg) => {
        svg.classList.remove("block");
        svg.classList.add("hidden");
      });
      step2Svg.forEach((svg) => {
        svg.classList.remove("hidden");
        svg.classList.add("block");
      });
    }
    // step 2 svg display
    else if (formStepsNum === 1) {
      step2Svg.forEach((svg) => {
        svg.classList.remove("block");
        svg.classList.add("hidden");
      });
    }

    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
    if (formStepsNum === 0) {
      title.classList.remove("hidden");
      title.classList.add("block");
      // step 1 svg display
      step1Svg.forEach((svg) => {
        svg.classList.remove("hidden");
        svg.classList.add("block");
      });
      step2Svg.forEach((svg) => {
        console.log("delete step 2");
        svg.classList.remove("block");
        svg.classList.add("hidden");
      });
    }
  });
});

// usage input selection
select.addEventListener("click", () => {
  select.classList.toggle("select-clicked");
  caret.classList.toggle("rotate-[90deg]");
  menu.classList.toggle("menu-open");
});

options.forEach((option) => {
  option.addEventListener("click", () => {
    const selectedSpan = selected.querySelector("span");
    const selectedImg = selected.querySelector("img");

    const optionSpan = option.querySelector("span");
    const optionImg = option.querySelector("img");

    selectedSpan.innerText = optionSpan.innerText;
    selectedImg.src = optionImg.src;
    selectedImg.alt = optionImg.alt;

    select.classList.remove("select-clicked");
    caret.classList.remove("rotate-[90deg]");
    menu.classList.remove("menu-open");

    options.forEach((option) => {
      option.classList.remove("active");
    });

    option.classList.add("active");
  });
});

// payment cards selection
paymentCards.forEach((item) => {
  item.addEventListener("click", function () {
    paymentCards.forEach((el) => el.classList.remove("active"));
    this.classList.toggle("active");
  });
});

numbers.forEach((number) => {
  number.addEventListener("click", function () {
    this.classList.toggle("active");
  });
});

// functions
function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") &&
      formStep.classList.remove("form-step-active");
  });

  formSteps[formStepsNum].classList.add("form-step-active");
}

function updateProgressbar() {
  progressSteps.forEach((progressStep, idx) => {
    if (idx < formStepsNum + 1) {
      progressStep.classList.add("progress-step-active");
    } else {
      progressStep.classList.remove("progress-step-active");
    }
  });

  const progressActive = document.querySelectorAll(".progress-step-active");

  progress.style.width =
    ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}
