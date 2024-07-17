$(document).ready(function () {
  // variables
  const $prevBtns = $(".btn-prev");
  const $nextBtns = $(".btn-next");
  const $progress = $("#progress");
  const $formSteps = $(".form-step");
  const $progressSteps = $(".progress-step");
  const $title = $("#title");
  const $dropdown = $(".dropdown");
  const $select = $dropdown.find(".select");
  const $caret = $dropdown.find(".caret");
  const $menu = $dropdown.find(".usage-menu");
  const $options = $dropdown.find(".usage-menu li");
  const $selected = $(".selected-social");
  const $selectedSpan = $selected.find("span");
  const $selectedImg = $selected.find("img");
  const $numbers = $(".selected-num");
  const $form = $("form");

  const $individualFormFields = $formSteps.eq(1).find(".input-group input");

  let formStepsNum = 0;
  let selectedNumber = "";
  let formData = {
    username: "",
    email: "",
    phone: "",
    usage: $selectedSpan.text(),
    usageImg: $selectedImg.attr("src"),
  };

  $(".user-usage").text(formData.usage);
  $(".user-usage-img").attr("src", formData.usageImg);
  $(".user-usage-img").attr("alt", formData.usage);

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

  // event listeners
  // buttons
  $nextBtns.each(function () {
    $(this).on("click", () => nextpage());
  });

  $prevBtns.each(function () {
    $(this).on("click", () => prevPage());
  });

  // usage input selection
  $select.on("click", function () {
    $(this).toggleClass("select-clicked");
    $caret.toggleClass("rotate-[90deg]");
    $menu.toggleClass("menu-open");
  });

  $options.each(function () {
    $(this).on("click", function () {
      const $option = $(this);
      const $optionSpan = $option.find("span");
      const $optionImg = $option.find("img");

      $selectedSpan.text($optionSpan.text());
      $selectedImg.attr("src", $optionImg.attr("src"));
      $selectedImg.attr("alt", $optionImg.attr("alt"));

      $select.removeClass("select-clicked");
      $caret.removeClass("rotate-[90deg]");
      $menu.removeClass("menu-open");

      $options.removeClass("active");
      $option.addClass("active");

      formData.usage = $selectedSpan.text();
      formData.usageImg = $selectedImg.attr("src");
      $(".user-usage").text($selectedSpan.text());
      $(".user-usage-img").attr("src", $selectedImg.attr("src"));
      $(".user-usage-img").attr("alt", $selectedImg.attr("alt"));
    });
  });

  // number selection
  $numbers.each(function () {
    $(this).on("click", function () {
      $numbers.removeClass("active");
      $(this).toggleClass("active");
      const num = $(this).find(".number").text();
      selectedNumber = num;
      const $form = $formSteps.eq(0);
      if (selectedNumber)
        $form.find(".btns-group button").removeAttr("disabled");

      $(".user-number").html(selectedNumber);
    });
  });

  // individual form
  $individualFormFields.each(function () {
    $(this).on("input", function (e) {
      const field = $(this).attr("name");
      formData[field] = e.target.value;

      if (field === "username") $(".user-username").html(formData[field]);
      if (field === "email") $(".user-email").html(formData[field]);
      if (field === "phone") $(".user-phone").html(formData[field]);

      const allFieldsFilled = $individualFormFields
        .toArray()
        .every((input) => $(input).val().trim() !== "");
      const $nextButton = $formSteps.eq(1).find(".btn-next");

      if (allFieldsFilled) $nextButton.removeAttr("disabled");
      else $nextButton.attr("disabled", "");
    });
  });

  $form.on("submit", function (e) {
    e.preventDefault();
    formDataHandler();
  });

  // functions
  function updateFormSteps() {
    $formSteps.each(function () {
      const $formStep = $(this);
      //   if ($formStep.hasClass("form-step-active")) {
      //     setTimeout(() => $formStep.removeClass("form-step-active"), 1000);
      //     $formStep.fadeOut(1000);
      //   }

      if ($formStep.hasClass("form-step-active")) {
        $formStep.fadeOut(200, function () {
          $formStep.removeClass("form-step-active");
        });
      }
    });

    $formSteps.eq(formStepsNum).fadeIn(700, function () {
      $formSteps.eq(formStepsNum).addClass("form-step-active");
    });

    // $formSteps.eq(formStepsNum).fadeIn(1000);
    // setTimeout(
    //   () => $formSteps.eq(formStepsNum).addClass("form-step-active"),
    //   2000
    // );
  }

  function updateProgressbar() {
    $progressSteps.each(function (idx) {
      const $progressStep = $(this);
      if (idx < formStepsNum + 1) {
        $progressStep.addClass("progress-step-active");
      } else {
        $progressStep.removeClass("progress-step-active");
      }
    });

    const $progressActive = $(".progress-step-active");

    $progress.css(
      "width",
      (($progressActive.length - 1) / ($progressSteps.length - 1)) * 100 + "%"
    );
  }

  function nextpage() {
    // $("html, body").animate({ scrollTop: 0 }, "smooth");
    formStepsNum++;
    updateFormSteps();
    updateProgressbar();
  }

  function prevPage() {
    // $("html, body").animate({ scrollTop: 0 }, "smooth");
    formStepsNum--;
    updateFormSteps();
    updateProgressbar();
  }
});
