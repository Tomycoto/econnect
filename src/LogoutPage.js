import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAuth, signOut } from "firebase/auth";
import { Button } from '@mui/material';

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
      <div>
        <h2>You have been disconnected.</h2>
        <Button onClick={() => navigate("/login")}>Login to another account</Button>
        <Button onClick={() => navigate("/")}>Homepage</Button>
      </div>
    );
  }
  
  export default LogoutPage;
