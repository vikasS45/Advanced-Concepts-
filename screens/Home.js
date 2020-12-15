import React, { Component } from 'react';
import { View, StyleSheet, Text, ActivityIndicator } from 'react-native';
import { TabView, TabBar } from 'react-native-tab-view';
import SingleSubject from './SingleSubject';


export default class Home extends Component {

  static title = 'Dynamic tab load';
  static appbarElevation = 0;

  // static propTypes = {
  //   style: View.propTypes.style,
  // };

  state = {
    index: 0,
    
    loading: true,
    data: {},
  };

  componentDidMount() {
    fetch('http://oruga.in/vikas/machine_test/getSubject.php')
      .then((response) => response.json())
      .then((responseJson) => {
        const routes = [];
        responseJson.data.forEach((movie) => {
          routes.push({
            title: movie.sub,
            key: movie.sub,
          });
        });

        this.setState({
          data: responseJson,
          routes,
          loading: false,
        });

      });
  }

  _handleChangeTab = (index) => {
    this.setState({ index });
  };

  _renderHeader = (props) => {
    return (
      <TabBar
        {...props}
        scrollEnabled
        indicatorStyle={styles.indicator}
        style={styles.tabbar}
        tabStyle={styles.tab}
        labelStyle={styles.label}
      />
    );
  };

  _renderScene = ({ route }) => {
    return (
      <View style={[ styles.page, { backgroundColor: 'white' } ]}>
        {/* <Text>{route.key} - {route.title}</Text> */}
        <SingleSubject title={route.key} navigation={this.props.navigation}/>
        
      </View>
    );
  };

  renderScreen () {
    if (this.state.loading) {
      return (
        <View style={{flex:1,justifyContent:'center', alignItems:'center',flexDirection: "row",justifyContent: "space-around", padding: 10}}>
                
        <ActivityIndicator size={50} color="#79c3f7" />
       
                  </View>
      );
    } else {
      return (
        <TabView
          style={styles.container}
          navigationState={this.state}
          renderScene={this._renderScene}
          renderHeader={this._renderHeader}
          onIndexChange={this._handleChangeTab}
        />
      );
    }
  }

  render() {
    return (
      <View style={styles.container}>
        {this.renderScreen()}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    
  },
  tabbar: {
    backgroundColor: '#222',
  },
  page: {
    flex: 1,
    
  },
  indicator: {
    backgroundColor: '#ffeb3b',

  },
  label: {
    color: '#fff',
    fontWeight: '400',
  },

  tab: {
    width:400,
  }
});