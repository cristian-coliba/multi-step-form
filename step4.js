const GoBackBtnToStep3 = document.getElementById("go-back-to-step3");
const summaryBtnChangePlan = document.getElementById("summaryBtnChangePlan");
const step4Loader = document.querySelector(".step4-loader");

document.getElementById("formStep4").onsubmit = async function (e) {
  e.preventDefault();
  await navigator.clipboard.writeText(JSON.stringify(userData));

  step4Loader.classList.remove("hidden");
  step4Loader.classList.add("visible");

  setTimeout(() => {
    step4Box.classList.remove("visible");
    step4Box.classList.add("hidden");
    step5Box.classList.remove("hidden");
    step5Box.classList.add("visible");

    step4Loader.classList.remove("visible");
    step4Loader.classList.add("hidden");
  }, 700);
};

GoBackBtnToStep3.addEventListener("click", function () {
  step3Box.classList.remove("hidden");
  step3Box.classList.add("visible");
  step4Box.classList.remove("visible");
  step4Box.classList.add("hidden");
  changeSidebarStepNumber(3, 2);
});

summaryBtnChangePlan.addEventListener("click", function () {
  step2Box.classList.remove("hidden");
  step2Box.classList.add("visible");
  step4Box.classList.remove("visible");
  step4Box.classList.add("hidden");
  changeSidebarStepNumber(3, 1);
});
