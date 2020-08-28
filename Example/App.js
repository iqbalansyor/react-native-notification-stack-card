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
  Alert,
} from 'react-native';
const {width} = Dimensions.get('screen');
import StackCardList, {
  setActiveIndex,
} from 'react-native-notification-stack-card'; // setActiveIndex,
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';

const DATA = [{}, {}, {}, {}, {}, {}, {}];

const SPACING = 20;
const ITEM_WIDTH = width * 0.86;
const ITEM_HEIGHT = ITEM_WIDTH * 0.4;
const VISIBLE_ITEMS = 3;

export default function App() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar hidden />
      <BelowNotifification />
      <AboveNotification />
      <LittleBelowNotification />
      <LittleAboveNotification />
    </SafeAreaView>
  );
}

const BelowNotifification = () => {
  const [data, setData] = React.useState(DATA);
  const [isShow, setIsShow] = React.useState(true);
  return isShow ? (
    <StackCardList
      data={data}
      visibleItems={VISIBLE_ITEMS}
      itemWidth={ITEM_WIDTH}
      itemHeight={ITEM_HEIGHT}
      closeButtonView={<Icon name={'close'} color={'#ffffff'} size={20} />}
      stackType={'above'}
      spacing={SPACING}
      onEmpty={() => {
        setIsShow(false);
        Alert.alert('Notification empty', `Notification empty`, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }}
      onItemPress={(index) => {
        Alert.alert(
          'Notification clicked',
          `Notification Clicked index ${index}`,
          [
            {
              text: 'OK',
              onPress: () => {},
            },
          ],
        );
      }}
      renderItem={(item) => {
        const {index, activeIndex} = item;
        const isActiveIndex = index === activeIndex;
        const isSecondIndex = (index === index) === activeIndex + 1;
        const isThirdIndex = index === activeIndex + 2;
        const isAfterClicked = index < activeIndex;
        const backgroundColor = isActiveIndex
          ? 'transparent'
          : isSecondIndex
          ? '#95A9F7'
          : isThirdIndex
          ? '#BDC9F9'
          : isAfterClicked
          ? '#BDC9F9'
          : '#95A9F7';
        const contentView = (
          <View
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              borderRadius: 24,
              backgroundColor: backgroundColor,
            }}>
            <View style={{marginHorizontal: 15, marginTop: 24}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: 8,
                  fontSize: 14,
                }}>
                {`[Below] This is your notification (${index})`}
              </Text>
              <Text style={{color: 'white', fontSize: 13, lineHeight: 18}}>
                {
                  'We have notification on your app. This is your first notifaction'
                }
              </Text>
            </View>
          </View>
        );
        return (
          <>
            {isActiveIndex ? (
              <LinearGradient
                colors={['#1F30BA', '#3F5FE3']}
                style={{borderRadius: 24}}>
                {contentView}
              </LinearGradient>
            ) : (
              <View
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  borderRadius: 24,
                  backgroundColor: backgroundColor,
                }}></View>
            )}
          </>
        );
      }}
    />
  ) : null;
};

