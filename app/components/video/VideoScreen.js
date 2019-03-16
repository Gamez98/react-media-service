import React from 'react';
import { View, StyleSheet } from 'react-native';

import Video from 'react-native-video';

class VideoScreen extends React.Component {
   render() {
      return (
         <View>
            <Video
               source={{
                  uri: "https://external-preview.redd.it/mp4/NpXKpCnyB115LMtfPGErbcu2svpu3acCnbjy7jI6_10-source.mp4?s=592250c24a1967a42d0d891dac361daaac8771b9"
               }}
               ref={(ref) => {
                  this.player = ref
               }}  
               style={styles.backgroundVideo}
               />
         </View>
      );
   }
};

var styles = StyleSheet.create({
   backgroundVideo: {
      position: 'absolute',
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
   },
});

export default VideoScreen;