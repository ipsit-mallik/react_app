const API_URL = "https://jsonplaceholder.typicode.com/posts";

export const fetchPosts = async () => {
  const res = await fetch(API_URL);
  return await res.json();
};

export const createPost = async (data) => {
  const res = await fetch(API_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, userId: 1 }),
  });
  return await res.json();
};

export const updatePost = async (id, data) => {
  const res = await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ ...data, userId: 1 }),
  });
  return await res.json();
};

export const deletePost = async (id) => {
  await fetch(`${API_URL}/${id}`, { method: "DELETE" });
};
