import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite'; 
// @mui
import { Box, Card, Link, Typography, Stack, Button } from '@mui/material';
import { styled } from '@mui/material/styles';
import { FavoriteBorder, Check } from '@mui/icons-material';
// store
import favoriteDogList from '../../../store/FavoriteDogList';

// ----------------------------------------------------------------------

const StyledProductImg = styled('img')({
  top: 0,
  width: '100%',
  height: '100%',
  objectFit: 'cover',
  position: 'absolute',
});

// ----------------------------------------------------------------------

ShopDogListCard.propTypes = {
  list: PropTypes.object,
};


function ShopDogListCard({ list }) {
  
  const zipCode = list.zip_code;
  const {age, breed, img, name} = list;


  const isDogInFavorites = (favoriteDogList.sharedArray.length > 0) && (favoriteDogList.getItem(list) === 1);

  const addIDToFavorite = (dogInterface) => {
    favoriteDogList.addItem(dogInterface);
  };

  return (
    <Card>

      <Box sx={{ pt: '100%', position: 'relative' }}>
        <StyledProductImg alt={name} src={img} />
      </Box>

      <Stack spacing={1} sx={{ p: 2 }}>

        <Stack alignItems="center" direction={"row"} justifyContent={"center"}>
          <Link color="#300D38" underline="hover">
            <Typography variant="h6" noWrap>
              {name},&nbsp;
            </Typography>
          </Link>

          <Typography variant="subtitle2" noWrap>
              {age}
          </Typography>

        </Stack>

        <Stack alignItems="center">
          
          <Typography variant="subtitle2" noWrap>
            {breed}
          </Typography>
          
        </Stack>

        <Stack alignItems="center" >
          <Typography variant="subtitle2">
            Zip code: {zipCode}
          </Typography>
        </Stack>

        <Stack alignItems="center">
          
          <Button variant="contained" disableElevation disabled={isDogInFavorites} endIcon={isDogInFavorites? <Check />: <FavoriteBorder />} 
            onClick={ () => {
              addIDToFavorite(list);
              
            }}
          >

          {isDogInFavorites? "Added" : "Add to favorite"}

          </Button>
        </Stack>
        
      </Stack>

    </Card>
  );
}

export default observer(ShopDogListCard)