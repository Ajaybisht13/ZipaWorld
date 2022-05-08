import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet,TextInput, TouchableOpacity, ScrollView, Modal, FlatList } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import DatePicker from 'react-native-datepicker'
import Iconss from 'react-native-vector-icons/Entypo';
import RadioButton from 'react-native-radio-button';
import NumericInput from 'react-native-numeric-input';
import {Picker} from '@react-native-community/picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import AsyncStorage from '@react-native-async-storage/async-storage';

class AirGeneral extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      "show":false,
      "show1":false,
      'show2':false,
      "show3":false,
      "show4":false,
      "modal" : false,
      "attachments": [],
      "originId": "",
      "destinationId": "",
      "chargeableWeight": "",
      "customerId": "60cc3f9d4514306fe53382b6",
      "customerBranchId": "60cc416b4514306fe5339650",
      "customerCurrency": "INR",
      "baseCurrency": "INR",
      "pricingHeadName": "",
      "salesPersonName": "",
      "branchId": "600edb3d98380309ac6bd39a",
      "csBuddy": "5e21984c844c5b57f2d0f7ef",
      "pricingHead": "5f2a7d2e0aacb678d9bda759",
      "salesPerson": "5f2a7d2e0aacb678d9bda759",
      "financePerson": "5f2a7d2e0aacb678d9bda759",
      "temperature": "Normal Temp",
      "temperatureDetails": "",
      "dg": [],
      "contactEmail": "",
      "contactNumber": "",
      "queryEnteredByPhone": "",
      "source": "mobile",
      "grossWeight": "",
      "volumeWeight": "",
      "totalPieces": "",
      "noOfContainers": "",
      "density": "",
      "clearenceDate": "",
      "rateType": "",
      "shipmentMode": "",
      "containerType": [
        {
          "name" : "",
          "count": "",
        }
      ],
      "originAirport": {
        "id": "",
        "code": "",
        "name": ""
    },
    "originDoor": {
        "addressLine2": "",
        "state": "",
        "country": ""
    },
    "destination": {},
    "destinationAirport": {
      "id": "",
      "code": "",
      "name": ""
  },
    "destinationDoor": {
        "addressLine2": "",
        "state": "",
        "country": ""
    },
      "stuffingType": "",
      "custType": "Shipper",
      "otherCommodity": "",
      "commodity": "",
      "commodityHsnCode": "",
      "animalType": "",
      "dimentionType": "CM",
      "IncoTerms": [],
      "targetRate": "",
      "additionalService": [],
      "packagingType": "",
      "preferredAirlines": [],
      "stackable": "true",
      "tiltable": "true",
      "remarks": "",
      "shipmentType": "Prepaid",
      "queryEnteredBy": "",
      "allSlabRate": "false",
      "contractRateId": "",
      "isContractRate": false,
      "serviceType": "Normal",
      "customerMails": [
          ""
      ],
      "iataMails": [],
      "customerAckMails": [],
      "activityType": "",
      "tarrifMode": "",
      "queryType": "Ocean Export",
      "queryFrom": "Customer",
      "queryFor": "",
      "record" : [],
      "records":[],
      "suggestions" : [],
      "hsnCodes": [],
      "suggestionss":[],
      "suggest":[],
      "data" : [],
      "shipment" :"FCL",
      "totalContainerCbm":"",
      "totalConatinerWeight" :"",
      "TotalContainerWeight" : [{
        "containerWeight" :""
      }],
      "TotalContainerCbm" : [{
        "capacity" : ""
      }],
      "TotalContainerCapacity":"",
      "weight": {
        "gross": "123",
        "volume": "11",
        "chargeable": "11.00"
    },
     "getrate" : "",
     "originport" : "",
     "destinationport" :"",
     "rates":[],
     "isValid": false,
     "errors": false,
     "charge" :[]
    }
  }

  componentDidMount = () => {
    //this.getData();
    this.onNextStep();
  }

  onChangehandle = (text) => {
    fetch("https://coapi.zipaworld.com/api/auth/masters/commodity/manager", {
        method:"Post",
        headers:{
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({search: text})
      }).then((response) => response.json())
      .then ((results) => {
        console.log(results);
        this.setState({
          hsnCodes : results.result.data,
        });
      })
      .catch((error) => console.log("error", error));

       let matches = []
       if(text.length >= 3){
       matches = this.state.hsnCodes.filter(codes => {
           const regex = new RegExp(`${text}`, "gi");
           return codes.hsnCode.match(regex)
        })
      }
      console.log(matches)
      this.setState({suggest: matches})
      this.setState({commodityHsnCode:text})
    }

    onSuggestHandle = (text) => {
      this.setState({suggest: []})
      this.setState({commodityHsnCode:text}, () => {
        console.log(text)
      })
    } 


  onChangehandler = (text) => {
    fetch("https://coapi.zipaworld.com/api/auth/masters/originDestination/manager", {
        method:"Post",
        headers:{
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({search: text}) 
      }).then((response) => response.json())
      .then ((results) => {
        console.log(results);
        this.setState({
          record : results.result.data,
        });
      })
      .catch((error) => console.log("error", error));

       let matches = []
       if(text.length >= 3){
       matches = this.state.record.filter(codes => {
           const regex = new RegExp(`${text}`, "gi");
           console.log(matches);
             return codes.name.match(regex)
        })
      }
      console.log(matches)
      this.setState({suggestions: matches})
      //this.setState({originAirport:text})
    }

    onSuggestHandler = (text, _id ,code) => {
      this.setState({suggestions: []})
      let obj = {}
      obj.id = _id
      obj.code = code
      obj.name = text
      this.setState({
        originAirport : obj
      },()=>{
        console.log(this.state.originAirport)
      })
      this.setState({show:false})
      this.setState({originId:obj.id}, () => {
        console.log(this.state.originId)
      }) 
    } 

    onChangehandlers = (text) => {
      fetch("https://coapi.zipaworld.com/api/auth/masters/originDestination/manager", {
          method:"Post",
          headers:{
            "Content-Type" : "application/json",
          },
          body : JSON.stringify({search: text})
        }).then((response) => response.json())
        .then ((results) => {
          console.log(results);
          this.setState({
            records : results.result.data,
          });
        })
        .catch((error) => console.log("error", error));
  
         let matches = []
         if(text.length >= 3){
         matches = this.state.records.filter(codes => {
             const regex = new RegExp(`${text}`, "gi");
             return codes.name.match(regex)
          })
        }
        console.log(matches)
        this.setState({suggestionss: matches})
        //this.setState({destinationAirport:text})
      }

      onSuggestHandlers = (text, _id ,code) => {
        this.setState({suggestionss: []})
        let obj = {}
        obj.id = _id
        obj.code = code
        obj.name = text
        this.setState({
          destinationAirport : obj
        },()=>{
          console.log(this.state.destinationAirport)
        })
        this.setState({show1:false})
      this.setState({destinationId:obj.id}, () => {
        console.log("okkkkkkkkkkkkk", obj.id)
      })
     } 

// getData = () => { 
//   fetch("https://coapi.zipaworld.com/api/auth/masters/containers/getAll", {
//       method:"Post",
//       headers:{
//         "Content-Type" : "application/json",
//       },
//       body: JSON.stringify({tarrifMode: "General Cargo"})
//     }).then((response) => response.json())
//     .then ((results) => {
//       console.log(results);
//       this.setState({
//         data : results.result,
//       });
//     })
//     .catch((error) => console.log("error", error));
// }  

  Search = async (queryFor, tarrifMode, activityType, additionalService) => {
    fetch("https://coapi.zipaworld.com/api/auth/queries/create", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(this.state)
    }).then((result) => {
          result.json().then((res) => {
          console.log(res);
          this.setState({queryFor:queryFor, tarrifMode:tarrifMode, activityType:activityType, additionalService:additionalService});
          //alert(res.message)  
        })
        })
    .catch((error) => console.log("error", error));
     fetch("https://coapi.zipaworld.com/api/auth/masters/oceanFreight/getQueryRates", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(this.state)
    }).then((response) => response.json())
    .then ((results) => {
      console.log(results);
      if(results.success == true) {
        this.setState({
          rates: results.result,
          charge: results.result,
          getrate : results.result2, 
          originport:results.result2.originAirport , 
          destinationport : results.result2.destinationAirport,
          modal:true
       });
      }
    })
    .catch((error) => console.log("error", error));
  }

