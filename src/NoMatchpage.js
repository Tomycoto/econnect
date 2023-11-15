import './NoMatchpage.css';
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, onAuthStateChanged } from "firebase/auth";

function NoMatchPage() {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, setUser);
    return () => unsubscribe();
  }, []);

  return (
    <div className="no-match-page">
      <h1>Error 404</h1>
      <p>This path does not exist.</p>
      {user ? (
        <button onClick={() => navigate('/home')}>Go to Home</button>
      ) : (
        <button onClick={() => navigate('/')}>Go to Login</button>
      )}
    </div>
  );
}

export default NoMatchPage;
