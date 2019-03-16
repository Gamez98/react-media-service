import React from 'react';
import { View } from 'react-native';

import { Card, ListItem  } from 'react-native-elements';

import { getMoviesByCategory } from '../../api/movies';

class ByCategory extends React.Component {

   constructor(props) {
      super(props);
      this.state = {
         movies: [{}]
      }
   }

   componentWillMount = async () => {
      const { category } = this.props.navigation.state.params;
      const movies = await getMoviesByCategory(category);
      const { success, result } = movies;
      if(success) {
         this.setState({movies: result});
      } else {
         return;
      }
   }

   render() {
      const { movies } = this.state;
      return (
         <View>
            <Card>
               {
                  movies.map((data, i) => {
                  return (
                     <ListItem 
                        key={i}
                        rightAvatar={{
                           source: { uri: data.image_path }
                        }}
                        title={data.title}
                        topDivider={true}
                        bottomDivider={true}
                        onPress={() => this.props.navigation.navigate('Movie', {title: data.title})}
                        />
                     )
                  })
               }
            </Card>
         </View>
      );
   }
};

export default ByCategory;