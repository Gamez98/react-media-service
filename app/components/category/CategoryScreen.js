import React from 'react';
import { View } from 'react-native';
import { Card, ListItem} from 'react-native-elements';

import { getCategories } from '../../api/movies';

class Category extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
         categories: []
      }
   }

   componentWillMount = async () => {
      const { success, result } = await getCategories();
      if(success) {
         this.setState({categories: result})
      }
   }

   render() {

      const { categories } = this.state;

      return (
         <View>
            <Card>
            {categories.map((data, i) => {
                  return (
                     <ListItem 
                        key={i}
                        title={data.category}
                        topDivider={true}
                        bottomDivider={true}
                        onPress={() => this.props.navigation.navigate('ByCategory', { category: data.category })}
                     />
                  )
               })
            }
            </Card>
         </View>
      );
   }
};

export default Category;