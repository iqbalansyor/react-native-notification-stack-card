import * as React from 'react';
import {
  FlatList,
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';
// import { TouchableWithoutFeedback } from 'react-native-gesture-handler';
// import {TouchableHighlight} from 'react-native-gesture-handler';

interface StackListProps {
  visibleItems: number;
  data: any[];
  itemWidth: number;
  itemHeight: number;
  spacing: number;
  closeButtonView: React.ReactElement;
  renderItem: (item: any) => React.ReactElement;
}

export let setActiveIndex = (index: number) => {};

const StackList: React.FunctionComponent<StackListProps> = (
  props: StackListProps,
) => {
  const scrollXIndex = React.useRef(new Animated.Value(0)).current;
  const scrollXAnimated = React.useRef(new Animated.Value(0)).current;
  const [listIndex, setListIndex] = React.useState(0);
  setActiveIndex = React.useCallback((activeIndex) => {
    scrollXIndex.setValue(activeIndex);
    setListIndex(activeIndex);
  });

  React.useEffect(() => {
    Animated.timing(scrollXAnimated, {
      toValue: scrollXIndex,
      useNativeDriver: true,
    }).start();
  });

  return (
    <FlatList
      data={props.data}
      keyExtractor={(_, index) => String(index)}
      horizontal
      inverted
      contentContainerStyle={{
        flex: 1,
        justifyContent: 'center',
        marginTop: 0.05 * props.itemHeight * props.visibleItems,
      }}
      scrollEnabled={false}
      removeClippedSubviews={false}
      CellRendererComponent={(itemProps) => {
        const {item, index, children, style, ...props} = itemProps;
        const newStyle = [
          style,
          {
            zIndex:
              index < listIndex - 1
                ? -100
                : props.parentProps.data.length - index,
          },
        ];
        return (
          <View style={newStyle} index={index} {...props}>
            {children}
          </View>
        );
      }}
      renderItem={(renderItemProps) => {
        let {item, index} = renderItemProps;
        let newRenderItemProps = {...renderItemProps, activeIndex: listIndex};
        console.log('print', index, listIndex);
        const inputRange = [index - 1, index, index + 1, index + 2];
        const translateX = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [0, 0, 0, 1000],
        });
        const translateY = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [-props.spacing, 0, 0, 1000],
        });
        const scale = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [0.95, 1, 0, 0],
        });
        const opacity = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [
            index - listIndex >= props.visibleItems ? 0 : 1,
            1,
            0,
            0,
          ],
        });

        return (
          <Animated.View
            style={{
              position: 'absolute',
              left: -props.itemWidth / 2,
              opacity,
              transform: [
                {
                  translateX,
                },
                {translateY},
                {scale},
              ],
            }}>
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={(index) => {
                console.log('printpress', index);
              }}>
              <View>
                <View>{props.renderItem(newRenderItemProps)}</View>
                {props.closeButtonView ? (
                  <TouchableOpacity
                    style={{
                      top: 20,
                      right: 20,
                      position: 'absolute',
                    }}
                    onPress={() => {
                      console.log('print', index);
                      setActiveIndex(index + 1);
                    }}>
                    {props.closeButtonView}
                  </TouchableOpacity>
                ) : null}
              </View>
            </TouchableOpacity>
          </Animated.View>
        );
      }}
    />
  );
};

export default StackList;

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
