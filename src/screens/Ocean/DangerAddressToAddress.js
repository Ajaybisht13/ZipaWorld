import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet,TextInput, TouchableOpacity, ScrollView, ActivityIndicator, Modal, FlatList, ImageBackground, Button } from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import DatePicker from 'react-native-datepicker'
import Iconss from 'react-native-vector-icons/Entypo';
// import RadioButton from 'react-native-radio-button';
import { RadioButton } from 'react-native-paper';
import NumericInput from 'react-native-numeric-input';
import {Picker} from '@react-native-community/picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';

const baseUrl = "https://coapi.zipaworld.com/";

class DangerAddressToAddress extends Component {
 
  TotalContainer = [];
  TotalContainerWeight = [];
  TotalContainerCbm = [];

  constructor(props) {
    super(props);
    this.state = {
      "showContainerlist" : false,
      "content" : false,
      "show":false,
      "show1":false,
      'show2':false,
      "show3":false,
      "show4":false,
      "show5":false,
      "show6":false,
      "modal" : false,
      "pinCodes" : [],
      "showOrigin":true,
      "showDestination" : true,
      "showCommodity" : true,
      "showWeight" : true,
      "showAddress" : true,
      "showDropAddress" : true,
      "getQueryRate" : false,
      "isLoading" : true,
      "attachments": [],
      "pinSuggestion":[],
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
      "temperature": "",
      "temperatureDetails": "",
      "dg": [],
      "contactEmail": "",
      "contactEmail2": "",
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
      "shipmentMode": "FCL",
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
        "country": "",
        "pincode" : "",
        "city" : ""
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
    "country": "",
    "pincode" : "",
    "city" : ""
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

  componentDidMount = async() => {
    this.setState({
      activityType : this.props.route.params.activityType,
      tarrifMode : this.props.route.params.tarrifMode,
      queryFor:  this.props.route.params.queryFor,
      additionalService: this.props.route.params.additionalService,
    })
    const token = await AsyncStorage.getItem("userToken")
    const guestId = await AsyncStorage.getItem("customerId")
    const guestBranchId = await AsyncStorage.getItem("customerBranchId")
    const authBranchId = await AsyncStorage.getItem("authCustomerBranchId")
    const authId = await AsyncStorage.getItem("authId")
    console.log("token",token);
    if(token){
      //this.getAllBranch(token);
      this.setState({customerId : authId, customerBranchId:authBranchId})
    }else {
      this.setState({customerId : guestId, customerBranchId : guestBranchId})
    }
    this.getData();
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
    fetch("https://coapi.zipaworld.com/api/auth/masters/ports/manager", {
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
      this.setState({originNameSet:text})
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
      this.setState({originNameSet:text})
      this.setState((previousState) => ({ showOrigin: !previousState.showOrigin }))
      this.setState({originId:obj.id}, () => {
        console.log(this.state.originId)
      }) 
    } 

    onChangehandlers = (text) => {
      fetch("https://coapi.zipaworld.com/api/auth/masters/ports/manager", {
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
      this.setState({destinationNameSet:obj.name})
      this.setState((previousState) => ({ showDestination: !previousState.showDestination }))
     } 

getData = () => { 
  fetch("https://coapi.zipaworld.com/api/auth/masters/containers/getAll", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({tarrifMode: "Dangerous Goods"})
    }).then((response) => response.json())
    .then ((results) => {
      console.log(results);
      this.setState({
        data : results.result,
      });
    })
    .catch((error) => console.log("error", error));
}  

Search = async (queryFor, tarrifMode, activityType, additionalService) => {
  if ( this.state.clearenceDate.trim() === "" && this.state.originAirport.name.trim() === "" && this.state.destinationAirport.name.trim() === "" && this.state.volumeWeight.trim() === "" && this.state.grossWeight.trim() === "" ) {
    alert("Fill the fields")
 }  else if (this.state.originAirport.name.trim() === "") {
  alert("Select the origin")
}   else if (this.state.clearenceDate.trim() === ""){
   alert("Select the clearence Date")
 } else if (this.state.volumeWeight.trim() === "") {
  alert("Enter the volume weight")
} else if (this.state.grossWeight.trim() === "") {
  alert("Enter the Gross weight")
}

let containerArr = [];
  if (this.state.shipmentMode && this.state.shipmentMode === "FCL") {
    this.state.ContainerList && this.state.ContainerList.map((item, i) => {
        if (item.count !== undefined) {
          containerArr.push({
                name: item.container,
                count: item.count
            })
        }

    })
    this.setState({
      containerType:containerArr
    }, () => {
      console.log("ddddd", this.state.containerType)
    })

}



  <ActivityIndicator size={"large"}/>
   fetch(baseUrl + "api/auth/queries/create", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(this.state)
    }).then((result) => {
          result.json().then((res) => {
          console.log(res);
          if (res.success == true) {
            this.setState((previousState) => ({
              quoteId:res.result._id,
              queryFor:queryFor, 
              tarrifMode:tarrifMode, 
              activityType:activityType, 
              additionalService:additionalService,
              getQueryRate: !previousState.getQueryRate,
              // modal : true
            }), () => {
              this.getQueryRateFunction(this.state.quoteId)
            });
          }
        })
        })
    .catch((error) => console.log("error", error));
}

getQueryRateFunction =(quoteId)=>{
  fetch(baseUrl + "api/auth/masters/oceanFreight/getQueryRates", {
   method:"Post",
   headers:{
     "Content-Type" : "application/json",
   },
   body : JSON.stringify(this.state)
 }).then((response) => response.json())
 .then (async(results) => {
  //  console.log("Charges",results.result);
    if(results.success == true) {
      this.setState({
        rates: results.result,
        queryCharges: results.result,
        getrate : results.result2,
        chargesss: results.result,
        originport:results.result2.originAirport , 
        destinationport : results.result2.destinationAirport,
      }, () => {
        this.createRateLoggedUserFunction(quoteId, this.state.queryCharges)
      });
    }else {
      alert(results.message)
    }
 })
 .catch((error) => console.log("error", error));
}


createRateLoggedUserFunction =async(quoteId, queryCharges)=>{
 // const getCharges = await AsyncStorage.getItem("AllCharges")
 // console.log("allllll", getCharges)
 let obj = {
   quoteId : quoteId,
   shipmentMode : this.state.shipmentMode,
   revertData : queryCharges
 }
 console.log("daaaataaaaa",obj)
fetch(baseUrl + "api/auth/queries/rates/createRateLoggedUser", {
   method:"Post",
   headers:{
     "Content-Type" : "application/json",
   },
   body : JSON.stringify(obj)
 }).then((response) => response.json())
 .then (async(results) => {
   console.log("idddddddddddddd", results)
        this.setState({
         loggedUserCharges: results.result,
         revertLoggedData: results.result[0],
         remainingCharges : results.result[1],
         isLoading:false
        }, () => {
          alert(results.message)
        })
     })
  .catch((error) => console.log("error", error))
}

  // Search = async (queryFor, tarrifMode, activityType, additionalService) => {

  //   let containerArr = [];
  //   if (this.state.shipmentMode === "FCL") {
  //     this.state.ContainerList.map((item, i) => {
  //         if (item.count !== undefined) {
  //           containerArr.push({
  //                 name: item.container,
  //                 count: item.count
  //             })
  //         }

  //     })
  //     this.setState({
  //       containerType:containerArr
  //     }, () => {
  //       console.log("ddddd", this.state.containerType)
  //     })

  // }


  //   fetch("https://coapi.zipaworld.com/api/auth/queries/create", {
  //     method:"Post",
  //     headers:{
  //       "Content-Type" : "application/json",
  //     },
  //     body : JSON.stringify(this.state, {
  //       body : JSON.stringify(this.state,{
  //         "originDoor": {
  //           "addressLine2": "",
  //           "state": "",
  //           "country": "",
  //           "pincode" : this.state.pinCode,
  //           "city" : this.state.city
  //         },
  //         "destinationDoor": {
  //           "pincode": this.state.pinCodess,
  //           "addressLine2": "",
  //           "city": this.state.dCity,
  //           "state": "",
  //           "country": ""
  //       },
  //       })
  //     })
  //   }).then((result) => {
  //         result.json().then((res) => {
  //         console.log(res);
  //         this.setState({queryFor:queryFor, tarrifMode:tarrifMode, activityType:activityType, additionalService:additionalService});
  //         //alert(res.message)  
  //       })
  //       })
  //   .catch((error) => console.log("error", error));
  //    fetch("https://coapi.zipaworld.com/api/auth/masters/oceanFreight/getQueryRates", {
  //     method:"Post",
  //     headers:{
  //       "Content-Type" : "application/json",
  //     },
  //     body : JSON.stringify(this.state)
  //   }).then((response) => response.json())
  //   .then ((results) => {
  //     console.log(results);
  //     if(results.success == true) {
  //       this.setState({
  //         rates: results.result,
  //         charge: results.result,
  //         getrate : results.result2, 
  //         originport:results.result2.originAirport , 
  //         destinationport : results.result2.destinationAirport,
  //         modal:true
  //      });
  //     }
  //   })
  //   .catch((error) => console.log("error", error));
  // }

  LCLcontainer = () => {
    this.setState((previousState) =>({
      shipment:"LCL",
      shipmentMode :"LCL",
      showContainers: !previousState.showContainers,
      show2:false,
      showContainerlist:false
    }));
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
         
      } else if (id == 4) {
        this.setState({show2:true})
        if (this.state.shipmentMode == "FCL"){
          this.setState({showContainerlist:true})
        }
      }  else if (id == 5) {
        this.setState({show3:true})
      } else if (id == 6) {
        this.setState({show4:true})
      }
      else if (id == 7) {
        this.setState({show5:true})
      }else if (id == 8) {
        this.setState({show6:true})
      }
  };


  // handleContainerCount = (obj,name, cap, weg ,i) => {
  //   let containerType = [...this.state.containerType]
  //   containerType[i] = {...containerType[i],name :name ,count :obj }
  //   // console.log("objjjjjjjjjj",obj)
  //   this.setState({
  //     containerType
  //   },()=>{
  //     console.log('value of container-=========>',JSON.stringify(this.state.containerType))
  //   })

  //   let total = this.state.containerType.reduce((prevValue, currentValue) => {
  //       return {
  //         count : prevValue.count + currentValue.count
  //       }
  //   });
  //   // console.log(total);
    
  //   this.setState({noOfContainers:total.count}, () => {
  //     console.log("noOfContainers", total.count)
  //   });

  //   let TotalContainerCbm = [...this.state.TotalContainerCbm]
  //   TotalContainerCbm[i] = { ...TotalContainerCbm[i], capacity:cap*obj}
  //   this.setState({
  //     TotalContainerCbm
  //   }, () => {
  //     console.log("pppppp", JSON.stringify(this.state.TotalContainerCbm))
  //   })

  //   let TotalCbmCapacity = this.state.TotalContainerCbm.reduce((prevCapacity , currentCapacity) => {
  //     return {
  //       capacity : prevCapacity.capacity + currentCapacity.capacity
  //     }
  //   })
  //   console.log("hhhhhh", TotalCbmCapacity)

  //   this.setState({totalContainerCbm:TotalCbmCapacity.capacity})
  //   console.log("Totalcbm ", TotalCbmCapacity.capacity )

  //   let TotalContainerWeight = [...this.state.TotalContainerWeight]
  //   TotalContainerWeight[i] = { ...TotalContainerWeight[i], containerWeight: obj * weg}
  //   this.setState({
  //     TotalContainerWeight
  //   }, () => {
  //     console.log("weeeee", JSON.stringify(this.state.TotalContainerWeight))
  //   })

  //   let TotalWeightContainer = this.state.TotalContainerWeight.reduce((prevWeight , currentWeight) => {
  //     return {
  //       containerWeight : prevWeight.containerWeight + currentWeight.containerWeight
  //     }
  //   })
  //   console.log("WWWWWWWWWWWWWW", TotalWeightContainer)

  //   this.setState({totalConatinerWeight:TotalWeightContainer.containerWeight})
  //   console.log("Totalcbm ", TotalWeightContainer.containerWeight )
  // }


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
                alert("Volume is more than containers capacity,Change number of containers")
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

booknow = async(shippingname, noOfContainers, grossWeight, volumeWeight) => {
  //this.props.navigation.navigate("ShipperDetails")
  const token = await AsyncStorage.getItem("userToken")
  console.log("token aa gaya h booking now p",token);
  
  if(token){
    this.setState({
      //shipperModal:true,
      bookData : shippingname, 
      bookDataCharges : shippingname.charges,
      id: shippingname._id,
      containers:noOfContainers,
      volumeWeight:volumeWeight,
      grossWeight:grossWeight
    }, () => {
      console.log("bookSelected", JSON.stringify(this.state.bookData))
      this.props.navigation.navigate("getQueryRates", {bookingData: this.state.bookData, grossWeight:this.state.grossWeight, volumeWeight:this.state.volumeWeight, noOfContainers:this.state.containers, bookingCharges:this.state.bookDataCharges, rateId:this.state.id, quoteId:this.state.quoteId, remainingCharges:this.state.remainingCharges, revertData:this.state.revertLoggedData})
    })
  }else {
    this.setState({
      //shipperModal:true,
      bookData : shippingname, 
      bookDataCharges : shippingname.charges,
      id: shippingname._id,
      containers:noOfContainers,
      volumeWeight:volumeWeight,
      grossWeight:grossWeight
    }, () => {
      console.log("bookSelected", JSON.stringify(this.state.bookData))
      this.props.navigation.navigate("Login2", {bookingData: this.state.bookData, grossWeight:this.state.grossWeight, volumeWeight:this.state.volumeWeight, noOfContainers:this.state.containers, bookingCharges:this.state.bookDataCharges, rateId:this.state.id, quoteId:this.state.quoteId, remainingCharges: this.state.remainingCharges, revertData:this.state.revertLoggedData})
    })
  }
};

componentHideAndShow = (_id) => {
  this.setState({
    showContent : !this.state.content,
    buttonId : _id
  })
 }

changeCurrency = () => {
  this.setState((previousState) => ({ switchCurrency: !previousState.switchCurrency }))
}

queryRates = () => {
  this.setState((previousState) => ({getQueryRate: !previousState.getQueryRate }))
}

onChangePin = (text) => {
  fetch("https://coapi.zipaworld.com/api/auth/masters/pickupOrigins/managerPincode", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
      },
      body : JSON.stringify({search: text})
    }).then((response) => response.json())
    .then ((results) => {
      console.log("Data Available",results);
      this.setState({
        pinCodes : results.result.data,
      });
    })
    .catch((error) => console.log("error", error));

     let matches = []
     if(text.length > 2){
    //  matches = this.state.pinCodes && this.state.pinCodes.map(codes => {
    //      return codes.pincode.map(pincodes => {
    //       const regex = new RegExp(`${text}`, "gi");
    //         return pincodes.match(regex)
    //      });
    //   })
    for(let i=0;i<this.state.pinCodes.length;i++){
      this.state.pinCodes[i].pincode.map(ele=>{
        matches.push(ele)
      })
    }
    }
    console.log(JSON.stringify(matches))
    this.setState({pinSuggestion: matches})
    this.setState({pickPinCode:text})
    
  }

  onSuggestHandlepin = (text, i) => {
    console.log("sssss", text)
    this.setState({pinSuggestion: []})
    this.setState({pickPinCode:text})
    this.setState((previousState) => ({
        pinCode:text,
        //show5:false,
        showAddress: !previousState.showAddress,
      }), () => {
      console.log("PiiinnnnCCCCooooodddddeeeee",this.state.pinCode)
    })
    // this.setState((previousState) => ({
    //   show4:false,
    //   showCommodity: !previousState.showCommodity,
    //   commodity: this.state.commodity,
    //   commodityHsnCode:this.state.commodityHsnCode,
    // }))
  }



  onChangeDestinationPin = (text) => {
    fetch(baseUrl + "api/auth/masters/pickupOrigins/managerPincode", {
        method:"Post",
        headers:{
          "Content-Type" : "application/json",
        },
        body : JSON.stringify({search: text})
      }).then((response) => response.json())
      .then ((results) => {
        console.log("Data Available",results);
        this.setState({
          pinCodes : results.result.data,
        });
      })
      .catch((error) => console.log("error", error));
  
       let matches = []
       if(text.length > 2){
        for(let i=0;i<this.state.pinCodes.length;i++){
          this.state.pinCodes[i].pincode.map(ele=>{
            matches.push(ele)
          })
        }
      //  matches = Array.isArray(this.state.pinCodes) && this.state.pinCodes.map((codes, index) => {
      //      return codes.pincode.map((pincodes, i) => {
      //       const regex = new RegExp(`${text}`, "gi");
      //         return pincodes.match(regex)
      //      });
      //   })
      }
      console.log("aaaa =>>>>>>>>>>>>>>", JSON.stringify(matches));
      this.setState({pinSuggestion: matches})
      this.setState({destPinCode:text})
      
    }
  
    onSuggestHandlepinD = (text, i) => {
      this.setState({pinSuggestion: []})
      this.setState({destPinCode:text})
      this.setState((previousState) => ({
          PinCodeDest:text,
          //show5:false,
          showDropAddress: !previousState.showDropAddress,
        }), () => {
        console.log("Piiinnnn",this.state.PinCodeDest)
      })
      // this.setState((previousState) => ({
      //   show4:false,
      //   showCommodity: !previousState.showCommodity,
      //   commodity: this.state.commodity,
      //   commodityHsnCode:this.state.commodityHsnCode,
      // }))
    }

    saveOriginData = (city ,pinCode) => {
      let obj = {}
      obj.addressLine2 = ""
      obj.pincode =  pinCode,
      obj.city = city,
      obj.state= "",
      obj.country= ""

      this.setState({
        originDoor : obj,
        show5:false
      }, () => {
        console.log("originDoor Data", this.state.originDoor)
      })
   }


   saveDestinationData = (dcity, PinCodeDest ) => {
    let obj = {}
    obj.addressLine2 = ""
    obj.pincode =  PinCodeDest,
    obj.city = dcity,
    obj.state= "",
    obj.country= ""

    this.setState({
      destinationDoor : obj,
      show6:false
    }, () => {
      console.log("DestinationDoor Data", this.state.destinationDoor)
    })
 } 


incrementCount = (records, i) => {
  let ContainerList = Array.isArray(this.state.data) && this.state.data.length >= 1 ? this.state.data : undefined
  ContainerList.map((obj, j) => {
    console.log("iiiiiiiiiiiiii", obj)
      if (j === i) {
          if (obj.count !== undefined && obj.count !== 0) {
              obj.count = obj.count + 1;
              this.TotalContainer[i] = obj.count;

              this.TotalContainerWeight[i] = obj.count * records.maxCargoWeight;
              this.TotalContainerCbm[i] = obj.count * records.capacity;
          } else {
              obj.count = 1
              this.TotalContainer[i] = obj.count;
              this.TotalContainerWeight[i] = obj.count * records.maxCargoWeight;
              this.TotalContainerCbm[i] = obj.count * records.capacity;

          }
      }
  })
  this.setState({ContainerList: ContainerList}, () => {
         this.calculateConatainer()
      // console.log("abcdedfd" , JSON.stringify(this.state.ContainerList))
  })
}

decrementCount = (records, i) => {
  let ContainerList = Array.isArray(this.state.data) && this.state.data.length >= 1 ? this.state.data : undefined
  let array2 = []
  ContainerList.map((obj, j) => {
    console.log("dddddddddd", obj)
      if (j === i) {
          if (obj.count !== undefined && obj.count !== 0) {
                  obj.count = obj.count - 1;
                  if (obj.count === 0) {
                      obj.count = undefined
                  }
                  this.TotalContainer[i] = obj.count
                  this.TotalContainerWeight[i] = obj.count * records.maxCargoWeight;
                  this.TotalContainerCbm[i] = obj.count * records.capacity;
              } else {
                  obj.count = undefined
                  this.TotalContainer[i] = obj.count
                  this.TotalContainerWeight[i] = obj.count * records.maxCargoWeight;
                  this.TotalContainerCbm[i] = obj.count * records.capacity;
              }
          }
       })
      this.setState({ContainerList: ContainerList}, () => {
      this.calculateConatainer()
  })
}
sumArray = (input) => {

  if (toString.call(input) !== "[object Array]")
      return false;

  let total = 0;
  for (let i = 0; i < input.length; i++) {
      if (isNaN(input[i])) {
          continue;
      }
      total += Number(input[i]);
  }
  return total;
}
calculateConatainer = () => {
  let totalNumber = this.TotalContainer
  let totalWeight = this.TotalContainerWeight
  let totalcbm = this.TotalContainerCbm
  let sum = this.sumArray(totalNumber)
  let sumWeight = this.sumArray(totalWeight)
  let sumCbm = this.sumArray(totalcbm)
  this.setState({noOfContainers: sum, totalConatinerWeight: sumWeight, totalContainerCbm: sumCbm,
    
  }, () => {

  })
}

showWeightDetail =() => {
  this.setState((previousState) => ({
    show3:false,
    showWeight: false,
    gross: this.state.grossWeight,
    pieces:this.state.totalPieces,
    volume:this.state.volumeWeight
  }))
}

showCommodityDetails =() => {
  this.setState((previousState) => ({
    show4:false,
    showCommodity: !previousState.showCommodity,
    commodity: this.state.commodity,
    commodityHsnCode:this.state.commodityHsnCode,
  }))
}

showContainerDetails = () => {
  this.setState((previousState) => ({
    shipmentMode:"FCL", 
    show2:false, 
    container:this.state.noOfContainers,
    showContainers: !previousState.showContainers
  }))
} 

  render() {
    const {queryFor, tarrifMode, activityType, additionalService } = this.props.route.params
    const {data, getrate, originport, destinationport, rates, charge} = this.state
    const config = {
      velocityThreshold: 0.3,
      directionalOffsetThreshold: 80
    };
 
    return (
      <View>
           {this.state.getQueryRate ? 
             <View>
               {this.state.isLoading ? 
                   <View>
                     <ActivityIndicator size={"large"}/>
                   </View>
                 : 
                 <View>
                 <ScrollView style={{ backgroundColor:"#ffffff", borderRadius:10, height:"100%",borderColor:"#ffffff"}}>
                  
                  <View style = {{display:"flex", flexDirection:"column", borderBottomWidth:1, borderLeftWidth:0.3, borderRightWidth:0.3, borderTopWidth:0.3}}>
                      <Text style = {{fontSize:20, fontWeight:"600"}}>Shipment Details</Text>
                      <Text></Text>
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
                    <Text></Text>
                       {Array.isArray(this.state.loggedUserCharges) && this.state.loggedUserCharges.map((shippingname, i) => {
                       return (
                         <View style = {{borderBottomWidth:1, paddingBottom:"3%"}}>
                         <View style= {{alignItems:"center"}}>
                           <Text style = {{fontSize:20, fontWeight:"600"}}>{shippingname.shippingLineName}</Text>  
                         </View>
                       <Text></Text>
                       <View style = {{borderBottomWidth:1, paddingBottom:"2%"}}> 
                       <View style = {{display:"flex",width:"80%" ,flexDirection:"row", justifyContent:"space-between"}}>
                       <TouchableOpacity onPress = {() => this.componentHideAndShow(shippingname._id)} style ={{marginLeft:"10%"}}>
                          <Text style = {{fontSize:18, fontWeight:"bold"}}>Freight Summary</Text>
                       </TouchableOpacity>
                       <TouchableOpacity onPress = {() => this.changeCurrency()}>
                          <Text style = {{fontSize:18, fontWeight:"bold"}}>Switch to own</Text>
                          <Text style = {{fontSize:18, fontWeight:"bold"}}>Currency</Text>
                       </TouchableOpacity>
                       </View>
                       </View>
                       {
                         this.state.showContent == true && this.state.buttonId == shippingname._id ? 
                           <View> 
                             <View style = {{display:"flex" , flexDirection:"row", justifyContent:"space-between", padding :"2%"}}>
                                   <View style = {{width:60}}>
                                      <Text style = {{fontWeight:"600"}}>Charges</Text>
                                      <Text style = {{fontWeight:"600"}}>name</Text>
                                   </View>
                                   <View style = {{width:50}}>
                                     <Text style = {{fontWeight:"600"}}>No of</Text>
                                     <Text style = {{fontWeight:"600"}}>containers</Text>
                                   </View>
                                   <View style = {{width:40}}>
                                   <Text style = {{fontWeight:"600"}}>Rate</Text>
                                   </View>
                                   <View style = {{width:50}}>
                                     <Text style = {{fontWeight:"600"}}>Total</Text>
                                     <Text style = {{fontWeight:"600"}}>amount</Text>
                                   </View>
                                 </View> 
                             {shippingname.charges && shippingname.charges.map ((totalcharge, i) => {
                               return (
                                 <View>
                                
                                 <View style = {{flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
                                     <View style = {{width:50}}>
                                        <Text>{totalcharge.chargeName}-{totalcharge.altName}</Text>
                                     </View>
                                     <View style = {{width:40}}>
                                       <Text>{totalcharge.chargeQty}</Text>
                                     </View>
                                     <View style = {{width:50}}>
                                       <Text>{totalcharge.currency}</Text>
                                       <Text>{totalcharge.chargeRate}</Text>
                                     </View>
                                     <View>
                                       {
                                         this.state.switchCurrency ?
                                            <View style = {{width:52}}>
                                               <Text>{shippingname.baseCurrency} {parseFloat(totalcharge.taxableB).toFixed(2)}</Text>
                                            </View>
                                         :
                                           <View style = {{width:52}}>
                                               <Text>{shippingname.customerCurrency} {parseFloat(totalcharge.taxableC).toFixed(2)}</Text>
                                           </View>
                                       }
                                     </View>
                                   </View>
                                   </View>
                               )
                             })} 
                            
                             <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                  <Text style = {{fontSize:15, fontWeight:"bold"}}>TOTAL AMOUNT</Text>
                                  {
                                    this.state.switchCurrency ?
                                     <View>
                                        <Text style = {{ fontSize:15,fontWeight:"bold"}}>{shippingname.baseCurrency} {parseFloat(shippingname.amountB).toFixed(2)}</Text>
                                     </View>
                                     :
                                     <View>
                                        <Text style = {{ fontSize:15,fontWeight:"bold"}}>{shippingname.customerCurrency} {parseFloat(shippingname.amountC).toFixed(2)}</Text>
                                     </View>
                                  }
                                  
                               </View>
                            </View> : null }
                       <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                         <Text style = {{fontSize:15}}>Origin : {originport.name} </Text>
                         <Text style = {{fontSize:15}}>Destination : {destinationport.name} </Text>
                       </View> 
                       <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                             <View>
                               <Text style = {{fontSize:15}}>Transit Time * : {shippingname.transitTime}  </Text>
                             </View>
                           <Text style = {{fontSize:15}}>Handover Date : {getrate.clearenceDate}</Text>
                           </View>
                              <View> 
                               
                                     <View style= {{alignItems:"center"}}>
                                        {
                                         this.state.switchCurrency ? 
                                         <View>
                                            <Text style = {{fontSize:25, fontWeight:"700"}}>{shippingname.baseCurrency}  {parseFloat(shippingname.amountB).toFixed(2)}</Text>
                                         </View>
                                         : <View>
                                              <Text style = {{fontSize:25, fontWeight:"700"}}>{shippingname.customerCurrency}  {parseFloat(shippingname.amountC).toFixed(2)}</Text>
                                         </View>
                                        }
                                     </View> 
                              </View>
                           <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                             <Text style = {{fontSize:15}}>Weight : {getrate.grossWeight}</Text>
                             <Text style = {{fontSize:15}}>Volume Weight(CBM) : {getrate.volumeWeight} m3</Text>
                           </View>
                           <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
                             <Text style = {{fontSize:15}}>stuffingType : {getrate.activityType}</Text>
                             <Text style = {{fontSize:15}}>Commodity : {getrate.commodity} </Text>
                           </View>
                           <Text></Text>
                           <View style = {{paddingBottom:"15%", width:"15%", alignSelf:"center"}}>
                             <Button title = "Book" color ="#ff3800" onPress={() => this.booknow(shippingname, this.state.noOfContainers, this.state.grossWeight, this.state.volumeWeight)}/>
                           </View>
                           <Text></Text>
                         </View>
                         )
                       })}
                       </View>
       </ScrollView>
               </View>}
             </View> : 
                
               <ScrollView style = {{padding:"2%",height:"100%"}}>
                  <ImageBackground source = {require("../../assets/background.jpg")} style = {{height:"100%", width:"100%"}}>
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
                               value={this.state.originNameSet}
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
                               value={this.state.destinationNameSet}
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
                 <Modal transparent={true} visible={this.state.show2} animationType="slide">
                 <View style = {{backgroundColor:"#000000aa", flex:1}}>
                  <View style = {{backgroundColor:"#ffffff", marginTop: 60, height:"80%",padding : 10, borderRadius:10}}>
                         <Text style = {{fontSize:25, fontWeight:"600"}}> Mode </Text>
                       <Text></Text>
                       <View style = {{display:"flex", flexDirection:"column"}}>
                       <View style = {{display:"flex", flexDirection:"row"}}>
                  <RadioButton
                    value="LCL"
                    status={ this.state.shipmentMode === 'LCL' ? 'checked' : 'unchecked' }
                    //onPress={() => this.setState({shipment:'LCL', refModal:false})}
                    onPress={() => this.LCLcontainer()}
                    color ="#ff3800"
                    />
                    <Text style = {{marginTop:"1%", fontSize:18, fontWeight:"700"}}> LCL (Groupage)</Text>
                    </View>
                    <View style = {{display:"flex", flexDirection:"row"}}>
                    <RadioButton
                      value="FCL"
                      status={ this.state.shipmentMode === 'FCL' ? 'checked' : 'unchecked' }
                      onPress={() => this.setState({shipmentMode:'FCL', showContainerlist: true})}
                      color ="#ff3800"
                    />
                        <Text style = {{marginTop:"1%", fontSize:18, fontWeight:"700"}}>  FCL (Full Container Load)</Text>
                    </View>
                       </View>
                       <Text></Text>
                       {this.state.showContainerlist ? 
                         <View>
                           <Text style = {{fontSize:23, fontWeight:"600",  marginLeft:"2%"}}>Container Type*</Text>
                           <Text></Text>
                           {data && data.map((records,i) => {
                               console.log(records)
                               return (
                                 <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
                                     <Text style = {{fontSize:22, fontWeight:"600",  marginTop:10,flexDirection:"column", justifyContent:"space-between"}}>{records.container}</Text>
                                     {/* <NumericInput rounded 
                                       value={this.state.value}
                                       onChange={(value) =>this.handleContainerCount(value,records.container, records.capacity, records.maxCargoWeight, i)} 
                                       rightButtonBackgroundColor='#D0D0D0' 
                                       leftButtonBackgroundColor='#D0D0D0'
                                     /> */}
                                   <View style = {{flexDirection:"row", justifyContent:"space-between", marginTop:"3%"}}>
                                       <TouchableOpacity  onPress = {() => this.decrementCount( records, i)}>
                                          <Icons name = "minus-circle" size = {25}/>
                                       </TouchableOpacity>
                                       <Text style = {{fontSize:20}}>{records && records.count !== undefined ? records.count : "0"}</Text>
                                       <TouchableOpacity onPress ={() => this.incrementCount(records, i)}>
                                          <Icons name = "plus-circle" size = {25}/>
                                       </TouchableOpacity>
                                       {/* <View>
                                         <Button title = "-" onPress = {() => this.decrementCount( records, i)}/>
                                       </View>
                                       <Text>{records && records.count !== undefined ? records.count : "0"}</Text>
                                     <View> 
                                       <Button title = "+" onPress ={() => this.incrementCount(records, i)}/>
                                     </View> */}
                                     </View>  
                                   </View>
                               )
                           })}
                           <Pressable style = {styles.btn1} onPress={() => this.showContainerDetails()}>
                           <View style = {{ alignSelf:"center"}}>
                               <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                           </View>
                         </Pressable>
                       </View>
                       : null }
                     </View>
                     </View>
                 </Modal>
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
                       <Pressable style = {styles.btn1} onPress={() => this.showCommodityDetails()}>
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
                       <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:400,padding : 10, borderRadius:10}}>  
                         <Text style = {{fontSize:25, fontWeight:"600"}}>Gross Weight (kgs)*</Text>  
                             <View style = {{borderWidth:2, borderRadius:10, width:"95%", marginTop:"1%", alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                               <TextInput 
                                   placeholder="Gross Weight" 
                                   placeholderTextColor= "#000000" 
                                   style={{fontSize:20, fontWeight:"600", marginLeft:"5%", width:"100%"}} 
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
                           </View>
                           <View style = {{padding:"2%", borderRadius:10}}>
                           <Text style = {{fontSize:25, fontWeight:"600"}}>No. Of Pieces*</Text>  
                             <View style = {{borderWidth:2, borderRadius:10, width:"95%", alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                               <TextInput 
                                   placeholder="Pieces" 
                                   placeholderTextColor= "#000000" 
                                   style={{fontSize:20, fontWeight:"600", marginLeft:"5%",width:"100%"}} 
                                   keyboardType="email-address"
                                   onChangeText={(text) => this.setState({"totalPieces":text})} 
                                   value={this.state.totalPieces}
                                   keyboardType= 'numeric'
                               />
                           </View>
                           </View>
                           <View style = {{padding:"2%", borderRadius:10}}> 
                           <Text style = {{fontSize:25, fontWeight:"600"}}>Volume Weight (CBM)*</Text>  
                             <View style = {{borderWidth:2, borderRadius:10, width:"95%",alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                               <TextInput 
                                   placeholder="Volume Weight" 
                                   placeholderTextColor= "#000000" 
                                   style={{fontSize:20, fontWeight:"600", marginLeft:"5%", width:"100%"}} 
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
                           </View>
                           </View>
                           <TouchableOpacity style = {styles.btn1} onPress={() => this.showWeightDetail()}>
                           <View style = {{ alignSelf:"center"}}>
                               <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                           </View>
                         </TouchableOpacity>
                       </View>
                     </View>
                 </Modal>
                 <Modal transparent={true} visible={this.state.show5} animationType="slide">
                 <View style = {{backgroundColor:"#000000aa", flex:1}}>
                     <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:400,padding : 10, borderRadius:10}}>
                     <Text style = {{fontSize:20, fontWeight:"600"}}>Enter Address</Text>
                         <View style = {{borderWidth:2, borderRadius:10, width:"100%", marginTop:"1%", alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                               <TextInput 
                                   placeholder="Enter Address" 
                                   placeholderTextColor= "#000000" 
                                   style={{fontSize:20, fontWeight:"600", marginLeft:"5%", width:"60%", color:"#000000"}} 
                                   keyboardType="email-address"
                                   onChangeText={(text) => this.setState({"contactEmail":text})} 
                                   value={this.state.contactEmail}
                               />
                             <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                           </View>
                           <Text style = {{fontSize:20, fontWeight:"600"}}>Enter City</Text>
                           <View style = {{borderWidth:2, borderRadius:10, width:"100%", marginTop:"1%", alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                               <TextInput 
                                   placeholder="Enter City" 
                                   placeholderTextColor= "#000000" 
                                   style={{fontSize:20, fontWeight:"600", marginLeft:"5%", width:"60%", color:"#000000"}} 
                                   keyboardType="email-address"
                                   onChangeText={(text) => this.setState({"city":text})} 
                                   value={this.state.city}
                               />
                             <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                           </View>
                          <Text style = {{fontSize:20, fontWeight:"600"}}>Enter Zip code</Text>
                         <Text></Text>
                         <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                           <TextInput 
                               placeholder="Enter Zip code" 
                               placeholderTextColor= "#000000" 
                               style={{fontSize:20, fontWeight:"600", width:"60%", marginLeft:"5%"}} 
                               keyboardType="email-address"
                               onChangeText={(text) => this.onChangePin(text)} 
                               value={this.state.pickPinCode}
                           />
                         <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                       </View> 
                       <View style = {{backgroundColor:"#ffffff",borderRadius:10, marginTop:"1%",}}>   
                       { this.state.pinSuggestion && this.state.pinSuggestion.map((item , i) => {
                            return (
                              <View>
                                <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandlepin(item, i)}>
                                  <Text style = {{fontSize:20, color:"#000000"}}>{item}</Text>
                                </TouchableOpacity>
                                  {/* {
                                    suggestion && suggestion.map((item, i) => {
                                      console.log("piiiiiiiinnnnnnnnnnn", item)
                                     return (
                                       <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandlepin(item, i)}>
                                           <Text style = {{fontSize:20, color:"#000000"}}>{item}</Text>
                                       </TouchableOpacity>
                           
                                      )
                                    })
                                  } */}
                              </View>
                            )
                       })}
                       <Pressable style = {styles.btn1} onPress={() => this.saveOriginData(this.state.city, this.state.pinCode)}>
                           <View style = {{ alignSelf:"center"}}>
                               <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                           </View>
                         </Pressable>
                       </View>
                     </View>
                   </View>
                 </Modal>
                 <Modal transparent={true} visible={this.state.show6} animationType="slide">
                 <View style = {{backgroundColor:"#000000aa", flex:1}}>
                     <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:400,padding : 10, borderRadius:10}}>
                     <Text style = {{fontSize:20, fontWeight:"600"}}>Enter Address</Text>
                         <View style = {{borderWidth:2, borderRadius:10, width:"100%", marginTop:"1%", alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                               <TextInput 
                                   placeholder="Enter Address" 
                                   placeholderTextColor= "#000000" 
                                   style={{fontSize:20, fontWeight:"600", marginLeft:"5%", width:"60%", color:"#000000"}} 
                                   keyboardType="email-address"
                                   onChangeText={(text) => this.setState({"contactEmail2":text})} 
                                   value={this.state.contactEmail2}
                               />
                             <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                           </View>
                           <Text style = {{fontSize:20, fontWeight:"600"}}>Enter City</Text>
                           <View style = {{borderWidth:2, borderRadius:10, width:"100%", marginTop:"1%", alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                               <TextInput 
                                   placeholder="Enter City" 
                                   placeholderTextColor= "#000000" 
                                   style={{fontSize:20, fontWeight:"600", marginLeft:"5%", width:"60%", color:"#000000"}} 
                                   keyboardType="email-address"
                                   onChangeText={(text) => this.setState({"customerCity":text})} 
                                   value={this.state.customerCity}
                               />
                             <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                           </View>
                          <Text style = {{fontSize:20, fontWeight:"600"}}>Enter Zip code</Text>
                         <Text></Text>
                         <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                           <TextInput 
                               placeholder="Enter Zip code" 
                               placeholderTextColor= "#000000" 
                               style={{fontSize:20, fontWeight:"600", width:"60%", marginLeft:"5%"}} 
                               keyboardType= "numeric"
                               onChangeText={(text) => this.onChangeDestinationPin(text)} 
                               value={this.state.destPinCode}
                           />
                         <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                       </View> 
                       <View style = {{backgroundColor:"#ffffff",borderRadius:10, marginTop:"1%",}}>   
                       { 
                       this.state.pinSuggestion && this.state.pinSuggestion.map((item , i) => {
                            return (
                              <View>
                                <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandlepinD(item, i)}>
                                  <Text style = {{fontSize:20, color:"#000000"}}>{item}</Text>
                                </TouchableOpacity>
                                  {/* {
                                    suggestion && suggestion.map((item, i) => {
                                      console.log("piiiiiiiinn", item)
                                     return (
                                       <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandlepinD(item, i)}>
                                           <Text style = {{fontSize:20, color:"#000000"}}>{item}</Text>
                                       </TouchableOpacity>
                           
                                      )
                                    })
                                  } */}
                              </View>
                            )
                       })}
                       <Pressable style = {styles.btn1} onPress={() => this.saveDestinationData(this.state.dCity, this.state.PinCodeDest)}>
                           <View style = {{ alignSelf:"center"}}>
                               <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                           </View>
                         </Pressable>
                       </View>
                     </View>
                   </View>
                 </Modal>
                 <Text style = {{color : "#000000", fontSize:25, fontWeight:"bold", alignSelf:"center", marginTop:"3%"}}>Select Commodity </Text>
                 <Text></Text>
                 <Text></Text>
                 <Text></Text>
                 <Text></Text>
                 <Text></Text>
                 <TouchableOpacity style={this.state.borderColorId === 1? styles.border : styles.button} onPress={() => this.Select(1)}>
                    <View>
                    {this.state.showOrigin ? 
                     <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"60%", justifyContent:"space-between"}}>
                       <Icons name="home" size={35}/>
                       <Text style = {{fontWeight:"600", fontSize:27, marginLeft:"5%"}}>Search Origin</Text>
                     </View> : 
                     <View style = {{display:"flex", flexDirection:"row"}}>
                       <Icons name="home" size={35}/>
                       <Text style = {{fontWeight:"600", fontSize:21,  marginLeft:"5%", marginTop:"3%"}}>{this.state.originNameSet}</Text>
                     </View>
                     }
                         
                     </View>
                   </TouchableOpacity>
                   <Text></Text> 
                   <TouchableOpacity style={this.state.borderColorId === 2? styles.border : styles.button} onPress={() => this.Select(2)}>
                   {this.state.showDestination ? 
                     <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"80%", justifyContent:"space-between"}}>
                       <Icon name="location-sharp" size={35}/>
                       <Text style = {{fontWeight:"600", fontSize:27, marginLeft:"5%"}}>Search Destination</Text>
                     </View> : 
                     <View style = {{display:"flex", flexDirection:"row"}}>
                       <Icon name = "location-sharp" size={35}/>
                       <Text style = {{fontWeight:"600", fontSize:21,  marginLeft:"5%"}}>{this.state.destinationNameSet}</Text>
                     </View>
                     }
                   </TouchableOpacity>
                   <Text></Text>
                   <TouchableOpacity style={this.state.borderColorId === 3? styles.border : styles.button} onPress={() => this.Select(3)}>
            <View style = {{ alignSelf:"center", width:"100%"}}>
              <View style = {{display:"flex", flexDirection:"row", justifyContent:"flex-start"}}>
              <Icon name="calendar" size={40}/>
                 {/* <Text style = {{fontSize:22, fontWeight:"600"}}>Cargo Ready Date</Text> */}
                 <DatePicker
                    style={{width: "100%", alignSelf:"center"}}
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
                        fontSize:35,
                        borderColor:"transparent",
                        },
                        dateText:{
                            fontSize:25,
                            fontWeight:"700"
                        }
                    }}
                    onDateChange={(date) => this.onChange(date)}
                  />
                </View>
            </View>
            </TouchableOpacity>
                   <Text></Text>
                   <TouchableOpacity style={this.state.borderColorId === 4? styles.border : styles.button} onPress={() => this.Select(4)}>
                        <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"80%", justifyContent:"space-between"}}>
                            <Icons name="shipping-fast" size={40} color = "#000000"/>
                            <View>
                              <View>
                               <Text style = {{fontWeight:"600", fontSize:25}}>Shipment Mode {this.state.shipmentMode}</Text>
                            </View>
                            {
                              this.state.shipmentMode === "FCL"  ?
                              <View>
                                <Text style = {{fontWeight:"700", fontSize:23}}>No. of Container {this.state.noOfContainers}</Text>
                              </View>
                              : 
                              null
                            }
                            {/* <Text style = {{fontWeight:"700", fontSize:20}}>No. Of Container {this.state.noOfContainers}</Text> */}
                            </View>
                         </View>
                      </TouchableOpacity>
                   <Text></Text>
                   {this.state.showWeight ? 
                   <TouchableOpacity style={this.state.borderColorId === 5? styles.border : styles.button} onPress={() => this.Select(5)}>
                     <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}>
                     <Icons name="box" size={40} color = "#000000"/>
                         <Text style = {{fontWeight:"600", fontSize:27}}>Package Details</Text>
                     </View>
                   </TouchableOpacity>
                     :
                   <TouchableOpacity style={this.state.borderColorId === 5? styles.border : styles.button} onPress={() => this.Select(5)}>
                      <View style = {{flexDirection:"row", display:"flex", justifyContent:"space-between"}}>
                      <Icons name="box" size={40} color = "#000000"/>
                     <View style = {{display:"flex", marginLeft:"4%", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}>
                         <View>
                           <Text style = {{fontWeight:"700", fontSize:20}} >G/w</Text>
                           <Text style = {{fontWeight:"600", fontSize:20}}>{this.state.gross}</Text>
                         </View>
                         <View>
                           <Text style = {{fontWeight:"700", fontSize:20}}>Pieces</Text>
                           <Text style = {{fontWeight:"600", fontSize:20, alignSelf:"center"}}>{this.state.pieces}</Text>
                         </View>
                         <View>
                           <Text style = {{fontWeight:"700", fontSize:20}}>V/w</Text>
                           <Text style = {{fontWeight:"600", fontSize:20, alignSelf:"center"}}>{this.state.volume}</Text>
                         </View>
                     </View>
                     </View>
                   </TouchableOpacity>
                    }
                   <Text></Text>
                   {this.state.showCommodity ?
                   <TouchableOpacity style={this.state.borderColorId === 6? styles.border : styles.button} onPress={() => this.Select(6)}>
                     <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}>
                         <Icons name="box" size={40} color = "#000000"/>
                         <Text style = {{fontWeight:"600", fontSize:27}}>Commodity HSN</Text>
                     </View>
                   </TouchableOpacity>
                       :
                   <TouchableOpacity style={this.state.borderColorId === 6? styles.border : styles.button} onPress={() => this.Select(6)}>
                     <View style ={{flexDirection:"row", alignSelf:"center"}}>
                     <Icons name="box" size={40} color = "#000000"/>
                     <View style = {{display:"flex", flexDirection:"column", marginLeft:"10%", width:"80%", justifyContent:"space-between"}}>
                         <View style = {{display:"flex", flexDirection:"row"}}>
                         <Text style = {{fontWeight:"700", fontSize:20}}>Commodity :</Text>
                         <Text style = {{fontWeight:"600", fontSize:20}}>  {this.state.commodity}</Text>
                         </View>
                         <View style = {{display:"flex", flexDirection:"row"}}>
                         <Text style = {{fontWeight:"700", fontSize:20}}>HSN code :</Text>
                         <Text style = {{fontWeight:"600", fontSize:20}}>  {this.state.commodityHsnCode}</Text>
                         </View>
                     </View>
                     </View>
                   </TouchableOpacity>
                    }
                   <Text></Text>
                   {this.state.showAddress ? 
                   <TouchableOpacity style={this.state.borderColorId === 7? styles.border : styles.button} onPress={() => this.Select(7)}>
                     <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"50%", justifyContent:"space-between"}}>
                     <Icons name="box" size={40} color = "#000000"/>
                         <Text style = {{fontWeight:"600", fontSize:27}}>Pick Up</Text>
                     </View>
                   </TouchableOpacity>
                     :
                   <TouchableOpacity style={this.state.borderColorId === 7? styles.border : styles.button} onPress={() => this.Select(7)}>
                      <View style = {{flexDirection:"row", display:"flex", justifyContent:"space-between", width:"100%", marginLeft:"50%"}}>
                      <Icons name="box" size={40} color = "#000000"/>
                      {/* <View style = {{display:"flex", marginLeft:"4%", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}> */}
                         {/* <View>
                           <Text style = {{fontWeight:"700", fontSize:20}} >Address</Text>
                           <Text style = {{fontWeight:"600", fontSize:20}}>{this.state.address}</Text>
                         </View>
                         <View>
                           <Text style = {{fontWeight:"700", fontSize:20}}>City</Text>
                           <Text style = {{fontWeight:"600", fontSize:20, alignSelf:"center"}}>{this.state.city}</Text>
                         </View> */}
                         <View style = {{alignSelf:"center", justifyContent: "space-between", width:"40%"}}>
                           <Text style = {{fontWeight:"700", fontSize:20}}>    Pincode</Text>
                           <Text style = {{fontWeight:"600", fontSize:20}}>    {this.state.pinCode}</Text>
                         </View>
                     </View>
                     {/* </View> */}
                   </TouchableOpacity>
                    }
                   <Text></Text>
                   {this.state.showDropAddress ? 
                   <TouchableOpacity style={this.state.borderColorId === 8? styles.border : styles.button} onPress={() => this.Select(8)}>
                     <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"50%", justifyContent:"space-between"}}>
                     <Icons name="box" size={40} color = "#000000"/>
                         <Text style = {{fontWeight:"600", fontSize:27}}>Drop To</Text>
                     </View>
                   </TouchableOpacity>
                     :
                   <TouchableOpacity style={this.state.borderColorId === 7? styles.border : styles.button} onPress={() => this.Select(8)}>
                      <View style = {{flexDirection:"row", display:"flex", justifyContent:"space-between", width:"100%", marginLeft:"50%"}}>
                      <Icons name="box" size={40} color = "#000000"/>
                      {/* <View style = {{display:"flex", marginLeft:"4%", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}> */}
                         {/* <View>
                           <Text style = {{fontWeight:"700", fontSize:20}} >Address</Text>
                           <Text style = {{fontWeight:"600", fontSize:20}}>{this.state.address}</Text>
                         </View>
                         <View>
                           <Text style = {{fontWeight:"700", fontSize:20}}>City</Text>
                           <Text style = {{fontWeight:"600", fontSize:20, alignSelf:"center"}}>{this.state.city}</Text>
                         </View> */}
                         <View style = {{alignSelf:"center", justifyContent: "space-between", width:"40%"}}>
                           <Text style = {{fontWeight:"700", fontSize:20}}>   Pincode</Text>
                           <Text style = {{fontWeight:"600", fontSize:20}}>   {this.state.PinCodeDest}</Text>
                         </View>
                     </View>
                     {/* </View> */}
                   </TouchableOpacity>
                    }
                   {/* <TouchableOpacity style={this.state.borderColorId === 8? styles.border : styles.button} onPress={() => this.Select(8)}>
                     <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"50%", justifyContent:"space-between"}}>
                         <Icons name="box" size={40} color = "#000000"/>
                         <Text style = {{fontWeight:"600", fontSize:27}}>Drop To</Text>
                     </View>
                   </TouchableOpacity> */}
                   <View style = {{paddingBottom:"10%", marginTop:"4%"}}>
                   <Pressable style = {styles.btn} onPress = {() => this.Search(queryFor, tarrifMode, activityType, additionalService )}>
                      <Iconn name= "arrow-right" color="#000000" size={50}/>
                   </Pressable>
                   </View>
                   </ImageBackground>
                </ScrollView>
        }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    borderColor:"red",
    borderWidth:2,
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'transparent',
    height:80,
    borderRadius:10,
    padding:"3%",
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height:80,
    borderRadius:10,
    padding:"2%",
    borderColor:"red",
    borderWidth:2,
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

export default DangerAddressToAddress;