const AboveNotification = () => {
  const [data, setData] = React.useState(DATA);
  const [isShow, setIsShow] = React.useState(true);
  return isShow ? (
    <StackCardList
      data={data}
      visibleItems={VISIBLE_ITEMS}
      itemWidth={ITEM_WIDTH}
      itemHeight={ITEM_HEIGHT}
      closeButtonView={<Icon name={'close'} color={'#ffffff'} size={20} />}
      stackType={'below'}
      spacing={SPACING}
      onEmpty={() => {
        setIsShow(false);
        Alert.alert('Notification empty', `Notification empty`, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }}
      onItemPress={(index) => {
        Alert.alert(
          'Notification clicked',
          `Notification Clicked index ${index}`,
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
        );
      }}
      renderItem={(item) => {
        const {index, activeIndex} = item;
        const isActiveIndex = index === activeIndex;
        const isSecondIndex = (index === index) === activeIndex + 1;
        const isThirdIndex = index === activeIndex + 2;
        const isAfterClicked = index < activeIndex;
        const backgroundColor = isActiveIndex
          ? 'transparent'
          : isSecondIndex
          ? '#95A9F7'
          : isThirdIndex
          ? '#BDC9F9'
          : isAfterClicked
          ? '#BDC9F9'
          : '#95A9F7';
        const contentView = (
          <View
            style={{
              width: ITEM_WIDTH,
              height: ITEM_HEIGHT,
              borderRadius: 24,
              backgroundColor: backgroundColor,
            }}>
            <View style={{marginHorizontal: 15, marginTop: 24}}>
              <Text
                style={{
                  color: 'white',
                  fontWeight: 'bold',
                  marginBottom: 8,
                  fontSize: 14,
                }}>
                {`[Above] This is your notification (${index})`}
              </Text>
              <Text style={{color: 'white', fontSize: 13, lineHeight: 18}}>
                {
                  'We have notification on your app. This is your first notifaction'
                }
              </Text>
            </View>
          </View>
        );
        return (
          <>
            {isActiveIndex ? (
              <LinearGradient
                colors={['#DA2BF7', '#A527BC']}
                style={{borderRadius: 24}}>
                {contentView}
              </LinearGradient>
            ) : (
              <View
                style={{
                  width: ITEM_WIDTH,
                  height: ITEM_HEIGHT,
                  borderRadius: 24,
                  backgroundColor: backgroundColor,
                }}></View>
            )}
          </>
        );
      }}
    />
  ) : null;
};

const SPACING_L = 10;
const ITEM_WIDTH_L = width * 0.86;
const ITEM_HEIGHT_L = ITEM_WIDTH * 0.2;
const VISIBLE_ITEMS_L = 3;

const LittleBelowNotification = () => {
  const [data, setData] = React.useState(DATA);
  const [isShow, setIsShow] = React.useState(true);
  let notifRef = {};
  return isShow ? (
    <StackCardList
      ref={(ref) => {
        notifRef = ref;
      }}
      data={data}
      visibleItems={VISIBLE_ITEMS_L}
      itemWidth={ITEM_WIDTH_L}
      itemHeight={ITEM_HEIGHT_L}
      stackType={'below'}
      spacing={SPACING_L}
      onItemPress={(index) => {
        Alert.alert(
          'Notification clicked',
          `Notification Clicked index ${index}`,
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
        );
      }}
      onEmpty={() => {
        setIsShow(false);
        Alert.alert('Notification empty', `Notification empty`, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }}
      renderItem={(item) => {
        const {index, activeIndex} = item;
        const isActiveIndex = index === activeIndex;
        const isSecondIndex = (index === index) === activeIndex + 1;
        const isThirdIndex = index === activeIndex + 2;
        const isAfterClicked = index < activeIndex;
        const backgroundColor = isActiveIndex
          ? 'transparent'
          : isSecondIndex
          ? '#95A9F7'
          : isThirdIndex
          ? '#BDC9F9'
          : isAfterClicked
          ? '#BDC9F9'
          : '#95A9F7';
        const contentView = (
          <View
            style={{
              width: ITEM_WIDTH_L,
              height: ITEM_HEIGHT_L,
              borderRadius: 24,
              backgroundColor: backgroundColor,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 24,
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    marginBottom: 8,
                    fontSize: 14,
                  }}>
                  {`This is your notification (${index})`}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  paddingTop: 24,
                  paddingBottom: 24,
                  width: 50,
                  backgroundColor: '#000000',
                  opacity: 0.5,
                }}
                onPress={() => {
                  notifRef.next();
                }}>
                <Icon
                  name={'close'}
                  color={'#ffffff'}
                  size={20}
                  style={{marginLeft: 15}}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
        return (
          <>
            {isActiveIndex ? (
              <LinearGradient
                colors={['#3F5FE3', '#1F30BA']}
                style={{borderRadius: 18}}>
                {contentView}
              </LinearGradient>
            ) : (
              <View
                style={{
                  width: ITEM_WIDTH_L,
                  height: ITEM_HEIGHT_L,
                  borderRadius: 24,
                  backgroundColor: backgroundColor,
                }}></View>
            )}
          </>
        );
      }}
    />
  ) : null;
};

const LittleAboveNotification = () => {
  const [data, setData] = React.useState(DATA);
  const [isShow, setIsShow] = React.useState(true);
  let notifRef = {};
  return isShow ? (
    <StackCardList
      ref={(ref) => {
        notifRef = ref;
      }}
      data={data}
      visibleItems={VISIBLE_ITEMS_L}
      itemWidth={ITEM_WIDTH_L}
      itemHeight={ITEM_HEIGHT_L}
      stackType={'above'}
      spacing={SPACING_L}
      onItemPress={(index) => {
        console.log('press', index);
      }}
      onItemPress={(index) => {
        Alert.alert(
          'Notification clicked',
          `Notification Clicked index ${index}`,
          [
            {
              text: 'OK',
              onPress: () => console.log('OK Pressed'),
            },
          ],
        );
      }}
      onEmpty={() => {
        setIsShow(false);
        Alert.alert('Notification empty', `Notification empty`, [
          {
            text: 'OK',
            onPress: () => {},
          },
        ]);
      }}
      renderItem={(item) => {
        const {index, activeIndex} = item;
        const isActiveIndex = index === activeIndex;
        const isSecondIndex = (index === index) === activeIndex + 1;
        const isThirdIndex = index === activeIndex + 2;
        const isAfterClicked = index < activeIndex;
        const backgroundColor = isActiveIndex
          ? 'transparent'
          : isSecondIndex
          ? '#95A9F7'
          : isThirdIndex
          ? '#BDC9F9'
          : isAfterClicked
          ? '#BDC9F9'
          : '#95A9F7';
        const contentView = (
          <View
            style={{
              width: ITEM_WIDTH_L,
              height: ITEM_HEIGHT_L,
              borderRadius: 24,
              backgroundColor: backgroundColor,
            }}>
            <View
              style={{
                flexDirection: 'row',
              }}>
              <View
                style={{
                  marginHorizontal: 15,
                  marginTop: 24,
                  flex: 1,
                }}>
                <Text
                  style={{
                    color: 'white',
                    fontWeight: 'bold',
                    marginBottom: 8,
                    fontSize: 14,
                  }}>
                  {`This is your notification (${index})`}
                </Text>
              </View>
              <TouchableOpacity
                style={{
                  paddingTop: 24,
                  paddingBottom: 24,
                  width: 50,
                  backgroundColor: '#000000',
                  opacity: 0.5,
                }}
                onPress={() => {
                  notifRef.next();
                }}>
                <Icon
                  name={'close'}
                  color={'#ffffff'}
                  size={20}
                  style={{marginLeft: 15}}
                />
              </TouchableOpacity>
            </View>
          </View>
        );
        return (
          <>
            {isActiveIndex ? (
              <LinearGradient
                colors={['#DA2BF7', '#A527BC']}
                style={{borderRadius: 18}}>
                {contentView}
              </LinearGradient>
            ) : (
              <View
                style={{
                  width: ITEM_WIDTH_L,
                  height: ITEM_HEIGHT_L,
                  borderRadius: 24,
                  backgroundColor: backgroundColor,
                }}></View>
            )}
          </>
        );
      }}
    />
  ) : null;
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: '#fff',
  },
});
