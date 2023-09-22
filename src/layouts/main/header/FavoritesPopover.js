import PropTypes from 'prop-types';
import { useState } from 'react';
import { observer } from 'mobx-react-lite'; 
// @mui
import {
  Box,
  List,
  Badge,
  Button,
  Avatar,
  Tooltip,
  Divider,
  Popover,
  Typography,
  IconButton,
  ListItemText,
  ListSubheader,
  ListItemAvatar,
  ListItemButton,
} from '@mui/material';
import { styled } from '@mui/material/styles';
// components
import Iconify from '../../../components/iconify';
import Scrollbar from '../../../components/scrollbar';
// store
import favoriteDogList from '../../../store/FavoriteDogList';
// Modal
import MatchNotifierModal from './MatchNotifierModal';

// ----------------------------------------------------------------------


function FavoritesPopover() {

  const totalUnRead = (favoriteDogList.sharedArray.length > 0)? favoriteDogList.sharedArray.length : 0;

  const [openPopover, setOpenPopover] = useState(null);
  const [openModal, setOpenModal] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const handleOpenPopover = (event) => {
    setOpenPopover(event.currentTarget);
  };

  const handleClosePopover = () => {
    setOpenPopover(null);
  };
  const handleCloseFavoritePopoverOpenModal = () => {
    generateMatchedDog();
    handleClosePopover();
    setOpenModal(true);
  };
  const handleCloseModal = () => setOpenModal(false);


  const clearArray = () => {
    favoriteDogList.clearArray();
  };

  const generateMatchedDog = async () => {
    const matchDogUrl = 'https://frontend-take-home-service.fetch.com/dogs/match';
    
    try {

      const response = await fetch(matchDogUrl, {

        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        credentials: 'include',
        body: JSON.stringify(favoriteDogList.sharedArray),

      })

      if(response.ok) {
        const data = await response.json();
        
        favoriteDogList.setMatchedDog(data.match);
      }
      else {
        
        setErrorMessage('Error: could not generate match');
      }

    } catch (error) {
      
      setErrorMessage('Error: could not generate match');
    }
  };

  return (
    <>
      <IconButton color={openPopover ? 'primary' : 'default'} onClick={handleOpenPopover} sx={{ width: 40, height: 40 }}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify icon="eva:heart-fill" />
        </Badge>
      </IconButton>

      <Popover
        open={Boolean(openPopover)}
        anchorEl={openPopover}
        onClose={handleClosePopover}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>

          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">
              Favorites
            </Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} total favorites
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title=" Clear all">
              <Button onClick={clearArray}>
                Clear
              </Button>
            </Tooltip>

          )}
        </Box>

        <Divider />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                {(totalUnRead === 0)? "Nothing Added Yet" : "Below is Your List:"}
                {errorMessage}
              </ListSubheader>
            }
          >
            {favoriteDogList.sharedArray.map((dog) => (
              <FavoriteDogItem key={dog.id} dog={dog} />
            ))}
          </List>

        </Scrollbar>

        <Box sx={{ p: 1 }}>
          <Button fullWidth disabled={totalUnRead === 0} onClick={handleCloseFavoritePopoverOpenModal} >
            Match
          </Button>
        </Box>

      </Popover>

      <MatchNotifierModal 
        openModal={openModal} 
        onCloseModal={handleCloseModal}
        matchedDog={favoriteDogList.matchedDog}
      />

     
    </>
  );
}

export default observer(FavoritesPopover);

// ----------------------------------------------------------------------

FavoriteDogItem.propTypes = {
  dog: PropTypes.shape({
    id: PropTypes.string,
    img: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.number,
    zip_code: PropTypes.string,
    breed: PropTypes.string,
  }),
};


function FavoriteDogItem({ dog }) {
  const { avatar, title } = renderContentDog(dog);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',

      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography direction="row" alignItems="center" justifyContent="space-between" display="flex" noWrap flexWrap="wrap">
            <Typography
            variant="caption"
            sx={{
              color: 'text.disabled',
            }}
          >
            
            {dog.breed}
          </Typography>

          <Typography
            variant="caption"
            sx={{
              color: 'text.disabled',
            }}
          >
          
            Greeley,&nbsp; Co&nbsp;{dog.zip_code}
          </Typography>
          </Typography>
          
        }
      />
      
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

function renderContentDog(dog) {
  const title = (
    <Typography variant="subtitle2">
      {dog.name},
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {dog.age}
      </Typography>
    </Typography>
  );

  return {
    avatar: <StyledProductImg alt={dog.name} src={dog.img} />,
    title,
  };
  
}


// ----------------------------------------------------------------------