/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow
 */

import React, {Component} from 'react';
import {
   View, 
   AsyncStorage,
   ActivityIndicator,
   StatusBar
} from 'react-native';

import { Icon } from 'react-native-elements';

import { 
   createStackNavigator,
   createAppContainer,
   createSwitchNavigator,
   createBottomTabNavigator,
} from 'react-navigation';

import LoginScreen from './components/login/LoginScreen';
import SignInScreen from './components/signin/SignInScreen';
import HomeScreen from './components/home/HomeScreen';
import ProfileScreen from './components/profile/ProfileScreen';
import EditProfileScreen from './components/profile/EditProfileScreen';
import CategoryScreen from './components/category/CategoryScreen';
import ByCategoryScreen from './components/category/byCategoryScreen';
import MovieScreen from './components/movie/MovieScreen';
import VideoScreen from './components/video/VideoScreen';
import SearchScreen from './components/search/SearchScreen';
import FavoritesScreen from './components/favorites/FavoritesScreen';

const MovieStack = createStackNavigator({
   Home:       {screen: HomeScreen, navigationOptions: { title: 'Movies' }},
   Movie:      {screen: MovieScreen},
   Video:      {screen: VideoScreen}
}, {
   initialRouteName: 'Home'
})

const CategoryStack = createStackNavigator({
Category:      {screen: CategoryScreen, navigationOptions: { title: 'Categories' , tabBarIcon: () => (<Icon name='rowing'/>)}},
   ByCategory:    {screen: ByCategoryScreen},
}, {
   initialRouteName: 'Category'
})

const ProfileStack = createStackNavigator({
   Profile:       {screen: ProfileScreen, navigationOptions: { title: 'Profile' }},
   EditProfile:   {screen: EditProfileScreen, navigationOptions: { title: 'Edit Profile' }},
}, {
   initialRouteName: 'Profile'
})

const SearchStack = createStackNavigator({
   Search:        {screen: SearchScreen, navigationOptions: { title: 'Search', }}
})

const FavoitesStack = createStackNavigator({
   Favorites:     {screen: FavoritesScreen, navigationOptions: { title: 'Favorites' }}
})

const AppStack = createBottomTabNavigator({
   Home:       MovieStack,
   Favorites:  FavoitesStack,
   Search:     SearchStack,
   Category:   CategoryStack,
   Profile:    ProfileStack,
})

const AuthStack = createStackNavigator({
   LogIn:      {screen: LoginScreen, navigationOptions: { title: 'Log In' }},
   SignIn:     {screen: SignInScreen, navigationOptions: { title: 'Sign In' }},
}, {
   initialRouteName: 'LogIn'
})

class AuthLoadingScreen extends React.Component {
   constructor(props) {
      super(props);
      this._bootstrapAsync();
   }

   _bootstrapAsync = async () => {
      const userToken = await AsyncStorage.getItem('authToken');
      this.props.navigation.navigate(userToken ? 'App':'Auth');
   }

   render() {
      return (
         <View>
            <ActivityIndicator />
            <StatusBar barStyle="default" />
         </View>
      );
   }
}

const AppNavigator = createSwitchNavigator({
   Auth: AuthStack,
   App: AppStack,
   AuthLoading: {screen: AuthLoadingScreen}
}, {
   initialRouteName: 'AuthLoading'
})

const AppContainer = createAppContainer(AppNavigator);

export default class App extends Component {
   render() {
      return <AppContainer />;
   }
}
