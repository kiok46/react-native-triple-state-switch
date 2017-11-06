# react-native-triple-state-switch
React Native Triple State Switch


![events](https://user-images.githubusercontent.com/7335120/32444755-b7779f42-c329-11e7-8e08-9942ffcc4f73.gif)
![animated](https://user-images.githubusercontent.com/7335120/32444785-cc352602-c329-11e7-98ac-55b9d20e7e02.gif)


### Installation
```
npm i react-native-triple-state-switch --save
```

### Supported Platforms

`iOS` and `Android`

## Usage example

```
import TrippleToggleSwitch from './TrippleToggleSwitch';
import Icon from 'react-native-vector-icons/FontAwesome';
const AnimatedIcon = Animated.createAnimatedComponent(Icon);

export default class App extends Component {

  constructor(props) {
      super(props)

      this.state = {
          bg: 'brown'
      }
  }

  render() {
    return (
      <View style={[styles.container, {backgroundColor: this.state.bg}]}>
	    <TrippleToggleSwitch
            onLeftState={()=>{this.setState({bg: 'grey'})}}
            onMiddleState={()=>{this.setState({bg: 'black'})}}
            onRightState={()=>{this.setState({bg: 'brown'})}}
            AnimatedIcon={AnimatedIcon}
            middleStateIconName={'instagram'}
        />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

});
```


## API


| Property     | Type     | Default               | Description                                                                                                |
|--------------|----------|-----------------------|------------------------------------------------------------------------------------------------------------|
| defaultActiveIndex      | number    | 0                    | Item index which should be active when the component renders                                                         |
| primaryColor  | string   | #124E96               | Color of icon when in non-active state & Color of icon background when in active state                                                                                 |
| secondaryColor      | string  | white                  | Color of icon when in active state & Color of icon background when in non-active state                                                                                   |
| minValue      | number  | 0                  | Min Value from left                                                                                   |
| maxValue      | number  | 115                  | Max Value from right                                                                                   |
| leftStateiconName      | string  | facebook                  | Left Icon Name                                                                                   |
| middleStateiconName      | string  | twitter                  | Middle Icon Name                                                                                   |
| rightStateiconName      | string  | github                  | Right Icon Name                                                                                   |
| stateIconSize      | number  | 30                  | Icon Size                                                                                   |
| switchShiftTime      | number  | 200                  | Animation Timing in ms                                                                                   |
| itemContainer      | style  | null                  | individual Icon styling                                                                                   |
| itemsContainer      | style  | null                  | Icons container styling                                                                                   |
| floatingPointerStyle      | style  | null                  | The draggable component's styling                                                                                   |
| itemsContainerBackgroundStyle      | style  | null                  | Icons container's background styling.                                                                                   |
| onLeftState      | function  | () => {}                  | Function to be called when either the left Icon is pressed or the draggable component is dragged on top of it.                                                                                   |
| onMiddleState      | function  | () => {}                  | Function to be called when either the middle Icon is pressed or the draggable component is dragged on top of it.                                                                                   |
| onRightState      | function  | () => {}                  | Function to be called when either the right Icon is pressed or the draggable component is dragged on top of it.                                                                                   |
