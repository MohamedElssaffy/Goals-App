import React, { Fragment } from 'react';
import { FaUser, FaSignInAlt, FaSignOutAlt } from 'react-icons/fa';
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from 'react-router-dom';

import { logout, reset } from '../features/auth/authSlice';

function Header() {
  const { user } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logoutHandler = () => {
    dispatch(logout());
    dispatch(reset());
    navigate('/login');
  };
  return (
    <header className='header'>
      <div className='logo'>
        <Link to={'/'}>GoalSetter</Link>
      </div>
      <ul>
        {user ? (
          <li>
            <button className='btn' onClick={logoutHandler}>
              <FaSignOutAlt /> Logout
            </button>
          </li>
        ) : (
          <Fragment>
            {' '}
            <li>
              <Link to={'/login'}>
                <FaSignInAlt /> Login
              </Link>
            </li>
            <li>
              <Link to={'/register'}>
                <FaUser /> Register
              </Link>
            </li>
          </Fragment>
        )}
      </ul>
    </header>
  );
}

export default Header;
