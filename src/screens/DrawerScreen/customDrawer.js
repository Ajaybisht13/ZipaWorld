import React, { useState, useEffect } from 'react';
import {
  SafeAreaView,
  View,
  StyleSheet,
  Image,
  Text,
  Linking,
} from 'react-native';

import {
  DrawerContentScrollView,
  DrawerItemList,
  DrawerItem,
} from '@react-navigation/drawer';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import { TouchableOpacity } from 'react-native-gesture-handler';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Iconn from 'react-native-vector-icons/EvilIcons';

const CustomDrawer = (props) => {

  const [name, setCustomerName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phoneNo, setPhoneNo] = useState("");
  const [state, setState] = useState("");

 useEffect (async() => {
  const token = await AsyncStorage.getItem("userToken")
  const customerBranchId = await AsyncStorage.getItem("authCustomerBranchId")
  fetch("https://coapi.zipaworld.com/api/masters/customer/Branch/get", {
    method: "Post",
    headers:{
       "Content-Type" : "application/json",
       "authkey" : token
    },
    body : JSON.stringify({id: customerBranchId})
    }).then((response) => response.json())
    .then((results) => {
      console.log("hellllllllllllllllllloooooooooooooooo",results.result.customerData.customerName);
      setCustomerName(results.result.customerData.customerName)
    }).catch((error) => console.log("error", error));
  },[])  

const  logout = () => {
  const token = AsyncStorage.removeItem("userToken");
  if(token){
   props.navigation.navigate("Login")
  }
}
   return (
    <SafeAreaView style={{flex: 1}}>
      {/*Top Large Image */}
      {/* <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} locations={[0,0.5,0.6]} useAngle= {true} angle={257} colors={['#ffac04', '#fe0000']}
      style={styles.linearGradient}> */}
      <View style = {{height:125, backgroundColor:"red"}}>
      
      <View style ={{display:"flex", flexDirection:"column", justifyContent:"space-between",marginTop:"3%", alignSelf:'center'}}>
        <View>
        <Iconn name="user" color="#ffffff" size={50}/></View>
      </View>
      <View style = {{width :"100%", marginLeft:"2%"}}>
        <Text style = {{marginLeft:10, position:"absolute", alignSelf:"center", fontSize:18, color:"#ffffff", fontWeight:"800"}}>{name}</Text>
      </View>
      </View>
      {/* </LinearGradient> */}
      <DrawerContentScrollView {...props}>
        <DrawerItemList {...props} />
        {/* <DrawerItem
          label="Visit Us"
          onPress={() => Linking.openURL('https://aboutreact.com/')}
        /> */}
        <TouchableOpacity onPress={logout} style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"37%", marginLeft:"6%", marginTop:"4%"}}>
           <Icon name= "logout" color="#000000" size={27}/>
           <Text style = {{marginTop:"2%"}}>Logout</Text>
        </TouchableOpacity>
        <View style={styles.social}>
           <Icon name="linkedin" color="#0077B5" size={24}/>
           <Icon name="facebook" color="#3B5998" size={26}/>
           <Icon name="instagram" color="#C13584" size={24}/>
           <Icon name="twitter" color="#1DA1F2" size={24}/>
        </View>
        <View style={styles.customItem}>
          <Text>
            App Version ( 0.0.1 )
          </Text>
        </View>
      </DrawerContentScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  sideMenuProfileIcon: {
    width: "100%",
    height: 100,
    alignSelf: 'center',
  },
  iconStyle: {
    width: 15,
    height: 15,
    marginHorizontal: 5,
  },
  customItem: {
    padding: 16,
    flexDirection: 'row',
    alignSelf: 'center',
    marginTop:"5%"
  },
  social: {
      flexDirection:"row",
      justifyContent:"space-between", padding:"10%"
  },
  linearGradient: {
    height:100
  }
});

export default CustomDrawer;