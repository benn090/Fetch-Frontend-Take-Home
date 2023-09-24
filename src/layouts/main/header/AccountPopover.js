import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
// @mui
import { Box, Divider, Typography, Stack, MenuItem,IconButton, Popover } from '@mui/material';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
// store
import account from '../../../store/Account';
// services
import { logout } from '../../../services/dataService';

// ----------------------------------------------------------------------

const MENU_OPTIONS = [
  {
    label: 'Home',
    icon: 'eva:home-fill',
  },
  {
    label: 'Profile',
    icon: 'eva:person-fill',
  },
  {
    label: 'Settings',
    icon: 'eva:settings-2-fill',
  },
];

// ----------------------------------------------------------------------

export default function AccountPopover() {
  const [open, setOpen] = useState(null);
  const navigate = useNavigate();

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleLogout = async () => {

    try {

      await logout();

      if (localStorage.getItem("fetch-account-infor")) {
        localStorage.removeItem("fetch-account-infor");
      }
  
      navigate('/login'); 
    } catch (error) {
      console.error('Error logging out:', error);
    }

  }

  useEffect (() => {

    if (localStorage.getItem("fetch-account-infor")) {
      const accountInfo = JSON.parse(localStorage.getItem("fetch-account-infor"));

      if(accountInfo.expiration < Date.now()) {
        localStorage.removeItem("fetch-account-infor");
        navigate('/login');
      }
      
      account.setDisplayName(accountInfo.data.name);
      account.setEmail(accountInfo.data.email);
    }

  }, [navigate]);

  return (
    <>
      <IconButton
        onClick={handleOpen}
        color={open ? 'primary' : 'default'}
        sx={{
          p: 0,
          
        }}
      >
      
      
      <AccountCircleIcon sx={{ fontSize: 45 }}/>

      </IconButton>

      <Popover
        open={Boolean(open)}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1.5,
            ml: 0.75,
            width: 180,
            '& .MuiMenuItem-root': {
              typography: 'body2',
              borderRadius: 0.75,
            },
          },
        }}
      >
        <Box sx={{ my: 1.5, px: 2.5 }}>
          <Typography variant="subtitle2" noWrap>
            {account.displayName}
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }} noWrap>
            {account.email}
          </Typography>
        </Box>

        <Divider />

        <Stack sx={{ p: 1 }}>
          {MENU_OPTIONS.map((option) => (
            <MenuItem key={option.label} onClick={handleClose}>
              {option.label}
            </MenuItem>
          ))}
        </Stack>

        <Divider />

        <MenuItem onClick={handleLogout} sx={{ m: 1 }}>
          Logout
        </MenuItem>
      </Popover>
    </>
  );
}
