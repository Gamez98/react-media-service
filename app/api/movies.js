import { AsyncStorage } from 'react-native';

const getMovies = async () => {
   const token = await AsyncStorage.getItem('authToken');
   return await fetch('http://192.168.1.68:3030/v2/api/movie', {
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

const getCategories = async () => {
   const token = await AsyncStorage.getItem('authToken');
   return await fetch('http://192.168.1.68:3030/v2/api/movie/categories', {
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

const getMoviesByCategory = async (category) => {
   console.log(category)
   const token = await AsyncStorage.getItem('authToken');
   return await fetch(`http://192.168.1.68:3030/v2/api/movie/category/${category}`, {
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

const getMoviesByName = async (name) => {
   const token = await AsyncStorage.getItem('authToken');
   return await fetch(`http://192.168.1.68:3030/v2/api/movie/${name}`, {
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

export {
   getMovies,
   getCategories,
   getMoviesByCategory,
   getMoviesByName,
}