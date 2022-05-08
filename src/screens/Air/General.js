import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, ToastAndroid , Modal} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SelectMultiple from 'react-native-select-multiple'

const additionalData = [
  { 
    value:"Ocean Freight",
    label : "Ocean Freight"
  },
  { 
    value:"Pick up",
    label : "Pick up"
  },
  { 
    value:"Origin Clearance",
    label : "Origin Clearance"
  },
  { 
    value:"Destination Clearance",
    label : "Destination Clearance"
  },
  { 
    value:"Drop",
    label : "Drop"
  }
  ]


class General extends Component {
  constructor(props) {
    super(props);
    this.state = {
      myText: 'I\'m ready to get swiped!',
      gestureName: 'none',
      borderColorId:0,
      show : false,
      show1: false,
      show2:false,
      show3:false,
      isSelected:false,
      isSelected1:false,
      isSelected2:false,
      isSelected3:false,
      additionalService: [],
    };
  }


guestApi= () => {
    fetch("https://coapi.zipaworld.com/api/auth/customer/guest", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
      }
    }).then((response) => response.json())
    .then ((results) => {
      console.log(results);
      this.setState({
        record : results.result.csBuddyData.dashboard,
      });
    })
    .catch((error) => console.log("error", error));
}


onSwipe(gestureName, gestureState) {
  const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  this.setState({gestureName: gestureName});
  switch (gestureName) {
    case SWIPE_UP:
      this.setState({backgroundColor: 'red'});
      break;
    case SWIPE_DOWN:
      this.setState({backgroundColor: 'green'});
      break;
    case SWIPE_LEFT:
      this.props.navigation.navigate("OceanGeneral");
      break;
    case SWIPE_RIGHT:
      this.props.navigation.navigate("Ocean");
      break;
  }
}
Select = (id) => {
  this.setState({borderColorId: id});
  if(id == 1) {
    this.setState({show:true})
    this.setState({activityType : "Airport To Airport",
    address_to_port : "", address_to_address : "",port_to_address : ""})
  } else if (id == 2) {
    this.setState({show1:true})
    this.setState({port_to_port : "",
    activityType : "Address to Port ", address_to_address : "", port_to_address : ""})
  } else if (id == 3) {
    this.setState({show2:true})
    this.setState({ port_to_port : "",
    address_to_port : "", port_to_address: "",activityType : "Address to Address"})
  } else if (id == 4) {
    this.setState({show3:true})
    this.setState({port_to_port : "",
    address_to_port : "",activityType : "Port to Address", address_to_address : ""})
  }
};

navigatePage = (queryFor, tarrifMode) => {
  if(this.state.activityType == "Airport To Airport")
  {
    this.props.navigation.navigate("OceanGeneralStep1", {activityType:"Airport To Airport", additionalService:this.state.additionalService, queryFor , tarrifMode})
  } else if(this.state.activityType == "Address to Port")
  {
    this.props.navigation.navigate("OceanGeneralStep1", {activityType:"Address To Port"})
  } else if(this.state.activityType == "Port to Port")
  {
    this.props.navigation.navigate("OceanGeneralStep1", {activityType:"Address to Port"})
  } else if(this.state.activityType == "Address to Address")
  {
    this.props.navigation.navigate("OceanGeneralStep1", {activityType:"Address to Address"})
  } else if(this.state.activityType == "Port to Address")
  {
    this.props.navigation.navigate("OceanGeneralStep1", {activityType:"Port to Address"})
  } else {
      ToastAndroid.showWithGravity(
        "Please Select the Category First.",
        ToastAndroid.LONG,
        ToastAndroid.CENTER
      );
    }
}

getData = () => {
  this.setState({show:false})
}

