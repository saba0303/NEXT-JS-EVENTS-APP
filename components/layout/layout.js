import { Fragment } from 'react';
import Notification from '../ui/notification';
import MainHeader from './main-header';
import { useContext } from 'react';
import Context from '@/store/events-context';
function Layout(props) {
  const { state } = useContext(Context)
  const { visibility, status, title, message } = state
  return (
    <Fragment>
      <MainHeader />
      <main>{props.children}</main>
      {visibility && <Notification status={status} title={title} message={message} />}
    </Fragment>
  );
}

export default Layout;
