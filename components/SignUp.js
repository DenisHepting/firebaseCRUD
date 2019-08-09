import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../Firebase';




export default class SignUp extends Component {
  static navigationOptions = {
    title: 'SignUp',
  };
  constructor() {
    super();
    this.ref = firebase.firestore().collection('users');
    this.state = {
      isLoading: false,
    };
  }
  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  saveBoard() {
    this.setState({
      isLoading: true,
    });
    this.ref.add({
      firstName: this.state.title,
      lastName: this.state.description,
      birthday: this.state.author,
    }).then((docRef) => {
      this.setState({
        firstName: '',
        lastName: '',
        birthday: '',
        isLoading: false,
      });
      this.props.navigation.goBack();
    })
    .catch((error) => {
      console.error("Error adding document: ", error);
      this.setState({
        isLoading: false,
      });
    });
  }

//   handleSignUp = () => {
//     // TODO: Firebase stuff...
//     console.log('handleSignUp')
//   }

  handleSignUp = () => {
    const { email, password } = this.state

      // create a user with email and password; 
      firebase.auth().createUserWithEmailAndPassword(email, password)
      .then(user => this.props.navigation.navigate('AddProfileInfo'))
      .catch(error => this.setState({ errorMessage: error.message }))

  }


  render() {
    if(this.state.isLoading){
      return(
        <View style={styles.activity}>
          <ActivityIndicator size="large" color="#0000ff"/>
        </View>
      )
    }
    return (
      <ScrollView style={styles.container}>
      <View style={styles.subContainer}>
          <TextInput
          placeholder="Email"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={email => this.setState({ email })}
          value={this.state.email}
          />
      </View>
      <View style={styles.subContainer}>
          <TextInput
          secureTextEntry
          placeholder="Password"
          autoCapitalize="none"
          style={styles.textInput}
          onChangeText={password => this.setState({ password })}
          value={this.state.password}
          />
      </View>
       

    


        <View style={styles.button}>
        <Button title="Sign Up" onPress={this.handleSignUp} />
        <Button style={styles.button}
          title="Already have an account? Login"
          onPress={() => this.props.navigation.navigate('Login')}
        />
        </View>
      </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    paddingTop: 100
  },
  subContainer: {
    flex: 1,
    marginBottom: 20,
    padding: 5,
    borderBottomWidth: 2,
    borderBottomColor: '#CCCCCC',
  },
  activity: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    paddingTop: 20,
  }
})

