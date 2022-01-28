import { useContext } from 'react';
import { Link } from 'react-router-dom';
import AuthContext from '../../Store/Auth-Context';

import classes from './MainNavigation.module.css';

const MainNavigation = () => {
  const AuthCtx = useContext(AuthContext);
  const IsLoggedIn = AuthCtx.isLoggedIn;
  console.log(IsLoggedIn)
  return (
    <header className={classes.header}>
      <Link to='/'>
        <div className={classes.logo}>React Auth</div>
      </Link>
      <nav>
        <ul>
          <li>
            <Link to='/auth'>Login</Link>
          </li>
          {IsLoggedIn&&<li>
            <Link to='/profile'>Profile</Link>
          </li>}
          { IsLoggedIn&&<li>
            <button>Logout</button>
          </li>}
        </ul>
      </nav>
    </header>
  );
};

export default MainNavigation;
