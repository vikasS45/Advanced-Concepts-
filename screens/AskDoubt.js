import React, { Component } from 'react';
import {
    AppRegistry,
    StyleSheet,
    Text,
    View,
    PixelRatio,
    TouchableOpacity,
    Image,
    Dimensions,
    TextInput,
    Alert,
    ImageBackground,
    ScrollView
} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';

const w = Dimensions.get('window').width;

import ImagePicker from 'react-native-image-picker';
const array=[];
// const other=[];
export default class AskDoubt extends Component {

   
    state = {

        ImageSource: null,
        other:[]

    };

   
    selectPhotoTapped() {
        const options = {
            quality: 1.0,
            maxWidth: 500,
            maxHeight: 300,
            storageOptions: {
                skipBackup: true
            }
        };


        ImagePicker.showImagePicker(options, (response) => {
            // console.log('Response = ', response);

            if (response.didCancel) {
                console.log('User cancelled photo picker');
            }
            else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            }
            else if (response.customButton) {
                console.log('User tapped custom button: ', response.customButton);
            }
            else {
                let source = { uri: response.uri };

                // You can also display the image using data:
                // let source = { uri: 'data:image/jpeg;base64,' + response.data };
                // Alert.alert(""+response.fileName)
                array.push(
                    { local : source, path : response.fileName}
                    );
                console.log(array)
                this.setState({

                    ImageSource: source

                });
                 
                // console.log(""+response.fileName)
            }
        });
    }


    deleteFromArray= (elememt) =>{
                   const index= array.indexOf(elememt);
                   array.splice(index,1);
                   this.setState({
                       other:array
                       
                   })
                   
                   this.showSelectedImages();
                  
    }


    showSelectedImages = () => {
        return array.map((element) => {
          return (
            <View style={{margin:5}}>
            <ImageBackground style={styles.ImageContainer} source={element.local} >
                <TouchableOpacity onPress={()=> this.deleteFromArray(element)}>
            <Entypo name="circle-with-cross" size={20} color="gray" style={{marginTop:100,marginLeft:95}}/>
                </TouchableOpacity>
            </ImageBackground>
            </View> 
          );
        });
      };


    render() {
        return (
            <View style={styles.container}>
                <View style={{ width: w, height: 60, margin: 20 }}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                        <Text style={{ fontWeight: 'bold', fontSize: 20 }}>Go Back </Text>

                    </TouchableOpacity>
                </View>

                <View style={styles.textInput}>
                    <AntDesign name="form" size={30} color='grey'></AntDesign>
                    <TextInput style={{ marginLeft: 10, width: 200 }} placeholder="Type Something" placeholderTextColor='gray' onChangeText={(title) => this.setState({ title })} />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', }}>
                   



                    <View style={{ marginTop: 20, height: 200, width: 300, borderWidth: 2, borderColor: 'gray',borderRadius:20 }}>
                     
                        {this.state.ImageSource &&
                        <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}>
                        <View style={{flexDirection:'row',marginLeft:5}}>{this.showSelectedImages()}</View>
                        </ScrollView>
                        }
                     
                     {  (!this.state.ImageSource) &&
                        <View style={{ padding: 70 }}>

                        </View>
                       }

                        <View style={{ alignSelf: 'flex-end', marginRight: 20,padding:5 }}>
                            <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
                                <View style={{ borderWidth: 1, borderRadius: 15, borderColor: 'gray', padding: 5 }}>
                                    <View style={{ flexDirection: 'row-reverse', }}>
                                        <Entypo name="attachment" size={22} color="black" style={{ alignSelf: 'center', marginLeft: 8 }} />
                                        <AntDesign name="camera" size={22} color="black" style={{ alignSelf: 'center' }} />

                                    </View>
                                </View>
                            </TouchableOpacity>
                        </View>
                    </View>


                </View>

                <View>
                    <TouchableOpacity style={styles.button} onPress={() => { }} >
                        <Text style={{ fontSize: 18, fontWeight: 'bold', color: 'white', textAlign: 'center' }}>Add Doubt</Text>
                    </TouchableOpacity>
                </View>

            </View>
        );
    }

}

const styles = StyleSheet.create({

    container: {
        flex: 1,

        backgroundColor: 'white'
    },

    ImageContainer: {
     
        borderRadius:10,
        width: 125,
        height: 120,
        borderColor: '#9B9B9B',
        borderWidth: 1 ,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#CDDC39',

    },
    textInput: {
        color: 'grey',
        flexDirection: 'row',
        width: 300,
        height: 50,
        alignSelf: 'center',
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
        width: 150,
        height: 50,
        alignSelf: 'flex-end',
        marginRight:22,
        padding: 10,
        borderRadius: 20,
        borderWidth: 2,
        borderColor: "#f4f5f7",
        marginTop: 20,
        backgroundColor: 'grey',
    }

});

