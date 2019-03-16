import React from 'react';
import { View, StyleSheet, ScrollView, TouchableHighlight } from 'react-native';

import { Card, Input, Image } from 'react-native-elements';

import { getMoviesByName } from '../../api/movies';

class Search extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         movies: [{}]
      }

      this.handleTextChange = this.handleTextChange.bind(this);
   }

   handleTextChange = async (name) => {
      const movies = await getMoviesByName(name);
      const { success, result } = movies;
      if(success) {
         this.setState({movies: result})
      }
      console.log(movies)
   }

   render() {
      const { movies } = this.state;
      return (
         <View>
            <Card>
               <Input 
                  placeholder="Search by name..."
                  autoCapitalize="none"
                  onChangeText={(name) => this.handleTextChange(name)}
                  />
            </Card>
            <Card>
               <ScrollView style={stylesGrid.sectionContainer} >
                  {movies.map((data, i) => {
                     return (
                        <TouchableHighlight 
                           key={i} 
                           onPress={() => this.props.navigation.navigate('Movie', {title: data.title})}
                           >
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

export default Search;