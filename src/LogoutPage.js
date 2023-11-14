import './LogoutPage.css';
import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";

function LogoutPage() {
    const navigate = useNavigate();
    useEffect(() => {
      const auth = getAuth();
      signOut(auth)
        .then(() => {
          console.log('User signed out');
        })
        .catch((error) => {
          console.error('Error signing out: ', error);
        });
    }, []);
  
    return (
      <div className="logoutPage">
        <h2>You have been disconnected.</h2>
        <a>
          <button onClick={() => navigate("/")}>Login to another account</button>
          <button onClick={() => navigate("/home")}>Homepage</button>
        </a>
      </div>
    );
  }
  
  export default LogoutPage;
