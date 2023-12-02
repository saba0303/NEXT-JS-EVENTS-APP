import { useContext, useEffect } from 'react';
import context from '@/store/events-context';
import classes from './notification.module.css';


function Notification(props) {
  const { state, disappear } = useContext(context)
  useEffect(() => {
    if (state.status !== 'pending') {
      setTimeout(() => {
        disappear()
      }, 1200)
    }
  }, [state.status])
  const { title, message, status } = props;

  let statusClasses = '';

  if (status === 'success') {
    statusClasses = classes.success;
  }

  if (status === 'error') {
    statusClasses = classes.error;
  }

  if (status === 'pending') {
    statusClasses = classes.pending;
  }

  const activeClasses = `${classes.notification} ${statusClasses}`;

  return (
    <div className={activeClasses}  >
      <h2>{title}</h2>
      <p>{message}</p>
    </div>
  );
}

export default Notification;
