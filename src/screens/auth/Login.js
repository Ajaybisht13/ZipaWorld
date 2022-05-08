import React, { Component } from 'react';
import { View, Text, Button, Pressable, ScrollView, StyleSheet, Image, ImageBackground, Modal, TouchableOpacity, TextInput} from 'react-native';
import { Input } from 'react-native-elements';
import Icons from 'react-native-vector-icons/EvilIcons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import LinearGradient from 'react-native-linear-gradient';
// import { TouchableOpacity } from 'react-native-gesture-handler';
import { whileStatement } from '@babel/types';
import Icon from 'react-native-vector-icons/Entypo';


const baseUrl = "https://coapi.zipaworld.com"

class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "email": "",
      "password":"",
      "source":"Mobile",
      "errorMessage": "",
      "modal" : false,
      "mobile":"",
      "buttonName" : "generate",
      "otp" : "",
      "showLoginButton" : false
    };
  }
   
  


  login = () => {
     if (this.state.email.trim() === ""){
      // alert("Enter the Email")
      this.setState(() => ({ emailError: null }));
    }
    else if (this.state.password.trim() === "") {
      // alert("Enter the Password")
      this.setState(() => ({ passwordError: null }));
    }
    fetch("https://coapi.zipaworld.com/api/auth/customer/login", {
      method: "Post",
      headers:{
         "Content-Type" : "application/json"
      },
      body : JSON.stringify(this.state)
      }).then((response) => response.json())
      .then (async (results) => {
        console.log(results.result);
        try {
          await AsyncStorage.setItem('userToken', results.result.authToken);
          await AsyncStorage.setItem('authCustomerBranchId', results.result.customerBranchData._id);
          await AsyncStorage.setItem('authCustomerBranchData', JSON.stringify(results.result.customerBranchData));
          await AsyncStorage.setItem('authId', results.result.customerBranchData.customerId);
          await AsyncStorage.setItem('authBranchId', results.result.customerBranchData.csBuddy.branchId._id);
          await AsyncStorage.setItem('authCSBuddyBranchId', results.result.csBuddyBranchData._id);
          console.log("id store", results.result.customerBranchData.csBuddy.branchId._id)
          this.props.navigation.navigate("Home2");
          alert(results.message)
        } catch (error) {
          console.log(error)
        }
      })
      .catch((error) => console.log("error", error));
  }

  otpVerfication = () => {
     this.setState({
       modal:true
     })
  }

  generateOtp = () => {
    let obj = {
      countryCode : '+91',
      mobileNo : this.state.mobile
    }
    fetch(baseUrl + "/api/auth/user/checkCustomerViaPhone", {
      method: "Post",
      headers:{
         "Content-Type" : "application/json"
      },
      body : JSON.stringify(obj)
      }).then((response) => response.json())
      .then((results) => {
        console.log("Hello", results);
        this.setState({
            phoneNumber : obj.mobileNo,
            showLoginButton: true
        },() => {
          this.sendOtp(obj);
        })
      })
      .catch((error) => console.log("error", error));
  }

  sendOtp = (obj) => {
    fetch(baseUrl + "/api/auth/user/sendOtp", {
      method: "Post",
      headers:{
         "Content-Type" : "application/json"
      },
      body : JSON.stringify(obj)
      }).then((response) => response.json())
      .then((results) => {
        console.log("otp", results);
        this.setState({
          sessionId : results.result.Details
        })
      })
      .catch((error) => console.log("error", error));
  }


  verifyOtp = () => {

    let obj = {
        "phoneNo" : this.state.phoneNumber,
        "otp": this.state.otp ,
        "sessionId": this.state.sessionId,
        "source": "Mobile"
    }
    fetch(baseUrl + "/api/auth/customer/loginViaPhone", {
      method: "Post",
      headers:{
         "Content-Type" : "application/json"
      },
      body : JSON.stringify(obj)
      }).then((response) => response.json())
      .then(async(results) => {
        console.log("otp", results);
        try {
          await AsyncStorage.setItem('userToken', results.result.authToken);
          await AsyncStorage.setItem('authCustomerBranchId', results.result.customerBranchData._id);
          await AsyncStorage.setItem('authCustomerBranchData', JSON.stringify(results.result.customerBranchData));
          await AsyncStorage.setItem('authId', results.result.customerBranchData.customerId);
          await AsyncStorage.setItem('authBranchId', results.result.customerBranchData.csBuddy.branchId._id);
          await AsyncStorage.setItem('authCSBuddyBranchId', results.result.csBuddyBranchData._id);
          console.log("id store", results.result.customerBranchData.csBuddy.branchId._id)
          this.props.navigation.navigate("Home2");
          alert(results.message)
        } catch (error) {
          console.log(error)
        }
      })
      .catch((error) => console.log("error", error));
  }

  render() {
    return (
     <View style = {{backgroundColor:"white", height:"100%"}}>
       {/* <ImageBackground source = {require("../../assets/background.jpg")} style = {{height:"100%", width:"100%"}}> */}
      <View style = {{top :"1%"}}>
          <Image style={{alignSelf:"center"}} source={require('../../assets/log.png')}/>
      </View>

       <ScrollView showsVerticalScrollIndicator={false}>
       <View>
         <View style = {{marginTop:"6%", paddingBottom:"10%"}}> 
        {!!this.state.emailError && (
          <Text style={{ color: "#ffffff" }}>{this.state.emailError}</Text>
        )}
        <View style= {{marginTop:"1%"}}> 
        <Input
            placeholder=' Your Email * '
            placeholderTextColor="#000000"
            //leftIcon={{ type: 'font-awesome', name: 'user', color :"#ff0600" }}
            onChangeText={(text) => this.setState({'email':text})}
            keyboardType="email-address"
            inputContainerStyle={{borderRadius:25, backgroundColor:"#ffcccb", borderBottomWidth:0, height:75}}
            value={this.state.email}
            inputStyle={{'color': 'black'}}
            selectionColor={'black'}
            style={{
               flex: 1,
              fontSize: 17,
              paddingLeft: 28,
              textAlignVertical: 'center'
          }}
        /> 
        </View> 
        {!!this.state.passwordError && (
          <Text style={{ color: "#ffffff" }}>{this.state.passwordError}</Text>
        )} 
        <Input
            placeholder='  Your Password *'
            placeholderTextColor="#000000"
            //leftIcon={{ type: 'font-awesome', name: 'lock', color :"#ff0600" }}
            onChangeText={(text) => this.setState({'password':text})}
            inputContainerStyle={{borderRadius:25 , backgroundColor:"#ffcccb", borderBottomWidth:0, height:75}}
            value={this.state.password}
            placeholderTextColor="#000000"
            inputStyle={{'color': 'black'}}
            selectionColor={'black'}
            secureTextEntry={true}
            style={{
               flex: 1,
              fontSize: 17,
              paddingLeft: 28,
              textAlignVertical: 'center'}}
        />
        <View style={{width:"80%", alignSelf:"center", marginTop:"3%" , borderRadius:20}}>
         <TouchableOpacity style = {{backgroundColor:"red", height:70, borderRadius:30}} onPress={() => this.login()}>
            <Text style = {{color: "#ffffff", fontWeight:"bold", fontSize:20, alignSelf:"center", padding:"6%"}}>Login</Text>
         </TouchableOpacity> 
        </View> 
        <Text style = {{alignSelf:"center"}}>OR</Text>
        <View style={{width:"80%", alignSelf:"center", marginTop:"5%" , borderRadius:20}}>
         <TouchableOpacity style = {{backgroundColor:"red", height:70, borderRadius:30}} onPress={() => this.otpVerfication()}>
            <Text style = {{color: "#ffffff", fontWeight:"bold", fontSize:20, alignSelf:"center", padding:"6%"}}>Login Via Mobile</Text>
         </TouchableOpacity> 
        </View> 
        <Text style = {{alignSelf:"center"}}>OR</Text>
        <View style={{width:"80%", alignSelf:"center", marginTop:"5%" , borderRadius:20}}>
         <TouchableOpacity style = {{backgroundColor:"red", height:70, borderRadius:30}}>
            <Text style = {{color: "#ffffff", fontWeight:"bold", fontSize:20, alignSelf:"center", padding:"6%"}}>Guest Login</Text>
         </TouchableOpacity> 
        </View> 
        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"3%", alignSelf:"center"}}>
           <Text style = {{fontSize:15, color:"red"}}>Dont have an Account ? </Text>
           <TouchableOpacity onPress = {() => this.props.navigation.navigate("SignUp")}>
             <Text style = {{fontSize:15, color:"red"}}>SignUp</Text>
            </TouchableOpacity>
        </View>
        </View> 
        </View>
      </ScrollView> 
      <Modal transparent={true} visible={this.state.modal} animationType="slide">
        <View style = {{backgroundColor:"#000000aa", flex:1}}>
          <View style = {{backgroundColor:"#ffffff", height:"100%",padding :2, borderRadius:10}}> 
            <View style={{backgroundColor:"#ffffff" }}> 
              <View style = {{padding :"2%"}}>
               <Pressable onPress={() => this.setState({modal:false, showLoginButton: false})}>
                 <Icon name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
                </Pressable>
                <View style = {{display:"flex"}}>
                <Image  style={{width: 190, height: 30, alignSelf:"center"}} source={require('../../assets/log.png')}/>
                <Text></Text>
                <View>
                 <View style = {{display:"flex", flexDirection:"column"}}>  
                    {/* <TextInput placeholder = "+91" editable = {false}/> */}
                    <Input
                        placeholder='Enter Mobile * '
                        placeholderTextColor="#000000"
                        //leftIcon={{ type: 'font-awesome', name: 'user', color :"#ff0600" }}
                        onChangeText={(texts) => this.setState({'mobile':texts})}
                        keyboardType="email-address"
                        inputContainerStyle={{borderRadius:25, backgroundColor:"#ffcccb", borderBottomWidth:0, height:75}}
                        //value={this.state.mobile}
                        inputStyle={{'color': 'black'}}
                        selectionColor={'black'}
                        style={{
                          flex: 1,
                          fontSize: 17,
                          paddingLeft: 28,
                          textAlignVertical: 'center'
                      }}
                    /> 
                    <Text></Text>
                    {this.state.showLoginButton ? 
                    <Input
                    placeholder='Enter Otp '
                    placeholderTextColor="#000000"
                    //leftIcon={{ type: 'font-awesome', name: 'user', color :"#ff0600" }}
                    onChangeText={(otp) => this.setState({'otp': otp})}
                    keyboardType="email-address"
                    inputContainerStyle={{borderRadius:25, backgroundColor:"#ffcccb", borderBottomWidth:0, height:75}}
                    //value={this.state.otp}
                    inputStyle={{'color': 'black'}}
                    selectionColor={'black'}
                    style={{
                      flex: 1,
                      fontSize: 17,
                      paddingLeft: 28,
                      textAlignVertical: 'center'
                  }}
                /> 
                  : null}
                </View>
                <Text></Text>
                {this.state.showLoginButton ? 
                   <View style={{width:"80%", alignSelf:"center", marginTop:"3%" , borderRadius:20}}>
                   <TouchableOpacity style = {{backgroundColor:"red", height:70, borderRadius:30}} onPress={() => this.verifyOtp()}>
                       <Text style = {{color: "#ffffff", fontWeight:"bold", fontSize:20, alignSelf:"center", padding:"6%"}}>Login</Text>
                   </TouchableOpacity> 
                 </View>       
                : 
              <View style={{width:"80%", alignSelf:"center", marginTop:"3%" , borderRadius:20}}>
              <TouchableOpacity style = {{backgroundColor:"red", height:70, borderRadius:30}} onPress={() => this.generateOtp()}>
                  <Text style = {{color: "#ffffff", fontWeight:"bold", fontSize:20, alignSelf:"center", padding:"6%"}}>Send Otp</Text>
              </TouchableOpacity> 
            </View>
                }
                </View>
                </View>
                </View>
              </View>  
            </View>
          </View>
      </Modal>
      {/* </ImageBackground> */}
      </View>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  overlay:{
    display:"flex", marginTop:10, flexDirection:"column",  backgroundColor:"#FF0000B3",height:"90%",padding:"5%", borderTopLeftRadius:80, borderTopRightRadius:80, borderBottomRightRadius:80, borderBottomLeftRadius:30, width:"90%", alignSelf:"center"
  }
})

export default Login;
