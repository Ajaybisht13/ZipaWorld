import React, { Component } from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity, Pressable, ToastAndroid , Modal, ImageBackground} from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Entypo';
import DatePicker from 'react-native-datepicker';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import SelectMultiple from 'react-native-select-multiple';
import Iconss from 'react-native-vector-icons/Entypo';

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
  const additionalDataAddressToPort = [
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

    const additionalDataAddressToAddress = [
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

      const additionalDataPortToAddress = [
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


class OceanDanger extends Component {
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
      additionalShow: false,
      additionalShow1: false,
      additionalShow2: false,
      additionalShow3: false,
      additionalService: [{ value:"Ocean Freight", label : "Ocean Freight"}],
      additionalService1:[ { 
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
      },],


      additionalService2:[{ 
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
      }],
      additionalService3:[{ 
        value:"Ocean Freight",
        label : "Ocean Freight"
      },
      { 
        value:"Destination Clearance",
        label : "Destination Clearance"
      },
      { 
        value:"Drop",
        label : "Drop"
      }]
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
    this.setState({activityType : "Port To Port",
    address_to_port : "", address_to_address : "",port_to_address : ""})
  } else if (id == 2) {
    this.setState({show1:true})
    this.setState({activityType : "Door To Port",
    address_to_port : "", address_to_address : "",port_to_address : ""})
  } else if (id == 3) {
    this.setState({show2:true})
    this.setState({ port_to_port : "",
    address_to_port : "", port_to_address: "",activityType : "Door To Door"})
  } else if (id == 4) {
    this.setState({show3:true})
    this.setState({port_to_port : "",
    address_to_port : "",activityType : "Port To Door", address_to_address : ""})
  }
};

navigatePage = (queryFor, tarrifMode) => {
  if(this.state.activityType == "Port To Port")
  {
    this.props.navigation.navigate("DangerPortToPort", {activityType:"Port To Port", additionalService:this.state.additionalService, queryFor , tarrifMode})
  } else if(this.state.activityType == "Door To Port")
  {
    this.props.navigation.navigate("DangerAddressToPort", {activityType:"Door To Port", additionalService:this.state.additionalService1, queryFor , tarrifMode})
  } else if(this.state.activityType == "Door To Door")
  {
    this.props.navigation.navigate("DangerAddressToAddress", {activityType:"Door To Door", additionalService:this.state.additionalService2, queryFor , tarrifMode})
  } else if(this.state.activityType == "Port To Door")
  {
    this.props.navigation.navigate("DangerPortToAddress", {activityType:"Port To Door", additionalService:this.state.additionalService3, queryFor , tarrifMode})
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

onSelectionsChanges = (additionalService1) => {
  this.setState({ additionalService1 : additionalService1 })
}

onSelectionsChangesAddressToAddress = (additionalService2) => {
  this.setState({ additionalService2 : additionalService2 })
}

onSelectionsChangesPortToAddress = (additionalService3) => {
  this.setState({ additionalService3 : additionalService3 })
}


componentHideAndShow = () => {
  this.setState((previousState) => ({ additionalShow: !previousState.additionalShow }))
  }

componentHideAndShow1 = () => {
    this.setState((previousState) => ({ additionalShow1: !previousState.additionalShow1 }))
  }
componentHideAndShow2 = () => {
      this.setState((previousState) => ({ additionalShow2: !previousState.additionalShow2 }))
      }
componentHideAndShow3 = () => {
        this.setState((previousState) => ({ additionalShow3: !previousState.additionalShow3 }))
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
      {/* <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} locations={[0,0.5,0.6]} useAngle= {true} angle={257} colors={['#ffac04', '#fe0000']}
      style={styles.linearGradient}> */}
      <View>
        <ImageBackground source = {require("../../assets/background.jpg")} style = {{height:"100%", width:"100%"}}>
            <Text style = {{color : "#000000", fontSize:30, fontWeight:"bold", alignSelf:"center", top :"2%"}}>Select Commodity</Text>
      <View style = {{padding:"2%",height:"100%", backgroundColor:"transparent", marginTop:"10%", display:"flex", flexDirection:"column", justifyContent:"space-between", paddingBottom:"30%"}}>  
       <TouchableOpacity style={this.state.borderColorId === 1? styles.border : styles.button} onPress={() => this.Select(1)}> 
        <View style= {{alignSelf:"center"}}>
            <Image source = {require("../../assets/air-air.png")} style={{alignSelf:"center", height:"60%"}}/>
            <Text style = {{fontWeight:"700", fontSize: 20}}>Origin Port To Destination Port</Text>
          </View>  
        </TouchableOpacity>
        <TouchableOpacity style={this.state.borderColorId === 2? styles.border : styles.button} onPress={() => this.Select(2)}> 
        <View style= {{alignSelf:"center"}}>
            <Image source = {require("../../assets/air-door.png")} style={{alignSelf:"center", height:"60%"}}/>
            <Text style = {{fontWeight:"700", fontSize: 20}}>Origin Address To Destination Port</Text>
          </View>  
        </TouchableOpacity>
        <TouchableOpacity style={this.state.borderColorId === 3? styles.border : styles.button} onPress={() => this.Select(3)}> 
        <View style= {{alignSelf:"center"}}>
            <Image source = {require("../../assets/door-air.png")} style={{alignSelf:"center", height:"60%"}}/>
            <Text style = {{fontWeight:"700", fontSize: 20}}>Origin Address To Destination Address</Text>
          </View>  
        </TouchableOpacity>
        <TouchableOpacity style={this.state.borderColorId === 4? styles.border : styles.button} onPress={() => this.Select(4)}> 
        <View style= {{alignSelf:"center"}}>
            <Image source = {require("../../assets/door-door.png")} style={{alignSelf:"center", height:"60%"}}/>
            <Text style = {{fontWeight:"700", fontSize: 20}}>Origin Port To Destination Address</Text>
          </View>  
        </TouchableOpacity>
            <Pressable style = {styles.btn} onPress = {() => this.navigatePage(queryFor,tarrifMode )}>
               <Icon name= "arrow-right" color="#000000" size={50}/>
            </Pressable>
        </View>  
        </ImageBackground> 
            <Modal transparent={true} visible={this.state.show} animationType="slide">
              <View style = {{backgroundColor:"#000000aa", flex:1}}>
              <View style = {{backgroundColor:"#ffffff", margin: 30, height:380,padding : 10, borderRadius:10}}>  
              <TouchableOpacity style = {{borderWidth:2, borderRadius:10, height:"15%"}}onPress={() => this.componentHideAndShow()}>
                  <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                 <Text style = {{fontSize:20, fontWeight:"600", marginTop:"3%"}}>   Additional services</Text>
                 <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                 </View>
                 </TouchableOpacity>
              { this.state.additionalShow ? 
                   <View style = {{padding :"1%"}}>
                   {
                     this.state.additionalService && this.state.additionalService.map((item) => {
                       return (
                         <View >
                            <Text style = {{fontSize:20}}>{item.label}</Text>
                         </View>
                       )
                     })
                   }
                   </View>
                 :
                   null
                  }
                <Text></Text>
                 <TouchableOpacity style = {styles.btn1} onPress={() => this.setState({show:false})}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </TouchableOpacity>  
                </View>
              </View>
            </Modal>
            <Modal transparent={true} visible={this.state.show1} animationType="slide">
              <View style = {{backgroundColor:"#000000aa", flex:1}}>
                <View style = {{backgroundColor:"#ffffff", margin: 30, height:380,padding : 10, borderRadius:10}}>  
                <TouchableOpacity style = {{borderWidth:2, borderRadius:10, height:"15%"}}onPress={() => this.componentHideAndShow1()}>
                  <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                 <Text style = {{fontSize:20, fontWeight:"600", marginTop:"3%"}}>   Additional services</Text>
                 <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                 </View>
                 </TouchableOpacity>
              { this.state.additionalShow ? 
                   <View style = {{padding :"1%"}}>
                   {
                     this.state.additionalService1 && this.state.additionalService1.map((item) => {
                       return (
                         <View >
                            <Text style = {{fontSize:20}}>{item.label}</Text>
                         </View>
                       )
                     })
                   }
                   </View>
                 :
                   null
                  }
                  <Text></Text>
                 <Pressable style = {styles.btn1} onPress={() => this.setState({show1:false})}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </Pressable>   
                </View>
              </View>
            </Modal>
            <Modal transparent={true} visible={this.state.show2} animationType="slide">
              <View style = {{backgroundColor:"#000000aa", flex:1}}>
                <View style = {{backgroundColor:"#ffffff", margin: 30, height:380,padding : 10, borderRadius:10}}>  
                <TouchableOpacity style = {{borderWidth:2, borderRadius:10, height:"15%"}}onPress={() => this.componentHideAndShow2()}>
                  <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                 <Text style = {{fontSize:20, fontWeight:"600", marginTop:"3%"}}>   Additional services</Text>
                 <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                 </View>
                 </TouchableOpacity>
              { this.state.additionalShow2 ? 
                   <View style = {{padding :"1%"}}>
                   {
                     this.state.additionalService2 && this.state.additionalService2.map((item) => {
                       return (
                         <View >
                            <Text style = {{fontSize:20}}>{item.label}</Text>
                         </View>
                       )
                     })
                   }
                   </View>
                 :
                   null
                  }
                  <Text></Text>
                 <Pressable style = {styles.btn1} onPress={() => this.setState({show2:false})}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </Pressable>   
                </View>
              </View>
            </Modal>
            <Modal transparent={true} visible={this.state.show3} animationType="slide">
              <View style = {{backgroundColor:"#000000aa", flex:1}}>
                <View style = {{backgroundColor:"#ffffff", margin: 30, height:380,padding : 10, borderRadius:10}}>  
                <TouchableOpacity style = {{borderWidth:2, borderRadius:10, height:"15%"}}onPress={() => this.componentHideAndShow3()}>
                  <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                 <Text style = {{fontSize:20, fontWeight:"600", marginTop:"3%"}}>   Additional services</Text>
                 <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                 </View>
                 </TouchableOpacity>
              { this.state.additionalShow3 ? 
                   <View style = {{padding :"1%"}}>
                   {
                     this.state.additionalService3 && this.state.additionalService3.map((item) => {
                       return (
                         <View >
                            <Text style = {{fontSize:20}}>{item.label}</Text>
                         </View>
                       )
                     })
                   }
                   </View>
                 :
                   null
                  }
                  <Text></Text>
                 <Pressable style = {styles.btn1} onPress={() => this.setState({show3:false})}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </Pressable>   
                </View>
              </View>
            </Modal>
          </View>
            
      {/* </LinearGradient> */}
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
    backgroundColor:"transparent",
    height:55,
    borderRadius:100,
    borderColor:"red",
    borderWidth:2,
    width:"21%",
    height:"auto",
    alignSelf:"center"
  },
  border: {
    borderColor:"red",
    borderWidth:2,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    height:"18%",
    borderRadius:10,
    padding:"3%",
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height:"18%",
    borderRadius:10,
    padding:"3%",
    borderColor:"red",
    borderWidth:2,
  },
  })

export default OceanDanger;
