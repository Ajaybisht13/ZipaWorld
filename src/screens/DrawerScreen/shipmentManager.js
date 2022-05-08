import React, { Component } from 'react';
import { View, Text, Modal, Pressable, ScrollView, TextInput, Image, ActivityIndicator, Button} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TouchableOpacity} from 'react-native-gesture-handler';
import Iconss from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';
import { DrawerActions } from '@react-navigation/routers';
import { isLabeledStatement } from '@babel/types';
//import { ActivityIndicator } from 'react-native-paper';
const baseUrl = "https://coapi.zipaworld.com/";

class shipmentManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "shipmentM" : [],
      filterData:[], 
      modal : false,
      getByQuote : "",
      getOrigin:"",
      getDestination:"",
      search:"",
      masterData:[],
      isloading: false,
      page:1,
      getAmount:[]
    };
  }

  componentDidMount = () => {
     this.shipmentManager();
  }

  shipmentManager = async() => {
    const token = await AsyncStorage.getItem("userToken")
    const customerId = AsyncStorage.getItem("authId")
    const rateId = await AsyncStorage.getItem("rateId")
    console.log("rraaaattteee", rateId)
    await this.setState ({page:this.state.page+1, isloading:true})
    fetch(baseUrl + "api/shipment/managerCustomer?_limit=10&_page="+this.state.page,{
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
            "authkey" : token
        },
        body: JSON.stringify({customerId: customerId , queryFor: "Ocean", start: 0, status: "All"})
    }).then((response) => response.json())
      .then((results) => {
          console.log("shipmmmeeennnttt", results.result.data);
          this.setState({
            shipmentM : this.state.shipmentM.concat(results.result.data),
            //masterData:   results.result.data,
            isloading: false,
          },() => {
           console.log("qqqqqqqqqqqqq", this.state.getByQuote)
        });
      }).catch((error) => console.log("error", error));
}

getByQuoteId = async(item) => {
  //const quoteId = await AsyncStorage.getItem("quoteId")
  //console.log("iddddddd",quoteId)
  const token = await AsyncStorage.getItem("userToken")
    fetch(baseUrl + "api/shipment/getByQuoteId", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
            "authkey" : token
        },
        body: JSON.stringify({id : item._id})
    }).then((response) => response.json())
      .then((results) => {
        this.setState({
          modal : true,
          getByQuote : results.result,
          getOrigin:results.result.originAirport,
          getDestination: results.result.destinationAirport,
          bookingId: results.result.bookingId,
          
        })
      }).catch((error) => console.log("error", error));

}

ShowHBL = async(item) => {
  //const quoteId = await AsyncStorage.getItem("quoteId")
  //console.log("iddddddd",quoteId)
  const token = await AsyncStorage.getItem("userToken")
  if(item._id){
    fetch(baseUrl + "api/shipment/getByQuoteId", {
      method : "Post",
      headers : {
          "Content-Type" : "application/json",
          "authkey" : token
      },
      body: JSON.stringify({id : item._id})
  }).then((response) => response.json())
    .then((results) => {
      console.log("Show HBL", JSON.stringify(results))
      this.setState({
        // modal : true,
        // getByQuote : results.result,
        // getOrigin:results.result.originAirport,
        // getDestination: results.result.destinationAirport,
        bookingId: results.result.bookingId
      },() => {
         console.log("qqqqqqqqqqqqq", this.state.bookingId)
         this.props.navigation.navigate("HBLpdf", {bookingId:this.state.bookingId})
      })
    }).catch((error) => console.log("error", error));
  }
  else {
    alert("No House Add")
  }
}

ShowMBL = async(item) => {
  //const quoteId = await AsyncStorage.getItem("quoteId")
  //console.log("iddddddd",quoteId)
  const token = await AsyncStorage.getItem("userToken")
    fetch(baseUrl + "api/shipment/getByQuoteId", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
            "authkey" : token
        },
        body: JSON.stringify({id : item._id})
    }).then((response) => response.json())
      .then((results) => {
        console.log("Show HBL", JSON.stringify(results))
        this.setState({
          // modal : true,
          // getByQuote : results.result,
          // getOrigin:results.result.originAirport,
          // getDestination: results.result.destinationAirport,
          bookingId: results.result.bookingId
        },() => {
           console.log("qqqqqqqqqqqqq", this.state.bookingId)
           this.props.navigation.navigate("MBL", {bookingId:this.state.bookingId})
        })
      }).catch((error) => console.log("error", error));

}

