import React, { Component } from 'react';
import { View, Text, TextInput , ActivityIndicator ,Modal, Pressable, Button, Image} from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FlatList, TouchableOpacity, TouchableWithoutFeedback } from 'react-native-gesture-handler';
import Iconss from 'react-native-vector-icons/FontAwesome';
import Icon from 'react-native-vector-icons/Entypo';

class documentManager extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "documentM" : [],
      isloading: false,
      page:1,
      modal:false,
      filterData:[], 
      search:"",
    };
  }

  componentDidMount = () => {
     this.documentManager();
  }

  documentManager = async() => {
    const customerId = await AsyncStorage.getItem("authId");
    const token = await AsyncStorage.getItem("userToken");
    fetch("https://coapi.zipaworld.com/api/shipment/managerCustomer?_limit=10&_page="+this.state.page, {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
            "authkey" : token
        },
        body: JSON.stringify({customerId: customerId, search: " ", start: 0, status: "All"})
    }).then((response) => response.json())
      .then((results) => {
          console.log("documenttttttttttt", results.result.data);
          this.setState({
            documentM :  this.state.documentM.concat(results.result.data),
            isloading: false
          });
      }).catch((error) => console.log("error", error));
    }

showDocumetManagerDetails = async(item) => {
  const token = await AsyncStorage.getItem("userToken")
  fetch("https://coapi.zipaworld.com/api/shipment/getByQuoteId", {
      method : "Post",
      headers : {
          "Content-Type" : "application/json",
          "authkey" : token
      },
      body: JSON.stringify({id : item._id})
  }).then((response) => response.json())
    .then((results) => {
      console.log("getByquoteId", JSON.stringify(results))
      this.setState({
        modal : true,
        getByQuote : results.result,
        getOrigin:results.result.originAirport,
        getDestination: results.result.destinationAirport
      },() => {
         console.log("qqqqqqqqqqqqq", this.state.getByQuote)
      })
    }).catch((error) => console.log("error", error));
}

search =(text) => {
  this.setState({search: text});

  let filteredData = this.state.documentM.filter(function (item) {
    return item.referenceNo.includes(text);
  });

  this.setState({filterData: filteredData, isloading:false});
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
        <View style = {{display:"flex", flexDirection:"row", padding:"3%", backgroundColor:"#ff3800",width:"100%"}}>
            {/* <TouchableOpacity style = {{marginLeft:"2%", marginTop:"12%"}}>
              <Iconss name ="bars" size={25} color = "white" onPress = {() => this.props.navigation.dispatch(DrawerActions.openDrawer())}/>
            </TouchableOpacity> */}
              <Text style = {{fontSize:22, color:"#ffffff", fontWeight:"700"}}>Document Manager</Text>  
              </View>
            <View>  
            <TextInput 
              value = {this.state.search}
              placeholder = "Search"
              onChangeText = {(text) => this.search(text)}
              style = {{borderColor:"#000000", borderWidth:0.3, marginTop:"1%", width:"99%", backgroundColor:"#ffffff", alignSelf:"center"}}
            />
            </View>
        <FlatList
        data = {this.state.filterData && this.state.filterData.length > 0 ? this.state.filterData : this.state.documentM}
        keyExtractor={(item) => `item-${item._id}`}
        onEndReached = {this.documentManager}
        //ListFooterComponent = {this.footerLoader}
        renderItem = {({item}) => 
        <View>
        <TouchableOpacity onPress = {() => this.showDocumetManagerDetails(item)} style = {{backgroundColor:"white", width:"98%", marginTop:"1%", paddingBottom:"2%", borderBottomWidth:1, alignSelf:"center"}}>
         <View style = {{padding:"3%"}}>
           <View>
            <Text style = {{fontSize:18 ,fontWeight:"700"}}>Reference Number :</Text> 
            <Text>{item.referenceNo}</Text>
           </View>
           {/* <Text>BL No</Text> 
           <Text>{item.blNo}</Text> */}
           <View style ={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"55%"}}>
              <Text style = {{fontSize:18 ,fontWeight:"700"}}>Pieces :</Text> 
              <Text style ={{fontSize:15, marginTop:"3%"}}>{item.totalPieces}</Text>
           </View>
           <View style ={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"55%"}}>
           <Text style = {{fontSize:18 ,fontWeight:"700"}}>Gross Weight :</Text> 
           <Text style ={{fontSize:15, marginTop:"3%"}}>{item.grossWeight}</Text>
           </View>
           <View style ={{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"55%"}}>
           <Text style = {{fontSize:18 ,fontWeight:"700"}}>Volume Weight :</Text> 
           <Text style ={{fontSize:15, marginTop:"3%"}}>{item.volumeWeight}</Text>
           </View>
        </View>
        </TouchableOpacity>
        </View>
      }
      />
      {/* ./src/assets/log.png' */}
       <Modal transparent={true} visible={this.state.modal} animationType="slide">
        <View style = {{backgroundColor:"#000000aa", flex:1}}>
          <View style = {{backgroundColor:"#ffffff", height:"100%",padding :2, borderRadius:10}}> 
            <View style={{backgroundColor:"#ffffff" }}> 
              <View style = {{padding :"2%"}}>
               <Pressable onPress={() => this.setState({modal:false})}>
                <Icon name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
                </Pressable>
                <View style = {{display:"flex"}}>
                <Image
                          style={{width: 190, height: 30, alignSelf:"center"}}
                          source={require('../../assets/log.png')}
                        />
                   <View style = {{display:"flex", flexDirection:"row", marginTop:"5%",justifyContent:"space-between", width:"80%", alignSelf:"center"}}> 
                    <View style = {{width:"30%", alignSelf:"center"}}>
                      <Text style = {{fontSize:15, fontWeight:"700"}}>Reverted Rates</Text>
                      <Text></Text>
                      <Iconss name = "file-pdf-o" size={35} style = {{alignSelf:"center"}}/>
                      <Text></Text>
                       <Button title = "Download" color = "#ff3800" />
                    </View> 
                    <View style = {{width:"30%"}}>
                    <Text style = {{fontSize:15, fontWeight:"700"}}>MBL Draft Pdf</Text>
                    <Text></Text>
                    <Iconss name = "file-pdf-o" size={35} style = {{alignSelf:"center"}}/>
                    <Text></Text>
                    <Button title = "Download"  color = "#ff3800"/>
                    </View>
                    </View>
                    <Text></Text>
                    <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", width:"80%", alignSelf:"center"}}> 
                    <View style = {{width:"30%"}}>
                      <Text style = {{fontSize:15, fontWeight:"700"}}>Proforma Invoice</Text>
                      <Text></Text>
                    <Iconss name = "file-pdf-o" size={35} style = {{alignSelf:"center"}}/>
                    <Text></Text>
                    <Button title = "Download"  color = "#ff3800"/>
                    </View>
                    <View style = {{width:"35%"}}>
                      <Text style = {{fontSize:15, fontWeight:"700"}}>Commerical Invoice</Text>
                      <Text></Text>
                    <Iconss name = "file-pdf-o" size={35} style = {{alignSelf:"center"}}/>
                    <Text></Text>
                    <Button title = "Download"  color = "#ff3800" onPress = {() => this.downloadPdf()}/>
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

export default documentManager;
