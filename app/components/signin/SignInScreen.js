import React from 'react';
import { View, AsyncStorage } from 'react-native';
import { Card, Input, Button } from 'react-native-elements';

import { registerUserProfile } from '../../api/user';
import { performLogIn } from '../../api/login';

class SignIn extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
          userInfo: {
            name: '',
            lname: '',
            username: '',
            email: '',
            password: '',
            credit_card_no: '',
            expiration_date: '',
            cvv: ''
         }
      }
      this.handleInputChange = this.handleInputChange.bind(this);
   }

   handleInputChange = (val, name) => {
      let userInfo = Object.assign({}, this.state.userInfo);
      userInfo[name] = val;
      this.setState({ userInfo })
   }

   createUserProfile = async () => {
      const { userInfo } = this.state;
      const response = await registerUserProfile(userInfo);
      const { success, message } = response;
      if(!success) {
         await alert(message)
         return;
      }
      const { username, password } = userInfo;
      const logresponse = await performLogIn(username, password);
      const { server_token } = logresponse;
      if(logresponse.success) {
         await AsyncStorage.setItem('authToken', server_token);
         this.props.navigation.navigate('AuthLoading');
      } else {
         return;
      }
   }


   render() {

      const { userInfo } = this.state;

      return (
         <View>
            <Card>
                {
                  Object.keys(userInfo)
                     .map((data, i) => {
                        console.log(data, userInfo[data])
                        return (
                           <Input
                              key={i}
                              placeholder={data}
                              autoCapitalize="none"
                              secureTextEntry={data === 'password'}
                              onChangeText={(val) => this.handleInputChange(val, data)}
                              />
                        )
                     })
               }
               <Button 
                  title='Register'
                  onPress={this.createUserProfile}
                  />
            </Card>
         </View>
      );
   }
};

export default SignIn;