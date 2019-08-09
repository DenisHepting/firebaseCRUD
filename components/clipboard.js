<ScrollView style={styles.container}>

<View>
  {
    this.state.boards.map((item, i) => (
      <ListItem
        key={i}
        title={item.author + item.title}
        {title: 'D', data: [ this.state.boards[i].description]},
        //author={item.author}
        leftIcon={{name: 'book', type: 'font-awesome'}}
        onPress={() => {
          this.props.navigation.navigate('BoardDetails', {
            boardkey: `${JSON.stringify(item.key)}`,
          });
        }}
      />
    ))
  }
</View>


</ScrollView>



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
    }
  })