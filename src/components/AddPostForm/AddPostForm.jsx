import { useState, useEffect } from "react";
import { createPost } from "../../utilities/posts-api";
import { getUser } from "../../utilities/users-service";
import "./AddPostForm.css";

export default function AddPostForm({ onAdd }) {
  const [content, setContent] = useState("");
  const [media, setMedia] = useState([]);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const userData = await getUser();
        setUser(userData);
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    fetchUserData();
  }, []);

  const handleChangeContent = (e) => setContent(e.target.value);
  const handleFileChange = (e) => setMedia(e.target.files);

  
  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    
    formData.append("content", content);
    
    for (let i = 0; i < media.length; i++) {
      formData.append("media", media[i]);
    }

    console.log({len: media.length})
    console.log('FormData:', formData);

    
    // console.log("FormData Keys:", Array.from(formData.keys()));
    // for (let key of formData.keys()) {
    //   console.log(`${key}:`, formData.getAll(key));
    // }

    try {
      const newPost = await createPost(formData);
      await onAdd(newPost, user);
      setContent("");
      setMedia([]);
    } catch (error) {
      console.error("Error adding post:", error);
    }
  };

  return (
    <>
      <h1>Add Post</h1>
      <form
        className="add-post-form"
        onSubmit={handleSubmit}
        encType="multipart/form-data"
      >
        <label>Message:</label>
        <textarea value={content} name="content" onChange={handleChangeContent} required />
        <label>Photos/Videos:</label>
        <input type="file" multiple name="media" onChange={handleFileChange} />
        <button type="submit">Add Post</button>
      </form>
    </>
  );
}
