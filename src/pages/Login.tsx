import { motion } from 'framer-motion';
import { useAppDispatch, useAppSelector } from '../app/hooks';
import React, { useState } from 'react';
import { login } from '../features/admin/adminActions';
import Alert from '../components/Alert';
import { useNavigate } from 'react-router-dom';

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [user, setUser] = useState({ username: '', password: '' });
  const { isLoggedIn, error, loading } = useAppSelector((state) => {
    return {
      isLoggedIn: state.admin.isLoggedIn,
      loading: state.admin.loading,
      error: state.admin.error,
    };
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setUser((prev) => {
      return {
        ...prev,
        [e.target.name]: e.target.value,
      };
    });
  };
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(login(user));
  };

  if (isLoggedIn) {
    navigate('/');
  }

  return (
    <div className='login'>
      <motion.div
        initial={{ opacity: 0, y: '-100vh' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        className='form-container'
      >
        <div className='form-title my-5'>سجل الدخول</div>
        {error && <Alert message={error} variant='danger' />}
        <form className='form' action='' onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='اسم المستخدم'
            onChange={handleChange}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='كلمة السر'
            onChange={handleChange}
          />
          <button type='submit' disabled={loading}>
            {loading ? 'جارى التحميل...' : 'تسجيل الدخول'}
          </button>
        </form>
        <div className='form-footer'>تسجيل الدخول</div>
      </motion.div>
    </div>
  );
};

export default Login;
