import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import {Stack, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
// store
import account from '../../../store/Account';
 // services
import { login } from '../../../services/dataService'

// ----------------------------------------------------------------------

export default function LoginForm() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');

  const [errorLogin, setErrorLogin] = useState('');

  const handleSubmit = async () => {


    const data = {
      name,
      email
    };

    try {
      const response = await login(data);

      if (response.ok) {
        
        account.setDisplayName(data.name);
        account.setEmail(data.email)
        const expirationTimeInMinutes = 50;
        const expirationTimestamp = Date.now() + expirationTimeInMinutes * 60 * 100;
        const itemToStore = { data, expiration: expirationTimestamp }
        localStorage.setItem("fetch-account-infor", JSON.stringify(itemToStore));
        
        navigate('/');

      } else {
        // Login failed
        setErrorLogin('Login failed wrong name or email!');
        
      }
    } catch (error) {
      setErrorLogin("Login failed wrong Name or email!");
      
    }
    
  };

  return (
    <>
      <Typography variant="body2" sx={{ color: 'text.secondary', mb: 2 }}>{errorLogin}</Typography>

      <Stack spacing={4}>
        
        <TextField name="name" label="Enter Name" value={name} onChange={(e) => setName(e.target.value)} required />

        <TextField name="email" label="Enter Email" value={email} onChange={(e) => setEmail(e.target.value)} required
          onKeyDown={(e)=> { 
            if(e.key === 'Enter') {
              handleSubmit();
            }}
          }
        />

        <LoadingButton fullWidth size="large" type="submit" variant="contained" onClick={handleSubmit} >
          Login
        </LoadingButton>
      </Stack>

    </>
  );
}
