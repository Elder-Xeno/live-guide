import { useState } from 'react';
import { deletePost } from '../../utilities/posts-api';
import './Post.css';

export default function Post({ post, onDelete, user }) {
  const [modalMedia, setModalMedia] = useState(null);

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
          <button onClick={handleDelete} className="delete-button">Delete</button>
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
    </div>
  );
}
