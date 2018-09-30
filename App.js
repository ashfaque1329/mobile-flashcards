import React from 'react'
import { StyleSheet, Platform, View, StatusBar } from 'react-native'
import ActionBar from 'react-native-action-bar'
import { createStore } from 'redux'
import { Provider } from 'react-redux'
import reducer from './reducers'
import DecksList from './components/DecksList'
import AddDeck from './components/AddDeck'
import AddCard from './components/AddCard'
import PopQuiz from './components/PopQuiz'
import SingleDeck from './components/SingleDeck'
import { TabNavigator, StackNavigator } from 'react-navigation'
import { teal, white } from './utils/colors'
import { FontAwesome, Ionicons } from '@expo/vector-icons'
import { Constants } from 'expo'
import { setLocalNotification } from './utils/notifications'

function CustomStatusBar ({backgroundColor, ...props}) {
  return (
    <View style={{ backgroundColor, height: Constants.statusBarHeight }}>
	  <ActionBar containerStyle={styles.bar} backgroundColor='#008080'/>
      <StatusBar translucent backgroundColor={backgroundColor} {...props} />
    </View>
  )
}

const Tabs = TabNavigator({
  DecksList: {
    screen: DecksList,
    navigationOptions: {
      tabBarLabel: 'Decks',
      tabBarIcon: ({ tintColor }) => <Ionicons name='ios-bookmarks' size={30} color={tintColor} />
    },
  },
  AddDeck: {
    screen: AddDeck,
    navigationOptions: {
      tabBarLabel: 'Add New Deck',
      tabBarIcon: ({ tintColor }) => <FontAwesome name='plus-square' size={30} color={tintColor} />
    },
  }
},
{
  navigationOptions: {
    header: null
  },
  tabBarOptions: {
    activeTintColor: Platform.OS === 'ios' ? teal : white,
    style: {
      height: 56,
      backgroundColor: Platform.OS === 'ios' ? white : teal,
      shadowColor: 'rgba(0, 0, 0, 0.24)',
      shadowOffset: {
        width: 0,
        height: 3
      },
      shadowRadius: 6,
      shadowOpacity: 1
    }
  }
})

const MainNavigator = StackNavigator({
  Home: {
    screen: Tabs,
  },
  SingleDeck: {
    screen: SingleDeck,
    navigationOptions: {
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      }
    }
  },
  AddCard: {
    screen: AddCard,
    navigationOptions: {
      title: 'Add Card',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      }
    }
  },
  PopQuiz: {
    screen: PopQuiz,
    navigationOptions: {
      title: 'PopQuiz',
      headerTintColor: white,
      headerStyle: {
        backgroundColor: teal,
      }
    }
  }
})

export default class App extends React.Component {
  componentDidMount() {
    setLocalNotification()
  }

  render() {
    return (
      <Provider store={createStore(reducer)}>
        <View style={{flex: 1}}>
          <CustomStatusBar backgroundColor={teal} barStyle="light-content" />
          <MainNavigator/>
        </View>
      </Provider>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFF00',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
