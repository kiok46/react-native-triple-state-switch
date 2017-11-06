import React, { Component } from 'react';
import {
    View,
	ViewPropTypes,
    StyleSheet,
    Text,
    Animated,
    PanResponder,
	TouchableOpacity
} from 'react-native';
import PropTypes from 'prop-types';


export default class TrippleToggleSwitch extends Component {
    constructor(props) {
      super(props)
      this.animatedObject = null;
      this.animatedSetValue = null;

      this.switchOffSet = 10;

      this.MIN_VALUE = this.props.minValue;
      this.MAX_VALUE = this.props.maxValue;

      this.MID_VALUE = (this.MIN_VALUE + this.MAX_VALUE)/2
      this.TOTAL_DISTANCE = Math.sqrt(Math.pow(this.MAX_VALUE - this.MIN_VALUE, 2))
      this.factor = this.TOTAL_DISTANCE/3

      this.MID_LEFT_VALUE = this.MIN_VALUE + this.factor
      this.MID_RIGHT_VALUE =  this.MAX_VALUE - this.factor

      this.state = {
          startValue: this.MIN_VALUE,
          calledState: 'left',
		  activeIdx: this.props.defaultActiveIndex
	  }

      this._switchvalue = this.state.startValue;
      this._animatedValue = new Animated.Value(this._switchvalue);
      this._animatedValue.addListener(({value}) => this._switchvalue = value);
    }

	setActiveIndex = (idx) => {
        if (idx===0) {
            this._animateToSwitchItem(this.MIN_VALUE)
        }else if (idx===1) {
            this._animateToSwitchItem(this.MID_VALUE)
        }else {
            this._animateToSwitchItem(this.MAX_VALUE)
        }

		this.setState({ activeIdx: idx })
	}


    componentWillMount () {
      this._panResponder = PanResponder.create({
        onStartShouldSetPanResponder: (evt, gestureState) => true,
        onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
        onMoveShouldSetPanResponder: this._onMoveShouldSetPanResponder,
        onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
        onPanResponderTerminationRequest: (evt, gestureState) => false,
        onPanResponderGrant: this._onPanResponderGrant,
        onPanResponderMove: this._onPanResponderMove,
        onPanResponderRelease: this._onPanResponderRelease
      })
    }

    _onMoveShouldSetPanResponder = (evt, gestureState) => {
        return Math.abs(gestureState.dx) > 5;
    }

    _onPanResponderMove = (evt, gestureState) => {
        if ([this.MIN_VALUE, this.MID_VALUE, this.MAX_VALUE].includes(this._switchvalue)){
            this.animatedSetValue = this._switchvalue + gestureState.dx;
        } else {
            this.animatedSetValue = this.state.startValue + gestureState.dx;
        }

        if (this._switchvalue >= this.MAX_VALUE){
            if (gestureState.dx > 0){}else {
                this._animatedValue.setValue(this.animatedSetValue)
            }
        } else if (this._switchvalue <= this.MIN_VALUE) {
            if (gestureState.dx < 0){}else {
                this._animatedValue.setValue(this.animatedSetValue)
            }
        } else {
            this._animatedValue.setValue(this.animatedSetValue)
            if (this.animatedSetValue < this.MID_LEFT_VALUE && this.state.calledState !== 'left'){
                this.onLeftState(animate=false)
            }else if (this.animatedSetValue > this.MID_LEFT_VALUE && this.animatedSetValue < this.MID_RIGHT_VALUE && this.state.calledState !== 'middle') {
                this.onMiddleState(animate=false)
            }else if (this.animatedSetValue > this.MID_RIGHT_VALUE && this.animatedSetValue < this.MAX_VALUE && this.state.calledState !== 'right') {
                this.onRightState(animate=false)
            }else {}


        }
    }

    _onPanResponderGrant = (evt, gestureState) => {

    }

    _onPanResponderRelease = (evt, gestureState) => {
        if (this._switchvalue >= this.MID_RIGHT_VALUE){
            this._animateToSwitchItem(this.MAX_VALUE)
        } else if (this._switchvalue >= this.MID_LEFT_VALUE && this._switchvalue <= this.MID_RIGHT_VALUE) {
            this._animateToSwitchItem(this.MID_VALUE)
        } else {
            this._animateToSwitchItem(this.MIN_VALUE)
        }
    }

    _animateToSwitchItem = (toValue) => {
        Animated.timing(this._animatedValue, {
            toValue: toValue,
            duration: this.props.switchShiftTime
        }, {useNativeDrive: true}).start(() => {
            this.setState({startValue: toValue})
        });
    }

    onLeftState = (animate=true) => {
        if (animate === true){
            this.setActiveIndex(0)
        } else {
            this.setState({calledState: 'left'})
        }
        this.props.onLeftState()
    }

    onMiddleState = (animate=true) => {
        if (animate === true){
            this.setActiveIndex(1)
        } else {
            this.setState({calledState: 'middle'})
        }
        this.props.onMiddleState()
    }

    onRightState = (animate=true) => {
        if (animate === true){
            this.setActiveIndex(2)
        } else {
            this.setState({calledState: 'right'})
        }
        this.props.onRightState()
    }

