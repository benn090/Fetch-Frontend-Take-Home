import { Helmet } from 'react-helmet-async';
import React, { useState, useEffect } from 'react';
import { observer } from 'mobx-react-lite';
import { useNavigate, useParams } from 'react-router-dom';
// @mui
import { Container, Stack, Typography, Pagination} from '@mui/material';
// components
import { DogSort, DogFilterSidebar } from '../sections/@main/Dogs';
import DogList from '../sections/@main/Dogs/DogList';
// store
import DogResults from '../store/DogResults';
// services 
import { fetchSearchResultsData, fetchDogsData } from '../services/dataService';


// ----------------------------------------------------------------------

export async function getDogsByIds(resultIds){

  try {

    const response = await fetchDogsData(resultIds);

    if(response.ok) {
      const data = await response.json();
      const updatedData = data.map(obj => ({...obj, isFavorite: false}));
      DogResults.setResultArray(updatedData);
      
    }
    else {
      console.log('reponse getDogsByIds is: ', response.status);
    }


  } catch (error) {
    console.error('Error getting dogs', error);
  }
}

function DogListPage() {
  
  const [errorMessage, setErrorMessage] = useState('');
  const pageSize = 25;

  const { breedsParam, page, sortParam } = useParams();
  const navigate = useNavigate();
  const [openFilter, setOpenFilter] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  let currentPage = Number(page);

  if (isNaN(currentPage)) {
    currentPage = 1;
  }
  let sort = sortParam;
  if (!sort) {
    sort = 'breed:asc';
  }

  const handleOpenFilter = () => {
    setOpenFilter(true);
  };

  const handleCloseFilter = () => {
    setOpenFilter(false);
  };

  const handleChange = (event, value) => {
    if (sort && sort !== "breed:asc") {
      navigate(`/search/${breedsParam}/${value}/${sort}`);
    }
    else {
      navigate(`/search/${breedsParam}/${value}`);
    }
    
  };

  useEffect(() => {

    const breedsTypeSearch = () => {
      let query = "";
      DogResults.breeds.forEach(str => {
        query += `&breeds=${str}`;
      });
  
      return query;
    }

    const fetchData = async (pageNumber) => {

  
      const from = pageSize * (pageNumber - 1);

      if (!breedsParam) {
        navigate('/');
      }

      else {
        DogResults.setBreeds(breedsParam.split(','));

        try {
    
          const query = breedsTypeSearch() + "&from=" + from + "&sort=" + sort;
         
          const response = await fetchSearchResultsData(query);
    
          if (response.ok) {
            const result = await response.json();
            DogResults.setTotal(result.total);
            getDogsByIds(result.resultIds);
            setIsLoading(false);
          }
          else {
            setErrorMessage('Error could not retrieve the search results');
            setIsLoading(false);
          }
        } catch (error) {
          setErrorMessage('Error could not retrieve the search results');
          setIsLoading(false);
        }
      }
    };

    fetchData(currentPage);

    
  }, [currentPage, breedsParam, sort, navigate]);


  return (
    <>
      <Helmet>
        <title> Fetch | Search </title>
      </Helmet>

      <Container>
        <Typography variant="h4">
          Resuls For:
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            {breedsParam ? breedsParam: 'ALL'}
        </Typography>

        <Stack direction="row" flexWrap="wrap" alignItems="flex-end" flexDirection="column" sx={{ mb: 3 }} >
          <Stack direction="row" spacing={1} flexShrink={0} sx={{ my: 1 }}>
            <DogFilterSidebar
              openFilter={openFilter}
              onOpenFilter={handleOpenFilter}
              onCloseFilter={handleCloseFilter}
              dogResultsBreeds={DogResults.breeds}
              sort={sort}
            />
            <DogSort sort={sort}/>
          </Stack>
        </Stack>
        { isLoading ? (
                        <Stack alignItems="center" justifyContent={"center"} sx={{mt: 1}} >
                          <Typography variant="body2" sx={{my: 3 }}>
                            Loading...
                          </Typography>
                        </Stack>
                      ) : (

                        <>
                          <DogList dogList={DogResults.resultArray} />
                            <Stack spacing={2} alignItems="center" sx={{ my: 9 }}>
                              <Typography>Page: {currentPage}</Typography>
                              <Pagination count={Math.ceil(DogResults.total / pageSize)} page={Number(currentPage)} variant="outlined" color="primary" onChange={handleChange} />
                            </Stack>
                        </>
                      )
        }
        


        <Stack alignItems="center" justifyContent={"center"} sx={{mt: 1}} >
          <Typography variant="body2" sx={{my: 3 }}>
            {errorMessage}
          </Typography>
        </Stack>

      </Container>

    </>
  );
}

export default observer(DogListPage);
