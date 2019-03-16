import React from 'react';
import { View } from 'react-native';

import { Card, Input, Button } from 'react-native-elements';

import { getProfile } from '../../api/profile';

import { updateUserProfile } from '../../api/user';

class EditProfile extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         userInfo: {}
      }
      this.saveProfileInfo    = this.saveProfileInfo.bind(this);
      this.handleInputChange  = this.handleInputChange.bind(this);
      this.editable           = this.editable.bind(this);
   }

   componentWillMount = async () => {
      const userInfo = await getProfile();
      const { success, result } = userInfo;
      if(success) {
         await this.setState({ userInfo: result[0]})
      }
   }

   saveProfileInfo = async () => {
      console.log(this.state.userInfo)
      const { userInfo } = this.state;
      const updateRequest = await updateUserProfile(userInfo);
      const { success } = updateRequest; 
      if(!success) {
         return;
      }
      this.props.navigation.navigate('Profile')
   }
   
   handleInputChange = (val, name) => {
      let userInfo = Object.assign({}, this.state.userInfo);
      userInfo[name] = val;
      this.setState({ userInfo })
   }

   editable = data => {
      return !(['id', 'username'].indexOf(data) > -1)
   }

   render() {

      const { userInfo } = this.state;

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
                              editable={this.editable(data)}
                              placeholder={data}
                              value={`${userInfo[data]}`}
                              autoCapitalize="none"
                              secureTextEntry={data === 'password'}
                              onChangeText={(val) => this.handleInputChange(val, data)}
                              />
                        )
                     })
               }
               <Button 
                  title="Save Profile"
                  onPress={this.saveProfileInfo}
                  />
            </Card>
         </View>
      );
   }
};

export default EditProfile;