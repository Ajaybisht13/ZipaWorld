import React, { Component } from 'react';
import { View, Text } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';

class Road extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    return (
      <View style = {{padding:"2%", backgroundColor:"#C8DECF", height:"100%"}}>
          <View style = {{backgroundColor:"#ffffff", height:"78%", borderRadius:10}}>
             <Text></Text> 
          <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"70%", alignSelf:"center"}}>
            <Icons name="box-open" size={55} color = "#1E90FF"/>
            <Icons name="hand-holding-medical" size={58} color = "#1E90FF"/>
          </View>
          <Text></Text>
          <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"60%", alignSelf:"center"}}>
            <Text style = {{fontWeight:"bold", fontSize:18}}>Hello</Text>
            <Text style = {{fontWeight:"bold", fontSize:18}}>Hello</Text>
          </View>
          <Text></Text>
          <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"70%", alignSelf:"center"}}>
            <Icon name="fruit-watermelon" size={60} color = "#1E90FF"/>
            <Icon name="hanger" size={62} color = "#1E90FF"/>
          </View>
          <Text></Text>
          <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"60%", alignSelf:"center"}}>
            <Text style = {{fontWeight:"bold", fontSize:18}}>Hello</Text>
            <Text style = {{fontWeight:"bold", fontSize:18}}>Hello</Text>
          </View>
          <Text></Text>
          <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"70%", alignSelf:"center"}}>
            <Icons name="dog" size={60} color = "#1E90FF"/>
            <Icon name="alert" size={60} color = "#1E90FF"/>
          </View>
          <Text></Text>
          <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"60%", alignSelf:"center"}}>
            <Text style = {{fontWeight:"bold", fontSize:18}}>Hello</Text>
            <Text style = {{fontWeight:"bold", fontSize:18}}>Hello</Text>
          </View>
          <Text></Text>
          <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"70%", alignSelf:"center", marginLeft:"5%"}}>
            <Icons name="question" size={60} color = "#1E90FF"/>
          </View>
          <Text></Text>
          <View style={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"60%", alignSelf:"center"}}>
            <Text style = {{fontWeight:"bold", fontSize:18}}>Hello</Text>
          </View>
          </View>
      </View>
    );
  }
}

export default Road;
