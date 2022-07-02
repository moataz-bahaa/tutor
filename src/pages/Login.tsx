import { motion } from 'framer-motion';

import React, { useState } from 'react';

interface LoginProps {}

const Login: React.FC<LoginProps> = (props) => {
  const [user, setUser] = useState({ name: '', password: '' });
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    // console.log(user);
  };
  return (
    <div className='login'>
      <motion.div
        initial={{ opacity: 0, y: '-100vh' }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6, type: 'spring', stiffness: 200 }}
        className='form-container'
      >
        <div className='form-title my-5'>سجل الدخول</div>
        <form className='form' action='' onSubmit={handleSubmit}>
          <input
            type='text'
            name='username'
            id='username'
            placeholder='اسم المستخدم'
            onChange={(e) => {
              setUser((value) => {
                return {
                  ...value,
                  name: e.target.value,
                };
              });
            }}
          />
          <input
            type='password'
            name='password'
            id='password'
            placeholder='كلمة السر'
            onChange={(e) => {
              setUser((value) => {
                return {
                  ...value,
                  password: e.target.value,
                };
              });
            }}
          />
          <button type='submit'>تسجيل الدخول</button>
        </form>
        <div className='form-footer'>تسجيل الدخول</div>
      </motion.div>
    </div>
  );
};

export default Login;
