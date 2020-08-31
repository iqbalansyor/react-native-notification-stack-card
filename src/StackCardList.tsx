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
  onItemPress: (index: number, item: any) => void;
  onEmpty: () => void;
}

interface StackCardListState {
  listIndex: number;
}

class StackCardList extends React.Component<
  StackCardListProps,
  StackCardListState
> {
  scrollXIndex: Animated.Value;
  scrollXAnimated: Animated.Value;

  constructor(props) {
    super(props);
    this.scrollXIndex = new Animated.Value(0);
    this.scrollXAnimated = new Animated.Value(0);
    this.state = {
      listIndex: 0,
    };
  }

  componentDidMount() {
    Animated.timing(this.scrollXAnimated, {
      toValue: this.scrollXIndex,
      useNativeDriver: true,
    }).start();
  }

  next = () => {
    this.scrollXIndex.setValue(this.state.listIndex + 1);
    this.setState({ listIndex: this.state.listIndex + 1 });

    if (this.state.listIndex === this.props.data.length - 1) {
      this.props.onEmpty && this.props.onEmpty();
    }
  };

  render() {
    const { listIndex } = this.state;
    return (
      <FlatList
        style={{
          height:
            this.props.spacing * (this.props.visibleItems - 1) +
            this.props.itemHeight,
        }}
        data={this.props.data}
        keyExtractor={(_, index) => String(index)}
        horizontal
        inverted
        contentContainerStyle={{
          flex: 1,
          justifyContent: 'center',
          marginBottom:
            this.props.stackType === 'below'
              ? this.props.spacing * (this.props.visibleItems - 1)
              : 0,
          marginTop:
            this.props.stackType === 'below'
              ? 0
              : this.props.spacing * (this.props.visibleItems - 1),
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
          let spacing = this.props.spacing;
          if (this.props.stackType === 'below') {
            spacing = -this.props.spacing;
          }

          let { item, index } = renderItemProps;
          let newRenderItemProps = {
            ...renderItemProps,
            activeIndex: listIndex,
          };
          console.log('print', index, listIndex);
          const inputRange = [index - 1, index, index + 1, index + 2];
          const translateX = this.scrollXAnimated.interpolate({
            inputRange,
            outputRange: [0, 0, 0, 1000],
          });
          const translateY = this.scrollXAnimated.interpolate({
            inputRange,
            outputRange: [-spacing, 0, 0, 1000],
          });
          const scale = this.scrollXAnimated.interpolate({
            inputRange,
            outputRange: [0.95, 1, 0, 0],
          });
          const opacity = this.scrollXAnimated.interpolate({
            inputRange,
            outputRange: [
              index - listIndex >= this.props.visibleItems ? 0 : 1,
              1,
              0,
              0,
            ],
          });

          return (
            <Animated.View
              style={{
                position: 'absolute',
                left: -this.props.itemWidth / 2,
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
                  this.props.onItemPress && this.props.onItemPress(index, item);
                }}
              >
                <View>
                  <View>{this.props.renderItem(newRenderItemProps)}</View>
                  {this.props.closeButtonView ? (
                    <TouchableOpacity
                      style={{
                        top: 20,
                        right: 20,
                        position: 'absolute',
                      }}
                      onPress={() => {
                        this.next();
                      }}
                    >
                      {this.props.closeButtonView}
                    </TouchableOpacity>
                  ) : null}
                </View>
              </TouchableOpacity>
            </Animated.View>
          );
        }}
      />
    );
  }
}

export default StackCardList;
