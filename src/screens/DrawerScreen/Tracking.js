import React, { Component } from 'react';
import { View, Text, TextInput , ActivityIndicator, Button, ScrollView} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons';
import { DrawerActions } from '@react-navigation/routers';


const baseUrl = "https://coapi.zipaworld.com/";

class Tracking extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isloading: false,
      page:1,
      showData : false,
      tracking : "",
      search :"",
      viewSummary:false
    };
  }

  // componentDidMount = (text) => {
  //   this.trackDataStatus(text);
  // }

  trackDataStatus = async(search) => {
    const token = await AsyncStorage.getItem("userToken");
    const customerId = await AsyncStorage.getItem("customerId")
    // console.log(text)
    fetch(baseUrl + "api/auth/queries/getByBlNo", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
             "authkey" : token
        },
        body: JSON.stringify({blNo:search})
        }).then((response) => response.json())
        .then((results) => {
          console.log("tracking data",results);
          if(results.success == true){
            this.setState({
              tracking : results.result,
              originAirport : results.result.originAirport,
              destinationAirport : results.result.destinationAirport,
              showData : true
            }, () => {
              console.log("gggggggggg", this.state.tracking)
            })
          }
         
        }).catch((error) => console.log("error", error));
      }
 
footerLoader = () => {
  return (
     <View>
        <ActivityIndicator loading= {this.state.isloading} size ={"large"}/>
     </View>
  )
}
showModal = () => {
  this.setState((previousState) => ({ shipperDetail: !previousState.shipperDetail}))
}

  render() {
    return (
      <View>
        <View style = {{display:"flex", flexDirection:"row", padding:"3%", backgroundColor:"#ff3800"}}>
          <Text style = {{fontSize:22, color:"#ffffff", fontWeight:"700"}}>Tracking Details</Text>  
        </View>
        <Text></Text>
        <ScrollView>
        <View style = {{padding:"5%"}}>  
          <TextInput 
            placeholder = "Enter BL Number"
            onChangeText = {(text) => this.setState({search : text})}
            ListFooterComponent = {this.footerLoader}
            style = {{borderColor:"#000000", borderWidth:0.3, marginTop:"1%", width:"99%", backgroundColor:"#ffffff", alignSelf:"center"}}
          />
        </View>
        <Text></Text>
        <View style = {{width:"20%", alignSelf:"center"}}>
          <Button title = "Search" color = "#ff3800" onPress = {() => this.trackDataStatus(this.state.search)}/>
        </View>
        {this.state.showData ?
        <View style = {{padding:"10%"}}>
        <View style = {{backgroundColor:"white", padding :"5%"}}>
        <View>
           <Text style = {{fontSize:18 , fontWeight:"700"}}>BL Number</Text>
           <Text style = {{fontSize:18 , fontWeight:"500"}}>{this.state.tracking.blNo}</Text>
        </View>
        <View>
           <Text style = {{fontSize:18 , fontWeight:"700"}}>Origin</Text>
           <Text style = {{fontSize:18 , fontWeight:"500"}}>{this.state.originAirport.name}</Text>
        </View>
        <View>
           <Text style = {{fontSize:18 , fontWeight:"700"}}>Destination</Text>
           <Text style = {{fontSize:18 , fontWeight:"500"}}>{this.state.destinationAirport.name}</Text>
        </View>
        </View>
        <Text></Text>
            <View style = {{backgroundColor:"white", padding :"5%"}}>
              <View style = {{display:"flex", flexDirection:"row"}}>
                <Icon name ="location-outline" size = {30}/>
                <Text style = {{fontSize:18 , fontWeight:"700"}}>Last Location</Text>
              </View>
              <Text style = {{fontSize: 18 , fontWeight:"500"}}>{this.state.destinationAirport.name}</Text>  
            </View>
            <TouchableOpacity style={{width:"100%", backgroundColor:"black"}}onPress={() => this.showModal()}>
                 <Text style = {{fontSize:18 , fontWeight:"700", color:"white", alignSelf:"center"}}>View Summary</Text>
             </TouchableOpacity>
      </View> : null }
      </ScrollView>
      </View>
    );
  }
}

export default Tracking;
