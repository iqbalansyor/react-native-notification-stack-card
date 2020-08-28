import * as React from 'react';
import {
  FlatList,
  Animated,
  View,
  StyleSheet,
  TouchableOpacity,
  TouchableHighlight,
} from 'react-native';

interface StackCardListProps {
  visibleItems: number;
  stackType: string;
  data: any[];
  itemWidth: number;
  itemHeight: number;
  spacing: number;
  closeButtonView: React.ReactElement;
  renderItem: (item: any) => React.ReactElement;
  onItemPress: (index: number) => void;
}

export let setActiveIndex = (index: number) => {};

const StackCardList: React.FunctionComponent<StackCardListProps> = (
  props: StackCardListProps
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
        marginBottom:
          props.stackType === 'above' ? props.spacing * props.visibleItems : 0,
        marginTop:
          props.stackType === 'above' ? 0 : props.spacing * props.visibleItems,
      }}
      scrollEnabled={false}
      removeClippedSubviews={false}
      CellRendererComponent={(itemProps) => {
        const { item, index, children, style, ...props } = itemProps;
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
        let spacing = props.spacing;
        if (props.stackType === 'above') {
          spacing = -props.spacing;
        }

        let { item, index } = renderItemProps;
        let newRenderItemProps = { ...renderItemProps, activeIndex: listIndex };
        console.log('print', index, listIndex);
        const inputRange = [index - 1, index, index + 1, index + 2];
        const translateX = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [0, 0, 0, 1000],
        });
        const translateY = scrollXAnimated.interpolate({
          inputRange,
          outputRange: [-spacing, 0, 0, 1000],
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
                { translateY },
                { scale },
              ],
            }}
          >
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={(event) => {
                props.onItemPress(index);
              }}
            >
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
                      setActiveIndex(index + 1);
                    }}
                  >
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

export default StackCardList;