onSelectionsChange = (additionalService) => {
  this.setState({ additionalService : additionalService })
}

  render() {
    const {queryFor, tarrifMode} = this.props.route.params;
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
    return (
      <GestureRecognizer
        onSwipe={(direction, state) => this.onSwipe(direction, state)}
        config={config}
        style={{
          flex: 1,
        }}
        >
      <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} locations={[0,0.5,0.6]} useAngle= {true} angle={257} colors={['#ffac04', '#fe0000']}
      style={styles.linearGradient}>
        <View style = {{padding:"2%",height:"100%"}}>
          <View style = {{backgroundColor:"#ffffff", height:"8%", borderRadius:10, padding:"2%"}}>
            <Text style = {{color : "#000000", fontSize:25, fontWeight:"500"}}>Select Commodity</Text>
          </View>
          <Text></Text>
       <TouchableOpacity style={this.state.borderColorId === 1? styles.border : styles.button} onPress={() => this.Select(1)}> 
        <View style= {{alignSelf:"center"}}>
            <Image source = {require("../../assets/air-to-air1.png")} style={{alignSelf:"center"}}/>
            <Text style = {{fontWeight:"700", fontSize: 20}}>Origin Airport To Destination Airport</Text>
          </View>  
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity style={this.state.borderColorId === 2? styles.border : styles.button} onPress={() => this.Select(2)}> 
        <View style= {{alignSelf:"center"}}>
            <Image source = {require("../../assets/air-to-air1.png")} style={{alignSelf:"center"}}/>
            <Text style = {{fontWeight:"700", fontSize: 20}}>Origin Address To Destination Airport</Text>
          </View>  
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity style={this.state.borderColorId === 3? styles.border : styles.button} onPress={() => this.Select(3)}> 
        <View style= {{alignSelf:"center"}}>
            <Image source = {require("../../assets/air-to-air1.png")} style={{alignSelf:"center"}}/>
            <Text style = {{fontWeight:"700", fontSize: 20}}>Origin Address To Destination Address</Text>
          </View>  
        </TouchableOpacity>
        <Text></Text>
        <TouchableOpacity style={this.state.borderColorId === 4? styles.border : styles.button} onPress={() => this.Select(4)}> 
        <View style= {{alignSelf:"center"}}>
            <Image source = {require("../../assets/air-to-air1.png")} style={{alignSelf:"center"}}/>
            <Text style = {{fontWeight:"700", fontSize: 20}}>Origin Airport To Destination Address</Text>
          </View>  
        </TouchableOpacity>
        <Text></Text>
            <Pressable style = {styles.btn} onPress = {() => this.navigatePage(queryFor,tarrifMode )}>
              <View style = {{ alignSelf:"center"}}>
                  <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
              </View>
            </Pressable>
            <Modal transparent={true} visible={this.state.show} animationType="slide">
              <View style = {{backgroundColor:"#000000aa", flex:1}}>
                <View style = {{backgroundColor:"#ffffff", margin: 30, height:380,padding : 10, borderRadius:10}}>  
                <SelectMultiple
                    items={additionalData}
                    selectedItems={this.state.additionalService}
                    onSelectionsChange={this.onSelectionsChange} 
                />
                 <Pressable style = {styles.btn1} onPress={() => this.setState({show:false})}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </Pressable>   
                </View>
              </View>
            </Modal>
            </View>
      </LinearGradient>
      </GestureRecognizer>  
    );
  }
}

const styles = StyleSheet.create({
linearGradient: {
  flex: 1,
},
btn1 : {
  padding:"3%",
  backgroundColor:"#000000",
  height:50,
  borderRadius:20,
  width:"30%",
  alignSelf:"flex-end",
},
btn : {
  padding:"3%",
  backgroundColor:"#000000",
  height:"9%",
  borderRadius:20,
  width:"30%",
  alignSelf:"center"
},
border: {
  borderColor:"#000000",
  borderWidth:2,
  alignItems: 'center',
  padding: 10,
  backgroundColor: '#ffffff',
  height:"15%",
  borderRadius:10,
  padding:"3%",
  elevation:30
},
button: {
  alignItems: 'center',
  backgroundColor: '#ffffff',
  height:"15%",
  borderRadius:10,
  padding:"3%",
  elevation:30
},
})

export default General;
