import React, { useState, useEffect, useRef} from 'react';
import { useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
// @mui
import {
  
  Stack,
  Button,
  Drawer,
  Divider,
  Checkbox,
  FormControl,
  IconButton,
  ListItemText,
  MenuItem,
  Typography,
  Select,
} from '@mui/material';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// services
import { fetchBreedsData } from '../../../services/dataService';

// ----------------------------------------------------------------------

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
      width: 100,
    },
  },
};

// ----------------------------------------------------------------------

DogFilterSidebar.propTypes = {
  openFilter: PropTypes.bool,
  onOpenFilter: PropTypes.func,
  onCloseFilter: PropTypes.func,
};


export default function DogFilterSidebar({ openFilter, onOpenFilter, onCloseFilter, dogResultsBreeds, sort }) {

  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState('');


  const handleChange = (event) => {
    const {
      target: { value },
    } = event;

    if ((typeof value === 'string' ? value.split(',') : value).length === 0) {
      console.log(typeof value === 'string' ? value.split(',') : value);
      navigate(`/search/`);
    }
    else if (sort && sort !== "breed:asc") {
      navigate(`/search/${typeof value === 'string' ? value.split(',') : value}/1/${sort}`);
    }
    else {
      navigate(`/search/${typeof value === 'string' ? value.split(',') : value}/1`);
    }
  };

  const [breeds, setBreeds] = useState([]);
  
  const fetchProductsRef = useRef();

  fetchProductsRef.current = async () => {

      try {
        
        const response = await fetchBreedsData();
        
        if(response.ok) {
          const data = await response.json();

          setBreeds(data);
         
        }
        else {
          setErrorMessage('Error could not retrieve the breeds');
        }
      } catch (error) {
        setErrorMessage('Error could not retrieve the breeds');
      }
  };

  useEffect (() => {

      const fetchProducts = async () => {
        await fetchProductsRef.current();
      };
  
      fetchProducts();

  }, []);

  return (
    <>
      <Button disableRipple color="inherit" endIcon={<Iconify icon="ic:round-filter-list" />} onClick={onOpenFilter}>
        Filters&nbsp;
      </Button>

      <Drawer
        anchor="right"
        open={openFilter}
        onClose={onCloseFilter}
        PaperProps={{
          sx: { width: 280, border: 'none', overflow: 'hidden' },
        }}
      >
        <Stack direction="row" alignItems="center" justifyContent="space-between" sx={{ px: 1, py: 2 }}>
          <Typography variant="subtitle1" sx={{ ml: 1 }}>
            Filters
          </Typography>
          <IconButton onClick={onCloseFilter}>
            <Iconify icon="eva:close-fill" />
          </IconButton>
        </Stack>

        <Divider />

        <Scrollbar>
          <Stack spacing={3} sx={{ p: 3 }}>

            <div>
              <Typography variant="subtitle1" gutterBottom>
                Breed
              </Typography>
              <FormControl sx={{ m: 0, width: '100%' }} >
                
                <Select
                  labelId="demo-multiple-checkbox-label"
                  id="demo-multiple-checkbox"
                  multiple
                  value={dogResultsBreeds}
                  onChange={handleChange}
                  
                  renderValue={(selected) => selected.join(', ')}
                  MenuProps={MenuProps}
                  
                >
                  {breeds.map((breed) => (
                    <MenuItem key={breed} value={breed} disableRipple>
                      <Checkbox checked={dogResultsBreeds.indexOf(breed) > -1} sx={{ padding: 1/2}}/>
                      <ListItemText primary={breed} primaryTypographyProps={{ fontSize: 12 }}/>
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            
          </Stack>
        </Scrollbar>

        <Stack alignItems="center" justifyContent={"center"} sx={{mt: 1}} display="none">
          <Typography variant="body2" sx={{my: 3 }}>
            {errorMessage}
          </Typography>
        </Stack>

      </Drawer>
    </>
  );
}
