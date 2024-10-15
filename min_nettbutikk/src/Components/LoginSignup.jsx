import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../Css/LoginSignup.css';

function LoginSignup({ setIsLoggedIn }) {
  const [action, setAction] = useState('Lag bruker');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [feedback, setFeedback] = useState('');
  const navigate = useNavigate();

  // Handle login logic
  const handleLogin = async () => {
    try {
      const response = await fetch('http://localhost:5000/min-side', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
      });

      if (response.ok) {
        const data = await response.text();
        console.log(data);

        localStorage.setItem('loggedIn', 'true');
        localStorage.setItem('userEmail', email);

        setIsLoggedIn(true);
        navigate('/min-side-innlogget');
      } else {
        const errorMessage = await response.text();
        setFeedback(errorMessage);
      }
    } catch (error) {
      console.error('Error under innlogging:', error);
      setFeedback('Intern serverfeil');
    }
  };


  const handleRegister = async () => {
    try {
      const response = await fetch('http://localhost:5000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password })
      });

      if (response.ok) {
        setFeedback('Bruker opprettet! Du kan nå logge inn.');
        setAction('Logg inn'); 
      } else {
        const errorMessage = await response.text();
        setFeedback(errorMessage);
      }
    } catch (error) {
      console.error('Error under registrering:', error);
      setFeedback('Intern serverfeil');
    }
  };

  
  const handleSubmit = () => {
    if (action === 'Lag bruker') {
      handleRegister();
    } else if (action === 'Logg inn') {
      handleLogin();
    }
  };

  return (
    <div className='container'>
      <div className='header'>
        <div className='text'>{action === 'Lag bruker' ? 'Lag bruker' : 'Logg inn'}</div>
      </div>

      <div className='inputs'>
        {action === 'Lag bruker' && (
          <div className="input">
            <input
              type='text'
              placeholder='Navn'
              name="inputName"
              value={name}
              onChange={e => setName(e.target.value)}
            />
          </div>
        )}

        <div className="input">
          <input
            type='email'
            placeholder='E-post'
            name="inputEmail"
            value={email}
            onChange={e => setEmail(e.target.value)}
          />
        </div>
        <div className="input">
          <input
            type='password'
            placeholder='Passord'
            name="inputPassword"
            value={password}
            onChange={e => setPassword(e.target.value)}
          />
        </div>
      </div>

      {action === 'Logg inn' && (
        <div className="forgot-password">
          Glemt passord? <span>Klikk her</span>
        </div>
      )}
      {feedback && <div className="feedback">{feedback}</div>}

      <div className="submit-container">
       
        <div className={`submit ${action ==='Lag bruker' ? 'active' : ''}`} onClick={handleSubmit}>
          Lag bruker
        </div>

        
        <div
          className={`submit ${action === 'Logg inn' ? 'active' : ''}`}
          onClick={() => {
            if (action === 'Lag bruker') {
              setAction('Logg inn');
              setFeedback('');
            } else {
              handleLogin();
            }
          }}
        >
          Logg inn
        </div>
      </div>
    </div>
  );
}

export default LoginSignup;
