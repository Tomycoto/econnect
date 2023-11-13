import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";

function LoginPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const Login = async (e) => {
      e.preventDefault();
  
      // Basic email validation
      if (!/\S+@\S+\.\S+/.test(email)) {
        setError('Invalid email');
        return;
      }
  
      // Check password length
      if (password.length < 6) {
        setError('Password should be at least 6 characters');
        return;
      }
  
      const auth = getAuth();
      await signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/");
        })
        .catch((error) => {
          setError(error.message);
        });
    };
  
    return (
      <div>
        <h2>Login</h2>
        <form onSubmit={Login}>
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
        <p>Don't have an account? <a href="/signup">Sign Up</a></p>
      </div>
    );
  }
  
  export default LoginPage;
