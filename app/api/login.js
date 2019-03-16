const performLogIn = async (username, password) => {
   console.log(username + " " + password)
   return await fetch('http://192.168.1.68:3030/v2/api/auth', {
      method: 'POST',
      headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json'
   },
    body: JSON.stringify({client_id: username, client_secret: password})
   })
   .then(response => response.json())
   .then(data => {
      console.log(data)
      return data;
   })
}

export {
   performLogIn
}