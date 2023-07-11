import { toast } from "./toats.js";
import { red, createUser } from "./requests.js";

function handleSignUp() {
  const signupInputs = document.querySelectorAll(".input-group__input");
  const signupButton = document.querySelector(".input-group--signup-btn");

  let bodyRequest = {};
  let count = 0;

  signupButton.addEventListener("click", (e) => {
    e.preventDefault();

    signupInputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }

      bodyRequest[input.name] = input.value;
    });

    if (count !== 0) {
      count = 0;
      return toast("Por favor, preencha todos os campos do cadastro", red);
    } else {
      createUser(bodyRequest);
    }
  });
}

handleSignUp();

const signUpButton = document.querySelector(".input-group--signup-btn");
signUpButton.addEventListener("click", handleSignUp);

function redirectToLogin() {
  const redirectButton = document.querySelectorAll(".form__card--redirect");

  redirectButton.forEach((button) => {
    button.addEventListener("click", () => {
      window.location.replace("../../index.html");
    });
  });
}

redirectToLogin();
