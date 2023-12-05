import React from 'react';


const Blog = ({ posts }) => {
  return (
    <div>
      <h1>Forairy Stories</h1>

      <form method="get" action="/search-results">
        <label htmlFor="search">Search:</label>
        <input type="text" id="search" name="q" placeholder="Search..." />
        <button type="submit">Go</button>
      </form>


      <div className="blog-container">
        <div className="post-carousel">


          {posts.map((post) => (
            <div key={post.id} className="post-card">
              <h2>{post.title}</h2>
              <p>{post.author}</p>
              <p>{post.date_posted}</p>
              <p>{post.content}</p>

              <h3>Comments:</h3>
              <ul className="comment-container">
                {post.comments.map((comment) => (
                  <li key={comment.id}>
                    <strong>{comment.author}:</strong> {comment.content}
                  </li>
                ))}
              </ul>

              {/* Comment Form */}
              <form method="post" action={`/create-comment/${post.id}`}>
                <input type="hidden" value={csrf_token} />
                <label>
                  <input type="text" name="content" placeholder="Leave a comment" />
                </label>
                <button type="submit">Add Comment</button>
              </form>
            </div>
          ))}
          {/* IF WE CANNOT FIND ANY Diary entries */}
          {posts.length === 0 && <p>No diaries yet.</p>}
        </div>
      </div>

      {/* Link to make a diary post */}
      <a href="/post-create" className="create_btn">
        Create a New Diary Entry
      </a>
    </div>
  );
};

export default Blog;
