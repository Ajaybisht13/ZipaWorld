import React, { Component } from 'react';
import { View, Text, Button, StyleSheet, Pressable, TouchableOpacity, ToastAndroid, BackHandler, ScrollView, Image, ImageBackground } from 'react-native';
import { SliderBox } from "react-native-image-slider-box";
import { Avatar} from 'react-native-elements';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/Fontisto';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import LinearGradient from 'react-native-linear-gradient';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Iconss from 'react-native-vector-icons/FontAwesome'
import { DrawerActions } from '@react-navigation/routers';
//import { addDatatoAsyncStorage } from '../common/addDatatoAsyncStorage';

class Home extends Component {
  constructor(props) {
    super(props);
    this.state = {
      air:"AIR",
      ocean:"OCEAN",
      courier:"COURIER",
      road:"ROAD",
      borderColorId:0,
      pressed:false,
      isLogged : false
    };
  }

  componentWillUnmount() {
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackPress);
  }

  handleBackPress = () => {
       return true;
  }

  // paynow = () => {
  //   var options = {
  //     description: 'Credits towards consultation',
  //     image: 'https://i.imgur.com/3g7nmJC.png',
  //     currency: 'INR',
  //     key: '<YOUR_KEY_ID>',
  //     amount: '5000',
  //     name: 'Acme Corp',
  //     order_id: 'order_DslnoIgkIDL8Zt',//Replace this with an order_id created using Orders API.
  //     prefill: {
  //       email: 'gaurav.kumar@example.com',
  //       contact: '9191919191',
  //       name: 'Gaurav Kumar'
  //     },
  //     theme: {color: '#53a20e'}
  //   }
  //   RazorpayCheckout.open(options).then((data) => {
  //     // handle success
  //     alert(`Success: ${data.razorpay_payment_id}`);
  //   }).catch((error) => {
  //     // handle failure
  //     alert(`Error: ${error.code} | ${error.description}`);
  //   });
  // }


  componentDidMount = async() => { 
    const token = await AsyncStorage.getItem("userToken");
    BackHandler.addEventListener('hardwareBackPress', this.handleBackPress);
    this.guestApi();
  }


 guestApi= () => {
      fetch("https://coapi.zipaworld.com/api/auth/customer/guest", {
        method:"Post",
        headers:{
          "Content-Type" : "application/json",
        }
      }).then((response) => response.json())
      .then (async (results) => {
        //console.log(results.result.authToken);
        try {
          await AsyncStorage.setItem('customer', results.result.authToken);
          await AsyncStorage.setItem('customerBranchId', results.result.customerBranchData._id);
          await AsyncStorage.setItem('customerBranchData', JSON.stringify(results.result.customerBranchData));
          await AsyncStorage.setItem('customerId', results.result.customerBranchData.customerId);
          await AsyncStorage.setItem('branchId', results.result.customerBranchData.csBuddy.branchId._id);
          await AsyncStorage.setItem('csBuddyBranchId', results.result.csBuddyBranchData._id);
          console.log("id store", results.result.customerBranchData.csBuddy.branchId._id)
        } catch (error) {
          console.log(error)
        }
      })
      .catch((error) => console.log("error", error));
}


  Select = (id) => {
    this.setState({borderColorId: id});
    if(id == 1) {
      this.setState({queryFor : "Air",
      oceanId : "",roadId : "",courierId : ""})
    } else if (id == 2) {
      this.setState({airId : "",
      queryFor : "Ocean",roadId : "",courierId : ""})
    } else if (id == 3) {
      this.setState({airId : "",
      oceanId : "",roadId : "",queryFor : "Courier"})
    } else if (id == 4) {
      this.setState({airId : "",
      oceanId : "",queryFor : "Road",courierId : ""})
    }
  };

  navigatePage = () => {
    if(this.state.queryFor == "Air")
    {
      // this.props.navigation.navigate("Air", {queryFor:"Air"})\
      alert("This page is on Working")
    } else if(this.state.queryFor == "Ocean")
      {
        this.props.navigation.navigate("Ocean",{queryFor:"Ocean"})
      } else if(this.state.queryFor == "Courier")
      {
        // this.props.navigation.navigate("Courier", {queryFor:"Courier"})
        alert("This page is on Working")
      } else if(this.state.queryFor == "Road")
      {
        // this.props.navigation.navigate("Road", {queryFor:"Road"})
         alert("This page is on Working")
      } else {
        ToastAndroid.showWithGravity(
          "Please Select the Category First.",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
  }


  render() {
    return (
      // <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} locations={[0,0.5,0.6]} useAngle= {true} angle={257} colors={['#ffac04', '#fe0000']}
      // style={styles.linearGradient}>
      <View>
      <ImageBackground source = {require("../../assets/background.jpg")} style = {{height:"100%", width:"100%"}}>
        <View style = {{width:"100%", top :"1%"}}>
          {/* <TouchableOpacity style = {{marginLeft:"2%"}}>
             <Iconss name ="bars" size={20} color="black" onPress = {() => this.props.navigation.dispatch(DrawerActions.openDrawer())}/>
          </TouchableOpacity> */}
        <Image style={{alignSelf:"center"}} source={require('../../assets/log.png')}/>
        </View>
        <View style = {{padding:"2%",height:"100%", top:"5%",paddingBottom:"30%",  display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
            <TouchableOpacity style={this.state.borderColorId === 1? styles.border : styles.button} onPress={() => this.Select(1)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"30%", justifyContent:"space-between"}}>
                  <Icon name= "airplane-takeoff" color="#000000" size={50}/>
                  <Text style = {{fontWeight:"bold", fontSize:27}}>{this.state.air}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.borderColorId === 2? styles.border : styles.button} onPress={() => this.Select(2)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"38%", justifyContent:"space-between"}}>
                  <Icons name= "ship" color="#000000" size={40}/>
                  <Text style = {{fontWeight:"bold", fontSize:27}}>{this.state.ocean}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.borderColorId === 3? styles.border : styles.button} onPress={() => this.Select(3)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"45%", justifyContent:"space-between"}}>
                  <Icons name= "shopping-package" color="#000000" size={35}/>
                  <Text style = {{fontWeight:"bold", fontSize:27}}>{this.state.courier}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.borderColorId === 4? styles.border : styles.button} onPress={() => this.Select(4)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"35%", justifyContent:"space-between"}}>
                  <Icon name= "truck" color="#000000" size={38}/>
                  <Text style = {{fontWeight:"bold", fontSize:27}}>{this.state.road}</Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style = {styles.btn} onPress = {() => this.navigatePage()}>
               <Icon name= "arrow-right" color="#000000" size={50}/>
            </TouchableOpacity>
         </View>
         </ImageBackground>
         </View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    borderColor:"red",
    borderWidth:4,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    height:65,
    borderRadius:20,
    padding:"3%",
    shadowColor: "#000000aa",
    shadowOffset: {
      width: 0,
      height: 3,
    },
    shadowOpacity: 0.27,
    shadowRadius: 4.65,
    elevation: 30,
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    borderColor:"red",
    borderWidth:2,
    height:60,
    borderRadius:20,
    padding:"3%",
  },
  linearGradient: {
    flex: 1,
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
  }
})

export default Home;
