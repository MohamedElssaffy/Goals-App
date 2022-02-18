import React, { Fragment } from 'react';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { FaUser } from 'react-icons/fa';
import { toast } from 'react-toastify';
import { reset, register } from '../features/auth/authSlice';
import Spinner from '../components/Spinner';

function Register() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: '',
  });

  const { name, email, password, password2 } = formData;

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      toast.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, message, isError, isSuccess, dispatch, navigate]);

  const onChangeHandler = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    if (password !== password2) {
      toast.error('Passwords not match');
    } else {
      dispatch(register({ name, email, password }));
    }
  };

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <Fragment>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please Create an account</p>
      </section>
      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input
              className='form-control'
              type='text'
              name='name'
              id='name'
              value={name}
              placeholder='Enter your name'
              onChange={onChangeHandler}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='email'
              name='email'
              id='email'
              value={email}
              placeholder='Enter your email'
              onChange={onChangeHandler}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              name='password'
              id='password'
              value={password}
              placeholder='Enter your password'
              onChange={onChangeHandler}
            />
          </div>
          <div className='form-group'>
            <input
              className='form-control'
              type='password'
              name='password2'
              id='password2'
              value={password2}
              placeholder='Confirm password'
              onChange={onChangeHandler}
            />
          </div>
          <div className='form-group'>
            <button type='submit' className='btn btn-block'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </Fragment>
  );
}

export default Register;
