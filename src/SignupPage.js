import './SignupPage.css';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";

function SignupPage() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [username, setUsername] = useState('');
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const Signup = async (e) => {
      e.preventDefault();
  
      if (username.includes('|')) {
        setError('Username cannot contain the "|" character');
        return;
      }

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
      await createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          updateProfile(auth.currentUser, {
            displayName: `${username}|0`,
          })
          .then(() => {
            // Profile updated successfully!
            console.log(user.displayName);
            navigate("/home");
          })
          .catch((error) => {
            // An error happened.
            console.log(error);
          });
        })
        .catch((error) => {
          setError(error.message);
        });
    };
  
    return (
      <div className="signupPage">
        <h2>Signup</h2>
        <form onSubmit={Signup}>
          <input type="text" placeholder="Username" onChange={e => setUsername(e.target.value)} />
          <input type="email" placeholder="Email" onChange={e => setEmail(e.target.value)} />
          <input type="password" placeholder="Password" onChange={e => setPassword(e.target.value)} />
          <button type="submit">Sign Up</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  }
  
  export default SignupPage;
