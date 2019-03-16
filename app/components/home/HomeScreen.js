import React from 'react';
import { View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';

import { Card, Image } from 'react-native-elements';

import { 
   getMovies,
   getMoviesByCategory
} from '../../api/movies';

class Home extends React.Component {
   constructor(props) {
      super(props);
      this.state = {
         movies: [],
         moviesSuccess: false
      }
   }

   componentWillMount = async () => {
      const { success, result } = await getMovies();
      if(success) {
         this.setState({moviesSuccess: true})
         this.setState({movies: result})
      } else {
         return;
      }
   }

   render() {

      const { movies } = this.state;

      return (
         <View>
            <Card>
               <ScrollView style={stylesGrid.sectionContainer} >
                  {movies.map((data, i) => {
                     return (
                        <TouchableHighlight
                           key={i} 
                           onPress={() => this.props.navigation.navigate('Movie', {title: data.title})}>
                           <Image 
                              key={i}
                              source={{uri: data.image_path}}
                              style={stylesGrid.imageContainer}
                              />
                        </TouchableHighlight>
                     )} 
                  )}
               </ScrollView>
            </Card>
         </View>
      );
   }
};


const stylesGrid = StyleSheet.create({
   sectionContainer: {
      flexGrow: 1
   },
   imageContainer: {
      width: '100%',
      margin: '1%',
      aspectRatio: 1
   }
})

export default Home;