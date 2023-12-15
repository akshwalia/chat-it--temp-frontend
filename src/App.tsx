// @ts-nocheck

import { useEffect, useState } from 'react';
import './App.css'
import webchat from './assets/webchat.gif'
import { Link } from 'react-router-dom';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function App() {
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [registerLoading, setRegisterLoading] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    let token = localStorage.getItem('auth-token');

    if (!token) {
      setLoading(false);
      return;
    }
    token = `Bearer ${token}`;

    async function checkAuth() {
      try {
        const response = await axios.get('https://chat-it-api.onrender.com/checkAuth', {
          headers: {
            'Authorization': token
          }
        });

        localStorage.setItem('userInfo', JSON.stringify(response.data.user));
        navigate('/main');
      }
      catch(err) {
        console.error(err.response.data);
        setLoading(false);
        localStorage.removeItem('auth-token');
        localStorage.removeItem('userInfo');
      }
    }
    checkAuth();

  }, []);


  const handleSubmit = async (e: any) => {
    e.preventDefault()
    setRegisterLoading(true);
    const name = e.target.name.value;
    const email = e.target.email.value;
    const username = e.target.username.value;
    const password = e.target.password.value;
    const confpassword = e.target.confpassword.value;

    if (password !== confpassword) {
      setError('Password does not match');
      return;
    } else {
      setError('');
    }

    try {
      const response = await axios.post('https://chat-it-api.onrender.com/register',
        {
          name: name,
          email: email,
          username: username,
          password: password
        }
      );

      console.log(response.data);
      setRegisterLoading(false);

      navigate('/login');
    }
    catch(err) {
      if(err.response.data.message === 'Email already exists')
        alert('Email already exists!');
      else if(err.response.data.message === 'Username already exists')
        alert('Username already exists');
      else
        console.error(err.response.message);
    }
  }

  if(loading) {
    return (
      <div className='text-[60px] w-screen h-screen flex flex-col justify-center items-center h-screen'>Loading...</div>
    )
  }

  return (
    <>
      <div className='grid grid-cols-2 items-center'>
        <div className="left flex flex-col items-center justify-center h-screen -translate-y-20">
          <img src={webchat} className='w-[500px]' />
          <h2 className='text-[50px] font-bold'>ChatIt</h2>
        </div>
        <div className="right flex justify-center items-center h-screen">
          <div className="card bg-white w-[550px] h-[600px] rounded-md p-10 flex flex-col justify-center gap-8 -translate-x-8">
            <h1 className='text-4xl'>Register</h1>
            <form className='flex flex-col gap-5' onSubmit={handleSubmit}>
              <input type="name" name="name" id="name" placeholder='Full Name' className='border-solid border-black border-2 px-2 py-[3px]' required />
              <input type="email" name="email" id="email" placeholder='Email' className='border-solid border-black border-2 px-2 py-[3px]' required />
              <input type="text" name='username' id='username' placeholder='Username' className='border-solid border-black border-2 px-2 py-[3px]' required />
              <input type="password" name='password' id='password' placeholder='Password' className='border-solid border-black border-2 px-2 py-[3px]' required />
              <input type="password" name='confpassword' id='confpassword' placeholder='Confirm Password' className='border-solid border-black border-2 px-2 py-[3px]' required />
              {error && <p className='text-red-500 -mt-[20px]'>* {error}</p>}
              <button className='bg-[#3978D3] py-2 text-white hover:bg-[#334d72]'>
                {registerLoading ? <i className="fa-solid fa-spinner animate-spin"></i> : 'REGISTER'}
              </button>
            </form>
            <p className='text-center'>Already have an account? <Link to='/login' className='text-[#3978D3] hover:text-[#334d72]'>Login</Link></p>
          </div>
        </div>
      </div>


    </>
  )
}

export default App
