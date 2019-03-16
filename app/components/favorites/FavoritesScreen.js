import React from 'react';
import { View, Text, ScrollView, Alert } from 'react-native';

import { Card, Header, Button, ListItem } from 'react-native-elements';

import { getUserFavorites, removeUserFavorite } from '../../api/profile';

class Favorites extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         movieList: [],
         iconUrl: 'http://pngimages.net/sites/default/files/recycle-bin-logo-png-image-70089.png'
      }

      this.removeFromFavorites = this.removeFromFavorites.bind(this)
   }

   componentWillMount = async () => {
      const request = await getUserFavorites();
      const { success, result } = request;
      if(!success) return;
      this.setState({ movieList: result})
   }

   removeFromFavorites = async (movie_id) => {
      const req = await removeUserFavorite(movie_id)
      if(!req.success) return;
      const request = await getUserFavorites();
      const { success, result } = request;
      if(!success) return;
      this.setState({ movieList: result})
   }

   render() {

      const { movieList, iconUrl } = this.state;

      return (
         <View>
            <Card>
               <ScrollView>
               {movieList.map((data, i) => {
                  return (
                     <ListItem 
                        key={i}
                        leftAvatar={{
                           source: { uri: data.image_path }
                        }}
                        rightAvatar={{
                           rounded: false,
                           source: { uri: iconUrl },
                           avatarStyle: { backgroundColor: 'white' },
                        }}
                        title={data.title}
                        topDivider={true}
                        bottomDivider={true}
                        onLongPress={() => this.props.navigation.navigate('Movie', {title: data.title})}
                        onPress={() => this.removeFromFavorites(data.id)}
                     />
                     )
                  })
               }
               </ScrollView>
            </Card>

         </View>
      );
   }
};


export default Favorites;