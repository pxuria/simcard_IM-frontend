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
const form = document.querySelector("form");

const individualFormFields = formSteps[1].querySelectorAll(".input-group input");

let formStepsNum = 0;
let payment = "";
let selectedNumber = "";
let formData = { username: "", email: "", phone: "", usage: "telegram" };

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
    nextpage();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    prevPage();
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

    formData.usage = optionSpan.innerText;
    document.querySelector(".user-usage").innerHTML = selectedImg.alt;
    document.querySelector(".user-usage-img").src = selectedImg.src;
  });
});

// payment cards selection
paymentCards.forEach((item) => {
  item.addEventListener("click", function () {
    paymentCards.forEach((el) => el.classList.remove("active"));
    this.classList.toggle("active");
    payment = this.children[1].innerText;
    if (payment) {
      formSteps[2].querySelector(".btns-group button.btn-next").removeAttribute("disabled");
    }
  });
});

// number selection
numbers.forEach((number) => {
  number.addEventListener("click", function () {
    numbers.forEach((number) => number.classList.remove("active"));
    this.classList.toggle("active");
    const num = this.querySelector(".number").innerText;
    selectedNumber = num;
    const form = document.querySelectorAll(".form-step")[0];
    if (selectedNumber) form.querySelector(".btns-group button").removeAttribute("disabled");

    document.querySelector(".user-number").innerHTML = selectedNumber;
  });
});

// individual form
individualFormFields.forEach((field) => {
  field.addEventListener("input", function (e) {
    const field = this.name;
    formData[field] = e.target.value;

    if (field === "username") document.querySelector(".user-username").innerHTML = formData[field];
    if (field === "email") document.querySelector(".user-email").innerHTML = formData[field];
    if (field === "phone") document.querySelector(".user-phone").innerHTML = formData[field];
    const allFieldsFilled = Array.from(individualFormFields).every((input) => input.value.trim() !== "");
    const nextButton = formSteps[1].querySelector(".btn-next");

    if (allFieldsFilled) nextButton.removeAttribute("disabled");
    else nextButton.setAttribute("disabled", "");
  });
});

form.addEventListener("submit", (e) => {
  e.preventDefault();
  formDataHandler();
});

// functions
function updateFormSteps() {
  formSteps.forEach((formStep) => {
    formStep.classList.contains("form-step-active") && formStep.classList.remove("form-step-active");
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

  progress.style.width = ((progressActive.length - 1) / (progressSteps.length - 1)) * 100 + "%";
}

function nextpage() {
  window.scrollTo({
    top: 60,
    behavior: "smooth",
  });
  formStepsNum++;
  updateFormSteps();
  updateProgressbar();
}

function prevPage() {
  window.scrollTo({
    top: 60,
    behavior: "smooth",
  });
  formStepsNum--;
  updateFormSteps();
  updateProgressbar();
}
