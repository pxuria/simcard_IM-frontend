const prevBtns = document.querySelectorAll(".btn-prev");
const nextBtns = document.querySelectorAll(".btn-next");
const progress = document.getElementById("progress");
const formSteps = document.querySelectorAll(".form-step");
const progressSteps = document.querySelectorAll(".progress-step");
const title = document.querySelector("#title");
const step1Svg = document.querySelectorAll(".step-1-svg");
const step2Svg = document.querySelectorAll(".step-2-svg");

let formStepsNum = 0;

nextBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
    console.log(formStepsNum);
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
    // else if (formStepsNum === 1) {
    //   step2Svg.forEach((svg) => {
    //     svg.classList.remove("block");
    //     svg.classList.add("hidden");
    //   });
    // }

    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  });
});

prevBtns.forEach((btn) => {
  btn.addEventListener("click", () => {
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

var swiper = new Swiper(".mySwiper", {
  effect: "cards",
  grabCursor: true,
});
