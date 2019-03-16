import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

import { Card, Button } from 'react-native-elements';

import { getMoviesByName } from '../../api/movies';
import { insertUserFavorite } from '../../api/profile';

class Movie extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         movieInfo: {},
      }

      this.handleAddMovie = this.handleAddMovie.bind(this)
   }


   componentWillMount = async () => {
      const { title } = this.props.navigation.state.params;
      const movieInfo = await getMoviesByName(title);
      const { success, result } = movieInfo;
      if(success) {
         this.setState({movieInfo: result[0]})
      } else {
         return;
      }
      console.log('byname', movieInfo)
   }

   handleAddMovie = async (movieId) => {
      const req = await insertUserFavorite(movieId)
      const { success } = req;
      if(!success) return; 
      await alert('Added as Favorite!')
   }

   render() {
      const { movieInfo } = this.state;
      return (
         <View>
            <Card
               image={{
                  uri: `${movieInfo.image_path}`
               }}
               >

               <View style={stylesGrid.sectionContainer}>
                  <View style={stylesGrid.buttonStyle}>
                     <Button 
                        title="View"
                        onPress={() => this.props.navigation.navigate('Video') } 
                        />
                  </View>
                  <View style={stylesGrid.buttonStyle }>
                     <Button
                        title="Favorites"
                        onPress={() => this.handleAddMovie(movieInfo.id)}
                        />
                  </View>
               </View>

               <View style={stylesGrid.movieInformation}>
                  <Text> <Text style={{fontWeight:'bold'}}> Title: </Text> {movieInfo.title} </Text>
                  <Text> <Text style={{fontWeight:'bold'}}> Category:</Text> {movieInfo.category} </Text>
                  <Text> <Text style={{fontWeight:'bold'}}> Actors: </Text> {movieInfo.actors} </Text>
                  <Text> <Text style={{fontWeight:'bold'}}> Year: </Text> {movieInfo.year} </Text>
                  <Text> <Text style={{fontWeight:'bold'}}> Rate: </Text> {movieInfo.rate} </Text>
                  <Text> <Text style={{fontWeight:'bold'}}> Rated: </Text> {movieInfo.rated} </Text>
                  <Text> <Text style={{fontWeight:'bold'}}> Country: </Text> {movieInfo.country} </Text>
               </View>
            </Card>
         </View>
      );
   }
};

const stylesGrid = StyleSheet.create({
   sectionContainer: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      padding: 20
   },
   buttonStyle: {
      width: '48%',
   }, 
   movieInformation: {
      padding: 20
   }
})

export default Movie;