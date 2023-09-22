import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
// @mui
import {Container, Typography } from '@mui/material';
import TextField from '@mui/material/TextField';
import Stack from '@mui/material/Stack';
import Autocomplete from '@mui/material/Autocomplete';
import { styled } from '@mui/material/styles';
// services
import { fetchBreedsData } from '../services/dataService';


// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
});


const StyledContent = styled('div')(() => ({
  maxWidth: 600,
  margin: 'auto',
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column', 
  
}));

// ----------------------------------------------------------------------



export default function MainAppPage() {
 
  const navigate = useNavigate();

  const [breeds, setBreeds] = useState([]);
  
  const fetchProductsRef = useRef();
  // TODO
  const [errorMessage, setErrorMessage] = useState('');


  fetchProductsRef.current = async () => {

      try {
        const response = await fetchBreedsData();
        
        if(response.ok) {
          const data = await response.json();
          setBreeds(data);
        }
        else {
          setErrorMessage('Error! Could not retrieve the breeds');
        }
      } catch (error) {
        setErrorMessage('Error! Could not retrieve the breeds');
      }
  };

  useEffect (() => {

      const fetchProducts = async () => {
        await fetchProductsRef.current();
      };
  
      fetchProducts();

  }, []);



  const handleSubmit = (event, value) => {
    event.preventDefault();

    navigate(`/search/${value}`);

  }

  return (
    <>
      <Helmet>
        <title> Fetch rewards </title>
      </Helmet>

      <Container maxWidth="sm">

          <Stack alignItems="center" justifyContent={"center"} sx={{mt: 1}}>
            <StyledProductImg alt="logo" src="/favicon/favicon-72x72.png" />

            <Typography variant="h4" sx={{my: 3 }}>
              Find your match!
            </Typography>
          </Stack>

          <StyledContent>
            <Autocomplete
              freeSolo
              id="free-solo-2-demo"
              disableClearable
              options={breeds.map((item) => item)}
              onChange={handleSubmit}
              
              renderInput={(params) => (
                <TextField
                placeholder="Search Breed"
                onKeyDown={(e)=> { 
                  if(e.key === 'Enter') {
                    
                  }}
                }
                  {...params}
            
                  InputProps={{
                    ...params.InputProps,
                    type: 'search',
                  }}
                />
              )}
            />
          </StyledContent>

          <Stack alignItems="center" justifyContent={"center"} sx={{mt: 1}} >
            <Typography variant="body2" sx={{my: 3 }}>
              {errorMessage}
            </Typography>
          </Stack>

  
      </Container>
  
    </>
  );
}