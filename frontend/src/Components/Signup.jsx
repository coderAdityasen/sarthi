import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios'; 

function Signup() {
  const [formData, setFormData] = useState({});
  const [avatar, setAvatar] = useState(null); 
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value.trim() });
  };

  const handleAvatarChange = (e) => {
    setAvatar(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.username || !formData.email || !formData.password || !avatar) {
      return console.log('Please fill out all fields.');
    }
    try {
      setLoading(true);
      const formDataWithAvatar = new FormData(); 
      formDataWithAvatar.append('avatar', avatar); 
      formDataWithAvatar.append('username', formData.username);
      formDataWithAvatar.append('fullName', formData.fullName);
      formDataWithAvatar.append('email', formData.email);
      formDataWithAvatar.append('password', formData.password);

      const res = await axios.post('http://localhost:8000/api/v1/users/register', formDataWithAvatar, {
        headers: {
          'Content-Type': 'multipart/form-data', // Set content type to multipart/form-data
        },
      });
      
      if (res.data.success === true) {
		setLoading(false)
        return console.log(res.data.message);
      }
      setLoading(false);
      if (res.status === 200) {
        console.log('send user to profile page');
      }
    } catch (error) {
      setLoading(false);
    }
  };

  return (
    <>
      <div className='min-h-screen mt-20'>
        <div className='flex p-3 max-w-3xl mx-auto flex-col md:flex-row md:items-center gap-5'>
          {/* left */}
          <div className='flex-1'>
            <div className='font-bold dark:text-white text-4xl'>
              <span className='px-2 py-1 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-lg text-white'>
                Saarthi
              </span>
            </div>
          </div>
          {/* right */}
          <div className='flex-1'>
            <form className='flex flex-col gap-4' onSubmit={handleSubmit}>
              <div>
                <label value='Your username' />
                <input
                  type='text'
                  placeholder='Username'
                  id='username'
                  onChange={handleChange}
                />
              </div>
              <div>
                <label value='Full Name' />
                <input
                  type='text'
                  placeholder='Full Name'
                  id='fullName'
                  onChange={handleChange}
                />
              </div>
              <div>
                <label value='Your email' />
                <input
                  type='email'
                  placeholder='name@company.com'
                  id='email'
                  onChange={handleChange}
                />
              </div>
              <div>
                <label value='Your password' />
                <input
                  type='password'
                  placeholder='Password'
                  id='password'
                  onChange={handleChange}
                />
              </div>
              <div>
                <label value='Upload Avatar' />
                <input type='file' accept='image/*' onChange={handleAvatarChange} />
              </div>
              <button className='bg-black text-white' type='submit' disabled={loading}>
                {loading ? <span className='pl-3'>Loading...</span> : 'Sign Up'}
              </button>
            </form>
            <div className='flex gap-2 text-sm mt-5'>
              <span>Have an account?</span>
              <Link to='/sign-in' className='text-blue-500'>
                Sign In
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Signup;
