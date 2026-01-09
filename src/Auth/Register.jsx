import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login } from '../features/auth/authSlice';
import { useNavigate } from 'react-router-dom';

const Register = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleRegister = (e) => {
    e.preventDefault();
  
    const detectedRole = /admin/i.test(name || '') || /admin/i.test(email || '') ? 'ADMIN' : 'USER';
    const user = { name: name || 'No Name', email, password, role: detectedRole };
    try {
      const raw = localStorage.getItem('users');
      const users = raw ? JSON.parse(raw) : [];
    
      const idx = users.findIndex(u => u.email === user.email);
      if (idx >= 0) users[idx] = user;
      else users.push(user);
      localStorage.setItem('users', JSON.stringify(users));
    } catch (e) {
      console.warn('Failed to persist users', e);
    }
    dispatch(login(user));
    if (user.role === 'ADMIN') navigate('/admin/dashboard', { replace: true });
    else navigate('/dashboard', { replace: true });
  };

  return (
    <div className="hero bg-base-200 min-h-screen">
      <div className="hero-content flex-col lg:flex-row-reverse">
        

        <div className="card bg-base-100 w-full max-w-sm shrink-0 shadow-2xl">
           
          <div className="card-body">
             <h1 className="text-3xl  text-center py-2">Register</h1>
            <form onSubmit={handleRegister}>
              <label className="label">Name</label>
              <input value={name} onChange={e => setName(e.target.value)} className="input" placeholder="Full name" />

              <label className="label">Email</label>
              <input value={email} onChange={e => setEmail(e.target.value)} type="email" className="input" placeholder="Email" />

              <label className="label">Password</label>
              <input value={password} onChange={e => setPassword(e.target.value)} type="password" className="input" placeholder="Password" />

             

              <button type="submit" className="btn btn-primary mt-4">Register</button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
