import React, { Component } from 'react';
import { View, Text, Button, Pressable, ScrollView, StyleSheet, Image , ImageBackground } from 'react-native';
import { Input } from 'react-native-elements';
import Icons from 'react-native-vector-icons/EvilIcons';
import clientApi from '../../apiServices/clientApi';
import LinearGradient from 'react-native-linear-gradient';

class SignUp extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "customerName": "",
        "email":"",
        "password":"",
        "retypePassword":"",
        "phoneNo":"",
        "state":""
    };
  }

  signUp = () => {
    if (this.state.customerName.trim() === "" && this.state.email.trim() === "" && this.state.password.trim() === "" && this.state.phoneNo.trim() === "") {
      alert("All Fields Are required")
   } else if (this.state.email.trim() === ""){
     alert("Enter the Email")
   }
   else if (this.state.customerName.trim() === "") {
     alert("Enter the Customer name")
   }  else if (this.state.password.trim() === "") {
    alert("Enter the Password")
  }  else if (this.state.phoneNo.trim() === "") {
    alert("Enter the Phone Number")
  }
    fetch("https://coapi.zipaworld.com/api/auth/customer/signup", {
        method: "Post",
        headers:{
           "Content-Type" : "application/json"
        },
        body : JSON.stringify(this.state)
        }).then((result) => {
          result.json().then((res) => {
            console.log(res);
          })
        })
    };

  render() {
    return (
      // <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} locations={[0,0.5,0.6]} useAngle= {true} angle={257} colors={['#ffac04', '#fe0000']}
      // style={styles.linearGradient}>
      <View style = {{backgroundColor:"white"}}>
        <View style = {{top :"1%"}}>
          <Image style={{alignSelf:"center"}} source={require('../../assets/log.png')}/>
        </View>
        <View style = {{height:"100%",padding:"5%"}}> 
       <ScrollView style = {styles.overlay}>
        <View style = {{marginTop:"20%"}}>
        <Input
            placeholder='                Enter Comapny*'
            placeholderTextColor="#000000"
            //leftIcon={{ type: 'font-awesome', name: 'user' , color :"red" }}
            onChangeText={(text) => this.setState({'customerName':text})}
            inputContainerStyle={{borderColor:"#ffffff", borderTopWidth:2, borderRightWidth:2, borderLeftWidth:2,borderBottomWidth:1, borderRadius:30}}
            value={this.state.customerName}
            placeholderTextColor="#ffffff"
            inputStyle={{'color': 'white'}}
            selectionColor={'white'}
            style={{
               flex: 1,
              fontSize: 17,
              paddingLeft: 28,
              textAlignVertical: 'center'
          }}
        />
        <Input
            placeholder='                   Enter Email*'
            placeholderTextColor="#000000"
            //leftIcon={{ type: 'entypo', name: 'email', size:20 , color :"red" }}
            onChangeText={(text) => this.setState({'email':text})}
            inputContainerStyle={{borderColor:"#ffffff", borderTopWidth:2, borderRightWidth:2, borderLeftWidth:2,borderBottomWidth:1, borderRadius:30}}
            keyboardType="email-address"
            value={this.state.email}
            placeholderTextColor="#ffffff"
            inputStyle={{'color': 'white'}}
            selectionColor={'white'}
            style={{
               flex: 1,
              fontSize: 17,
              paddingLeft: 28,
              textAlignVertical: 'center'
          }}
        /> 
        <Input
            placeholder='                 Enter Password*'
            placeholderTextColor="#000000"
            //leftIcon={{ type: 'font-awesome', name: 'lock' , color :"red" }}
            onChangeText={(text) => this.setState({'password':text})}
            inputContainerStyle={{borderColor:"#ffffff", borderTopWidth:2, borderRightWidth:2, borderLeftWidth:2,borderBottomWidth:1, borderRadius:30}}
            value={this.state.password}
            placeholderTextColor="#ffffff"
            inputStyle={{'color': 'white'}}
            selectionColor={'white'}
            style={{
               flex: 1,
              fontSize: 17,
              paddingLeft: 28,
              textAlignVertical: 'center'
          }}
        />
        {/* <Input
            placeholder='               Re-Enter Password*'
            placeholderTextColor="#000000"
            //leftIcon={{ type: 'font-awesome', name: 'lock' , color :"red" }}
            inputContainerStyle={{borderColor:"black", borderTopWidth:2, borderRightWidth:2, borderLeftWidth:2,borderBottomWidth:3, borderRadius:30}}
            value={this.state.retypePassword}
            placeholderTextColor="#ffffff"
        />
        {!!this.state.phoneError && (
          <Text style={{ color: "red" }}>{this.state.phoneError}</Text>
        )} */}
        <Input
            placeholder='                Contact Number*'
            placeholderTextColor="#000000" 
            //leftIcon={{ type: 'font-awesome', name: 'phone' , color :"red" }}
            onChangeText={(text) => this.setState({'phoneNo':text})}
            inputContainerStyle={{borderColor:"#ffffff", borderTopWidth:2, borderRightWidth:2, borderLeftWidth:2,borderBottomWidth:1, borderRadius:30}}
            keyboardType="phone-pad"
            value={this.state.phoneNo}
            placeholderTextColor="#ffffff"
            inputStyle={{'color': 'white'}}
            selectionColor={'white'}
            style={{
               flex: 1,
              fontSize: 17,
              paddingLeft: 28,
              textAlignVertical: 'center'
          }}
        />
        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"70%", alignSelf:"center"}}>
            <Pressable style = {{backgroundColor:"#000000", height:40, width:"50%", borderRadius:30, padding:"3%"}} onPress= {() => this.props.navigation.navigate("Login")}>
                <Text style= {{fontSize:15, color:"#ffffff", fontWeight:"bold", fontWeight:"bold", alignSelf:"center", top:"4%"}}>Login</Text>
            </Pressable>
            <Pressable style = {{backgroundColor:"#000000", height:40, borderRadius:30, padding:"3%", width:"50%",}} onPress={() => this.signUp()}>
                <Text style= {{fontSize:15, color:"#ffffff", fontWeight:"bold", fontWeight:"bold", top:"4%", alignSelf:"center"}}>Sign Up</Text>
            </Pressable>
        </View>  
        </View>   
      </ScrollView>
      </View>
      </View>
      // </LinearGradient>
    );
  }
}

const styles = StyleSheet.create({
  linearGradient: {
    flex: 1,
  },
  overlay:{
    display:"flex", flexDirection:"column",  backgroundColor:"#FF0000B3",maxHeight:"80%", padding:"5%", borderTopLeftRadius:80, borderTopRightRadius:80, borderBottomRightRadius:80, borderBottomLeftRadius:30
  }
})

export default SignUp;
