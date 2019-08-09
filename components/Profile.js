
import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, SectionList, TextInput } from 'react-native';
import { List, ListItem, Button, Icon, Image, Avatar} from 'react-native-elements';
import firebase from '../Firebase';
import { ImagePicker } from 'expo';
import type {ProfileModel} from 'Model';


var DEFAULT_PROFILE: ProfileModel = {
  name: "John Doe",
  outline: "React Native",
  picture: {
      // eslint-disable-next-line max-len
      uri: "https://firebasestorage.googleapis.com/v0/b/react-native-ting.appspot.com/o/fiber%2Fprofile%2FJ0k2SZiI9V9KoYZK7Enru5e8CbqFxdzjkHCmzd2yZ1dyR22Vcjc0PXDPslhgH1JSEOKMMOnDcubGv8s4ZxA.jpg?alt=media&token=6d5a2309-cf94-4b8e-a405-65f8c5c6c87c",
      preview: "data:image/gif;base64,R0lGODlhAQABAPAAAKyhmP///yH5BAAAAAAALAAAAAABAAEAAAICRAEAOw=="
  }
};


class Profile extends Component {
  
  // myProfileXI: ProfileModel = DEFAULT_PROFILE;
  // get profile(): ProfileModel { return this.myProfileXI; }
  // set profile(profileX: ProfileModel){this.myProfileXI = profileX};

  static navigationOptions = ({ navigation }) => {
  

    const { currentUser } = firebase.auth();
  

    return {
        title: currentUser.email,   
      };
    };

    constructor() {
      super();
      this.state = {
        displayNameX: '',
        firstName: '',
        lastName: '',
        gender: ''
      };
    }

    componentDidMount() {

        const { currentUser } = firebase.auth()
        const myUid = currentUser.uid;
        //alert(myUid);
        this.setState({ currentUser })

        // const {uid} = Firebase.auth.currentUser;
        // console.log(uid + ' This is UID ' );
        
        // CHECKS FOR THE USER COLLECTION WITH THE ID AND LOADS DATA INTO THE PROFILE
        firebase.firestore().collection('users').doc(myUid).onSnapshot(async snap => {
            if (snap.exists) {
              this.profile = snap.data();
              this.setState({
                firstName: this.profile.firstName,
              });
              
            } else {
              this.profile = DEFAULT_PROFILE;
            }
        });

    




        // var user = firebase.auth().currentUser;

        // user.updateProfile({
        //   displayName: "Jane Q. User",
        //   photoURL: "https://example.com/jane-q-user/profile.jpg"
        // }).then(function() {
        //   // Update successful.
        // }).catch(function(error) {
        //   // An error happened.
        // });
        
    
    }


    updateTextInput = (text, field) => {
      const state = this.state
      state[field] = text;
      this.setState(state);
    }

    saveProfile(){
      var user = firebase.auth().currentUser;
      user.updateProfile({
        displayName: this.state.displayNameX,
      })

      this.props.navigation.goBack();

      // var myVar = firebase.auth().currentUser.updateProfile({
      //   displayName: this.state.displayNameX,
      // })

    }



    onChooseImagePress = async () => {
      let result = await ImagePicker.launchCameraAsync();
      //let result = await ImagePicker.launchImageLibraryAsync();
  
      if (!result.cancelled) {
        this.uploadImage(result.uri, "test-image")
          .then(() => {
            Alert.alert("Success");
          })
          .catch((error) => {
            Alert.alert(error);
          });
      }
    }



  render() {

    const { currentUser } = firebase.auth();
    //const {profile} = DEFAULT_PROFILE;
   // const {profilePlayaround} = this.profile.firstName;

    return (
        <ScrollView style={styles.container}>

        <View>
        <Avatar rounded source={{
          uri:
            'https://s3.amazonaws.com/uifaces/faces/twitter/ladylexy/128.jpg',
        }}/>
        <Text>{this.state.firstName}</Text>
        <Text>'THIS SOULD BE IT</Text>
        </View>
                <View style={styles.subContainer}>
                  <TextInput
                      placeholder={"Test"}
                      value={currentUser.updateProfile.displayName}
                      onChangeText={(text) => this.updateTextInput(text, 'displayNameX')}
                  />
                </View>
                <View style={styles.subContainer}>
                  <TextInput
                      placeholder={currentUser.email}
                      value={currentUser.updateProfile.email}
                  />
                </View>
                <View style={styles.button}>
                <Button
                  large
                  leftIcon={{name: 'save'}}
                  title='Save'
                  onPress={() => this.saveProfile()} />
              </View>
              <View style={styles.container}>
                <Button title="Choose image..." onPress={this.onChooseImagePress} />
              </View>
            </ScrollView>
       );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20
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
  }
})


export default Profile;