import React, { useState } from 'react';

const SignUpPage = ({ setUser }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    try {
      const response = await fetch('http://localhost:3000/api/auth/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      
      const data = await response.json();
      
      if (data.success) {
        console.log('User signed up:', data.user);
        setUser(data.user);
        localStorage.setItem('token', data.token);
        window.location.href = '/'; // Navigate to home
      } else {
        alert(data.message || 'Signup failed');
      }
    } catch (error) {
      console.error('Signup error:', error);
      alert('Connection error. Please try again.');
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div style={{ 
      minHeight: '100vh', 
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '2rem'
    }}>
      <div style={{ 
        fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
        backgroundColor: 'rgba(79, 169, 128, 0.397)',
        width: '400px',
        padding: '30px',
        borderRadius: '5%',
        boxShadow: '0 8px 16px rgba(94, 28, 208, 0.2)',
        border: 'solid rgba(236, 232, 226, 0.732) 5px'
      }}>
        <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
          <h1 style={{ 
            color: '#4a5c3a', 
            fontSize: '2rem', 
            marginBottom: '0.5rem',
            fontWeight: 'bold'
          }}>
            🍃 Join the Tea Community
          </h1>
          <p style={{ color: '#333', margin: 0 }}>Create your account to start exploring</p>
        </div>

        <div className="form-group">
          <label style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <span style={{
              backgroundColor: 'rgba(203, 221, 205, 0.689)',
              borderRadius: '10%',
              padding: '3px',
              boxShadow: '1px 1px 3px rgb(248, 250, 248)'
            }}>
              Username:
            </span>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              style={{
                borderRadius: '10px',
                padding: '3px',
                textAlign: 'center',
                border: '1px solid #ddd',
                width: '60%'
              }}
            />
          </label>
        </div>
        
        <div className="form-group">
          <label style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <span style={{
              backgroundColor: 'rgba(203, 221, 205, 0.689)',
              borderRadius: '10%',
              padding: '3px',
              boxShadow: '1px 1px 3px rgb(248, 250, 248)'
            }}>
              Email:
            </span>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              style={{
                borderRadius: '10px',
                padding: '3px',
                textAlign: 'center',
                border: '1px solid #ddd',
                width: '60%'
              }}
            />
          </label>
        </div>
        
        <div className="form-group">
          <label style={{
            display: 'flex',
            width: '100%',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '15px'
          }}>
            <span style={{
              backgroundColor: 'rgba(203, 221, 205, 0.689)',
              borderRadius: '10%',
              padding: '3px',
              boxShadow: '1px 1px 3px rgb(248, 250, 248)'
            }}>
              Password:
            </span>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              required
              style={{
                borderRadius: '10px',
                padding: '3px',
                textAlign: 'center',
                border: '1px solid #ddd',
                width: '60%'
              }}
            />
          </label>
        </div>
        
        <button 
          onClick={handleSubmit} 
          className="btn btn-primary" 
          style={{
            fontFamily: "'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif",
            fontSize: 'large',
            borderRadius: '5px',
            padding: '10px 20px',
            width: '100%',
            marginTop: '20px',
            backgroundColor: '#4a5c3a',
            color: 'white',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          Spill your details!
        </button>
        
        <p style={{textAlign: 'center', marginTop: '1.5rem', color: '#333'}}>
          Already have an account?{' '}
          <a 
            href="/signin"
            style={{
              color: '#4a5c3a', 
              textDecoration: 'none',
              fontWeight: 'bold'
            }}
          >
            Sign In
          </a>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;