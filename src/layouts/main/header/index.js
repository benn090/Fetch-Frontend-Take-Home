
// @mui
import { styled } from '@mui/material/styles';
import { Box, Stack, AppBar, Toolbar} from '@mui/material';
// utils
import { bgBlur } from '../../../utils/cssStyles';
// components
import Logo from '../../../components/logo';
//
import AccountPopover from './AccountPopover';
import FavoritesPopover from './FavoritesPopover';


// ----------------------------------------------------------------------

const HEADER_MOBILE = 50;

const HEADER_DESKTOP = 50;

const StyledRoot = styled(AppBar)(({ theme }) => ({
  ...bgBlur({ color: theme.palette.background.paper }),
  boxShadow: 'none',
  
}));

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  minHeight: HEADER_MOBILE,

  [theme.breakpoints.up('lg')]: {
    minHeight: HEADER_DESKTOP,
    padding: theme.spacing(0, 15),
  },
  [theme.breakpoints.down('lg')]: {
    padding: theme.spacing(0, 1.25, 0, 2),
  },

}));

// ----------------------------------------------------------------------


export default function Header({favoriteDogListShared }) {


  return (
    <StyledRoot>
      <StyledToolbar>

        <Logo />

        <Box sx={{ flexGrow: 1 }} />

        <Stack
          direction="row"
          alignItems="center"
          spacing={{
            xs: 0.5,
            sm: 1,
          }}
        >
          
        <FavoritesPopover  favoriteDogListShared={favoriteDogListShared} />
         
        <AccountPopover />

        </Stack>

      </StyledToolbar>
    </StyledRoot>
  );
}
