import React from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native';

import { Card, Button } from 'react-native-elements';

import { getProfile } from '../../api/profile';

class Profile extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         userInfo: {}
      }

      this.logOff = this.logOff.bind(this);
   }

   componentWillMount = async () => {
      const userInfo = await getProfile();
      const { success, message, result } = userInfo;
      console.log(userInfo)
      if(success) {
         console.log('resssss', result)
         this.setState({userInfo: result[0]})
      }
   }

   logOff = async () => {
      await AsyncStorage.removeItem('authToken');
      await this.props.navigation.navigate('LogIn');
   }

   render() {
      
      const { userInfo } = this.state;

      return (
         <View>
            <Card
               image={{
                  uri: 'https://designshack.net/wp-content/uploads/placeholder-image.png'
               }}
               >
               <Button
                  title="Edit profile"
                  onPress={() => this.props.navigation.navigate('EditProfile') }
                  />
               <View style={stylesGrid.profileInformation}>
                  <Text> <Text style={stylesGrid.fontStyle}> Name:</Text> {userInfo.name} {userInfo.lname} </Text>
                  <Text> <Text style={stylesGrid.fontStyle}> Username:</Text> {userInfo.username} </Text>
                  <Text> <Text style={stylesGrid.fontStyle}> Email:</Text> {userInfo.email} </Text>
               </View>

               <Button
                     title="Log Off"
                     buttonStyle={stylesGrid.buttonStyle}
                     onPress={this.logOff}
                     />
            </Card>
         </View>
      );
   }
};

const stylesGrid = StyleSheet.create({
   sectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between'
   },
   buttonStyle: {
      backgroundColor: '#FF0000'
   }, 
   profileInformation: {
      padding: 20
   },
   fontStyle: {
      fontWeight: 'bold'
   }
})

export default Profile;