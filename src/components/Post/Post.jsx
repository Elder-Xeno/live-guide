import './Post.css';

export default function Post({ post }) {
  
    return (
      <div className='post-container'>
      <div className="post">
        {post.media && post.media.length > 0 && (
          <div>
            {post.media.map((mediaUrl, index) => (
              <img key={index} src={mediaUrl} alt={`Media ${index}`} />
            ))}
          </div>
        )}
        <p className='caption'>{post.content}</p>
      </div>
        <p className='posted-by'>Posted by: {post.user.name}</p>
      </div>
    );
  }
  