import React, { Component } from 'react'
import { Text, View, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import data1 from './data.json';
import AntDesign from 'react-native-vector-icons/AntDesign'


const w = Dimensions.get('window').width;
const listTab = [
    { filters: "Answered" },
    { filters: "Added by you" },
    { filters: "Pending" },

];

export default class SingleSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],

        }
        this.arrayholder = [];


    }

    componentDidMount() {
        this.fetchQestions();
    }

    
    fetchQestions = async () => {
        const response = await fetch("http://oruga.in/vikas/machine_test/getBySubject.php?title=" + this.props.title);
        const json = await response.json();
        this.setState({ items: json.data });
        this.arrayholder = json.data;
    }




        //  DYNAMIC SEARCH ON TEXT CHANGE

    searchFilterFunction = text => {
        this.setState({
          value: text,
        });
    
        const newData = this.arrayholder.filter(item => {
          const itemData = `${item.title.toUpperCase()} ${item.subject.toUpperCase()} `;
          const textData = text.toUpperCase();
    
          return itemData.indexOf(textData) > -1;
        });
        this.setState({
          items: newData,
        });
      };
    
      onFilter = filters => {
          
      }
       


    render() {
        const title = this.props.title;
        return (
            <View style={{ flex: 1 }}>



                               {/* FILTERS */}
                <View style={{ flexDirection: 'row' }}>

                                     {/* SEARCH BAR */}
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:10,height:40,width:90,backgroundColor:'white',borderColor:'#b1d4f8',borderWidth:3,borderRadius:20}}>
                      
                        <AntDesign name="search1" size={15} style={{padding:10}}></AntDesign>
                            <TextInput
                    
                            placeholderTextColor="black"
                            style={{width:50}}
                           onChangeText={text => this.searchFilterFunction(text)}
                           autoCorrect={false}
                           value={this.state.value}
                        
                        />
                     
                </View>

                                     {/* OTHER FILTERS */}
                <View style={{ flexDirection: 'row' }}>
                    <View style={{ flexDirection: 'row', borderWidth: 1, margin: 8, marginTop:15, borderRadius: 15, borderColor: '#dce0e5' }}>

                        
                        <View style={{ flexDirection: 'row' }}>
                            {
                                listTab.map(e => (
                                    <View style={{ alignSelf:'center',padding:3 }}>

                                        <TouchableOpacity onPress={() => this.props.navigation.navigate("Questions", { name: item.name })}>
                                            <View style={{ padding: 7, borderWidth: 1, borderRadius: 15, borderColor: '#dce0e5', backgroundColor: '#f4f5f7' }}>
                                                <Text style={{ color: '#a2a4a6', fontSize: 12 }}>{e.filters}</Text>
                                            </View>
                                        </TouchableOpacity>
                                    </View>
                                ))

                            }
                        </View>

                                {/* FILTERS ICON */}
                        <View style={{ alignSelf: 'center' }}>
                            <AntDesign name="filter" size={20} color="#a2a4a6" />
                        </View>
                    </View>
                </View>
               </View>


                                {/* SHOW ALL DOUBTS */}
                {this.state.items ? (
                    <FlatList
                        data={this.state.items}
                        keyExtractor={(x, i) => i.toString()}
                        showsHorizontalScrollIndicator={false}
                        renderItem={({ item }) => (

                            <View style={{ marginTop: 10 }}>

                                <View style={{  width: w - 20, backgroundColor: 'white', marginLeft: 10, borderWidth: 1, borderRadius: 15, borderColor: '#d8dcdc', }}>

                                    <View style={{ padding: 5 }}>
                                        <Text style={{ color: 'black', backgroundColor: '#b1d4f8', marginTop: 5, borderRadius: 15, flex: 1, fontSize: 15, flexWrap: 'wrap', fontWeight: 'bold', padding: 10 }}> Q . {item.title} ?</Text>
                                    </View>


                                    {/* SHOW IMAGE IF QUESTION HAS IMAGE */}
                                    {!!item.path && (
                                        <View style={{ padding: 10 }}>
                                            <Image source={{ uri: 'http://oruga.in/vikas/machine_test/' + item.path }}
                                                style={{ alignSelf: 'center', width: 300, height: 300 }} />
                                        </View>
                                    )}

                                    {/* NO ANSWER YET */}
                                    {item.ans == '' ? (
                                        <View style={{ flexDirection: "row", padding: 10 }}>
                                            <Text style={{ color: 'grey', fontSize: 15, fontWeight: 'bold', marginLeft: 20, marginTop: 5 }}>Not Answer Yet</Text>
                                        </View>

                                    ) :


                                        // VIEW ANSWER
                                        (
                                            <TouchableOpacity onPress={() => this.props.navigation.navigate('SingleDoubt', { id: item.id })}>
                                                <View style={{ alignSelf: 'flex-end', marginRight: 5, backgroundColor: '#f4f5f7', width: 120, marginTop: 5, marginBottom: 10, height: 30, borderWidth: 1, borderRadius: 15, borderColor: '#dce0e5', }}>
                                                    <Text style={{ color: '#a2a4a6', padding: 3, marginLeft: 8, fontSize: 15, fontWeight: 'bold', }}>View Answers</Text>
                                                </View>
                                            </TouchableOpacity>
                                        )}

                                </View>


                            </View>
                        )
                        }
                    />


                ) :
                    //   NO DOUBT 
                    (
                        <View style={{ marginTop: 200, justifyContent: 'center', alignItems: 'center' }}>
                            <View style={{ marginRight: 5, backgroundColor: '#f4f5f7', width: 120, marginTop: 5, marginBottom: 10, height: 30, borderWidth: 1, borderRadius: 15, borderColor: '#dce0e5', }}>
                                <Text style={{ color: '#a2a4a6', padding: 3, marginLeft: 8, fontSize: 15, fontWeight: 'bold', }}>NO DOUBTS</Text>
                            </View>
                        </View>
                    )
                }


                                 {/* ASK YOUR DOUBT */}

                <TouchableOpacity onPress={() => this.props.navigation.navigate('AskDoubt')}
                    style={{ width: w - 20, borderWidth: 1, borderColor: 'gray', marginLeft: 10, borderRadius: 10, marginTop: 10 }}>
                    <Text style={{ fontSize: 15, fontWeight: 'bold', color: '#79c3f7', alignSelf: 'center', padding: 15 }}>Ask a Doubt</Text>
                </TouchableOpacity>

            </View>

        )
    }
}
