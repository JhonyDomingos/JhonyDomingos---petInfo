import { toast } from "./toats.js";
import { red, loginRequest } from "./requests.js";

function authentication() {
  const token = localStorage.getItem("@petInfo:token");
  if (token) {
    location.replace("./src/pages/dashboard.html");
  }
}

function handleLogin() {
  const inputs = document.querySelectorAll(".input-group__input");
  const button = document.querySelector(".input-group--login-btn");
  let loginBody = {};
  let count = 0;

  button.addEventListener("click", (e) => {
    e.preventDefault();

    inputs.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }

      loginBody[input.name] = input.value;
    });

    if (count !== 0) {
      count = 0;
      return toast("Por favor, preencha todos os campos de login", red);
    } else {
      loginRequest(loginBody);
    }
  });
}

function redirectButton() {
  const signUpButton = document.querySelector(".form__register-card--btn");

  signUpButton.addEventListener("click", () => {
    window.location.href = "./src/pages/register-form.html";
  });
}

authentication();
redirectButton();
handleLogin();
