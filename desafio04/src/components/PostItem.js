import React from 'react';

function PostHeader({ author, date }) {
  return (
    <div className="postheader">
      <img className="avatar" src={author.avatar} alt="avatar" />
      <div className="details">
        <span>{author.name}</span>
        <span>{date}</span>
      </div>
    </div>
  );
}

function PostComments({ comments }) {
  return (
    <div className="postcomments">
      <div className="divider" />
      {comments.map(comment => (
        <div className="comment" key={comment.id}>
          <img className="avatar" src={comment.author.avatar} alt="avatar" />
          <p>
            <span>{comment.author.name}</span>
            {comment.content}
          </p>
        </div>
      ))}
    </div>
  );
}

function PostItem({ author, date, content, comments }) {
  return (
    <div className="post">
      <PostHeader author={author} date={date} />
      <p className="postcontent">{content}</p>
      <PostComments comments={comments} />
    </div>
  );
}

export default PostItem;
