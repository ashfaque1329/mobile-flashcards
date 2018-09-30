import React, { Component } from 'react'
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  Keyboard
} from 'react-native'
import { connect } from 'react-redux'
import { styles } from '../utils/styles'
import { addCard } from '../actions'
import { addCardToDeck } from '../utils/api'

class AddCard extends Component {
  state = {
  	question: null,
  	answer: null,
  }

  onAddCard = () => {
    Keyboard.dismiss()
  	const { question, answer } = this.state
  	const deckTitle = this.props.deckTitle
     
    if (question && answer) {
      this.props.dispatch(addCard({
  	    deckTitle,
  		  card: {question, answer}
  	  }))

      this.setState(() => ({question: null, answer: null}))
	    this.toDeck(deckTitle)
	    addCardToDeck(deckTitle, {question, answer})
	  }
  }

  toDeck = (deckTitle) => {
    this.props.navigation.navigate(
      'SingleDeck',
      {deck: deckTitle}
    )
  }

  render() {
    return (
        <View style={styles.container}>
          <TextInput
            style={styles.textInput}
            placeholder="Question"
            value={this.state.question}
            onChangeText = {(text) => this.setState({question: text})}/>
          <TextInput
            style={styles.textInput}
            placeholder="Answer"
            value={this.state.answer}
            onChangeText = {(text) => this.setState({answer: text})}/>
          <TouchableOpacity style={styles.androidSubmitBtn} 
            onPress={this.onAddCard}>
            <Text style={styles.submitBtnText}> Submit </Text>
          </TouchableOpacity>
        </View>
    )
  }
}

function mapStateToProps (state, { navigation }) {
  const { deckTitle } = navigation.state.params

  return {
    deckTitle,
  }
}

export default connect(mapStateToProps)(AddCard)

