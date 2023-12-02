import classes from './comment-list.module.css';
import Comment from './comment-item';
import { useEffect, useState } from 'react';
function CommentList({ event }) {
  const [comments, setComments] = useState()
  useEffect(() => {
    (async () => {
      const res = await fetch('/api/comments/' + event)
      const { comments: fetchedComments } = await res.json()
      console.log(fetchedComments)
      setComments(fetchedComments)
    })()
  }, [])
  return (
    <ul className={classes.comments}>
      {!comments && <p>loading...</p>}
      {comments && comments.map(com => <li key={com.event}>
        <Comment comment={com} />
      </li>)}
    </ul>
  );
}

export default CommentList;
