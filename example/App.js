import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Animated
} from 'react-native';
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
