import { AsyncStorage } from 'react-native';

const getProfile = async () => {
   const token = await AsyncStorage.getItem('authToken');
   return await fetch('http://192.168.1.68:3030/v2/api/user', {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'x-access-token': token
       }
   })
   .then(response => response.json())
   .then(data => {
      console.log(data)
      return data;
   })
}

const getUserFavorites = async () => {
   const token = await AsyncStorage.getItem('authToken');
   return await fetch('http://192.168.1.68:3030/v2/api/movie/user/list', {
      method: 'GET',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'x-access-token': token
       }
   })
   .then(response => response.json())
   .then(data => {
      console.log(data)
      return data;
   })
}

const insertUserFavorite = async (movie_id) => {
   const token = await AsyncStorage.getItem('authToken');
   return await fetch('http://192.168.1.68:3030/v2/api/movie/add/favorite', {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'x-access-token': token
       },
       body: JSON.stringify({ movie_id })
   })
   .then(response => response.json())
   .then(data => {
      console.log(data)
      return data;
   })
}

const removeUserFavorite = async (movie_id) => {
   const token = await AsyncStorage.getItem('authToken');
   return await fetch('http://192.168.1.68:3030/v2/api/movie/remove/favorite', {
      method: 'DELETE',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'x-access-token': token
       },
       body: JSON.stringify({ movie_id })
   })
   .then(response => response.json())
   .then(data => {
      console.log(data)
      return data;
   })
} 

export { 
   getProfile,
   getUserFavorites,
   removeUserFavorite,
   insertUserFavorite
}