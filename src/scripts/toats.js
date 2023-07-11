export function showSuccessToastSignUp() {
  const toastContainer = document.querySelector("body");

  const toastHTML = `
        <div class="toast-signUp">
            <div class="toast-signUp-box">
                <img class="toast-signUp--img" src="../assets/img/Component 1/check.svg" alt="">
                <h4 class="toast-signUp--title">Sua conta foi criada com sucesso!</h4>
            </div>      
            <p class="toast-signUp--description">
            Agora você pode acessar os conteúdos utilizando seu usuário e senha na página de login:
            <a href="/">
              Acessar página de login
            </a>
            </p>
        </div>     
    `;
  toastContainer.insertAdjacentHTML("beforeend", toastHTML);
}

export function toast(message, color) {
  Toastify({
    text: message,
    duration: 3000,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "right", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: color,
    },
  }).showToast();
}
