import { Comment, Post, User } from "../types";

const JSONPLACEHOLDER_BASE_URL = "https://jsonplaceholder.typicode.com";
const ENDPOINTS = {
  POSTS: "/posts",
  COMMENTS: "/comments",
  USERS: "/users",
};
const PAGINATION_LIMIT = 5;

export const api = {
  jsonplaceholder: {
    async fetchPosts(page = 1): Promise<Post[]> {
      const response = await fetch(
        `${JSONPLACEHOLDER_BASE_URL}${ENDPOINTS.POSTS}?_limit=${PAGINATION_LIMIT}&_page=${page}`
      );
      if (!response.ok) throw new Error("Error al obtener publicaciones");
      return response.json();
    },

    async fetchPost(postId: string): Promise<Post> {
      const response = await fetch(
        `${JSONPLACEHOLDER_BASE_URL}${ENDPOINTS.POSTS}/${postId}`
      );
      if (!response.ok) throw new Error("Error al obtener la publicación");
      return response.json();
    },

    async fetchComments(postId: string): Promise<Comment[]> {
      const response = await fetch(
        `${JSONPLACEHOLDER_BASE_URL}${ENDPOINTS.POSTS}/${postId}${ENDPOINTS.COMMENTS}`
      );
      if (!response.ok) throw new Error("Error al obtener comentarios");
      return response.json();
    },

    async fetchUsers(): Promise<User[]> {
      const response = await fetch(
        `${JSONPLACEHOLDER_BASE_URL}${ENDPOINTS.USERS}`
      );
      if (!response.ok) throw new Error("Error al obtener usuarios");
      return response.json();
    },

    async fetchUser(userId: string): Promise<User> {
      const response = await fetch(
        `${JSONPLACEHOLDER_BASE_URL}${ENDPOINTS.USERS}/${userId}`
      );
      if (!response.ok) throw new Error("Error al obtener el usuario");
      return response.json();
    },
  },
};
