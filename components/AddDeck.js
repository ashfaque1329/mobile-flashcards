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
import { addDeck } from '../actions'
import { saveDeckTitle } from '../utils/api'

class AddDeck extends Component {
  state = {
  	deckTitle: null,
  }

  onSubmit = () => {
    Keyboard.dismiss()

    const deckTitle = this.state.deckTitle
  	if (deckTitle) {
  	  this.props.dispatch(addDeck({
        [deckTitle]: {title: deckTitle, questions: []}
      }))

      this.setState(() => ({deckTitle: ''}))
      this.toDeck(deckTitle)
      saveDeckTitle(deckTitle)
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
          <Text style={styles.infoText}>
          	What is the title of your new deck?
      	  </Text>
          <TextInput
            style={styles.textInput}
            placeholder="Deck Title"
            value={this.state.deckTitle}
            onChangeText = {(text) => this.setState({deckTitle: text})}/>
          <TouchableOpacity style={styles.androidSubmitBtn} 
            onPress={this.onSubmit}>
            <Text style={styles.submitBtnText}> Submit </Text>
          </TouchableOpacity>
        </View>
    )
  }
}

export default connect()(AddDeck)