//   LCLcontainer = () => {
//     this.setState({shipmentMode:"LCL"});
//     this.setState({show2:false});
//   }
 
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
        this.props.navigation.navigate("Home");
        break;
    }
  }

  Select = (id) => {
    this.setState({borderColorId: id});
    if(id == 1) {
      this.setState({show:true})
      } else if (id == 2) {
        this.setState({show1:true})
      } else if (id == 3) {
         
      }  else if (id == 5) {
        this.setState({show3:true})
      } else if (id == 6) {
        this.setState({show4:true})
      }
  };


  handleContainerCount = (obj,name, cap, weg ,i) => {
    let containerType = [...this.state.containerType]
    containerType[i] = {...containerType[i],name :name ,count :obj }
    // console.log("objjjjjjjjjj",obj)
    this.setState({
      containerType
    },()=>{
      console.log('value of container-=========>',JSON.stringify(this.state.containerType))
    })

    let total = this.state.containerType.reduce((prevValue, currentValue) => {
        return {
          count : prevValue.count + currentValue.count
        }
    });
    // console.log(total);
    
    this.setState({noOfContainers:total.count}, () => {
      console.log("noOfContainers", total.count)
    });

    let TotalContainerCbm = [...this.state.TotalContainerCbm]
    TotalContainerCbm[i] = { ...TotalContainerCbm[i], capacity:cap*obj}
    this.setState({
      TotalContainerCbm
    }, () => {
      console.log("pppppp", JSON.stringify(this.state.TotalContainerCbm))
    })

    let TotalCbmCapacity = this.state.TotalContainerCbm.reduce((prevCapacity , currentCapacity) => {
      return {
        capacity : prevCapacity.capacity + currentCapacity.capacity
      }
    })
    console.log("hhhhhh", TotalCbmCapacity)

    this.setState({totalContainerCbm:TotalCbmCapacity.capacity})
    console.log("Totalcbm ", TotalCbmCapacity.capacity )

    let TotalContainerWeight = [...this.state.TotalContainerWeight]
    TotalContainerWeight[i] = { ...TotalContainerWeight[i], containerWeight: obj * weg}
    this.setState({
      TotalContainerWeight
    }, () => {
      console.log("weeeee", JSON.stringify(this.state.TotalContainerWeight))
    })

    let TotalWeightContainer = this.state.TotalContainerWeight.reduce((prevWeight , currentWeight) => {
      return {
        containerWeight : prevWeight.containerWeight + currentWeight.containerWeight
      }
    })
    console.log("WWWWWWWWWWWWWW", TotalWeightContainer)

    this.setState({totalConatinerWeight:TotalWeightContainer.containerWeight})
    console.log("Totalcbm ", TotalWeightContainer.containerWeight )
  }


  onChange = (date) => {
    {this.setState({clearenceDate: date})}
  }

  calculateChargeable = () => {

    try {
        if (this.state.volumeWeight && this.state.grossWeight) {
            let volumeWeight = parseFloat(this.state.volumeWeight).toFixed(2);
            let grossWeight = parseInt(Math.round(this.state.grossWeight));
            let CalculatedGross = grossWeight / 1000;
            let volumeInKG = volumeWeight * 1000;


            CalculatedGross > volumeWeight
                ? this.setState({
                    chargeableWeight: CalculatedGross,
                    unit: "Tons"
                }, () => {
                    console.log("hhhhhhhhhhhhhhhhhhhhhhhhhhh",this.state.chargeableWeight)
                    if (this.state.chargeableWeight === "0") {
                        this.setState({
                            density: "0"
                        });
                    } else {
                        let density = (volumeWeight / CalculatedGross) * 100;
                        this.setState({
                            density: parseFloat(density).toFixed(2)
                        });
                    }

                })
                : this.setState({
                  chargeableWeight: volumeWeight,
                    unit: "m³"
                }, () => {
                    if (this.state.chargeableWeight === "0") {
                        this.setState({
                            density: "0"
                        });
                    } else {
                        let density = (volumeWeight / CalculatedGross) * 100;
                        this.setState({
                            density: parseFloat(density).toFixed(2)
                        });
                    }
                });


        }
    } catch (e) {
    }
};


