import { newPost } from "./dashboard.js";
export function addMouseoverEvent() {
  const avatarButton = document.querySelector(".header__navegation--avatar");
  const modal = document.querySelector(".modal");

  if (avatarButton && modal) {
    avatarButton.addEventListener("mouseover", () => {
      modal.show();
    });
  }
}
export function addOutsideClickEvent() {
  const modal = document.querySelector(".modal");

  document.addEventListener("click", (event) => {
    if (!modal.contains(event.target)) {
      modal.close();
    }
  });

  const modalcontainer = document.querySelector(".post-modal__controller");

  const headerNavButton = document.querySelector(".header__navegation--btn");

  headerNavButton.addEventListener("click", () => {
    modalcontainer.showModal();
  });
}
export function addLogoutEvent() {
  const logoutButton = document.querySelector(".modal__controller--logout");

  if (logoutButton) {
    logoutButton.addEventListener("click", () => {
      localStorage.removeItem("@petInfo:token");
      window.location.replace("../../index.html");
    });
  }
}
export function modalPostEvent() {
  const modalContainer = document.querySelector(".post-modal__controller");
  const newPostButton = document.querySelector(".header__navegation--btn");
  const closeModalButtons = document.querySelectorAll(".close-cancel__button");

  newPostButton.addEventListener("click", (e) => {
    e.preventDefault();
    if (modalContainer && !modalContainer.hasAttribute("open")) {
      modalContainer.removeAttribute("open");
      modalContainer.showModal();
    }
  });

  closeModalButtons.forEach((button) => {
    button.addEventListener("click", () => {
      if (modalContainer && modalContainer.hasAttribute("open")) {
        modalContainer.close();
      }
    });
  });
}

export function modalCreatePost() {
  const headerContainer = document.querySelector(".header");
  const modalHTML = `
      <dialog class="post-modal__controller">
        <section class="post-modal__container">
            <div class="post-modal__header">
                <h2 class="post-modal__header--title">Criar novo post</h2>
                <button class="close-cancel__button">X</button>
            </div>
            <form class="modal-form">
                <section class="modal-form__input-group">
                    <label 
                        for="title"
                        class="modal-form__input-group-text">
                        Título do post
                    </label>
                    <input 
                        class="modal-form__input-group-input" 
                        type="text"
                        name="title" 
                        id="title"
                        placeholder="Digite o título do post aqui"
                        />
                    <label 
                    for="title"
                    class="modal-form__input-group-text">
                    Conteúdo do Post
                </label>
                <textarea 
                    class="modal-form__input-group-text-area"
                    name="content"
                    placeholder="Digite o conteúdo do post aqui"
                    ></textarea>

                </section>
                <section class="modal-form__buttons-container">
                    <button class="close-cancel__button" type="button">Cancelar</button>
                    <button class="confirm__button"type="submit">Publicar</button>
                </section>
            </form> 
        </section>
    </dialog>   
  `;
  headerContainer.insertAdjacentHTML("beforeend", modalHTML);

  newPost();
  return headerContainer;
}
