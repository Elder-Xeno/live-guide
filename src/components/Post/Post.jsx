import { useState } from 'react';
import { deletePost, updatePost  } from '../../utilities/posts-api';
import './Post.css';

export default function Post({ post, onDelete, onUpdate, user }) {
  const [modalMedia, setModalMedia] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(post.content);
  const [existingMedia, setExistingMedia] = useState(post.media);
  const [newMedia, setNewMedia] = useState([]);

  const handleMediaClick = (mediaUrl, isVideo) => {
    setModalMedia({ url: mediaUrl, isVideo });
  };

  const closeModal = () => {
    setModalMedia(null);
  };

  const handleDelete = async () => {
    try {
      await deletePost(post._id);
      onDelete(post._id);
    } catch (error) {
      console.error("Error deleting post:", error);
    }
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async () => {
    const formData = new FormData();
    formData.append('content', editedContent);
    formData.append('existingMedia', JSON.stringify(existingMedia));

    for (let i = 0; i < newMedia.length; i++) {
      formData.append('media', newMedia[i]);
    }

    try {
      const updatedPost = await updatePost(post._id, formData);
      onUpdate(updatedPost);
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating post:', error);
    }
  };

  const handleFileChange = (e) => {
    setNewMedia(e.target.files);
  };

  const handleRemoveMedia = (index) => {
    setExistingMedia(existingMedia.filter((_, i) => i !== index));
  };

  return (
    <div className='post-container'>
      <div className="post">
        {post.media && post.media.length > 0 && (
          <div>
            {post.media.map((mediaUrl, index) => {
              const isVideo = mediaUrl.match(/\.(mp4|webm|ogg)$/i);
              return isVideo ? (
                <div key={index} className="video-thumbnail" onClick={() => handleMediaClick(mediaUrl, true)}>
                  <video src={mediaUrl} className="media" />
                  <div className="play-button">&#9658;</div>
                </div>
              ) : (
                <img key={index} src={mediaUrl} alt={`Media ${index}`} className="media" onClick={() => handleMediaClick(mediaUrl, false)} />
              );
            })}
          </div>
        )}
        <p className='caption'>{post.content}</p>
        {user && post.user._id === user._id && (
          <>
            <button onClick={handleEdit} className="edit-button">Edit</button>
            <button onClick={handleDelete} className="delete-button">Delete</button>
          </>
        )}
      </div>
      <p className='posted-by'>Posted by: {post.user.name}</p>

      {modalMedia && (
        <div className="modal" onClick={closeModal}>
          <div className="modal-content" onClick={e => e.stopPropagation()}>
            <span className="close-button" onClick={closeModal}>&times;</span>
            {modalMedia.isVideo ? (
              <video src={modalMedia.url} controls className="modal-media" />
            ) : (
              <img src={modalMedia.url} alt="Media" className="modal-media" />
            )}
          </div>
        </div>
      )}

      {isEditing && (
        <div className="edit-modal">
          <textarea value={editedContent} onChange={(e) => setEditedContent(e.target.value)} />
          <input type="file" multiple onChange={handleFileChange} />
          <div>
            {existingMedia.map((mediaUrl, index) => (
              <div key={index}>
                <span>{mediaUrl}</span>
                <button onClick={() => handleRemoveMedia(index)}>Remove</button>
              </div>
            ))}
          </div>
          <button onClick={handleSave} className="save-button">Save</button>
          <button onClick={() => setIsEditing(false)} className="cancel-button">Cancel</button>
        </div>
      )}
    </div>
  );
}