/**
 *
 * Inspiration: https://dribbble.com/shots/3731362-Event-cards-iOS-interaction
 */

import * as React from 'react';
import {
  StatusBar,
  Image,
  FlatList,
  Dimensions,
  Animated,
  Text,
  View,
  StyleSheet,
  SafeAreaView,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
const {width} = Dimensions.get('screen');
// import {EvilIcons} from '@expo/vector-icons';
import {
  FlingGestureHandler,
  Directions,
  State,
} from 'react-native-gesture-handler';
import StackList, {setActiveIndex} from './StackList';

// https://www.creative-flyers.com
const DATA = [
  {
    title: 'Afro vibes',
    location: 'Mumbai, India',
    date: 'Nov 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Afro-vibes-flyer-template.jpg',
  },
  {
    title: 'Jungle Party',
    location: 'Unknown',
    date: 'Sept 3rd, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2019/11/Jungle-Party-Flyer-Template-1.jpg',
  },
  {
    title: '4th Of July',
    location: 'New York, USA',
    date: 'Oct 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/4th-Of-July-Invitation.jpg',
  },
  {
    title: 'Summer festival',
    location: 'Bucharest, Romania',
    date: 'Aug 17th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/07/Summer-Music-Festival-Poster.jpg',
  },
  {
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
  },
  {
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
  },
  {
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  },
  {
    title: 'BBQ with friends',
    location: 'Prague, Czech Republic',
    date: 'Sept 11th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/BBQ-Flyer-Psd-Template.jpg',
  },
  {
    title: 'Festival music',
    location: 'Berlin, Germany',
    date: 'Apr 21th, 2021',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Festival-Music-PSD-Template.jpg',
  },
  {
    title: 'Beach House',
    location: 'Liboa, Portugal',
    date: 'Aug 12th, 2020',
    poster:
      'https://www.creative-flyers.com/wp-content/uploads/2020/06/Summer-Beach-House-Flyer.jpg',
  },
];

const SPACING = 10;
const ITEM_WIDTH = width * 0.86;
const ITEM_HEIGHT = ITEM_WIDTH * 0.4;
const VISIBLE_ITEMS = 3;

export default function App() {
  const [data, setData] = React.useState(DATA);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <StackList
        data={data}
        visibleItems={3}
        itemWidth={ITEM_WIDTH}
        itemHeight={ITEM_HEIGHT}
        closeButtonView={
          <View style={{width: 20, height: 20, backgroundColor: '#ffffff'}} />
        }
        spacing={10}
        renderItem={(item) => {
          const {index, activeIndex} = item;
          console.log('app', item);
          return (
            <>
              <View
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  borderRadius: 14,
                  backgroundColor:
                    index === activeIndex
                      ? '#354BFA'
                      : index === activeIndex + 1
                      ? '#95A9F7'
                      : index === activeIndex + 2
                      ? '#BDC9F9'
                      : index < activeIndex
                      ? '#BDC9F9'
                      : '#95A9F7',
                  // opacity:
                  //   index === activeIndex
                  //     ? 1
                  //     : index === activeIndex + 1
                  //     ? 0.7
                  //     : index === activeIndex + 2
                  //     ? 0.5
                  //     : 0,
                }}
              />
              {/* <TouchableOpacity
                style={{
                  top: 20,
                  right: 20,
                  position: 'absolute',
                }}
                onPress={() => {
                  console.log('print', index);
                  setActiveIndex(index + 1);
                }}>
                <View
                  style={{width: 20, height: 20, backgroundColor: '#ff23ff'}}
                />
              </TouchableOpacity> */}
            </>
          );
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: '900',
    textTransform: 'uppercase',
    letterSpacing: -1,
  },
  location: {
    fontSize: 16,
  },
  date: {
    fontSize: 12,
  },
});
