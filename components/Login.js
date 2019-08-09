import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, TextInput, Text } from 'react-native';
import { Button } from 'react-native-elements';
import firebase from '../Firebase';




export default class Login extends React.Component {
  static navigationOptions = {
    title: 'Login',
  };
    state = { email: '', password: '', errorMessage: null }
  
    handleLogin = () => {
      const { email, password } = this.state
      firebase
        .auth()
        .signInWithEmailAndPassword(email, password)
        .then(() => this.props.navigation.navigate('Board'))
        .catch(error => this.setState({ errorMessage: error.message }))
    }
  
    render() {
      return (
       <ScrollView style={styles.container}>
          <View style={styles.subContainer}>
          <TextInput
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Email"
            onChangeText={email => this.setState({ email })}
            value={this.state.email}
          />
          </View>
          <View style={styles.subContainer}>
          <TextInput
            secureTextEntry
            style={styles.textInput}
            autoCapitalize="none"
            placeholder="Password"
            onChangeText={password => this.setState({ password })}
            value={this.state.password}
          />
          </View>
          <Button style={styles.button} title="Login" onPress={this.handleLogin} />
          <Button style={styles.button}
            title="Don't have an account? Sign Up"
            onPress={() => this.props.navigation.navigate('SignUp')}
          />
          <View style={styles.container}>
          {this.state.errorMessage &&
            <Text style={{ color: 'red' }}>
              {this.state.errorMessage}
            </Text>}
          </View>
        </ScrollView>
      )
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



  
