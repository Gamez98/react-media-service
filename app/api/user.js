import { AsyncStorage } from 'react-native';

const registerUserProfile = async (data) => {
   const token = await AsyncStorage.getItem('authToken');
   return await fetch('http://192.168.1.68:3030/v2/api/user', {
      method: 'POST',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
      },
      body: JSON.stringify(data)
   })
   .then(response => response.json())
   .then(data => {
      console.log(data)
      return data;
   })
}

const updateUserProfile = async (data) => {
   const token = await AsyncStorage.getItem('authToken');
   return await fetch('http://192.168.1.68:3030/v2/api/user', {
      method: 'PUT',
      headers: {
         'Accept': 'application/json',
         'Content-Type': 'application/json',
         'x-access-token': token
      },
      body: JSON.stringify(data)
   })
   .then(response => response.json())
   .then(data => {
      console.log(data)
      return data;
   })
}

export { 
   updateUserProfile,
   registerUserProfile
}