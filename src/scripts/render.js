import { getPosts, getProfileInformations } from "./requests.js";
import {
  addMouseoverEvent,
  addOutsideClickEvent,
  addLogoutEvent,
  modalPostEvent,
} from "./modal.js";

function dateFormat(dateString) {
  const date = new Date(dateString);

  const day = date.getDate();
  const monthsOfTheYearName = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ];

  const month = monthsOfTheYearName[date.getMonth()];
  const year = date.getFullYear();

  return ` ${day} de ${month} de ${year}`;
}

const accessEvent = () => {
  const buttons = document.querySelectorAll(".posts-users--show-post");
  buttons.forEach((button) => {
    button.addEventListener("click", async () => {
      const modal = document.querySelector(".modal__controler-show-post");
      const posts = await getPosts();
      const postInfo = posts.find((post) => post.id === button.dataset.postId);
      modal.innerHTML = "";
      const formatedDate = dateFormat(postInfo.createdAt);
      modal.insertAdjacentHTML(
        "beforeend",
        `
        <div class="posts">
          <div class="posts-user">  
            <figure class="posts-user-card">
              <img class="posts-user-card-img" src="${postInfo.user.avatar}"/>
              <figcaption class="posts-user-card--name">
                ${postInfo.user.username}
                </figcaption>
                <p class="posts-user-card--date"> | ${formatedDate}</p>
              </figure>
              <div class"posts-user-control">
                <button class="close-cancel__button closeModal">X</button>
              </div> 
          </div>
          <article class="posts-article">
            <h2 class="posts-article--title">${postInfo.title}</h2>
            <p class="posts-article--text">${postInfo.content}</p>
          </article>
        </div>
      `
      );
      modal.showModal();
      const cancelButton = document.querySelector(".closeModal");
      cancelButton.addEventListener("click", () => {
        modal.close();
      });
    });
  });
};

export async function renderPosts() {
  const postContainer = document.querySelector(".dashboard-container__posts");
  const postsDatas = await getPosts();
  const profileInfo = await getProfileInformations();
  const authenticatedUserId = profileInfo.id;
  postContainer.innerHTML = "";

  postsDatas.forEach((post) => {
    const formatedDate = dateFormat(post.createdAt);

    const postElement = document.createElement("section");
    postElement.className = "posts";

    const userContainer = document.createElement("div");
    userContainer.className = "posts-user";

    const userCard = document.createElement("figure");
    userCard.className = "posts-user-card";

    const userAvatar = document.createElement("img");
    userAvatar.className = "posts-user-card-img";
    userAvatar.src = post.user.avatar;
    userAvatar.alt = `${post.user.username} profile avatar`;

    const userName = document.createElement("figcaption");
    userName.className = "posts-user-card--name";
    userName.textContent = post.user.username;

    const dateElement = document.createElement("p");
    dateElement.className = "posts-user-card--date";
    dateElement.textContent = `| ${formatedDate}`;

    const postArticle = document.createElement("article");
    postArticle.className = "posts-article";

    const postTitle = document.createElement("h2");
    postTitle.className = "posts-article--title";
    postTitle.textContent = post.title;

    const postText = document.createElement("p");
    postText.className = "posts-article--text";
    postText.textContent = `${post.content.slice(0, 145)} ...`;

    const accessPostButton = document.createElement("button");
    accessPostButton.className = "posts-users--show-post";
    accessPostButton.textContent = "Acessar publicação";
    accessPostButton.dataset.postId = post.id;

    userCard.append(userAvatar, userName, dateElement);
    userContainer.appendChild(userCard);
    postArticle.append(postTitle, postText, accessPostButton);

    if (post.user.id === authenticatedUserId) {
      const userControl = document.createElement("div");
      userControl.className = "posts-user-control";

      const editButton = document.createElement("button");
      editButton.className = "posts-user-control-edit-btn";
      editButton.textContent = "Editar";
      editButton.dataset.postId = post.id;

      const deleteButton = document.createElement("button");
      deleteButton.className = "posts-user-control-delete-btn";
      deleteButton.textContent = "Excluir";
      editButton.dataset.postId = post.id;

      userControl.append(editButton, deleteButton);
      userContainer.appendChild(userControl);

      const modalContainer = document.querySelector(
        ".update-modal__controller"
      );
      const deleteModal = document.querySelector(".modalDelete");

      editButton.addEventListener("click", () => {
        const contentArea = document.querySelector(
          ".update__modal-form__input-group-text-area"
        );
        const inputTitleModal = document.querySelector(
          ".update__modal-form__input-group-input"
        );
        inputTitleModal.value = post.title;
        contentArea.value = post.content;
        const buttonUpdate = document.querySelector(".update");
        buttonUpdate.dataset.postId = post.id;
        modalContainer.showModal();
      });

      deleteButton.addEventListener("click", () => {
        const deleteButton = document.querySelector(".deleteButton");
        deleteButton.dataset.postId = post.id;
        deleteModal.showModal();
      });
    }

    postElement.appendChild(userContainer);
    postElement.appendChild(postArticle);
    postContainer.appendChild(postElement);
    postContainer.insertAdjacentElement("afterbegin", postElement);
  });

  accessEvent();
}

export async function renderNavegation() {
  const userinfo = await getProfileInformations();
  const headerContainer = document.querySelector(".header");
  headerContainer.insertAdjacentHTML(
    "beforeend",
    `
      <nav class="header__navegation">                        
        <button class="header__navegation--btn" type="button">Criar publicação</button>
        <button class="header__navegation--avatar">
          <img 
          class="posts-user-card-picture"
          src="${userinfo.avatar}" 
          alt 
          />   
        </button>
        
        <dialog class="modal" >
            <div class="modal__controller">
            <p class="modal__controller--text">
            @${userinfo.username}
            </p>
            <button class="modal__controller--logout">
                <img 
                    src="../assets/img/Component 1/sign-out-alt.svg"  
                    alt="${userinfo.username} avatar"
                />
                Sair da conta
            </button>
            </div>   
        </dialog>  
      </nav>   
  `
  );
  addMouseoverEvent();
  addOutsideClickEvent();
  addLogoutEvent();
  modalPostEvent();

  return headerContainer;
}
