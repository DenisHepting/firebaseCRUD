import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, PickerIOS } from 'react-native';
import { Button} from 'react-native-elements';
import firebase from '../Firebase';
import type {ProfileModel} from 'Model';




export default class AddProfileInfo extends Component {

  
    static navigationOptions = {
    title: "Add Profile Info",
    };

  constructor() {
    super();
    this.ref = firebase.firestore().collection('users');
    this.state = {
      firstName: '',
      lastName: '',
      gender: '',
      isLoading: false,
    };
  }

  updateTextInput = (text, field) => {
    const state = this.state
    state[field] = text;
    this.setState(state);
  }

  handleAddProfileInfo = () => {

      // create a user with email and password; 
      //firebase.auth().createUserWithEmailAndPassword(email, password);
      // grab the user UID to create a profile 
      const myUser = firebase.auth().currentUser.uid;

      const profile: ProfileModel = {
        firstName: this.state.firstName, 
        lastName: this.state.lastName, 
        gender: this.state.gender,
        picture: {
            // eslint-disable-next-line max-len
            uri: "https://firebasestorage.googleapis.com/v0/b/react-native-ting.appspot.com/o/fiber%2Fprofile%2FJ0k2SZiI9V9KoYZK7Enru5e8CbqFxdzjkHCmzd2yZ1dyR22Vcjc0PXDPslhgH1JSEOKMMOnDcubGv8s4ZxA.jpg?alt=media&token=6d5a2309-cf94-4b8e-a405-65f8c5c6c87c",
            preview: "data:image/gif;base64,R0lGODlhAQABAPAAAKyhmP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
        }
      };
      this.ref.doc(myUser).set(profile).then(user => this.props.navigation.navigate('Board'));
      // .catch(error => this.setState({ errorMessage: error.message }))

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
              multiline={true}
              numberOfLines={4}
              placeholder={'Vorname'}
              value={this.state.firstName}
              onChangeText={(text) => this.updateTextInput(text, 'firstName')}
          />
     </View>
      <View style={styles.subContainer}>
          <TextInput
          placeholder="Nachname"
          autoCapitalize="none"
          style={styles.textInput}
          value={this.state.lastName}
          onChangeText={(text) => this.updateTextInput(text, 'lastName')}/>
      </View>
      <View style={styles.subContainer}>
      <TextInput
          placeholder="Geschlecht"
          autoCapitalize="none"
          style={styles.textInput}
          value={this.state.gender}
          onChangeText={(text) => this.updateTextInput(text, 'gender')}/>
    </View>
       
        <View style={styles.button}>
        <Button title="Add Data" onPress={this.handleAddProfileInfo} />
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

