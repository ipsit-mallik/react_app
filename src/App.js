import { useState, useEffect } from 'react';
import './App.css';

const API_URL = "https://jsonplaceholder.typicode.com/posts";

const App = () => {
  const [posts, setPosts] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({ id: "", title: "", body: "" });

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await fetch(API_URL);
        const data = await response.json();
        setPosts(data);
      } catch (error) {
        console.error("Failed to fetch posts:", error);
      }
    };

    fetchPosts();
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (modalType === "create") {
      const res = await fetch(API_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          userId: 1,
        }),
      });
      const newPost = await res.json();
      setPosts((prev) => [newPost, ...prev]);
    } else if (modalType === "update") {
      const res = await fetch(`${API_URL}/${formData.id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          title: formData.title,
          body: formData.body,
          userId: 1,
        }),
      });
      const updatedPost = await res.json();
      setPosts((prev) =>
        prev.map((p) => (p.id === Number(formData.id) ? updatedPost : p))
      );
    } else if (modalType === "delete") {
      await fetch(`${API_URL}/${formData.id}`, { method: "DELETE" });
      setPosts((prev) => prev.filter((p) => p.id !== Number(formData.id)));
    }
    setFormData({ id: "", title: "", body: "" });
    setModalType(null);
  };

  return (
    <div
      style={{
        fontFamily: "Arial",
        padding: "20px",
        maxWidth: "800px",
        margin: "auto",
      }}
    >
      {/* Nav Bar */}
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          gap: "10px",
          marginBottom: "20px",
        }}
      >
        <button onClick={() => setModalType("create")}>Create</button>
        <button onClick={() => setModalType("update")}>Update</button>
        <button onClick={() => setModalType("delete")}>Delete</button>
      </div>

      {/* Modal */}
      {modalType && (
        <div
          style={{
            background: "#f0f0f0",
            padding: "20px",
            border: "1px solid #ccc",
            marginBottom: "20px",
          }}
        >
          <h3>{modalType.toUpperCase()} Post</h3>
          <form
            onSubmit={handleSubmit}
            style={{ display: "flex", flexDirection: "column", gap: "10px" }}
          >
            {(modalType === "update" || modalType === "delete") && (
              <input
                name="id"
                placeholder="ID"
                value={formData.id}
                onChange={handleInputChange}
                required
              />
            )}
            {(modalType === "create" || modalType === "update") && (
              <>
                <input
                  name="title"
                  placeholder="Title"
                  value={formData.title}
                  onChange={handleInputChange}
                  required
                />
                <textarea
                  name="body"
                  placeholder="Body"
                  value={formData.body}
                  onChange={handleInputChange}
                  required
                />
              </>
            )}
            <button type="submit">Submit</button>
            <button type="button" onClick={() => setModalType(null)}>
              Cancel
            </button>
          </form>
        </div>
      )}

      {/* Posts Display */}
      <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
        {posts.map((post) => (
          <div
            key={post.id}
            style={{
              border: "1px solid #ddd",
              padding: "10px",
              borderRadius: "5px",
            }}
          >
            <strong>{post.id}</strong>
            <br />
            <strong>{post.title}</strong>
            <p>{post.body}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default App;