weightcapacity = () => {
  try {
      if (this.state.grossWeight !== "") {
          let grossWeight = parseInt(Math.round(this.state.grossWeight));
          let CalculatedGross = grossWeight / 1000;

          if (this.state.shipment === "FCL") {
              if (this.state.totalConatinerWeight < grossWeight) {
                  // alert("Hiiiii")
                  this.setState({grossWeight: ""})
              }
          }

      }
  } catch (e) {
  }
};

volumecapacity = () => {
  try {
      if (this.state.volumeWeight !== "") {
          //let grossWeight = parseInt(Math.round(this.state.gross));
          let volume = parseInt(Math.round(this.state.volumeWeight));
          //let CalculatedGross = grossWeight / 1000;

          if (this.state.shipment === "FCL") {
              if (this.state.totalContainerCbm < volume) {
                  alert("Volume is more than containers capacity,Change number of containers")
                  this.setState({volumeWeight: ""})
              }

          }

      }
  } catch (e) {
  }
};

onNextStep = () => {
  if (!this.state.isValid) {
    this.setState({ errors: true, modal:false });
  } else {
    this.setState({ errors: false, modal:false });
  }
};

  render() {
    const {queryFor, tarrifMode, activityType, additionalService } = this.props.route.params
    const {data, getrate, originport, destinationport, rates, charge} = this.state
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
        <ScrollView style = {{padding:"2%",height:"100%"}}>
          <Modal transparent={true} visible={this.state.show} animationType="slide">
          <View style = {{backgroundColor:"#000000aa", flex:1}}>
                <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:320,padding : 10, borderRadius:10}}>  
                <View style = {{padding:"2%", height:"100%"}}>
                <Pressable onPress={() => this.setState({show:false})}>
                     <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
                   </Pressable> 
                  <Text style = {{fontSize:20, fontWeight:"600"}}>Please Select the Origin Port</Text>
                  <Text></Text>
                  <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <TextInput 
                        placeholder="Search Origin Port" 
                        placeholderTextColor= "#000000" 
                        style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                        keyboardType="email-address"
                        onChangeText={(text) => this.onChangehandler(text)} 
                        value={this.state.originAirport}
                    />
                  <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                </View> 
                <View style = {{backgroundColor:"#ffffff",borderRadius:10, marginTop:"1%",}}>   
                { this.state.suggestions && this.state.suggestions.map((suggestion , i) =>  
                    <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandler(suggestion.name, suggestion._id , suggestion.code)}>
                        <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.name}</Text>
                    </TouchableOpacity>
                )}
                </View>
              </View>
                </View>
              </View>
          </Modal>
          <Modal transparent={true} visible={this.state.show1} animationType="slide">
          <View style = {{backgroundColor:"#000000aa", flex:1}}>
                <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:320,padding : 10, borderRadius:10}}>  
                <View style = {{padding:"2%", height:"100%"}}>
                <Pressable onPress={() => this.setState({show1:false})}>
                     <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
                   </Pressable> 
                  <Text style = {{fontSize:20, fontWeight:"600"}}>Select the Destination Port</Text>
                  <Text></Text>
                  <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <TextInput 
                        placeholder="Search Destination Port" 
                        placeholderTextColor= "#000000" 
                        style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                        keyboardType="email-address"
                        onChangeText={(text) => this.onChangehandlers(text)} 
                        value={this.state.destinationAirport}
                    />
                  <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                </View> 
                <View style = {{backgroundColor:"#ffffff",borderRadius:10, marginTop:"1%",}}>   
                { this.state.suggestionss && this.state.suggestionss.map((suggestion , index) =>  
                    <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandlers(suggestion.name, suggestion._id , suggestion.code)}>
                        <Text style = {{fontSize:20, color : "#000000"}}>{suggestion.name}</Text>
                    </TouchableOpacity>
                )}
                </View>
              </View>
                </View>
              </View>
          </Modal>
          {/* <Modal transparent={true} visible={this.state.show2} animationType="slide">
          <View style = {{backgroundColor:"#000000aa", flex:1}}>
          <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:480,padding : 10, borderRadius:10}}>
                  <Text style = {{fontSize:25, fontWeight:"600"}}> Mode </Text>
                <Text></Text>
                <View style = {{display:"flex", flexDirection:"row"}}>
                  <RadioButton
                    animation={'bounceIn'}
                    isSelected={false}
                    innerColor="#000000"
                    outerColor="#000000"
                    onPress={() => this.LCLcontainer()}
                  />
                  <Text style = {{fontSize:20, fontWeight:"600", marginLeft:"5%"}}>LCL (Groupage)</Text>
                </View>
                <Text></Text>
                <View style = {{display:"flex", flexDirection:"row"}}>
                  <RadioButton
                    animation={'bounceIn'}
                    isSelected={true}
                    // onPress = {() => this.setState({shipmentMode:this.state.shipment})}
                    innerColor="#000000"
                    outerColor="#000000"
                  />
                  <Text style = {{fontSize:20, fontWeight:"600",  marginLeft:"5%"}}>FCL (Full Container Load)</Text>
                </View>
                <Text></Text>
                  <View>
                    <Text style = {{fontSize:23, fontWeight:"600",  marginLeft:"2%"}}>Container Type*</Text>
                    <Text></Text>
                    {data && data.map((records,i) => {
                        console.log(records)
                        return (
                          <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
                              <Text style = {{fontSize:22, fontWeight:"600",  marginTop:10,flexDirection:"column", justifyContent:"space-between"}}>{records.container}</Text>
                              <NumericInput rounded 
                                value={this.state.value}
                                onChange={(value) =>this.handleContainerCount(value,records.container, records.capacity, records.maxCargoWeight, i)} 
                                rightButtonBackgroundColor='#D0D0D0' 
                                leftButtonBackgroundColor='#D0D0D0'
                              />
                            </View>
                        )
                    })}
                    <Pressable style = {styles.btn1} onPress={() => this.setState({shipmentMode:this.state.shipment, show2:false})}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
              </View>
          </Modal> */}
          <Modal transparent={true} visible={this.state.show4}>
           <View style = {{backgroundColor:"#000000aa", flex:1}}>
              <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:400,padding : 10, borderRadius:10}}>
              <Text style = {{fontSize:20, fontWeight:"600"}}>Please Select the Commodity</Text>
                <View>
                <Picker
                  selectedValue={this.state.commodity}
                  style={{height: 60, width: "100%"}}
                  onValueChange={(itemValue, itemIndex) =>this.setState({commodity: itemValue})}>
                  <Picker.Item label="Garments" value="Garments" />
                  <Picker.Item label="Pharmaceutical" value="Pharmaceutical" />
                  <Picker.Item label="Engineering Goods" value="Engineering Goods" />
                  <Picker.Item label="Auto Parts" value="Auto Parts" />
                  <Picker.Item label="Machinery" value="Machinery" />
                  <Picker.Item label="Handicrafts" value="Handicrafts" />
                  <Picker.Item label="Leather goods" value="Leather goods" />
                  <Picker.Item label="Carpets" value="Carpets" />
                  <Picker.Item label="Fabric" value="Fabric" />
                </Picker>
                </View>  
               <Text style = {{fontSize:20, fontWeight:"600"}}>Please Select the HSN code</Text>
                  <Text></Text>
                  <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                    <TextInput 
                        placeholder="Search HSN code" 
                        placeholderTextColor= "#000000" 
                        style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                        keyboardType="email-address"
                        onChangeText={(text) => this.onChangehandle(text)} 
                        value={this.state.commodityHsnCode}
                    />
                  <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                </View> 
                <View style = {{backgroundColor:"#ffffff",borderRadius:10, marginTop:"1%",}}>   
                { this.state.suggest && this.state.suggest.map((suggestion , index) =>  
                    <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandle(suggestion.hsnCode)}>
                        <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.hsnCode}</Text>
                    </TouchableOpacity>
                )}
                <Pressable style = {styles.btn1} onPress={() => this.setState({show4:false})}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
            </View>
          </Modal>
          <Modal transparent={true} visible={this.state.show3} animationType="slide">
          <View style = {{backgroundColor:"#000000aa", flex:1}}>
                <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:370,padding : 10, borderRadius:10}}>  
                  <Text style = {{fontSize:25, fontWeight:"600"}}>Gross Weight (kgs)*</Text>  
                      <View style = {{borderWidth:2, borderRadius:10, width:"95%", marginTop:"1%", alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <TextInput 
                            placeholder="Gross Weight" 
                            placeholderTextColor= "#000000" 
                            style={{fontSize:20, fontWeight:"600", marginLeft:"5%", color:"#000000"}} 
                            keyboardType="email-address"
                            onChangeText={(text) => this.setState({"grossWeight":text}, () => {
                               this.calculateChargeable()
                               if (this.state.shipment === "FCL") {
                                this.weightcapacity()

                            }
                            })} 
                            value={this.state.grossWeight}
                            keyboardType= 'numeric'
                        />
                      <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                    </View>
                    <View style = {{padding:"2%", borderRadius:10}}>
                    <Text style = {{fontSize:25, fontWeight:"600"}}>No. Of Pieces*</Text>  
                      <View style = {{borderWidth:2, borderRadius:10, width:"95%", alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <TextInput 
                            placeholder="Pieces" 
                            placeholderTextColor= "#000000" 
                            style={{fontSize:20, fontWeight:"600", marginLeft:"5%", color:"#000000"}} 
                            keyboardType="email-address"
                            onChangeText={(text) => this.setState({"totalPieces":text})} 
                            value={this.state.totalPieces}
                            keyboardType= 'numeric'
                        />
                      <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                    </View>
                    </View>
                    <View style = {{padding:"2%", borderRadius:10}}> 
                    <Text style = {{fontSize:25, fontWeight:"600"}}>Volume Weight (CBM)*</Text>  
                      <View style = {{borderWidth:2, borderRadius:10, width:"95%",alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <TextInput 
                            placeholder="Volume Weight" 
                            placeholderTextColor= "#000000" 
                            style={{fontSize:20, fontWeight:"600", marginLeft:"5%", color :"#000000"}} 
                            keyboardType="email-address"
                            onChangeText={(text) => this.setState({"volumeWeight":text}, () => {
                              this.calculateChargeable();
                              if (this.state.shipment === "FCL") {
                                this.volumecapacity()
                            }
                            })} 
                            value={this.state.volumeWeight}
                            keyboardType= 'numeric'
                        />
                      <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                    </View>
                    </View>
                    <Pressable style = {styles.btn1} onPress={() => this.setState({show3:false})}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </Pressable>
                </View>
              </View>
          </Modal>
          <View style = {{backgroundColor:"#ffffff", height:"8%", borderRadius:10, padding:"2%"}}>
            <Text style = {{color : "#000000", fontSize:25, fontWeight:"500"}}>Select Commodity :</Text>
          </View>
          <Text></Text>
            <TouchableOpacity style={this.state.borderColorId === 1? styles.border : styles.button} onPress={() => this.Select(1)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"60%", justifyContent:"space-between"}}>
              <Icons name="home" size={35}/>
                  <Text style = {{fontWeight:"600", fontSize:27}}>Search Origin</Text>
                  <Text style = {{fontWeight:"600", fontSize:27}}></Text>
              </View>
            </TouchableOpacity>
            <Text></Text> 
            <TouchableOpacity style={this.state.borderColorId === 2? styles.border : styles.button} onPress={() => this.Select(2)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"80%", justifyContent:"space-between"}}>
              <Icon name="location-sharp" size={40}/>
                  <Text style = {{fontWeight:"600", fontSize:27}}>Search Destination</Text>
                  <Text style = {{fontWeight:"600", fontSize:27}}></Text>
              </View>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={this.state.borderColorId === 3? styles.border : styles.button} onPress={() => this.Select(3)}>
            <View style = {{ alignSelf:"center", width:"80%"}}>
              <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <Icon name="calendar" size={40}/>
                <View style = {{paddingBottom:10}}>
                 <Text style = {{fontSize:22, fontWeight:"600"}}>Cargo Ready Date</Text>
                 <DatePicker
                    // style={{width: "80%", alignSelf:"center"}}
                    date={this.state.clearenceDate}
                    mode="date"
                    format="YYYY-MM-DD"
                    minDate="2016-05-01"
                    maxDate="2050-06-01"
                    TouchableComponent= {TouchableOpacity}
                    confirmBtnText="Confirm"
                    cancelBtnText="Cancel"
                    showIcon = {false}
                    customStyles={{
                        dateInput: {
                        fontSize:20,
                        borderColor:"transparent",
                        marginBottom:20
                        },
                        dateText:{
                            fontSize:20,
                            fontWeight:"600"
                        }
                    }}
                    onDateChange={(date) => this.onChange(date)}
                  />
                </View>
                </View>
            </View>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={this.state.borderColorId === 5? styles.border : styles.button} onPress={() => this.Select(5)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}>
                  <Icons name="box" size={40} color = "#000000"/>
                  <Text style = {{fontWeight:"600", fontSize:27}}>Package Details</Text>
              </View>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={this.state.borderColorId === 6? styles.border : styles.button} onPress={() => this.Select(6)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}>
                  <Icons name="box" size={40} color = "#000000"/>
                  <Text style = {{fontWeight:"600", fontSize:27}}>Commodity HSN</Text>
              </View>
            </TouchableOpacity>
            <Pressable style = {styles.btn} onPress = {() => this.Search(queryFor, tarrifMode, activityType, additionalService)}>
              <View style = {{ alignSelf:"center"}}>
                  <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Search</Text>
              </View>
            </Pressable>
         </ScrollView>
         <Modal transparent={true} visible={this.state.modal} animationType="slide">
          <View style = {{backgroundColor:"#000000aa", flex:1}}>
          <View style = {{backgroundColor:"#ffffff", height:"100%",padding : 10, borderRadius:10}}> 
            <ProgressSteps activeStep={2}>
                <ProgressStep label="Open" previousBtnDisabled={true} previousBtnTextStyle={{color:"white"}}>
                </ProgressStep>
                <ProgressStep label="Rates Quoted" previousBtnDisabled={true} previousBtnTextStyle={{color:"white"}}>
                </ProgressStep>
                <ProgressStep label="Booking"  nextBtnText= "Book Now" previousBtnDisabled={true} previousBtnTextStyle={{color:"white"}} nextBtnTextStyle={{color:"#000000"}} onNext={this.onNextStep}>
                  <View style={{backgroundColor:"#ffffff" }}>
                    <View style = {{padding:"2%"}}>
                      <ScrollView style={{ backgroundColor:"#ffffff", borderRadius:10, height:"100%", padding:"2%"}}>
                        <Text style = {{fontSize:20, fontWeight:"600"}}>Shipment Details</Text>
                          <View style = {{display:"flex", flexDirection:"column"}}>
                            <Text style = {{fontSize:15}}>Origin   :  {originport.name}</Text>
                            <Text style = {{fontSize:15}}>Destination   : {destinationport.name}</Text>
                            <Text style = {{fontSize:15}}>Total Pcs   : {getrate.totalPieces}</Text>
                            <Text style = {{fontSize:15}}>Volume Wt   : {getrate.volumeWeight}</Text>
                            <Text style = {{fontSize:15}}>Gross Wt   : {getrate.grossWeight}</Text>
                            <Text style = {{fontSize:15}}>chargeable Wt   : {getrate.chargeableWeight}</Text>
                            <Text style = {{fontSize:15}}>Activity Type   : {getrate.activityType}</Text>
                            <Text style = {{fontSize:15}}>Tarrif Mode   : {getrate.tarrifMode}</Text>
                            <Text style = {{fontSize:15}}>Commodity    : {getrate.commodity}</Text>
                            <Text style = {{fontSize:15}}>Shipment Mode   : {getrate.shipmentMode}</Text>
                            <Text style = {{fontSize:15}}>No of Container   : {getrate.noOfContainers}</Text>
                            <Text style = {{fontSize:15}}>Handover Date   :  {getrate.clearenceDate}</Text>
                            </View>
                            <Text></Text>
                              {rates && rates.map((shippingname) => {
                                return (
                                  <View style= {{alignItems:"center"}}>
                                    <Text style = {{fontSize:20, fontWeight:"600"}}>{shippingname.shippingLineName}</Text>  
                                  </View>
                                  )
                                })}
                                <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                                  <Text style = {{fontSize:15}}>Origin : {originport.name} </Text>
                                  <Text style = {{fontSize:15}}>Destination : {destinationport.name} </Text>
                                </View> 
                                <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                                  {rates && rates.map((time) => {
                                    return (
                                      <View>
                                        <Text style = {{fontSize:15}}>Transit Time * : {time.transitTime}  </Text>
                                      </View>
                                      )
                                    })}
                                    <Text style = {{fontSize:15}}>Handover Date : {getrate.clearenceDate}</Text>
                                    </View>
                                    {rates && rates.map((rs) => {
                                      return (
                                        <View style= {{alignItems:"center"}}>
                                          <Text style = {{fontSize:25, fontWeight:"700"}}>INR : {rs.amountB}</Text>  
                                        </View>
                                      )
                                    })}
                                    <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                                      <Text style = {{fontSize:15}}>Weight : {getrate.grossWeight}</Text>
                                      <Text style = {{fontSize:15}}>Volume Weight(CBM) : {getrate.volumeWeight} m3</Text>
                                    </View>
                                    <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                                      <Text style = {{fontSize:15}}>stuffingType : {getrate.activityType}</Text>
                                      <Text style = {{fontSize:15}}>Commodity : {getrate.commodity} </Text>
                                    </View>
                                    <Text></Text>
                                    <View style = {{display:"flex" , flexDirection:"row", justifyContent:"space-between"}}>
                                      <View>
                                         <Text>Charges</Text>
                                         <Text>name</Text>
                                      </View>
                                      <View>
                                        <Text>No of</Text>
                                        <Text>containers</Text>
                                      </View>
                                      <Text>Rate</Text>
                                      <View>
                                        <Text>     Total</Text>
                                        <Text>   amount</Text>
                                      </View>
                                    </View>
                                    <Text></Text>
                                    {charge.charges && charge.charges.map((totalcharge) => {
                                         return (
                                          <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                            <Text>{totalcharge.chargeName}</Text>
                                            <Text>{totalcharge.chargeQty}</Text>
                                            <Text>      {totalcharge.currency}</Text>
                                          <View>
                                             <Text>{totalcharge.chargeTaxableB}</Text>  
                                          </View>  
                                          </View> 
                                         ) 
                                     })}
                                  </ScrollView>
                                </View>  
                              </View>
                              </ProgressStep>
                              <ProgressStep label="Payment">
                                  <View style={{ alignItems: 'center' }}>
                                      <Text>Payment</Text>
                                  </View>
                              </ProgressStep>
                            </ProgressSteps> 
                          </View>
                    </View>
               </Modal>
           </LinearGradient>
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    borderColor:"#000000",
    borderWidth:2,
    alignItems: 'center',
    padding: 10,
    backgroundColor: '#ffffff',
    height:70,
    borderRadius:10,
    padding:"3%",
  },
  button: {
    alignItems: 'center',
    backgroundColor: '#ffffff',
    height:70,
    borderRadius:10,
    padding:"3%",
  },
  linearGradient: {
    flex: 1,
  },
  btn : {
    padding:"3%",
    backgroundColor:"#000000",
    height:60,
    borderRadius:20,
    width:"30%",
    alignSelf:"center",
    marginTop:"2%"
  },
  btn1 : {
    padding:"3%",
    backgroundColor:"#000000",
    height:55,
    borderRadius:20,
    width:"30%",
    alignSelf:"flex-end",
    marginTop:"2%"
  },
})

export default AirGeneral;