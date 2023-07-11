import { toast, showSuccessToastSignUp } from "./toats.js";
const spinner = document.querySelector(".spinner");
const body = document.querySelector(".container");

const baseURL = "http://localhost:3333";
const green = "#168821";
export const red = "#df1545";

export async function loginRequest(loginBody) {
  const token = await fetch(`${baseURL}/login`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(loginBody),
  })
    .then(async (response) => {
      const responseJson = await response.json();

      if (response.ok) {
        const token = responseJson;
        localStorage.setItem("@petInfo:token", token.token);
        toast(
          "Login realizado sucesso! redirecionando para o dashboard... ",
          green
        );
        spinner.classList.remove("hidden");
        body.classList.add("opacity");
        setTimeout(() => {
          location.replace("./src/pages/dashboard.html");
        }, 2000);
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => {
      spinner.classList.add("hidden");
      toast(err.message, red);
    });
}

export async function createUser(bodyRequest) {
  const newUser = await fetch(` ${baseURL}/users/create`, {
    method: "POST",

    headers: {
      "Content-Type": "application/json",
    },

    body: JSON.stringify(bodyRequest),
  })
    .then(async (response) => {
      const responseJson = await response.json();
      if (response.ok) {
        showSuccessToastSignUp();
        spinner.classList.remove("hidden");
        body.classList.add("opacity");
        setTimeout(() => {
          location.replace("../../index.html");
        }, 2000);

        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => {
      spinner.classList.add("hidden");
      toast(err.message, red);
    })
      

  return newUser;
}

export async function createPost(postBody) {
  const token = localStorage.getItem("@petInfo:token");
  const newPost = await fetch(`${baseURL}/posts/create`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(postBody),
  })
    .then(async (response) => {
      const responseJson = response.json();
      if (response.ok) {
        toast("Post criado com sucesso", green);

        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => toast(err.message, red));

  return newPost;
}

export async function getProfileInformations() {
  const token = localStorage.getItem("@petInfo:token");
  const profileInfo = await fetch(`${baseURL}/users/profile`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const responseJson = await response.json();
      if (response.ok) {
        return responseJson;
      } else {
        throw new Error(response.message);
      }
    })
    .catch((error) => toast(error.message), red);

  return profileInfo;
}

export async function getPosts() {
  const token = localStorage.getItem("@petInfo:token");
  const posts = await fetch(`${baseURL}/posts`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const responseJson = await response.json();
      if (response.ok) {
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((error) => toast(error.message), red);

  return posts;
}

export async function updatePostById(postId, requestBody) {
  const token = localStorage.getItem("@petInfo:token");

  const post = await fetch(`${baseURL}/posts/${postId}`, {
    method: "PATCH",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify(requestBody),
  })
    .then(async (response) => {
      const responseJson = await response.json();

      if (response.ok) {
        toast("O post foi atualizado com sucesso", green);

        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => toast(err.message, red));

  return post;
}

export async function deletePostById(postId) {
  const token = localStorage.getItem("@petInfo:token");
  const post = await fetch(`${baseURL}/posts/${postId}`, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
    .then(async (response) => {
      const responseJson = await response.json();
      if (response.ok) {
        toast("Post deletado com sucesso", green);
        return responseJson;
      } else {
        throw new Error(responseJson.message);
      }
    })
    .catch((err) => toast(err.message, red));
  return post;
}
