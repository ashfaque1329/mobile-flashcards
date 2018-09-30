import { AsyncStorage } from 'react-native'

const STORAGE_KEY = 'mobile_flashcards:decks'

export function getDecks () {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(decks => JSON.parse(decks))
}

export function saveDeckTitle (deckTitle) {
  return AsyncStorage.mergeItem(STORAGE_KEY, JSON.stringify({
    [deckTitle]: {'title': deckTitle, 'questions': []}
  }))
}

export function getDeck (deckTitle) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then(decks => JSON.parse(decks[deckTitle]))
}

export function addCardToDeck (deckTitle, card) {
  return AsyncStorage.getItem(STORAGE_KEY)
    .then((results) => {
      const data = JSON.parse(results)
      data[deckTitle]['questions'].push(card)
      AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data))
    })
}

export function removeAllDecks () {
  return AsyncStorage.removeItem(STORAGE_KEY)
}
