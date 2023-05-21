const planSelectErrorMessage = document.querySelector("#planSelect_error");
const GoBackBtnToStep1 = document.getElementById("go-back-to-step1");
const step2Loader = document.querySelector(".step2-loader");

const plans = [
  { type: "arcade", pricePerMonth: 9, pricePerYear: 108 },
  { type: "advanced", pricePerMonth: 12, pricePerYear: 144 },
  { type: "pro", pricePerMonth: 15, pricePerYear: 180 },
];

document.getElementById("formStep2").onsubmit = function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);

  if (!formProps.hasOwnProperty("plan")) {
    planSelectErrorMessage.innerHTML = "Please select a plan.";
    return;
  }
  planSelectErrorMessage.innerHTML = "";

  const selectedPlan = plans.find((plan) => plan.type === formProps.plan);

  userData.planType = selectedPlan.type;
  if (formProps.hasOwnProperty("planPeriod")) {
    userData.planPeriod = "year";
    userData.planPrice = selectedPlan.pricePerYear;
  } else {
    userData.planPeriod = "month";
    userData.planPrice = selectedPlan.pricePerMonth;
  }

  step2Loader.classList.remove("hidden");
  step2Loader.classList.add("visible");

  setTimeout(() => {
    step2Box.classList.remove("visible");
    step2Box.classList.add("hidden");
    step3Box.classList.remove("hidden");
    step3Box.classList.add("visible");
    changeSidebarStepNumber(1, 2);

    step2Loader.classList.remove("visible");
    step2Loader.classList.add("hidden");
  }, 1000);
};

GoBackBtnToStep1.addEventListener("click", function () {
  step1Box.classList.remove("hidden");
  step1Box.classList.add("visible");
  step2Box.classList.remove("visible");
  step2Box.classList.add("hidden");
  changeSidebarStepNumber(1, 0);
});
