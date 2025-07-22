import { useState, useEffect } from "react";
import { fetchPosts, createPost, updatePost, deletePost } from "../util/crud.helper";
import { useNavigate } from "react-router-dom";

const Crud = () => {
  const [posts, setPosts] = useState([]);
  const [modalType, setModalType] = useState(null);
  const [formData, setFormData] = useState({ id: "", title: "", body: "" });
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts()
      .then(setPosts)
      .catch((err) => console.error("Failed to fetch posts:", err));
  }, []);

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (modalType === "create") {
        const newPost = await createPost(formData);
        setPosts((prev) => [newPost, ...prev]);
      } else if (modalType === "update") {
        const updatedPost = await updatePost(formData.id, formData);
        setPosts((prev) =>
          prev.map((p) => (p.id === Number(formData.id) ? updatedPost : p))
        );
      } else if (modalType === "delete") {
        await deletePost(formData.id);
        setPosts((prev) => prev.filter((p) => p.id !== Number(formData.id)));
      }

      setFormData({ id: "", title: "", body: "" });
      setModalType(null);
    } catch (error) {
      console.error("Error in CRUD operation:", error);
    }
  };

  return (
    <div className="vh-100 d-flex flex-column">
      {/* Sticky Nav Bar */}
      <div className="bg-light border-bottom py-3 px-4 position-sticky top-0 z-3" style={{ height: '56px' }}>
        <div className="d-flex justify-content-center gap-3 align-items-center h-100">
          <button className="btn btn-secondary" onClick={() => navigate("/")}>Back to Home</button>
          <button className="btn btn-success" onClick={() => setModalType("create")}>Create</button>
          <button className="btn btn-warning" onClick={() => setModalType("update")}>Update</button>
          <button className="btn btn-danger" onClick={() => setModalType("delete")}>Delete</button>
        </div>
      </div>

      {/* Scrollable content area */}
      <div
        className="flex-grow-1 overflow-auto bg-body-tertiary"
        style={{ minHeight: 0 }}
      >
        {/* Centered container for form + posts */}
        <div className="container py-4">
          {/* Sticky form inside container */}
          {modalType && (
            <div
              className="bg-white shadow-sm p-4 border rounded mb-4"
              style={{ position: "sticky", top: 0, zIndex: 10 }}
            >
              <h4 className="mb-3">{modalType.toUpperCase()} Post</h4>
              <form onSubmit={handleSubmit}>
                {(modalType === "update" || modalType === "delete") && (
                  <div className="mb-3">
                    <input
                      name="id"
                      className="form-control"
                      placeholder="ID"
                      value={formData.id}
                      onChange={handleInputChange}
                      required
                    />
                  </div>
                )}
                {(modalType === "create" || modalType === "update") && (
                  <>
                    <div className="mb-3">
                      <input
                        name="title"
                        className="form-control"
                        placeholder="Title"
                        value={formData.title}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div className="mb-3">
                      <textarea
                        name="body"
                        className="form-control"
                        placeholder="Body"
                        value={formData.body}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </>
                )}
                <div className="d-flex justify-content-between">
                  <button type="submit" className="btn btn-primary">Submit</button>
                  <button type="button" className="btn btn-outline-secondary" onClick={() => setModalType(null)}>Cancel</button>
                </div>
              </form>
            </div>
          )}

          {/* Posts list */}
          <div className="row row-cols-1 row-cols-md-2 g-4">
            {posts.map((post) => (
              <div className="col" key={post.id}>
                <div className="card h-100">
                  <div className="card-body">
                    <h5 className="card-subtitle mb-2 text-muted">ID: {post.id}</h5>
                    <h6 className="card-title">{post.title}</h6>
                    <p className="card-text">{post.body}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

};

export default Crud;
