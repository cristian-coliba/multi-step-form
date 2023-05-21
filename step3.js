const addons = [
  {
    type: "onlineService",
    name: "Online service",
    priceMonth: 1,
    priceYear: 12,
  },
  {
    type: "largerStorage",
    name: "Larger storage",
    priceMonth: 2,
    priceYear: 24,
  },
  {
    type: "customizableProfile",
    name: "Customizable price",
    priceMonth: 2,
    priceYear: 24,
  },
];
const GoBackBtnToStep2 = document.getElementById("go-back-to-step2");

const summaryAddons = document.getElementById("summaryAddons");
const summaryPlan = document.getElementById("summaryPlan");
const summaryPlanPeriod = document.getElementById("summaryPlanPeriod");
const summaryPlanPrice = document.getElementById("summaryPlanPrice");
const summaryHr = document.getElementById("summaryHr");
const summaryTotalPlanPeriod = document.getElementById("summaryTotalPlanPeriod");
const summaryTotalPrice = document.getElementById("summaryTotalPrice");
const step3Loader = document.querySelector(".step3-loader");

document.getElementById("formStep3").onsubmit = function (e) {
  e.preventDefault();
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  const { onlineService, largerStorage, customizableProfile } = formProps;

  userData.addons = [];
  userData.planPriceTotal = userData.planPrice;
  if (onlineService) {
    userData.addons.push(addons[0]);
    userData.planPriceTotal +=
      userData.planPeriod === "month" ? addons[0].priceMonth : addons[0].priceYear;
  }
  if (largerStorage) {
    userData.addons.push(addons[1]);
    userData.planPriceTotal +=
      userData.planPeriod === "month" ? addons[1].priceMonth : addons[1].priceYear;
  }
  if (customizableProfile) {
    userData.addons.push(addons[2]);
    userData.planPriceTotal +=
      userData.planPeriod === "month" ? addons[2].priceMonth : addons[2].priceYear;
  }

  step3Loader.classList.remove("hidden");
  step3Loader.classList.add("visible");

  setTimeout(() => {
    step3Box.classList.remove("visible");
    step3Box.classList.add("hidden");
    step4Box.classList.remove("hidden");
    step4Box.classList.add("visible");
    changeSidebarStepNumber(2, 3);
    updateSummaryUI();

    step3Loader.classList.remove("visible");
    step3Loader.classList.add("hidden");
  }, 700);
};

GoBackBtnToStep2.addEventListener("click", function () {
  step2Box.classList.remove("hidden");
  step2Box.classList.add("visible");
  step3Box.classList.remove("visible");
  step3Box.classList.add("hidden");
  changeSidebarStepNumber(2, 1);
});

function updateSummaryUI() {
  const planName = userData.planType.charAt(0).toUpperCase() + userData.planType.slice(1);
  const planPeriod = userData.planPeriod.charAt(0).toUpperCase() + userData.planPeriod.slice(1);
  summaryPlan.textContent = planName;
  summaryPlanPeriod.textContent = planPeriod + "ly";
  summaryPlanPrice.textContent = `$${userData.planPrice}/${
    userData.planPeriod === "month" ? "mo" : "year"
  }`;
  summaryTotalPlanPeriod.textContent = userData.planPeriod;
  summaryTotalPrice.textContent = `$${userData.planPriceTotal}/${
    userData.planPeriod === "month" ? "mo" : "year"
  }`;
  summaryAddons.innerHTML = "";

  if (userData.addons.length > 0) {
    summaryHr.classList.remove("hidden");
    summaryHr.classList.add("visible");
    userData.addons.forEach((addon) => {
      summaryAddons.insertAdjacentHTML(
        "beforeend",
        `
              <div class="summary-addon-container">
                  <p>${addon.name}</p>
                  <p id="summaryPlanPrice">$${
                    userData.planPeriod === "month" ? addon.priceMonth : addon.priceYear
                  }/${userData.planPeriod === "month" ? "mo" : "year"}</p>
              </div>
          `
      );
    });
  } else {
    summaryHr.classList.remove("visible");
    summaryHr.classList.add("hidden");
  }
}
