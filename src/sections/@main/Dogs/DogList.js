import PropTypes from 'prop-types';
import { observer } from 'mobx-react-lite'; 
// @mui
import { Grid, Stack, Typography } from '@mui/material';
import DogListCard from './DogListCard';

// ----------------------------------------------------------------------

DogList.propTypes = {
  dogList: PropTypes.array.isRequired,
};

DogListCard.propTypes = {
  list: PropTypes.shape({
    id: PropTypes.string,
    img: PropTypes.string,
    name: PropTypes.string,
    age: PropTypes.number,
    zip_code: PropTypes.string,
    breed: PropTypes.string,
    isFavorite: PropTypes.bool,
  }),
};

// ----------------------------------------------------------------------

function DogList({ dogList, ...other }) {


  return (
    <>
      {
        (dogList.length === 0)? 
        
        <Stack alignItems="center" sx={{ py: 10 }}>
          
          <Typography variant="subtitle1" noWrap>
            No Results Found!
          </Typography>
          
        </Stack>
        
        :
        
        <Grid container spacing={3} {...other}>
        
          {dogList.map((list) => (
            <Grid key={list.id} item xs={12} sm={6} md={2.4}>
              <DogListCard list={list} />
            </Grid>
          ))}
        
        </Grid>

      }
    </>
    
  );
}

export default observer(DogList);