	renderToggleItems = () => {
		const { children } = this.props;
		const AnimatedIcon = this.props.AnimatedIcon;
		const toggleButtons = !Array.isArray(children) ? [children] : children;

		return (
			<View style={[this.props.itemsContainer,]}>
                <Animated.View
                    ref={animatedObject => this.animatedObject = animatedObject}
                    {...this._panResponder.panHandlers}
                    style={[{left: this._animatedValue}, this.props.floatingPointerStyle,]}>
                </Animated.View>

                <Animated.View
                    ref={animatedObject => this.animatedObject = animatedObject}
                    {...this._panResponder.panHandlers}
                    style={[{left: this._animatedValue}, this.props.floatingPointerStyle, {zIndex: 99, backgroundColor: 'transparent'}]}>
                </Animated.View>

                <TouchableOpacity
                    {...this._panResponder.panHandlers}
                    style={[this.props.itemContainer, {elevation: 100}]}
                    onPress={() => this.onLeftState()}
                >
                    <AnimatedIcon name={this.props.leftStateIconName} size={this.props.stateIconSize}
                        style={{color: this._animatedValue.interpolate({
                              inputRange: [this.MIN_VALUE, this.MID_LEFT_VALUE, this.MAX_VALUE],
                              outputRange: [this.props.secondaryColor, this.props.primaryColor, this.props.primaryColor]
                          })
                        }}
					/>

                </TouchableOpacity>

                <TouchableOpacity
                    style={[this.props.itemContainer, {elevation: 100}]}
                    onPress={() => this.onMiddleState()}
                >
                    <AnimatedIcon name={this.props.middleStateIconName} size={this.props.stateIconSize} style={{
                        color: this._animatedValue.interpolate({
                            inputRange: [this.MIN_VALUE, this.MID_LEFT_VALUE, this.MID_RIGHT_VALUE, this.MAX_VALUE],
                            outputRange: [this.props.primaryColor, this.props.secondaryColor, this.props.secondaryColor, this.props.primaryColor]
                        })
                    }} />
                </TouchableOpacity>

                <TouchableOpacity
                    style={[this.props.itemContainer, {elevation: 100}]}
                    onPress={() => this.onRightState()}
                >
                    <AnimatedIcon name={this.props.rightStateIconName} size={this.props.stateIconSize} style={{
                        color: this._animatedValue.interpolate({
                            inputRange: [this.MIN_VALUE, this.MID_RIGHT_VALUE, this.MAX_VALUE],
                            outputRange: [this.props.primaryColor, this.props.primaryColor, this.props.secondaryColor]
                        })
                    }} />
                </TouchableOpacity>

			</View>
		)

	}

	render(){
		return(
	          <View style={{backgroundColor: 'transparent', paddingLeft: 10, paddingRight: 10}}>
                  <View style={[this.props.itemsContainerBackgroundStyle, ]}/>

                  {this.renderToggleItems()}
	          </View>
		)
    }
}


TrippleToggleSwitch.defaultProps = {
	defaultActiveIndex: 0,
    minValue: 0,
    maxValue: 115,
	leftStateIconName: 'facebook',
	middleStateIconName: 'twitter',
	rightStateIconName: 'github',
	stateIconSize: 30,
    switchShiftTime: 200,
	primaryColor: '#124E96',
	secondaryColor: 'white',
    itemContainer: {
	  backgroundColor: 'transparent',
	  height: 60,
	  width: 60,
	  alignItems: 'center',
	  justifyContent: 'center',
	},
    floatingPointerStyle: {
      position: 'absolute',
      backgroundColor: '#124E96',
      height: 80,
      width: 80,
      borderRadius: 40,
      elevation: 7,
      marginLeft: -7.5,
      marginRight: 7.5,
      marginTop: 2.5,
      shadowOpacity: 0.0015 * 7 + 0.18,
      shadowRadius: 0.54 * 7,
      shadowOffset: {
        height: 0.6 * 7,
      },
    },
	itemsContainer: {
	  flexDirection: 'row',
	  paddingTop: 15,
      paddingBottom: 15,
	},
	itemsContainerBackgroundStyle: {
		position: 'absolute',
		height: 60,
        left: 0,
        right: 0,
        top: 0.5,
        marginTop: 15,
        marginLeft: 7.5,
        marginRight: 7.5,
		borderRadius: 30,
		backgroundColor: 'white'
	},
	onLeftState: () => {},
    onMiddleState: () => {},
    onRightState: () => {}
}

TrippleToggleSwitch.propTypes = {
	defaultActiveIndex: PropTypes.number,
    minValue: PropTypes.number,
    maxValue: PropTypes.number,
	leftStateIconName: PropTypes.string,
	middleStateIconName: PropTypes.string,
	rightStateIconName: PropTypes.string,
	stateIconSize: PropTypes.number,
    switchShiftTime: PropTypes.number,
	primaryColor: PropTypes.string,
	secondaryColor: PropTypes.string,
	itemContainer: ViewPropTypes.style,
	itemsContainer: ViewPropTypes.style,
    floatingPointerStyle: ViewPropTypes.style,
	itemsContainerBackgroundStyle: ViewPropTypes.style,
	onLeftState: PropTypes.func,
    onMiddleState: PropTypes.func,
    onRightState: PropTypes.func,
}
