import classes from './newsletter-registration.module.css';
import { useRef } from 'react';
import { useContext } from 'react';
import context from '@/store/events-context';
function NewsletterRegistration() {
  const mail = useRef()
  const { appear, disappear } = useContext(context)
  async function registrationHandler(event) {
    event.preventDefault();
    appear('Pending', 'pending', 'Loading...')
    const userMail = mail.current.value
    const res = await fetch('/api/auth/user', {
      method: "POST",
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        user: userMail
      })
    })
    const response = await res.json()
    appear(response.title, response.status, response.message)
  }

  return (
    <section className={classes.newsletter}>
      <h2>Sign up to stay updated!</h2>
      <form onSubmit={registrationHandler}>
        <div className={classes.control}>
          <input
            type='email'
            id='email'
            placeholder='Your email'
            aria-label='Your email'
            ref={mail}
          />
          <button>Register</button>
        </div>
      </form>
    </section>
  );
}

export default NewsletterRegistration;
