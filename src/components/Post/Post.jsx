import './Post.css';

export default function Post({ post }) {
    return (
      <div className="post">
        <p>{post.content}</p>
        {post.media && post.media.length > 0 && (
          <div>
            <p>Media:</p>
            {post.media.map((mediaUrl, index) => (
              <img key={index} src={mediaUrl} alt={`Media ${index}`} />
            ))}
          </div>
        )}
        <p>Posted by: {post.user.name}</p>
      </div>
    );
  }
  