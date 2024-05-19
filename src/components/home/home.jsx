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
        "http://localhost:1337/api/posts?populate=*&sort=createdAt:desc&pagination[pageSize]=30",
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
        body: JSON.stringify({
          data: { text: newPostText, author: user.id },
        }),
      });
      console.log("response", response);
      if (!response.ok) {
        throw new Error("Failed to submit post");
      }
      fetchPosts();
      setNewPostText("");
    } catch (error) {
      console.error("Error submitting post:", error);
    }
  };

  const handleLike = async (postId) => {
    try {
      const post = posts.find((post) => post.id === postId);
      const userLiked = post.attributes.users_likes.data.some(
        (likeUser) => likeUser.id === user.id,
      );
      const updatedLikes = userLiked
        ? post.attributes.users_likes.data.filter(
            (likeUser) => likeUser.id !== user.id,
          )
        : [...post.attributes.users_likes.data, user];
      const updatedLikesCount = userLiked
        ? post.attributes.like - 1
        : post.attributes.like + 1;
      const token = Cookies.get("token");
      const response = await fetch(
        `http://localhost:1337/api/posts/${postId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({
            data: {
              like: updatedLikesCount,
              users_likes: updatedLikes.map((likeUser) => likeUser.id),
            },
          }),
        },
      );
      if (!response.ok) {
        throw new Error("Failed to like post");
      }
      fetchPosts();
    } catch (error) {
      console.error("Error liking post:", error);
    }
  };

  return (
    <div className="main-post">
      {user.id ? (
        <>
          <h2>Posts</h2>
          <form onSubmit={handleSubmit}>
            <input
              type="text"
              name="text"
              value={newPostText}
              onChange={(e) => setNewPostText(e.target.value)}
            />
            <button type="submit">Create Post</button>
          </form>
        </>
      ) : (
        <h2>Log in to create posts</h2>
      )}
      ;
      <div className="post-container">
        {posts.map((post) => (
          <div className="post" key={post.id}>
            <p>{post.attributes.text}</p>
            <div className="like">
              <button onClick={() => handleLike(post.id)}>
                {post.attributes.users_likes.data.some(
                  (likeUser) => likeUser.id === user.id,
                )
                  ? "Unlike"
                  : "Like"}
              </button>
              <p>{post.attributes.like}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
