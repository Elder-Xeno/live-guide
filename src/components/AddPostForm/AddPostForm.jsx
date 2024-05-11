import { useState, useEffect } from 'react';
import { getUser } from '../../utilities/users-service';
import { createPost } from '../../utilities/posts-api';
import './AddPostForm.css';

export default function AddPostForm({ onAdd }) {
    const [content, setContent] = useState('');
    const [media, setMedia] = useState([]);
    const [user, setUser] = useState(null);

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const userData = await getUser();
                setUser(userData);
            } catch (error) {
                console.error('Error fetching user data:', error);
            }
        };

        fetchUserData();
    }, []);

    const handleChangeContent = (e) => setContent(e.target.value);
    const handleChangeMedia = (e) => setMedia([...media, e.target.value]);
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const postData = { content, media, user };
            const newPost = await createPost(postData);
            await onAdd(newPost, user); // pass user along with new post
            setContent('');
            setMedia([]);
        } catch (error) {
            console.error('Error adding post:', error);
        }
    };

    return (
        <>
        <h1>Add Post</h1>
        <form className="add-post-form" onSubmit={handleSubmit}>
            <label>Message:</label>
            <textarea value={content} onChange={handleChangeContent} required />
            <label>Photos/Videos:</label>
            <textarea value={media} onChange={handleChangeMedia} />
            <button type="submit">Add Post</button>
        </form>
        </>
    );
}

