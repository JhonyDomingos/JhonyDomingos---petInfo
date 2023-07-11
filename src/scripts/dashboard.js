import { renderPosts, renderNavegation } from "./render.js";
import { modalCreatePost } from "./modal.js";
import { createPost, red, deletePostById, updatePostById } from "./requests.js";
import { toast } from "./toats.js";

function authentication() {
  const token = localStorage.getItem("@petInfo:token");
  if (!token) {
    location.replace("../../");
  }
}

export function newPost() {
  const form = document.querySelector(".modal-form");
  const inputContent = document.querySelectorAll(
    ".modal-form__input-group-input, .modal-form__input-group-text-area"
  );
  const buttonPublishPost = document.querySelector(".confirm__button");
  let postBody = {};
  let count = 0;

  buttonPublishPost.addEventListener("click", async (e) => {
    e.preventDefault();
    inputContent.forEach((input) => {
      if (input.value.trim() === "") {
        count++;
      }

      postBody[input.name] = input.value;
    });
    if (count !== 0) {
      count = 0;
      toast("preencha os campos necessário", red);
    } else {
      await createPost(postBody);
      form.reset(); // Limpar os campos do formulário
      const modal = document.querySelector(".post-modal__controller");
      modal.close(); // Fechar o modal
      await renderPosts();
    }
  });
}
export function handleUpdatePost() {
  const modalContainer = document.querySelector(".update-modal__controller");
  const updateForm = document.querySelector(".modal-form");
  const updateButton = document.querySelector(".confirm__button");

  updateButton.addEventListener("click", async () => {
    const postId = updateForm.dataset.postId;
    const postTitle = updateForm.title.value;
    const postContent = updateForm.content.value;

    const bodyRequest = {
      title: postTitle,
      content: postContent,
    };

    try {
      await updatePostById(postId, bodyRequest);

      updateForm.reset();

      modalContainer.close();

      await renderPosts();
    } catch (error) {
      console.error(error);
    }
  });
}

function hadleEditModalEvent() {
  const buttonUpdate = document.querySelector(".update");
  const modalContainer = document.querySelector(".update-modal__controller");
  const buttonClose = document.querySelectorAll(".closeModal");

  buttonClose.forEach((button) => {
    button.addEventListener("click", () => {
      modalContainer.close();
    });
  });

  buttonUpdate.addEventListener("click", async (e) => {
    e.preventDefault();

    const contentArea = document.querySelector(
      ".update__modal-form__input-group-text-area"
    );
    const inputTitleModal = document.querySelector(
      ".update__modal-form__input-group-input"
    );

    const postId = buttonUpdate.dataset.postId;
    const bodyRequest = {
      title: inputTitleModal.value,
      content: contentArea.value,
    };

    await updatePostById(postId, bodyRequest);
    await renderPosts();
    modalContainer.close();
  });
}

function hadleDeleteModalEvent() {
  const buttonDelete = document.querySelector(".deleteButton");
  const deleteCancelButtons = document.querySelectorAll(".close-Modal");
  const deleteModal = document.querySelector(".modalDelete");

  buttonDelete.addEventListener("click", async (e) => {
    const postId = buttonDelete.dataset.postId;
    await deletePostById(postId);
    await renderPosts();
    if (buttonDelete) {
      deleteModal.close();
    }
  });

  deleteCancelButtons.forEach((buttons) => {
    buttons.addEventListener("click", () => {
      deleteModal.close();
    });
  });
}

authentication();
hadleDeleteModalEvent();
hadleEditModalEvent();
renderNavegation();
modalCreatePost();
renderPosts();
