import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

import { performLogIn } from '../../api/login';

class Login extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         username: '',
         password: '',
         isLogged: false
      }
      this.handleLogin = this.handleLogin.bind(this);
   }

   handleLogin = async () =>  {
      const { username, password } = this.state;
      const response = await performLogIn(username, password);
      const { server_token, success, message } = response;
      if(success) {
         await AsyncStorage.setItem('authToken', server_token);
         this.props.navigation.navigate('AuthLoading');
      } else {
         alert(message);
         return;
      }
   }

   render() {
      return (
         <View>
            <Card>
               <Input 
                  placeholder="Username"
                  autoCapitalize="none"
                  onChangeText={(username) => this.setState({username})}
                  />
               <Input 
                  placeholder="Password"
                  autoCapitalize="none"
                  secureTextEntry={true}
                  onChangeText={(password) => this.setState({password})}
                  />
               <Button 
                  title="Log In"
                  onPress={this.handleLogin}
               />
            </Card>
            <Card>
               <Button 
                  title="Sign In"
                   onPress={() => this.props.navigation.navigate('SignIn')}
                  />
            </Card>
         </View>
      );
   }
};

export default Login;