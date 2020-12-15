import React, { Component } from 'react'
import { Text, View, TouchableOpacity, Dimensions, StyleSheet, StatusBar, FlatList, Image } from 'react-native'
import { AntDesign } from 'react-native-vector-icons'

const w = Dimensions.get('window').width;

export default class SingleDoubt extends Component {
    constructor(props){
        super(props);
        this.state={
            items:[],
        }
       }

       componentDidMount(){
           this.fetchQuestion();
        //    console.log(this.state.items);
        //    console.log(this.props.navigation.getParam('id'))
       }


fetchQuestion= async() =>{
    const response =await fetch("http://oruga.in/vikas/machine_test/getSingleQuestion.php?id="+this.props.navigation.getParam('id'));
    const json= await response.json();
    this.setState({
        items: json.data
    })
    // console.log(json)
}

    render() {
        return (
<View style={styles.container}>
                <StatusBar />

                <View style={{ width: w, height: 60, margin:20}}>
                    <TouchableOpacity
                        onPress={() => {
                            this.props.navigation.goBack();
                        }}>
                            <Text style={{fontWeight:'bold',fontSize:20}}>Go Back </Text>
                       
                    </TouchableOpacity>
                </View>

                <View>
                <FlatList
                    data={this.state.items}
                    keyExtractor={(x, i) => i.toString()}
                    showsHorizontalScrollIndicator={false}
                    renderItem={({ item }) => (

                        <View style={{ marginTop: 5}}>

                            <View style={{ marginTop: 20, width: w - 20, backgroundColor: 'white', marginLeft: 10, borderWidth: 1, borderRadius: 15, borderColor: '#d8dcdc', }}>
                               
                                <View style={{ padding: 5 }}>
                                    <Text style={{ color: 'black', backgroundColor: '#b1d4f8', marginTop: 5, borderRadius: 15, flex: 1, fontSize: 15, flexWrap: 'wrap', fontWeight: 'bold', padding: 10 }}> Q . {item.title} ?</Text>
                                </View>
                                
                               

                   {!!item.path && (
                            <View style={{ padding: 10 }}>
                                  <Image source={{ uri: 'http://oruga.in/vikas/machine_test/' + item.path }}
                                            style={{ alignSelf: 'center', width: 300, height: 300 }}  />
                             </View>
                    )}


                  
                              <View style={{ flexDirection: "row", padding: 10 }}>
                              <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginLeft: 10, marginTop: 5 }}>A.</Text>
                                   <Text style={{ color: 'grey', fontSize: 15, fontWeight: 'bold', marginLeft: 2, marginTop: 5 }}>{item.ans}</Text>
                               
                               </View>

                        
                            </View>
         
                          
                        </View>
                    )
                    }
                />
               
                </View>
            </View>
        )
    }
}




const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#f7f9f9"
    }
})