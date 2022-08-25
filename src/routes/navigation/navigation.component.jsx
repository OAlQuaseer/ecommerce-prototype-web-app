import { Fragment, useContext } from 'react';
import { Outlet, Link } from 'react-router-dom';

import { ReactComponent as CrwnLogo } from './../../assets/crown.svg';
import { UserContext } from './../../contexts/user.context';
import { NavigationContainer, LogoContainer, NavLinksContainer, NavLink } from './navigation.styles.jsx';
import { signOutCurrentUser } from './../../utils/firebase/firebase.utils';

import { CartContext } from '../../contexts/cart.context';

import CartIcon from '../../components/cart-icon/cart-icon.component';
import CartDropdown from '../../components/cart-dropdown/cart-dropdown.component';

const Navigation = () => {
  const { currentUser } = useContext(UserContext);
  const { isCartOpen } = useContext(CartContext);

  const onSignOutLinkClick = async () => {
    await signOutCurrentUser();
  }
  return (
    <Fragment>
      <NavigationContainer>

        <LogoContainer to='/'>
          <CrwnLogo className='logo' />
        </LogoContainer>
        
        <NavLinksContainer>
          <NavLink to='/shop'>
            SHOP
          </NavLink>
          {currentUser ? (<NavLink as='span' onClick={onSignOutLinkClick}>
            SIGN OUT
          </NavLink>) : (<NavLink to='/auth'>
            SIGN IN
          </NavLink>)}
          <CartIcon />
        </NavLinksContainer>
        {isCartOpen && <CartDropdown />}
      </NavigationContainer>
      <Outlet />
    </Fragment>
  );
};

export default Navigation;