
const BASE_URL = 'https://frontend-take-home-service.fetch.com';

// login

export const login = async (credentials) => {
    try {
        const response = await fetch(`${BASE_URL}/auth/login`, {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            credentials: 'include',
            body: JSON.stringify(credentials),
        });
        return response;
    } catch (error) {
      throw error;
    }
}

export const logout = async () => {
  try {
    await fetch(`${BASE_URL}/auth/logout`, {
      method: 'POST',
      credentials: 'include',
    });
    
  } catch (error) {
    throw error;
  }
}

// fetchData 

export const fetchBreedsData = async () => {
  try {
    const response = await fetch(`${BASE_URL}/dogs/breeds`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Include credentials (cookies) with the request
    });
    return response;
  } catch (error) {
    throw error;
  }
}

export const fetchDogsData = async (dogIds) => {
  try {
  
    const response = await fetch(`${BASE_URL}/dogs`, {

      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include',
      body: JSON.stringify(dogIds)

    });
    return response;
  } catch (error) {
    throw error;
  }
}

// search query

export const fetchSearchResultsData = async (queryString) => {
  try {
    const response = await await fetch(`${BASE_URL}/dogs/search?${queryString}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      },
      credentials: 'include', // Include credentials (cookies) with the request
    });
    return response;
  } catch (error) {
    throw error;
  }
}