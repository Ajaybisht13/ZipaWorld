// import React, { Component } from 'react';
// import { View, Text } from 'react-native';

// class Ocean extends Component {
//   constructor(props) {
//     super(props);
//     this.state = {
      
//     };
//   }

//   render() {
//      const {queryFor} = this.props.route.params
//     return (
//       <View>
//         <Text>{queryFor}</Text>
//       </View>
//     );
//   }
// }

// export default Ocean;

import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, ToastAndroid, Image, Modal ,TextInput, ScrollView, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Iconss from 'react-native-vector-icons/Entypo';
import LinearGradient from 'react-native-linear-gradient';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { Avatar } from 'react-native-elements';
import { RadioButton } from 'react-native-paper';
import DocumentPicker from 'react-native-document-picker';

const baseUrl = "https://coapi.zipaworld.com/";

class Ocean extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      gestureName: 'none',
      borderColorId:0,
      general:"General",
      cargo:"Refrigerasted Cargo",
      dimension:"Dimensions",
      danger:"Danger",
      other:"Others",
      refModal : false,
      dangerModal : false,
      checked : "",
      singleFileOBJ: [],
    };
  }


 componentDidMount = async() => {
    
 }
 
  // onSwipe(gestureName, gestureState, queryFor) {
  //   const {SWIPE_UP, SWIPE_DOWN, SWIPE_LEFT, SWIPE_RIGHT} = swipeDirections;
  //   this.setState({gestureName: gestureName});
  //   switch (gestureName) {
  //     case SWIPE_UP:
  //       this.setState({backgroundColor: 'red'});
  //       break;
  //     case SWIPE_DOWN:
  //       this.setState({backgroundColor: 'green'});
  //       break;
  //     case SWIPE_LEFT:
  //       this.props.navigation.navigate("OceanGeneral");
  //       break;
  //     case SWIPE_RIGHT:
  //       this.props.navigation.navigate("Home");
  //       break;
  //   }
  // }

  Select = (id) => {
    this.setState({borderColorId: id});
     if(id == 1) {
      this.setState({tarrifMode : "General Cargo",
      cargoId : "", dimensionId : "",dangerId : "", otherId: ''})
    } else if (id == 2) {
      this.setState({ generalId : "",
      tarrifMode : "Perishable Goods", dimensionId : "",dangerId : "", otherId: '', refModal: true })
    } else if (id == 3) {
      this.setState({ generalId : "",
      cargoId : "", tarrifMode : "Odd Dimention",dangerId : "", otherId: ''})
    } else if (id == 4) {
      this.setState({generalId : "",
      cargoId : "", dimensionId : "",tarrifMode: "Dangerous Goods", otherId: '', dangerModal:true})
    } else if (id == 5) {
      this.setState({generalId : "",
      cargoId : "", dimensionId : "",dangerId : "", tarrifMode: 'Others'})
    }
  };


  navigatePage = (queryFor) => {
    if(this.state.tarrifMode == "General Cargo")
    {
      this.props.navigation.navigate("OceanGeneral", {tarrifMode : "General Cargo", queryFor})
    } else if(this.state.tarrifMode == "Perishable Goods")
      {
        this.props.navigation.navigate("OceanRefrigeratedCargo",{tarrifMode : "Perishable Goods",queryFor, temperature: this.state.checked})
      } else if(this.state.tarrifMode == "Odd Dimention")
      {
        this.props.navigation.navigate("OceanDimensions",{tarrifMode : "Odd Dimention", queryFor})
      } else if(this.state.tarrifMode == "Dangerous Goods")
      {
        this.props.navigation.navigate("OceanDanger",{tarrifMode : "Dangerous Goods", queryFor})
      } else if(this.state.tarrifMode == "Others")
      {
        this.props.navigation.navigate("OceanOthers",{tarrifMode : "Others", queryFor})
      }else {
        ToastAndroid.showWithGravity(
          "Please Select the Commodity First.",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
  } 

  async SingleFilePicker() {
    try {
      const res = await DocumentPicker.pick({
        type: [DocumentPicker.types.pdf],
      
      })
      console.log("bbbbbbbbb", res)
      this.setState({ singleFileOBJ: res}, () => {
        console.log("aaaaaaaaaaa", this.state.singleFileOBJ)
      });

    } catch (err) {
      if (DocumentPicker.isCancel(err)) {
        alert('Canceled');
      } else {
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  }

  submitFile = async() => {
    const token = await AsyncStorage.getItem("userToken")
    fetch(baseUrl + "api/queries/readDg", {
      method: "Post",
      headers:{
         "Content-Type" : "application/json",
         "authkey" : token
      },
      //body : JSON.stringify(this.state)
      }).then((response) => response.json())
      .then((results) => {
        console.log("aaaaaaaaa",results);
      }).catch((error) => console.log("error", error));
  }
  
  render() {
    const {queryFor} = this.props.route.params
    
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
 
    return (
      <View style = {{backgroundColor:"white", height:"100%"}}>
        <View style = {styles.parent}>
          <View style = {styles.child}>
          </View>
         </View>
         <View style = {{position:"absolute", padding:"5%", display:"flex", flexDirection:"column", justifyContent:"space-between", alignSelf:"center"}}>
         <View style = {{alignSelf:"center"}}>
            <Text style = {{color : "#ffffff", fontSize:28, fontWeight:"500"}}>Select Commodity</Text>
          </View>
          <Text></Text>
         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", alignSelf:"center", width:"82%"}}>
            <TouchableOpacity style={this.state.borderColorId === 1? styles.border : styles.buttonss} onPress={() => this.Select(1)}>
              <View style = {{ marginTop:"8%"}}>  
                <Image source = {require("../../assets/box.png")} style={{alignSelf:"center", borderRadius:10}} height={70} width={70}/>
              </View>
              <Text style = {{fontWeight:"700", fontSize:15, alignSelf:"center", color :"#000000", top:"4%"}}>{this.state.general}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.borderColorId === 2? styles.border : styles.buttonss} onPress={() => this.Select(2)}>
            <View style = {{ marginTop:"5%"}}>
               <Image source = {require("../../assets/medicine.png")} style={{alignSelf:"center", borderRadius:10}} height={60} width={60}/>
            </View>
            <Text style = {{fontWeight:"600", fontSize:15, alignSelf:"center", color :"#000000", top:"4%"}}>Refrigerated</Text>
            <Text style = {{fontWeight:"600", fontSize:15, alignSelf:"center", color :"#000000"}}>Cargo</Text>
            </TouchableOpacity>
          </View>
          <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", alignSelf:"center", width:"82%", top:"10%"}}>
            <TouchableOpacity style={this.state.borderColorId === 3? styles.border : styles.buttonss} onPress={() => this.Select(3)}>
              <View style = {{ marginTop:"8%"}}>
                <Image source = {require("../../assets/odd.png")} style={{alignSelf:"center", borderRadius:10, marginTop:"2%"}} height={60} width={60}/>
              </View>
                  <Text style = {{fontWeight:"600", fontSize:15, alignSelf:"center", top:"4%"}}>{this.state.dimension}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.borderColorId === 4? styles.border : styles.buttonss} onPress={() => this.Select(4)}>
              <View style = {{ marginTop:"8%"}}>
                <Image source = {require("../../assets/danger.png")} style={{alignSelf:"center", borderRadius:10}} height={60} width={60}/>
              </View>
              <Text style = {{fontWeight:"600", fontSize:15, alignSelf:"center", top:"4%"}}>{this.state.danger}</Text>
            </TouchableOpacity>
            </View>
            <Text></Text>
            <Text></Text>
            <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", alignSelf:"center", width:"82%", top:"10%"}}>
              <TouchableOpacity style={this.state.borderColorId === 5? styles.border : styles.buttonss} onPress={() => this.Select(5)}>
              <View style = {{ marginTop:"8%"}}>
                <Image source = {require("../../assets/other.png")} style={{alignSelf:"center", borderRadius:10}} height={60} width={60}/>
              </View>
                <Text style = {{fontWeight:"600", fontSize:15, alignSelf:"center", top:"4%"}}>{this.state.other}</Text>
              </TouchableOpacity>
              </View>
            <Text></Text>
            <Text></Text>
            <Text></Text>
            <View style = {{display:"flex", flexDirection:"row",alignSelf:"center",top:"2%"}}>
            {/* <TouchableOpacity style = {styles.btn} onPress = {() => this.props.navigation.navigate("Home")}>
               <Icon name= "arrow-left" color="#000000" size={50}/>
            </TouchableOpacity> */}
            <TouchableOpacity style = {styles.btn} onPress = {() => this.navigatePage(queryFor )}>
               <Icon name= "arrow-right" color="#000000" size={50}/>
            </TouchableOpacity>
            </View>
            </View>
            <Modal transparent={true} visible={this.state.refModal} animationType="slide">
              <View style = {{backgroundColor:"#000000aa", flex:1}}>
                <View style = {{backgroundColor:"#ffffff", marginTop: 60, height:"80%",padding : 10, borderRadius:10}}>
                   <TouchableOpacity onPress={() => this.setState({refModal:false})}>
                       <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
                    </TouchableOpacity> 
                    <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", marginTop:"1%"}}>
                        <Text style = {{alignSelf:"center", color:"#ff3800", fontSize:24, fontWeight : "700"}}>TEMPERATURES</Text>
                        <Text></Text>
                          <View style = {{display:"flex", flexDirection:"row"}}>
                          <RadioButton
                              value="2 Deg to 8 Deg"
                              status={ this.state.checked === '2 Deg to 8 Deg' ? 'checked' : 'unchecked' }
                              onPress={() => this.setState({checked:'2 Deg to 8 Deg', refModal:false})}
                              color ="#ff3800"
                            />
                          <Text style = {{marginTop:"1%", fontSize:18, fontWeight:"700"}}>  2 Deg to 8 Deg</Text>
                          </View>
                         <View style = {{display:"flex", flexDirection:"row"}}>
                         <RadioButton
                              value="15 Deg to 25 Deg"
                              status={ this.state.checked === '15 Deg to 25 Deg' ? 'checked' : 'unchecked' }
                              onPress={() => this.setState({checked:'15 Deg to 25 Deg', refModal:false})}
                              color ="#ff3800"
                            />
                          <Text style = {{marginTop:"1%", fontSize:18, fontWeight:"700"}}>  15 Deg to 25 Deg</Text>
                          </View>
                          <View style = {{display:"flex", flexDirection:"row"}}>
                          <RadioButton
                              value="2 Deg To 8 Deg"
                              status={ this.state.checked === '2 Deg To 8 Deg' ? 'checked' : 'unchecked' }
                              onPress={() => this.setState({checked:'2 Deg To 8 Deg', refModal:false})}
                              color ="#ff3800"
                              size={25}
                            />
                            <Text style = {{marginTop:"1%", fontSize:18, fontWeight:"700"}}>  2 Deg to 8 Deg</Text>
                          </View>
                          <View style = {{display:"flex", flexDirection:"row"}}>
                          <RadioButton
                              value="Others"
                              status={ this.state.checked === 'Others' ? 'checked' : 'unchecked' }
                              onPress={() => this.setState({checked:'Others', refModal:false})}
                              color ="#ff3800"
                            />
                            <Text style = {{marginTop:"1%", fontSize:18, fontWeight:"700"}}>  Others</Text>
                          </View> 
                     </View>
                </View>
              </View>
            </Modal>
            <Modal transparent={true} visible={this.state.dangerModal} animationType="slide">
              <View style = {{backgroundColor:"#000000aa", flex:1}}>
                <View style = {{backgroundColor:"#ffffff", marginTop: 60, height:400,padding : 10, borderRadius:10}}>
                   <TouchableOpacity onPress={() => this.setState({dangerModal:false})}>
                       <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
                    </TouchableOpacity>
                    <ScrollView>
                    <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", marginTop:"1%"}}>
                      <Text style = {{alignSelf:"center", color:"#ff3800", fontSize:24, fontWeight : "700"}}>DANGEROUS GOODS</Text>
                      <Text></Text>
                      <View style = {{marginTop:"3%"}}>
                        <Text style= {{fontSize:18}}>Enter UN Number</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                         //onChangeText={(text) => this.setState({length:text})}
                        />
                        </View>
                      <View>
                       <Text></Text> 
                        <Text style= {{fontSize:18}}>Upload MSDS</Text>
                        <Text></Text>
                      </View>
                      <View>
                      {this.state.singleFileOBJ && this.state.singleFileOBJ.map((item, i) => {
                         return (
                            <Text>{item.uri}</Text>
                         )
                      })}
                      <Text></Text>
                       <TouchableOpacity
                          activeOpacity={0.5}
                          style={styles.button}
                          onPress={this.SingleFilePicker.bind(this)}>
                          <Text style={styles.buttonText}>
                            Upload MSDS
                          </Text>
                        </TouchableOpacity>

                    </View> 
                    <Text></Text>
                    <TouchableOpacity style = {{backgroundColor:"#ff3800", height:30, width:80, borderRadius:10}} onPress= {() => this.submitFile()}>
                      <Text style = {{ padding:"5%", alignSelf:"center", color:"#ffffff"}}>Upload</Text>
                   </TouchableOpacity>  
                    </View>
                    </ScrollView>
                    <Text></Text>
                </View>
              </View>
            </Modal>
          </View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    backgroundColor: '#ffffff',
    borderRadius:10,
    width:115,
    height:120,
    borderColor:"black",
    borderWidth:4,
    elevation:30
  },
  buttonss: {
    backgroundColor: '#ffffff',
    borderRadius:10,
    width:115,
    height:110,
    borderColor:"black",
    borderWidth:2,
  },
  linearGradient: {
    flex: 1,
  },
  btn : {
  padding:"3%",
  backgroundColor:"transparent",
  borderRadius:100,
  borderColor:"red",
  borderWidth:2,
  width:80,
  height:"auto",
  justifyContent:"space-between"
  },
  parent : {
    height : '40%',
    width : '100%',
    transform : [ { scaleX : 2 } ],
    borderBottomStartRadius : 200,
    borderBottomEndRadius : 200,
    overflow : 'hidden',
  },
  child : {
    flex : 1,
    transform : [ { scaleX : 0.5 } ],

    backgroundColor : 'red',
    alignItems : 'center',
    justifyContent : 'center'
  },
  // MainContainer: {
  //   flex: 1,
  //   backgroundColor: '#fff',
  //   padding: 16,
  //   justifyContent: 'center',
  // },

  button: {
    width:"45%",
    backgroundColor: '#ff3800',
    borderRadius:10,
  },

  buttonText: {
    color: '#fff',
    fontSize: 15,
    padding: 10,
    textAlign: 'center'
  },

  text: {
    color: '#000',
    fontSize: 16,
    padding: 10,
    textAlign: 'left'
  },
})

export default Ocean;