EditHBL = async(item) => {
  const token = await AsyncStorage.getItem("userToken")
    fetch(baseUrl + "api/shipment/getByQuoteId", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
            "authkey" : token
        },
        body: JSON.stringify({id : item._id})
    }).then((response) => response.json())
      .then((results) => {
        console.log("Show HBL", JSON.stringify(results))
        this.setState({
          // modal : true,
          // getByQuote : results.result,
          // getOrigin:results.result.originAirport,
          // getDestination: results.result.destinationAirport,
          bookingId: results.result.bookingId
        },() => {
           console.log("qqqqqqqqqqqqq", this.state.bookingId)
           this.props.navigation.navigate("editHBL", {bookingId:this.state.bookingId})
        })
      }).catch((error) => console.log("error", error));
}


search =(text) => {
  this.setState({search: text});

  let filteredData = this.state.shipmentM.filter(function (item) {
    return item.jobNo.includes(text);
  });

  this.setState({filterData: filteredData, isloading:false});
}


// ItemSeparatorView =() => {
//   return (
//     <View
//        style = {{height:0.5, width:"100%", backgroundColor:"#c8c8c8"}}
//     />
//   )
// }

 footerLoader = () => {
   return (
      <View>
         <ActivityIndicator loading= {this.state.isloading} size ={"large"}/>
      </View>
   )
 }

  render() {
    const {getByQuote, getOrigin, getDestination, getAmount} = this.state
    return (
      <View style = {{paddingBottom:"5%"}}>
        <View style = {{display:"flex", flexDirection:"row", backgroundColor:"#ff3800", height:50}}>
          <View style = {{padding :"2%"}}>
            {/* <TouchableOpacity style = {{marginLeft:"2%", marginTop:"18%"}}>
              <Iconss name ="bars" size={25} color = "white" onPress = {() => this.props.navigation.dispatch(DrawerActions.openDrawer())}/>
            </TouchableOpacity> */}
            </View>
            <View>
              <Text style = {{fontSize:22, color:"#ffffff", fontWeight:"700", marginTop:"4%", alignSelf:"center"}}>Shipment Manager</Text>  
            </View>
            </View>  
            <View style = {{padding:"1%"}}>  
            <TextInput 
              value = {this.state.search}
              placeholder = "Search"
              onChangeText = {(text) => this.search(text)}
              style = {{borderColor:"#000000", borderWidth:0.3, marginTop:"0.5%",backgroundColor:"#ffffff"}}
            />
            </View> 
        <FlatList
        //ItemSeparatorComponent = {this.ItemSeparatorView()}
        data = {this.state.filterData && this.state.filterData.length > 0 ? this.state.filterData : this.state.shipmentM}
        keyExtractor={(item) => `item-${item._id}`}
        onEndReached = {this.shipmentManager}
        //ListFooterComponent = {this.footerLoader}
        renderItem = {({item}) =>
        <View>
        <View style = {{backgroundColor:"white", borderBottomWidth:1, width:"98%",alignSelf:"center"}}>
         <View style = {{padding:"3%" , display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <View>  
              <Image source = {require("../../assets/truck1.png")} style={{alignSelf:"center"}}/>
            </View>
         <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", marginLeft:"5%"}}>
         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"60%"}}>
            <Text style = {{fontSize:18, fontWeight:"800"}}>Pickup:</Text> 
            <Text style = {{fontSize:18}}>{item.originAirport.code}</Text>
         </View>
         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"60%"}}>
           <Text style = {{fontSize:18, fontWeight:"800"}}>Drop:</Text> 
           <Text style = {{fontSize:18}}>{item.destinationAirport.code}</Text> 
         </View> 
           {/* <Text>Shipment number</Text> 
           <Text>{item.referenceNo}</Text> */}
           <Text style = {{fontSize:18, fontWeight:"800"}}>Booking number:</Text> 
           <Text style = {{fontSize:18}}>{item.jobNo}</Text>
           <Text style = {{fontSize:18, fontWeight:"800"}}>Handover Date:</Text> 
           <Text style = {{fontSize:18}}>{item.clearenceDate}</Text>
           <Text style = {{fontSize:18, fontWeight:"800"}}>Shipment Type:</Text> 
           <Text style = {{fontSize:18}}>{item.activityType}</Text>
        </View> 
        </View>
        </View> 
        <View style = {{width:"95%", marginTop:"2%", display:"flex", flexDirection:"row",justifyContent:"space-between", alignSelf:"center"}}>
          <Button color = "#ff3800" title = "Shipment Details"  onPress= {() => this.getByQuoteId(item)}/>
          <View>
             <Text>{item.quoteStatus}</Text>
          </View>
        </View> 
        <Text></Text>
        </View>
      }
      />
      <Modal transparent={true} visible={this.state.modal} animationType="slide">
        <View style = {{backgroundColor:"#000000aa", flex:1}}>
          <View style = {{backgroundColor:"#ffffff", height:"100%",padding :2, borderRadius:10}}> 
            <View style={{backgroundColor:"#ffffff" }}> 
              <View style = {{padding :"2%"}}>
                <Pressable onPress={() => this.setState({modal:false})}>
                  <Icon name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
                </Pressable>
                <Image style={{alignSelf:"center"}} source={require('../../assets/log.png')}/>
                <View style = {{padding:"5%"}}>
                  <View style = {{paddingBottom:"2%"}}>
                <Text style = {{fontSize:20, fontWeight:"700", alignSelf:'center'}}>Shipment Details</Text>
                </View>
                <View style={{ backgroundColor:"#ffffff", borderRadius:10, height:"100%",borderColor:"#ffffff"}}>   
                        <View style = {{padding:"2%"}}>
                        <View style = {{display:"flex", flexDirection:"column",justifyContent:"space-between", borderBottomWidth:1, paddingBottom:"5%"}}> 
                        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                           <Text style = {{fontSize:16, fontWeight:"700"}}>Origin :</Text>
                           <Text>{getOrigin.name}</Text>
                         </View>
                       <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style = {{fontSize:16, fontWeight:"700"}}>Destination :</Text>
                            <Text>{getDestination.name}</Text>
                       </View>
                       </View>
                       <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", borderBottomWidth:1, paddingBottom:"5%"}}>
                       <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                           <Text style = {{fontSize:16, fontWeight:"700"}}>Total Pcs :</Text>
                           <Text>{getByQuote.totalPieces}</Text>
                         </View>
                       <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style = {{fontSize:16, fontWeight:"700"}}>Volume Wt :</Text>
                            <Text>{getByQuote.volumeWeight}</Text>
                       </View>
                       <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                           <Text style = {{fontSize:16, fontWeight:"700"}}>Gross Wt :</Text>
                           <Text>{getByQuote.grossWeight}</Text>
                         </View>
                       <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style = {{fontSize:16, fontWeight:"700"}}>Chargeable Weight :</Text>
                            <Text>{getByQuote.chargeableWeight}</Text>
                       </View>
                       </View>
                       <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between"}}>
                       <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style = {{fontSize:16, fontWeight:"700"}}>Handover Date :</Text>
                            <Text>{getByQuote.clearenceDate}</Text>
                       </View>
                       <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style = {{fontSize:16, fontWeight:"700"}}>Commodity :</Text>
                            <Text>{getByQuote.commodity}</Text>
                       </View>
                       </View>
                       <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", borderBottomWidth:1, paddingBottom:"5%"}}>
                       <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style = {{fontSize:16, fontWeight:"700"}}>Shipment Mode :</Text>
                            <Text>{getByQuote.shipmentMode}</Text>
                       </View>
                       <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style = {{fontSize:16, fontWeight:"700"}}>No. Of Containers :</Text>
                            <Text>{getByQuote.noOfContainers}</Text>
                       </View>
                       </View>
                       <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between",  borderBottomWidth:1, paddingBottom:"5%"}}>
                       <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style = {{fontSize:16, fontWeight:"700"}}>Total Amount :</Text>
                            <Text>{getByQuote.tarrifMode}</Text>
                       </View>
                       <Text></Text>
                       <View style = {{width:"95%", marginTop:"2%", display:"flex", flexDirection:"row",justifyContent:"space-between", alignSelf:"center"}}>
                         <Button  color = "#ff3800" title = "Show HBL" onPress= {() => this.ShowHBL(item)}/>
                         <Button  color = "#ff3800" title = "Show MBL" onPress= {() => this.ShowMBL(item)}/>
                         <Button  color = "#ff3800" title = "Edit HBL" onPress= {() => this.EditHBL(item)}/>
                      </View>
                        
                       {/* <View style = {{display:"flex", flexDirection:"row",justifyContent:'space-between'}}>
                            <Text style = {{fontSize:16, fontWeight:"700"}}>Dimension Type :</Text>
                            <Text>{getByQuote.dimentionType}</Text>
                       </View> */}
                       {/* {getAmount && getAmount.map(item => {
                              console.log("ggggggg", item.amountB)
                       })} */}
                       </View>
                       {/* <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                            <Text style = {{fontSize:16, fontWeight:"700"}}>Dimension :</Text>
                            <Text></Text>
                       </View> */}
                      </View>
                </View>
                </View>
              </View>  
            </View>
          </View>
        </View>
      </Modal>
      </View>
    );
  }
}

export default shipmentManager;
