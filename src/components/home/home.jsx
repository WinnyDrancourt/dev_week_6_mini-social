import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Cookies from "js-cookie";

export default function Home() {
  const user = useSelector((state) => state.profile.user);
  const [posts, setPosts] = useState([]);
  const [newPostText, setNewPostText] = useState("");

  const fetchPosts = async () => {
    try {
      const response = await fetch(
        "http://localhost:1337/api/posts?sort=createdAt:desc",
      );
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const data = await response.json();
      setPosts(data.data);
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      console.log("newPostText", newPostText, "user", user);
      const token = Cookies.get("token");
      const response = await fetch("http://localhost:1337/api/posts", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ data: { text: newPostText, author: user.id } }),
      });
      if (!response.ok) {
        throw new Error("Failed to submit post");
      }
      fetchPosts();
      setNewPostText("");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  return (
    <div>
      <h2>Posts</h2>
      {posts.map((post) => (
        <div key={post.id}>
          <h3>{post.id}</h3>
          <p>{post.attributes.text}</p>
        </div>
      ))}
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          name="text"
          value={newPostText}
          onChange={(e) => setNewPostText(e.target.value)}
        />
        <button type="submit">Create Post</button>
      </form>
    </div>
  );
}
