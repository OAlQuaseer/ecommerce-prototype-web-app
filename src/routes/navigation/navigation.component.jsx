import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from './../../assets/crown.svg';
import { UserContext } from './../../contexts/user.context';
import './navigation.styles.scss';
import { signOutCurrentUser } from './../../utils/firebase/firebase.utils';

const Navigation = () => {
  const { currentUser, setCurrentUser } = useContext(UserContext);

  const onSignOutLinkClick = async () => {
    const response = await signOutCurrentUser();
    console.log(response);
    setCurrentUser(null);
  }
  return (
    <Fragment>
      <div className='navigation'>
        <Link className='logo-container' to='/'>
          <CrwnLogo className='logo' />
        </Link>
        <div className='nav-links-container'>
          <Link className='nav-link' to='/shop'>
            SHOP
          </Link>
          {currentUser ? (<span className='nav-link' onClick={onSignOutLinkClick}>
            SIGN OUT
          </span>) : (<Link className='nav-link' to='/auth'>
            SIGN IN
          </Link>)}

        </div>
      </div>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;