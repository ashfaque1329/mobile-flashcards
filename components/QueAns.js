import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from 'react-native'
import { styles } from '../utils/styles'
import { purple, white } from '../utils/colors'

class QueAns extends Component {
  state = {
    flipBtnText: 'Answer'
  }
  componentWillMount() {
    this.animatedValue = new Animated.Value(0)
    this.value = 0
    this.buttonText = 'Answer'

    this.animatedValue.addListener(({value}) => {
      this.value = value
    })

    this.frontInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['0deg', '180deg']
    })

    this.backInterpolate = this.animatedValue.interpolate({
      inputRange: [0, 180],
      outputRange: ['180deg', '0deg']
    })

    this.frontOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [1, 0]
    })

    this.backOpacity = this.animatedValue.interpolate({
      inputRange: [89, 90],
      outputRange: [0, 1]
    })
  }

  flip() {
    if (this.value >= 90){
      Animated.spring(this.animatedValue, {
        toValue: 0,
        friction: 8,
        tension: 10,
      }).start()
      this.setState({flipBtnText: 'Answer'})
    } else {
      Animated.spring(this.animatedValue, {
        toValue: 180,
        friction: 8,
        tension: 10,
      }).start()
      this.setState({flipBtnText: 'Question'})
    }
  }

  render() {
    const { question, answer } = this.props.card

    const frontAnimatedStyle = {
      transform: [
        {rotateY: this.frontInterpolate}
      ],
      opacity: this.frontOpacity,
    }

    const backAnimatedStyle = {
      transform: [
        {rotateY: this.backInterpolate}
      ],
      opacity: this.backOpacity,
    }

    return (
      <View style={styles.container}>
        <View>
          <Animated.View
            style={[ flipStyles.flipCard, frontAnimatedStyle ]}>
            <Text style={styles.queAnsText}>
              {question}
            </Text>
          </Animated.View>
          <Animated.View
            style={[ flipStyles.flipCard, flipStyles.flipCardBack, backAnimatedStyle ]}>
            <Text style={styles.queAnsText}>
              {answer}
            </Text>
          </Animated.View>
        </View>
        <TouchableOpacity onPress={() => this.flip()}>
          <Text style={flipStyles.flipBtnText}>
            {this.state.flipBtnText}
          </Text>
        </TouchableOpacity>
      </View>
    )
  }
}

const flipStyles = StyleSheet.create({
  flipCard: {
    height: 200,
    width: 300,
    alignSelf: 'center',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: purple,
    margin: 20,
    borderRadius: 10,
  },
  flipCardBack: {
    position: "absolute",
    top: 0,
  },
  flipBtnText: {
    fontSize: 20,
    textAlign: 'center',
    color: purple
  }
})

export default QueAns

