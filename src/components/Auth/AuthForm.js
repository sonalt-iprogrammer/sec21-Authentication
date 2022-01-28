import { useContext, useRef, useState } from 'react'
import AuthContext from '../../Store/Auth-Context'

import classes from './AuthForm.module.css'
 

const AuthForm = () => {
 const AuthCtx= useContext(AuthContext);
  const [isLogin, setIsLogin] = useState(true)
  const emailInputRef = useRef()
  const passwordInputRef = useRef()

  const switchAuthModeHandler = () => {
    setIsLogin((prevState) => !prevState)
  }

  const submithandler = (event) => {
    event.preventDefault();
    const enterdemail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    let url='';
    if (isLogin) {
      url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyC28oiI52_jsC1KmYan_6ixoALUZnJnJfw'
    } else {
   url =
        'https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=AIzaSyC28oiI52_jsC1KmYan_6ixoALUZnJnJfw'
    }


    fetch(url, {
      method: 'POST',
      body: JSON.stringify({
        email: enterdemail,
        password: enteredPassword,
        returnSecureToken: true,
      }),
      headers: {
        'Content-Type': 'application/json',
      }
    }).then((res) => {
        if (res.ok) {
          return res.json();
        //  console.log(res.json());
        } else {
          return res.json()
        }
      }).then((data) => {
       AuthCtx.login(data.idToken);
      })
      
  }

  return (
    <section className={classes.auth}>
      <h1>{isLogin ? 'Login' : 'Sign Up'}</h1>
      <form onSubmit={submithandler}>
        <div className={classes.control}>
          <label htmlFor="email">Your Email</label>
          <input type="email" id="email" required ref={emailInputRef} />
        </div>
        <div className={classes.control}>
          <label htmlFor="password">Your Password</label>
          <input
            type="password"
            id="password"
            required
            ref={passwordInputRef}
          />
        </div>
        <div className={classes.actions}>
          <button>{isLogin ? 'Login' : 'Create Account'}</button>
          <button
            type="button"
            className={classes.toggle}
            onClick={switchAuthModeHandler}
          >
            {isLogin ? 'Create new account' : 'Login with existing account'}
          </button>
        </div>
      </form>
    </section>
  )
}

export default AuthForm



