[![npm](https://img.shields.io/badge/npm-v0.1.0-blue)](https://www.npmjs.com/package/react-native-notification-stack-card)
[![license](https://img.shields.io/github/license/mashape/apistatus.svg)]()

# React Native Notification Stack Card

A React Native stack list for notification card

## Preview

[![notif-cardsfd3015b508480d7b.gif](https://s8.gifyu.com/images/notif-cardsfd3015b508480d7b.gif)](https://gifyu.com/image/gkrR)

## Installation
`npm install react-native-notification-stack-card --save`

## Usage
<img src="https://i.ibb.co/2YFrqRV/Screen-Shot-2020-08-31-at-19-36-28.png" width="500" height="500">

Import **StackCardList** component:

```
import StackCardList from 'react-native-notification-stack-card';
```

Usage:

```
  <StackCardList
      data={data}
      visibleItems={VISIBLE_ITEMS}
      itemWidth={ITEM_WIDTH}
      itemHeight={ITEM_HEIGHT}
      closeButtonView={<Icon name={'close'} color={'#ffffff'} size={20} />}
      stackType={'above'}
      spacing={SPACING}
      onEmpty={this.onEmpty}
      onItemPress={this.onItemPress}
      renderItem={this.renderItem}
    />
  )
```

Customize your notification view based on **index** and **activeIndex**:
```
  const renderItem = (item: any) => {
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

    return <YourContentView backgroundColor={backgroundColor} />;
  };
```

### closeButtonView

To create close button there are 2 option:

1. You can use `closeButtonView` props. The position is absolute (left: 20, top: 20). Pass your `x` icon or anything your view.

<img src="https://i.ibb.co/ZdXsxpZ/Screen-Shot-2020-08-31-at-19-38-11.png" width="500" height="500">

2. Create you own close button. And use `next()` when it pressed.

<img src="https://i.ibb.co/rMJCxnq/Screen-Shot-2020-08-31-at-19-37-34.png" width="500" height="500">

## Configuration

### Props

| prop | type/valid values | default | description |
| - | - | - | - |
| visibleItems | number | 3 | Number of visible items |
| stackType | string | 'below' | above / below |
| data | any | [] | Array data of notification item |
| itemWidth | number | 100 | Note: You also need configure `width` on your `renderItem` |
| itemHeight | number | 100 | Note: You also need configure `height` on your `renderItem` |
| spacing | number | 10 | Spacing of your item |
| closeButtonView | ReactElement | null | View of close button |
| renderItem | (item: any) => () | null | Rendering your item. Destructure `activeIndex` from `item` and customize based on it. |
| onItemPress | (index: number: item: any) => () | null | Callback when your item press |
| onEmpty | () => () | null | Callback when you already close all your item |

### Function

| function | description |
| - | - |
| next() | To close your active notif and next to the notif behind |


## Demo Application
This repository contains a demo React Native application with a customizable example of the `StackCardList` component in use.

To use the demo application:

1) Clone this repository: `https://github.com/iqbalansyor/react-native-notification-stack-card.git`
2) Navigate to the demo application: `cd path/to/this/repository/react-native-notification-stack-card/Example`
3) Install demo application dependencies: `npm install`
4) For ios, run `cd ios && pod install && cd ..`
5) Run `npm run start` || `react-native run-android` || `react-native run-ios`

## Contact me
* **Iqbal Ansyori** - [ansyori.iqbal@gmail.com](mailto:ansyori.iqbal@gmail.com)

## Contributing
Feel free to try it out. Please submit a pull request with any features/fixes for the project.

## License
This project is licensed under the MIT License - see the [MIT Open Source Initiative](https://opensource.org/licenses/MIT) for details.
