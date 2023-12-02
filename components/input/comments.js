import { useState } from 'react';
import CommentList from './comment-list';
import NewComment from './new-comment';
import classes from './comments.module.css';
import { useContext } from 'react';
import Context from '@/store/events-context';

function Comments(props) {
  const { eventId } = props;
  const { appear } = useContext(Context)
  const [showComments, setShowComments] = useState(false);

  function toggleCommentsHandler() {
    setShowComments((prevStatus) => !prevStatus);
  }

  async function addCommentHandler(commentData) {
    const {
      email,
      name,
      text,
    } = commentData
    appear('Pending', 'pending', 'Loading...')
    const res = await fetch('/api/comments/' + eventId, {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        email,
        name,
        text
      })
    })
    const response = await res.json()
    appear(response.title, response.status, response.message)
  }

  return (
    <section className={classes.comments}>
      <button onClick={toggleCommentsHandler}>
        {showComments ? 'Hide' : 'Show'} Comments
      </button>
      {showComments && <NewComment onAddComment={addCommentHandler} />}
      {showComments && <CommentList event={eventId} />}
    </section>
  );
}

export default Comments;
