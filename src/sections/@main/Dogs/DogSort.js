import { useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Menu, Button, MenuItem, Typography } from '@mui/material';
// component
import Iconify from '../../../components/iconify';

// ----------------------------------------------------------------------

const SORT_BY_OPTIONS = [
  { value: 'breed:asc', label: 'Breed: Ascending' },
  { value: 'breed:desc', label: 'Breed: Descending' },
  { value: 'name:asc', label: 'Name: Ascending' },
  { value: 'name:desc', label: 'Name: Descending' },
];

export default function ShopProductSort( { sort }) {

  const [open, setOpen] = useState(null);
  const { breedsParam } = useParams();
  const navigate = useNavigate();
  
  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleSelectedMenuItem = (event, value) => {
    navigate(`/search/${breedsParam}/1/${value}`)
    setOpen(null);
  }

  const handleClose = () => {
    setOpen(null);
  };

  return (
    <>

      <Button
        color="inherit"
        disableRipple
        onClick={handleOpen}
        endIcon={<Iconify icon={open ? 'eva:chevron-up-fill' : 'eva:chevron-down-fill'} />}
      >
        Sort By:&nbsp;
        <Typography component="span" variant="subtitle2" sx={{ color: 'text.secondary' }}>
          {SORT_BY_OPTIONS.find(option => option.value === sort).label}
        </Typography>
      </Button>

      <Menu
        keepMounted
        anchorEl={open}
        open={Boolean(open)}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      >
        {SORT_BY_OPTIONS.map((option) => (
          <MenuItem
            key={option.value}
            selected={option.value === sort}
            onClick={(event) => handleSelectedMenuItem(event, option.value)}
            sx={{ typography: 'body2' }}
          >
            {option.label}
          </MenuItem>
        ))}
      </Menu>

    </>
  );
}
