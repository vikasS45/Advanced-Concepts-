import React, { Component } from 'react'
import { Text, View, Dimensions, FlatList, Image, StyleSheet, TouchableOpacity, ScrollView, TextInput } from 'react-native'
import data1 from './data.json';
import AntDesign from 'react-native-vector-icons/AntDesign'


const w = Dimensions.get('window').width;
const listTab = [
    { filters: "All", status:"All" },
    { filters: "Answered", status:"Answered" },
    { filters: "Added by you", status:"You" },
    { filters: "Pending", status:"Pending" },

];

export default class SingleSubject extends Component {
    constructor(props) {
        super(props);
        this.state = {
            items: [],
            status:'All',

            

        }
        this.arrayholder = [];
        this.secondItems=[];
        this.demo=[];


    }

    componentDidMount() {
        this.fetchQestions();
    }

    
    fetchQestions = async () => {
        const response = await fetch("http://oruga.in/vikas/machine_test/getBySubject.php?title=" + this.props.title);
        const json = await response.json();
        this.setState({ items: json.data });
        this.secondItems= json.data;
        this.arrayholder = json.data;
    }


    setfilterStatus = status  =>{
        this.setState({
            status : status
        })
        console.log(status)

        if(status == "All")
        {
            this.setState({
                items:this.secondItems
            })
        }
        if(status == "Pending")
        {
            this.demo=[];
            this.secondItems.map(e=>{
               if(e.total == 0)
               {
                 console.log('hi')
                 this.demo.push(e) 
               }
        })              
            this.setState({
                items:this.demo
            })
          
        }

        if(status == "Answered")
        {
            this.demo=[];
            this.secondItems.map(e=>{
               if(e.total != 0)
               {
                 console.log('hi')
                 this.demo.push(e) 
               }
        })              
            this.setState({
                items:this.demo
            })
          
        }
        
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
    
   

    render() {
        const title = this.props.title;
        return (
            <View style={{ flex: 1 }}>



                               {/* FILTERS */}
                             
                <View style={{ flexDirection: 'row' }}>
                <ScrollView horizontal={true} showsHorizontalScrollIndicator={false}> 
                                     {/* SEARCH BAR */}
                <View style={{flexDirection:'row',alignSelf:'center',marginTop:10,height:40,width:90,backgroundColor:'white',borderColor:'#b1d4f8',borderWidth:1,borderRadius:20}}>
                      
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

                                        <TouchableOpacity onPress={() => this.setfilterStatus(e.status)}>
                                            <View style={(this.state.status === e.status) ? styles.activeTab : styles.inactiveTab}>
                                                <Text style={ (this.state.status === e.status) ? styles.activeText : styles.inactiveText }>{e.filters}</Text>
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
                </ScrollView>
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

                                    <View style={{  backgroundColor: '#b1d4f8',margin:5,borderRadius:15, borderWidth:1,borderColor:'gray'}}>
                                        <Text style={{ color: 'black',  marginTop: 5, flex: 1, fontSize: 15, flexWrap: 'wrap', fontWeight: 'bold', padding: 10 }}> Q . {item.title} ?</Text>
                                


                                    {/* SHOW IMAGE IF QUESTION HAS IMAGE */}
                                    {!!item.path && (
                                        <View style={{ padding: 10 }}>
                                            <Image source={{ uri: 'http://oruga.in/vikas/machine_test/' + item.path }}
                                                style={{ marginLeft:20, width: 150, height: 120,borderWidth:2,borderRadius:5 }} />
                                        </View>
                                    )}

                                </View>

                                    {/* NO ANSWER YET */}
                                    {item.ans == '' ? (
                                        <View style={{ flexDirection: "row", padding: 10 }}>
                                            <Text style={{ color: 'grey', fontSize: 15, fontWeight: 'bold', marginLeft: 20, marginTop: 5 }}>Not Answer Yet</Text>
                                        </View>

                                    ) :


                                        // VIEW ANSWER
                                        (
                                            <View style={{ flexDirection: "row", padding:10 }}>
                                            <Text style={{ color: 'black', fontSize: 15, fontWeight: 'bold', marginLeft: 5, marginTop: 5 }}>A.</Text>
                                            <Text style={{ color: 'grey',flex:1, fontSize: 15,flexWrap: 'wrap', fontWeight: 'bold', marginLeft: 5, marginTop: 5 }}>{item.ans}</Text>
                        
                                          </View>
                                        )}


                                        <View style={{flexDirection:'row',marginLeft:5}}>
                                          <Image style={{height:35,width:35, borderRadius:18,margin:5}} source={{uri : 'https://i2.wp.com/widgetwhats.com/app/uploads/2019/11/free-profile-photo-whatsapp-4.png'}}/>
                                          <Text style={{alignSelf:'center',color:'gray',fontSize:12,fontWeight:'bold'}}> Vikas Salunke</Text>
                                          {item.total > 0 &&
                                         
                                        <Text style={{alignSelf:'center',marginLeft:100,color:'gray',fontSize:12,fontWeight:'bold'}}>{item.total-1} more Answers</Text>
                                         
                                          }</View>

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




const styles =StyleSheet.create({
    inactiveTab:{
        padding: 7,
        borderWidth: 1, 
        borderRadius: 15, 
        borderColor: '#dce0e5', 
        backgroundColor: '#f4f5f7'
    },
    activeTab:{
        padding: 7,
        borderWidth: 1, 
        borderRadius: 15, 
        borderColor: 'black', 
        backgroundColor:'gray',
    },
    activeText:{
        fontSize:12,
        color:'white'
    },
    inactiveText:{
        color: '#a2a4a6', fontSize: 12
    }
})