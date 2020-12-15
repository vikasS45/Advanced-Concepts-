import React from 'react';
import { View, Text, Image, Button, TextInput,StyleSheet,TouchableOpacity } from 'react-native';
import ImagePicker from 'react-native-image-picker';
import Demo from './Demo';
import { Feather,AntDesign,MaterialCommunityIcons } from 'react-native-vector-icons';

export default class App extends React.Component {
  state = {
    photo: null,
    title: '',
  };

  handleChoosePhoto = () => {
    const options = {
      noData: true,
    };
    ImagePicker.launchImageLibrary(options, (response) => {
      console.log(response.uri);
      if (response.uri) {
        this.setState({ photo: response });
        
      }
    });
  };

  render() {
    const { photo } = this.state;
    return (
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
   
       
      <View style={styles.textInput}>
      
            <TextInput style={{ marginLeft: 10, width:200 }} placeholder="Type Something" placeholderTextColor='gray' onChangeText={(title) => this.setState({ title })} />
          </View>
        {photo && (
          <Image
            source={{ uri: photo.uri }}
            style={{ width: 300, height: 300 }}
          />
        )}

        <View style={{height:100,width:270,margin:10,borderRadius:10,borderWidth:2,borderColor:'gray'}}>
        <TouchableOpacity  onPress={() => { this.handleChoosePhoto(); }} >
         <Text style={{padding:40}}>Pick photo From Your Gallary</Text>
               </TouchableOpacity>
        </View>

        <View> 

       
          <TouchableOpacity style={styles.button}  >
              <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white' }}>Submit Doubt</Text>
              </TouchableOpacity>
              </View>
              </View>
              
    );
  }
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
         
    alignItems: 'center',

  },

  textInput: {
    color: 'grey',
    flexDirection: 'row',
    width: 280,
    height: 50,
    textAlign: 'center',
    borderRadius: 15,
    borderWidth: 2,
    borderColor: "grey",
    marginTop: 20,
    marginLeft: 10,
    padding: 5
  },

  button: {
    color: 'black',
    width: 280,
    height: 50,
    alignItems: 'center',
    padding: 10,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: "#f4f5f7",
    marginTop: 20,
    backgroundColor:'grey',
  }
});