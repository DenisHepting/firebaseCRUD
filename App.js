import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { createAppContainer, createStackNavigator } from 'react-navigation';
import BoardScreen from './components/BoardScreen';
import BoardDetailScreen from './components/BoardDetailScreen';
import AddBoardScreen from './components/AddBoardScreen';
import EditBoardScreen from './components/EditBoardScreen';
import SignUp from './components/SignUp';
import Login from './components/Login';
import Profile from './components/Profile';
import AddProfileInfo from './components/AddProfileInfo';

const RootStack = createStackNavigator(
  {
    Board: BoardScreen,
    BoardDetails: BoardDetailScreen,
    AddBoard: AddBoardScreen,
    EditBoard: EditBoardScreen,
    AddProfileInfo: AddProfileInfo,
    SignUp: SignUp,
    Login: Login,
    Profile: Profile,
  },
  {
    initialRouteName: 'SignUp',
    navigationOptions: {
      headerStyle: {
        backgroundColor: 'blue',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold'
      },
    },
  },
);


const AppContainer = createAppContainer(RootStack);

//export default AppContainer;

export default class App extends React.Component {
  render() {
    return <AppContainer />;
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});