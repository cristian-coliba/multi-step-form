let userData = {};

const signupErrorMessage = document.querySelector("#signup_error");
const colorNameInput = document.querySelector(".input--name");
const colorEmailInput = document.querySelector(".input--email");
const colorPhoneNumberInput = document.querySelector(".input--phone");
const step1Box = document.getElementById("step1");
const step2Box = document.getElementById("step2");
const step3Box = document.getElementById("step3");
const step4Box = document.getElementById("step4");
const step5Box = document.getElementById("step5");
const circleSteps = document.getElementsByClassName("circle");

document.getElementById("formStep1").onsubmit = function (e) {
  e.preventDefault();
  // get the input values
  const formData = new FormData(e.target);
  const formProps = Object.fromEntries(formData);
  const { name, email, phoneNumber } = formProps;

  // validate input values
  const errorMessageValidation = validatePersonalInfo(name, email, phoneNumber);
  if (errorMessageValidation) {
    signupErrorMessage.textContent = errorMessageValidation;
    return;
  }
  signupErrorMessage.textContent = "";

  //update userData and UI
  userData = { ...userData, name, email, phoneNumber };
  step1Box.classList.remove("visible");
  step1Box.classList.add("hidden");
  step2Box.classList.remove("hidden");
  step2Box.classList.add("visible");
  changeSidebarStepNumber(0, 1);
};

function changeSidebarStepNumber(currentIndex, nextIndex) {
  circleSteps[currentIndex].classList.remove("circle-active");
  circleSteps[nextIndex].classList.add("circle-active");
}

function validateEmail(email) {
  return String(email)
    .toLowerCase()
    .match(
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    );
}

function validatePersonalInfo(name, email, phoneNumber) {
  if (name.length === 0) {
    colorNameInput.style.border = "1px solid red";
    return `Please enter your Name`;
  } else if (name.length < 3) {
    colorNameInput.style.border = "1px solid red";
    return `Name must be three or more characters`;
  } else if (name.length > 16) {
    colorNameInput.style.border = "1px solid red";
    return `Name must contain less than 16 characters`;
  }
  colorNameInput.style.border = "1px solid rgb(184, 182, 182)";

  const isValidEmail = validateEmail(email);
  if (!isValidEmail) {
    colorEmailInput.style.border = "1px solid red";
    return `Please enter a valid email address`;
  }
  colorEmailInput.style.border = "1px solid rgb(184, 182, 182)";

  if (phoneNumber.length === 0) {
    colorPhoneNumberInput.style.border = "1px solid red";
    return `Phone number is required`;
  }
  colorPhoneNumberInput.style.border = "1px solid rgb(184, 182, 182)";

  return "";
}

// const userDataExample = {
//   name: "Cristian Coliba",
//   email: "cristian.coliba2@gmail.com",
//   phoneNumber: "03477204647",
//   planType: "advanced",
//   planPeriod: "year",
//   planPrice: 144,
//   addons: [
//     { type: "onlineService", name: "Online service", priceMonth: 1, priceYear: 12 },
//     { type: "largerStorage", name: "Larger storage", priceMonth: 2, priceYear: 24 },
//   ],
//   planPriceTotal: 180,
// };
