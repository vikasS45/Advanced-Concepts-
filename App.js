import React, { Component } from 'react'
import { Text, View } from 'react-native'
import { createAppContainer} from 'react-navigation'
import { createStackNavigator}  from 'react-navigation-stack'
import SingleDoubt from './screens/SingleDoubt'
import SingleSubject from './screens/SingleSubject'
import Home from './screens/Home'
import AskDoubt from './screens/AskDoubt'
import { Feather } from 'react-native-vector-icons'



const App= createStackNavigator({
  Home:{ screen: Home},
 SingleDoubt:{screen: SingleDoubt},
 SingleSubject:{screen:SingleSubject},
 AskDoubt:{screen:AskDoubt}

}
,
  {
    defaultNavigationOptions:{
      headerShown:false,
      headerTintColor:'green',
    },
  
  })

export default  createAppContainer(App);