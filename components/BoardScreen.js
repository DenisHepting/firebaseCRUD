import React, { Component } from 'react';
import { StyleSheet, ScrollView, ActivityIndicator, View, Text, SectionList } from 'react-native';
import { List, ListItem, Button, Icon} from 'react-native-elements';
import firebase from '../Firebase';
import { white } from 'ansi-colors';

class BoardScreen extends Component {
    
  
 
    static navigationOptions = ({ navigation }) => {
      
      const { currentUser } = firebase.auth();
     
      
      return {
     
        title: currentUser.email, 
          headerRight: (
            <Button
              buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
              icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
              onPress={() => { navigation.push('AddBoard') }}
            />
          ),
          headerLeft: (
            <Button
              buttonStyle={{ padding: 0, backgroundColor: 'transparent' }}
              icon={{ name: 'add-circle', style: { marginRight: 0, fontSize: 28 } }}
              onPress={() => { navigation.push('Profile') }}
            />
          ),
        };
      };

      constructor() {
        super();
        this.ref = firebase.firestore().collection('boards');
        this.unsubscribe = null;
        this.state = {
          isLoading: true,
          boards: []
        };

       var myArray = [];

        for (i = 0; i<this.state.boards.length ; i++) { 
          myArray.push(this.state.boards[i].description);
          console.log(myArray);
        } 
      }

      componentDidMount() {
        const { currentUser } = firebase.auth()
        this.setState({ currentUser })
        this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

      
      }   


      onCollectionUpdate = (querySnapshot) => {
        const boards = [];
        querySnapshot.forEach((doc) => {
          const { title, description, author } = doc.data();
          boards.push({
            key: doc.id,
            doc, // DocumentSnapshot
            title,
            description,
            author,
          });
        });
        this.setState({
          boards,
          isLoading: false,
       });
      }



  render() {
    // currentUSer
    const { currentUser } = this.state
  

    for (i = 0; i<this.state.boards.length ; i++) { 
      console.log(i);
    } 

    

    if(this.state.isLoading){
        return(
          <View style={styles.activity}>
            <ActivityIndicator size="large" color="#ff0000"/>
          </View>
        )
      }

     return (
        <ScrollView style={styles.container}>
  
     <View>
          {
            
          this.state.boards.map((item, i) => (
          
            <ListItem
              key={i}
              title={item.title}
              //author={this.state.boards.title}
              //leftIcon={{name: 'book', type: 'font-awesome'}}
              onPress={() => {

                for (i = 0; i<this.state.boards.length ; i++) { 
                console.log(i);
                } 

                if (this.state.boards[0].author == 'denis.hepting@icloud.com'){
                  console.log('Allright');
                }else{
                  console.log('Nope');
                }
                console.log(this.state.boards[0].description);
                console.log(this.state.boards[0].author);


                this.props.navigation.navigate('BoardDetails', {
                  boardkey: `${JSON.stringify(item.key)}`,
                });
              }}
            />
          ))

           
          }
        </View>



        </ScrollView>


    

    );
  }
}


const styles = StyleSheet.create({
  container: {
   flex: 1,
   paddingBottom: 22
  },
  item: {
    padding: 10,
    fontSize: 18,
    height: 44,
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
  sectionHeader: {
    paddingTop: 15,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 15,
    fontSize: 28,
    fontWeight: 'bold',
    backgroundColor: 'rgba(247,247,247,1.0)',
  }
})

export default BoardScreen;