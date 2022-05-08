import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput ,Button, ActivityIndicator,  PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import RNFetchBlob from 'rn-fetch-blob';
import Iconss from 'react-native-vector-icons/FontAwesome';
import { DrawerActions } from '@react-navigation/routers';

const customerId = AsyncStorage.getItem("customerId")

class invoiceManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      invoiceM:[],
      isloading: false,
      page:1,
    };
  }

  componentDidMount = async() => {
  
   this.invoiceManager();
 }

 invoiceManager = async() => {
   const token = await AsyncStorage.getItem("userToken")
   const customerId = await AsyncStorage.getItem("authId")
   await this.setState ({page:this.state.page+1, isloading:true})
   fetch("https://coapi.zipaworld.com/api/invoice/managerCustomer?_limit=10&_page="+this.state.page, {
       method : "Post",
       headers : {
           "Content-Type" : "application/json",
           "authkey" : token
       },
       body: JSON.stringify({"start":0,"search":"","customerId":customerId, "selectedCustomerId":customerId})
   }).then((response) => response.json())
     .then((results) => {
         console.log("iiiiiiinnnnnnnnn", results.result);
         this.setState({
           invoiceM :  this.state.invoiceM.concat(results.result),
           isloading:false
         }, () => {
           console.log("xddd", this.state.invoiceM)});
     }).catch((error) => console.log("error", error));
}



footerLoader = () => {
  return (
     <View>
        <ActivityIndicator loading= {this.state.isloading} size ={"large"}/>
     </View>
  )
}

  render() {
    return (
      <View>
        <View style = {{display:"flex", flexDirection:"row", padding:"3%", backgroundColor:"#ff3800"}}>
            {/* <TouchableOpacity style = {{marginLeft:"2%"}}>
              <Iconss name ="bars" size={25} color="white" onPress = {() => this.props.navigation.dispatch(DrawerActions.openDrawer())}/>
            </TouchableOpacity> */}
              <Text style = {{fontSize:22, color :"white", fontWeight:"700", alignSelf:"center"}}>Invoice Manager</Text>  
              </View>
            <View>  
            <TextInput 
              // value = {this.state.search}
              placeholder = "Search"
              placeholderTextColor = "#000000"
              //onChange = {(text) => this.search(text)}
              style = {{borderColor:"#000000", borderWidth:0.5, width:"98%", alignSelf:"center", marginTop:"0.5%", backgroundColor:"#ffffff"}}
            />
            </View>
        <View style =  {{padding:"2%",  borderBottomWidth:1,display:"flex", marginTop:"1%", flexDirection:"row", justifyContent:"space-between",backgroundColor:"white", width:"98%", alignSelf:"center"}}>
          {/* <Text>Job id</Text>  */}
          {/* <Text>  Ref No</Text> */}
          <View>
          <Text style ={{fontSize:20, fontWeight:"600"}}>Invoice</Text>
          {/* <Text>  Date</Text> */}
          </View>
          {/* <View>
          <Text>  Invoice </Text>
          <Text>  number</Text> 
          </View> */}
          <Text style ={{fontSize:20, fontWeight:"600"}}>Amount</Text>
          <Text style ={{fontSize:20, fontWeight:"600"}}>Action</Text> 
        </View>
        {Array.isArray(this.state.invoiceM) && this.state.invoiceM.map((item, i) => {
          return (
            <View>
               {item.data && item.data.map((itemData, index) => {
                  return (
                    <View style = {{padding:"2%",paddingBottom:"4%", display:"flex", flexDirection:"row", borderBottomWidth:1, justifyContent:"space-between",backgroundColor:"white", width:"98%", alignSelf:"center"}}>
                    {/* <Text style = {{width:"10%"}}>{item.shipmentDetails.jobNo}</Text>
                    <Text style = {{width:"10%"}}>{item.shipmentDetails.blNo}</Text> */}
                    {/* <Text style = {{width:"10%"}}>{item.invoiceDate}</Text> */}
                    <Text style = {{width:"20%", marginTop:"3%"}}>{itemData.invoiceNo}</Text>
                    <Text style ={{marginTop:"5%"}}>{itemData.baseCurrency} {parseFloat(itemData.totalAmountB).toFixed(2)}</Text>
                    {/* <Text>{item.approvalStatus}</Text> */}
                    <View style ={{height:35, marginTop:"3%"}}>
                    <Button title ="View" color ="#ff3800" onPress ={() => this.props.navigation.navigate("ShipmentDetail", {details:itemData, url:itemData.invoiceUrl})}/>
                    </View>
                 </View>
                  )
               })}
            </View>
          )
        })}
     </View>
    );
  }
}

export default invoiceManager;
