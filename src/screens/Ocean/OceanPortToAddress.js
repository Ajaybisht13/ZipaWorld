import React, { Component } from 'react';
import { View, Text, StyleSheet,TextInput, TouchableOpacity, Button, ScrollView, Modal, ImageBackground , FlatList, ToastAndroid,Platform,AlertIOS, ActivityIndicator,} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
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
import SelectDropdown from 'react-native-select-dropdown';
import { RadioButtons } from 'react-native-paper';
import IncrementDecrementView from 'react-native-increment-decrement-ui';

const baseUrl = "https://coapi.zipaworld.com/";


class OceanPortToAddress extends Component {

  TotalContainer = [];
  TotalContainerWeight = [];
  TotalContainerCbm = [];
 
  constructor(props) {
    super(props);
    this.state = {
      "showContainerlist" : false,
      "count" : 0,
      "isLoading" : true,
      "content" : false,
      "contents" : false,
      "switchCurrency" : true,
      "show":false,
      "show1":false,
      'show2':false,
      "show3":false,
      "show4":false,
      "show5" : false,
      "modal" : false,
      "getQueryRate":false,
      "showOrigin": true,
      "showContainers":true,
      "showDestination": true,
      "showWeight" : true,
      "showCommodity" : true,
      "showAddress" : true,
      "performaModal": false,
      "performaInvoice": false,
      "shipperModal" : false,
      "attachments": [],
      "originId": "",
      "destinationId": "",
      "chargeableWeight": "",
      //"customerBranchId": this.state.customerBranchId,
      "customerCurrency": "EUR",
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
      "pincode": "",
      "addressLine2": "",
      "city": "",
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
      "pincode": "",
      "addressLine2": "",
      "city": "",
      "state": "",
      "country": ""
    },

    "pinCode" : "",
    "pinCodes" : [],
    "pinSuggestion":[],
     "address" : "",
     "city" : "",

      "stuffingType": "",
      "custType": "Shipper",
      "otherCommodity": "",
      "commodity": "",
      "commodityHsnCode": "",
      "animalType": "",
      "dimentionType": "CM",
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
     "charge" :[],
     "chargesss":[],

     "content" : false,
      "addShipper" : false,
      "addDimention" : false,
      "addConsignee":false,
      "shipperNameRecord" : [],
      "shipperSuggest" : [],
      "shipperNames" :"",

      "shipperBranch" :[],
      "branchSuggest" :[],
      "branchName":"",

      "NoOfContainer": "",
      "totalGross": "",
      "totalVolume": "",

      "consigneeNameRecord" : [],
      "consigneesuggest" : [],
      "consigneeNames" :"",
      "consigneeBranch": [],
      "accountType":"",
      "Incoterms":[],
      "incoTerms":"",
      "incoTermsId":"",
      "checked" : "CM",
      "selectCountry":"",
      "consigneeName": "",
      "issuedBySelection":"",
      "issuedBySelectionBranch": "",
      "dimentions": [],
      "dimensions": [],
      "rateType": "OE",
      "remarks": "",
      "pricingApproval": false,
      "csBuddyApproval": false,
      "otherRemarks": "",

      "shipperName": "",
      "shipperAddressLine1": "",
      "shipperAddressLine2": "",
      "shipperCountryCode": "IN",
      "getAllCountry" : [],
      "getState" : [],
      "countrySuggest" : [],
      "shipperCountryName":"India",

      "shipperCountryId": "",
      "shipperStateName": "",
      "shipperStateCode": "10",
      "shipperStateId": "5fb25cbbf5f3d3244b1a4d26",
      "shipperCity": "",
      "shipperPincode": "",
      "shipperContact": "",
      "isStoredShipper": false,
      "customerId": "",
      "userBranchId": "600edb3d98380309ac6bd39a",
      "consigneeAddressLine1": "",
      "consigneeAddressLine2": "",
      "consigneeCountryName": "India",
      "consigneeCountryCode": "AS",
      "consigneeCountryId": "5e0095f3720281676d136a2d",
      "consigneeStateName": "",
      "consigneeStateCode": "",
      "consigneeStateId": "5fb25cbbf5f3d3244b1a4dc0",
      "consigneeCity": "",
      "consigneePincode": "",
      "consigneeContact": "",
      "isStoredConsignee": false,

      "companyName":"",
      "noOfHawb" : 0,
      "selectHBL": [],

      "saleValue": [],
      "revertData": [],
      "loggedUserCharges":[],
      "remainingCharges" : [],
      "revertLoggedData" :"",
      "customerBranchData" : [],
      "bookingGst" : [],
      "bookingGstData" :"",
      "originAdd" : "",
      "destinationAdd" :"",
      "bookingData":"",
      "comapanyBranchData":"",
      "customerDataName" :"",
      "queryCharges":[],
      "bookDataCharges":[],
      "bookData":"",
      "bookingGstTotalCharge": [],
      "proformaGetData" :"",
      "shipmentPage" :false,
      totalContainerWeight:"",
      totalContainerCbm:""
    }
  }
//customerBranchId
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
      this.getAllBranch(token);
      this.setState({customerId : authId, customerBranchId:authBranchId})
    }else {
      this.setState({customerId : guestId, customerBranchId : guestBranchId})
    }
    this.getData();
    this.companyShipper();
    this.companyConsignee();
    this.getIncoterms();
    this.getContainer();
    this.handleCountry();
    this.getBranchData();
 }


 getBooking = async(csApprovalId) => {
  const token = await AsyncStorage.getItem("userToken")
 //const customerBranchId = await AsyncStorage.getItem("customerBranchId")
  fetch(baseUrl + "api/proforma/getByBookingId", {
    method: "Post",
    headers:{
       "Content-Type" : "application/json",
       "authkey" : token
    },
    body : JSON.stringify({id: csApprovalId})
    }).then((response) => response.json())
    .then((results) => {
      console.log("get booking By id data",results);
      this.setState({
        bookingGstTotalCharge: results.result.proformaData,
        getByBookingId:results.result.bookingId,
        getById:this.state._id
      })
    }).catch((error) => console.log("error", error));
 }


 getByBooking = async(csApprovalId) => {
  const token = await AsyncStorage.getItem("userToken")
 //const customerBranchId = await AsyncStorage.getItem("customerBranchId")
  fetch(baseUrl + "api/bookings/get", {
    method: "Post",
    headers:{
       "Content-Type" : "application/json",
       "authkey" : token
    },
    body : JSON.stringify({id: csApprovalId})
    }).then((response) => response.json())
    .then((results) => {
      console.log("get booking By id data",results);
      this.setState({
        bookingGst: results.result.proformaData.otherCharges,
        bookingGstData: results.result.proformaData,
        bookingData:results.result,
        customerDataName:results.result.customerData,
        comapanyBranchData:results.result.comapanyBranchData,
        originAdd: results.result.proformaData.originAirport,
        destinationAdd: results.result.proformaData.destinationAirport,
      })
    }).catch((error) => console.log("error", error));
 } //bookingGst.chargeIgstRate

 getBranchData = async() => {
  const token = await AsyncStorage.getItem("userToken");
  const customerBranchId = await AsyncStorage.getItem("customerBranchId");
  fetch("https://coapi.zipaworld.com/api/masters/customer/Branch/get", {
    method: "Post",
    headers:{
       "Content-Type" : "application/json",
       "authkey" : token
    },
    body : JSON.stringify({id: customerBranchId})
    }).then((response) => response.json())
    .then((results) => {
      console.log("hellllllllllllllllllloooooooooooooooo",results.result.customerData);
      this.setState({
        customerBranchData: results.result.customerData
      })
    }).catch((error) => console.log("error", error));
 }

 addHBL =  async() => {
  const token = await AsyncStorage.getItem("userToken")
  fetch(baseUrl + "api/masters/hawbstock/createHawbNo", {
    method:"Post",
    headers:{
      "Content-Type" : "application/json",
      "authkey" : token
    },
    body : JSON.stringify({noOfHawb:this.state.noOfHawb, companyName: this.state.companyName})
  }).then((response) => response.json())
  .then ((results) => {
    console.log("crrreeeaaattee",results.result);
    this.setState({selectHBL: results.result})
    this.setState({
      noOfHawb: this.state.noOfHawb + 1,
    })
  })
  .catch((error) => console.log("error", error));
}

 getAllBranch = async(token) => {
  const customerId = await AsyncStorage.getItem("customerId")
  fetch(baseUrl + "api/masters/company/branch/getAll", {
      method : "Post",
      headers : {
          "Content-Type" : "application/json",
          "authkey" : token
      },
      body: JSON.stringify({customerId: customerId })
  }).then((response) => response.json())
    .then((results) => {
        console.log(results.result);
        // this.setState({
        //   shipperName :  results.result.data
        // });
    }).catch((error) => console.log("error", error));
}

getIncoterms = async() => {
const token = await AsyncStorage.getItem("userToken")
fetch(baseUrl + "api/masters/incoTerms/manager", {
    method : "Post",
    headers : {
        "Content-Type" : "application/json",
        "authkey" : token
    },
    body: JSON.stringify({search: "", activityType: "Port To Port"})
}).then((response) => response.json())
  .then((results) => {
      console.log(results.result.data);
      this.setState({
        Incoterms :  results.result.data
      });
  }).catch((error) => console.log("error", error));
}

companyShipper = async(text) => {
  const token = await AsyncStorage.getItem("userToken");
  const customerId = await AsyncStorage.getItem("customerId")
  // console.log(text)
  fetch(baseUrl + "api/masters/shipper/managerCustomer", {
      method : "Post",
      headers : {
          "Content-Type" : "application/json",
           "authkey" : token
      },
      body: JSON.stringify({customerId: customerId, search: text})
      }).then((response) => response.json())
      .then((results) => {
        console.log(results);
        this.setState({
          shipperNameRecord :  results.result.data
        });
      }).catch((error) => console.log("error", error));

   let matches = []
   if(undefined !==text && text.length > 0){
    matches = this.state.shipperNameRecord.filter(codes => {
        const regex = new RegExp(`${text}`, "gi");
        return codes.shipperName.match(regex)
      })
    }
  console.log(matches)
  this.setState({shipperSuggest: matches})
  this.setState({shipperNames:text})
}

  onSuggestShipper = async(text) => {
    this.setState({shipperSuggest: []})
    this.setState({shipperNames:text})

    const token = await AsyncStorage.getItem("userToken")
    // console.log(text)
    fetch(baseUrl + "api/masters/shipper/Branch/getBranches", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
             "authkey" : token
        },
        body: JSON.stringify({id:"61173948bd436805416ab765"})
        }).then((response) => response.json())
        .then((results) => {
          console.log("hellllllllllllllllllloooooooooooooooo",results.result);
          this.setState({
            shipperBranch :  results.result
          });
        }).catch((error) => console.log("error", error));

        }

  
  
companyConsignee = async(text) => {
    const token = await AsyncStorage.getItem("userToken")
    const customerId = await AsyncStorage.getItem("customerId")
    // console.log(text)
    fetch(baseUrl + "api/masters/consignee/managerCustomer", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
             "authkey" : token
        },
        body: JSON.stringify({customerId: customerId})
        }).then((response) => response.json())
        .then((results) => {
          console.log("cooonnnnnnnnnnnnnnnssssssssiiiiiiiiiggggg",results);
          this.setState({
            consigneeNameRecord :  results.result.data
          });
        }).catch((error) => console.log("error", error));

     let matches = []
     if(undefined !==text && text.length > 0){
      matches = this.state.consigneeNameRecord.filter(codes => {
          const regex = new RegExp(`${text}`, "gi");
          return codes.consigneeName.match(regex)
        })
      }
    console.log(matches)
    this.setState({consigneesuggest: matches})
    this.setState({consigneeNames:text})
}


handleConsignee = async(text) => {
      this.setState({consigneesuggest: []})
      this.setState({consigneeNames:text}, () => {
        console.log(text)
      })

      const token = await AsyncStorage.getItem("userToken")
      // console.log(text)
      fetch(baseUrl + "api/masters/consignee/Branch/getBranches", {
          method : "Post",
          headers : {
              "Content-Type" : "application/json",
               "authkey" : token
          },
          body: JSON.stringify({id:"606ef610e5ab230f741179bc"})
          }).then((response) => response.json())
          .then((results) => {
            console.log("consignessssssss",results.result);
            this.setState({
              consigneeBranch :  results.result
            });
          }).catch((error) => console.log("error", error));
    }  


getContainer = () => {
     fetch(baseUrl + "api/auth/masters/oceanFreight/getQueryRates", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(this.state)
    }).then((response) => response.json())
    .then ((results) => {
      console.log("query rates",results.result);
      // if(results.success == true) {
      //   this.setState({
      //     rates: results.result,
      //     charge: results.result,
      //     getrate : results.result2, 
      //     originport:results.result2.originAirport , 
      //     destinationport : results.result2.destinationAirport,
      //     modal:true
      //  });
      // }
    })
    .catch((error) => console.log("error", error));     
  }


showContainerDetails = () => {
  this.setState((previousState) => ({
    shipmentMode:"FCL", 
    show2:false, 
    container:this.state.noOfContainers,
    showContainers: !previousState.showContainers
  }))
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

componentHideAndShow = (_id) => {
  this.setState({
    showContent : !this.state.content,
    buttonId : _id
  })
 }


hblRequired = () => {
  this.setState((previousState) => ({ contents: !previousState.contents }))
  }

Shipper = () => {
this.setState((previousState) => ({ addShipper: !previousState.addShipper }))
}

onDimention = () => {
this.setState((previousState) => ({ addDimention: !previousState.addDimention }))
}

onConsignee = () => {
this.setState((previousState) => ({ addConsignee: !previousState.addConsignee }))
}

  onChangehandle = (text) => {
    fetch(baseUrl + "api/auth/masters/commodity/manager", {
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
       matches = this.state.hsnCodes && this.state.hsnCodes.filter(codes => {
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
    fetch(baseUrl + "api/auth/masters/ports/manager", {
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
       matches = this.state.record && this.state.record.filter(codes => {
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
      this.setState({originId:obj.id}, () => {
        console.log(this.state.originId)
      })
      this.setState({originNameSet:obj.name}) 
      this.setState((previousState) => ({ showOrigin: !previousState.showOrigin }))
    }
    
    savePincodeData = (pinCode, city) => {
       let obj = {}
       obj.addressLine2 = ""
       obj.pincode =  pinCode,
       obj.city = city,
       obj.state= "",
       obj.country= ""


       this.setState({
         destinationDoor : obj,
         show5:false
       }, () => {
         console.log("originDoor Data", this.state.destinationDoor)
       })
    }

    onChangehandlers = (text) => {
      fetch(baseUrl + "api/auth/masters/ports/manager", {
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
         matches = this.state.records && this.state.records.filter(codes => {
             const regex = new RegExp(`${text}`, "gi");
             return codes.name.match(regex)
          })
        }
        console.log(matches)
        this.setState({suggestionss: matches})
        this.setState({destinationNameSet:text})
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
  fetch(baseUrl + "api/auth/masters/containers/getAll", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
      },
      body: JSON.stringify({tarrifMode: "General Cargo"})
    }).then((response) => response.json())
    .then ((results) => {
      console.log(results);
      this.setState({
        data : results.result,
      });
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
    console.log("Charges",results.result);
    if(results.success == true){
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

  //  SearchData = (queryFor, tarrifMode, activityType, additionalService) => {
  //    //alert(JSON.stringify(this.state.originAirport))
  //    this.props.navigation.navigate("getQueryRates", {originAirport:JSON.stringify(this.state.originAirport.name)})
  //  }

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
        body : JSON.stringify(this.state,{
          "originDoor": {
            "addressLine2": "",
            "state": "",
            "country": "",
            "pincode" : this.state.pinCode,
            "city" : this.state.city
          },
        })
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





  

//<======================add shipper and consignee =============================================>


createShipper =  async(shipperName,shipperAddressLine1) => {
  if (this.state.shipperName.trim() === "") {
    alert("name required")
  }
  const token = await AsyncStorage.getItem("userToken");
  const customerId = await AsyncStorage.getItem("customerId")
  fetch(baseUrl + "api/masters/shipper/createShipperAndConsignee", {
    method:"Post",
    headers:{
      "Content-Type" : "application/json",
      "authkey" : token
    },
    body : JSON.stringify({
      "shipperName": shipperName ,
      "shipperAddressLine1": shipperAddressLine1,
      "shipperAddressLine2": "",
      "shipperCountryName": "American Samoa",
      "shipperCountryCode": "AS",
      "shipperCountryId": "5e0095f3720281676d136a2d",
      "shipperStateName": "Eastern",
      "shipperStateCode": "",
      "shipperStateId": "5fb25cbbf5f3d3244b1a4dc0",
      "shipperCity": "",
      "shipperPincode": "",
      "shipperContact": "",
      "isStoredShipper": false,
      "customerId": customerId ,
      "userBranchId": "600edb3d98380309ac6bd39a",
      "consigneeName": "",
      "consigneeAddressLine1": "",
      "consigneeAddressLine2": "",
      "consigneeCountryName": "American Samoa",
      "consigneeCountryCode": "AS",
      "consigneeCountryId": "5e0095f3720281676d136a2d",
      "consigneeStateName": "",
      "consigneeStateCode": "",
      "consigneeStateId": "5fb25cbbf5f3d3244b1a4dc2",
      "consigneeCity": "",
      "consigneePincode": "",
      "consigneeContact": "",
      "isStoredConsignee": false
    })
  }).then((response) => response.json())
  .then ((results) => {
    console.log("crrreeeaaattee",results);
    if(results.status ==200){
      alert(results.message)
    }else {
      alert(results.message)
    }
  })
  .catch((error) => console.log("error", error));
}


//</=============================================================================================>

//<<<================================All Country==========================>>>

getAllCountry = async(text, texts) => {
  const token = await AsyncStorage.getItem("userToken")
  // console.log(text)
  fetch(baseUrl + "api/auth/masters/country/getAll", {
      method : "Post",
      headers : {
          "Content-Type" : "application/json",
           "authkey" : token
      },
      body : JSON.stringify({start : 0})
      }).then((response) => response.json())
      .then((results) => {
        console.log("counttrryy",results.result);
        this.setState({
          getAllCountry :  results.result
        });
      }).catch((error) => console.log("error", error));

   let matches = []
   if(undefined !==text && text.length > 0){
    matches = this.state.getAllCountry && this.state.getAllCountry.filter(codes => {
        const regex = new RegExp(`${text}`, "gi");
        return codes.name.match(regex)
      })
    }
    if(undefined !==texts && texts.length > 0){
      matches = this.state.getAllCountry.filter(codes => {
          const regex = new RegExp(`${texts}`, "gi");
          return codes.name.match(regex)
        })
      }
  console.log(matches)
  this.setState({countrySuggest: matches})
  this.setState({shipperCountryName:text})
  this.setState({consigneeCountryName:texts})
}

handleCountry = async(text, texts) => {
  this.setState({countrySuggest: []})
  this.setState({consigneeCountryName:texts})
  this.setState({shipperCountryName:text}, () => {
    console.log("shipper country",text)
  })
    const token = await AsyncStorage.getItem("userToken")
    fetch("https://coapi.zipaworld.com/api/auth/masters/state/getByCountry", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
            "authkey" : token
        },
      body: JSON.stringify({countryId: "609e4c66cfbb794919e62ba9"})
    }).then((response) => response.json())
      .then((results) => {
          console.log("sssttttaaaattteeee",results.result);
          this.setState({
            getState :  results.result
          });
      }).catch((error) => console.log("error", error));
}

getCountry = async(texts) => {
  const token = await AsyncStorage.getItem("userToken")
  // console.log(text)
  fetch(baseUrl + "api/auth/masters/country/getAll", {
      method : "Post",
      headers : {
          "Content-Type" : "application/json",
           "authkey" : token
      },
      body : JSON.stringify({start : 0})
      }).then((response) => response.json())
      .then((results) => {
        console.log("counttrryy",results.result);
        this.setState({
          getAllCountry :  results.result
        });
      }).catch((error) => console.log("error", error));

   let matches = []
    if(undefined !==texts && texts.length > 0){
      matches = this.state.getAllCountry.filter(codes => {
          const regex = new RegExp(`${texts}`, "gi");
          return codes.name.match(regex)
        })
      }
  console.log(matches)
  this.setState({countrySuggest: matches})
  this.setState({consigneeCountryName:texts})
}

handleCountrys = async(texts) => {
  this.setState({countrySuggest: []})
  this.setState({consigneeCountryName:texts})
    const token = await AsyncStorage.getItem("userToken")
    fetch("https://coapi.zipaworld.com/api/auth/masters/state/getByCountry", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
            "authkey" : token
        },
      body: JSON.stringify({countryId: "609e4c66cfbb794919e62ba9"})
    }).then((response) => response.json())
      .then((results) => {
          console.log("sssttttaaaattteeee",results.result);
          this.setState({
            getState :  results.result
          });
      }).catch((error) => console.log("error", error));
}
//</================================All Country==================================>>>


LCLcontainer = () => {
  this.setState((previousState) =>({
    shipment:"LCL",
    shipmentMode :"LCL",
    showContainers: !previousState.showContainers,
    show2:false,
    showContainerlist: false
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
      } else if (id == 7) {
        this.setState({show5:true})
      }
  };
 

  // handleContainerCount = (obj,name, cap, weg ,i) => {
  //   let containerType = [...this.state.containerType]
  //   containerType[i] = {...containerType[i],name :name ,count :obj }
  //   console.log("objjjjjjjjjj",obj)
  //   this.setState({
  //     containerType,
  //   },()=>{
  //     console.log('value of container-=========>',JSON.stringify(this.state.containerType))

  //    let selectedContainers = []
  //     let totals = 0
  //     for(let i=0;i<this.state.containerType.length;i++){
  //       if(this.state.containerType[i]){
  //         totals += Number(this.state.containerType[i].count)
  //         selectedContainers.push(this.state.containerType[i])
  //       }
  //     }
  //     this.setState({
  //       noOfContainers : totals,
  //       containerType : selectedContainers
  //     },()=>{
  //       console.log('value of container-=========>',this.state.containerType)
  //       //alert(this.state.noOfContainers)
  //     })
  //   })

  //   let TotalContainerCbm = [...this.state.TotalContainerCbm]
  //   TotalContainerCbm[i] = { ...TotalContainerCbm[i], capacity:cap*obj}
  //   this.setState({
  //     TotalContainerCbm
  //   }, () => {

  //     let totals = 0
  //     console.log('value of container-=========>',JSON.stringify(this.state.containerType))
  //     for(let i=0;i<this.state.TotalContainerCbm.length;i++){
  //       if(this.state.TotalContainerCbm[i]){
  //         totals += Number(this.state.TotalContainerCbm[i].capacity)
  //       }
  //     }
  //     this.setState({
  //       totalContainerCbm : totals
  //     },()=>{
  //       // alert(this.state.totalContainerCbm)
  //     })
  //   })

   
  //   let TotalContainerWeight = [...this.state.TotalContainerWeight]
  //   TotalContainerWeight[i] = { ...TotalContainerWeight[i], containerWeight: obj * weg}
  //   this.setState({
  //     TotalContainerWeight
  //   }, () => {


  //     let totals = 0
  //     console.log('value of container-=========>',JSON.stringify(this.state.containerType))
  //     for(let i=0;i<this.state.TotalContainerWeight.length;i++){
  //       if(this.state.TotalContainerWeight[i]){
  //         totals += Number(this.state.TotalContainerWeight[i].containerWeight)
  //       }
  //     }
  //     this.setState({
  //       totalConatinerWeight : totals
  //     },()=>{
  //       // alert(this.state.totalConatinerWeight)
  //     })
  //   })
    
   
  //   // let total = this.state.containerType.reduce((prevValue, currentValue) => {
  //   //     return {
  //   //       count : prevValue.count + currentValue.count
  //   //     }
  //   // });
  //   // // console.log(total);
    
  //   // this.setState({noOfContainers:total.count}, () => {
  //   //   console.log("noOfContainers", total.count)
  //   // });

  //   // let TotalContainerCbm = [...this.state.TotalContainerCbm]
  //   // TotalContainerCbm[i] = { ...TotalContainerCbm[i], capacity:cap*obj}
  //   // this.setState({
  //   //   TotalContainerCbm
  //   // }, () => {
  //   //   console.log("pppppp", JSON.stringify(this.state.TotalContainerCbm))
  //   // })

  //   // let TotalCbmCapacity = this.state.TotalContainerCbm.reduce((prevCapacity , currentCapacity) => {
  //   //   return {
  //   //     capacity : prevCapacity.capacity + currentCapacity.capacity
  //   //   }
  //   // })
  //   // console.log("hhhhhh", TotalCbmCapacity)

  //   // this.setState({totalContainerCbm:TotalCbmCapacity.capacity})
  //   // console.log("Totalcbm ", TotalCbmCapacity.capacity )

  //   // let TotalContainerWeight = [...this.state.TotalContainerWeight]
  //   // TotalContainerWeight[i] = { ...TotalContainerWeight[i], containerWeight: obj * weg}
  //   // this.setState({
  //   //   TotalContainerWeight
  //   // }, () => {
  //   //   console.log("weeeee", JSON.stringify(this.state.TotalContainerWeight))
  //   // })

  //   // let TotalWeightContainer = this.state.TotalContainerWeight.reduce((prevWeight , currentWeight) => {
  //   //   return {
  //   //     containerWeight : prevWeight.containerWeight + currentWeight.containerWeight
  //   //   }
  //   // })
  //   // console.log("WWWWWWWWWWWWWW", TotalWeightContainer)

  //   // this.setState({totalConatinerWeight:TotalWeightContainer.containerWeight})
  //   // console.log("Totalcbm ", TotalWeightContainer.containerWeight )
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
              if (this.state.totalContainerWeight < grossWeight) {
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

booknow = async(shippingname, noOfContainers, grossWeight, volumeWeight, pieces) => {
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
      grossWeight:grossWeight,
      noOfPieces:pieces
    }, () => {
      console.log("bookSelected", JSON.stringify(this.state.noOfPieces))
      this.props.navigation.navigate("getQueryRates", {
        bookingData: this.state.bookData, 
        grossWeight:this.state.grossWeight, 
        volumeWeight:this.state.volumeWeight, 
        noOfContainers:this.state.containers, 
        bookingCharges:this.state.bookDataCharges, 
        rateId:this.state.id, 
        quoteId:this.state.quoteId, 
        remainingCharges:this.state.remainingCharges, 
        revertData:this.state.revertLoggedData, 
        totalPieces:this.state.noOfPieces,
        clearenceDate: this.state.clearenceDate
      })
    })
  }else {
    this.setState({
      //shipperModal:true,
      bookData : shippingname, 
      bookDataCharges : shippingname.charges,
      id: shippingname._id,
      containers:noOfContainers,
      volumeWeight:volumeWeight,
      grossWeight:grossWeight,
      noOfPieces:pieces
    }, () => {
      console.log("bookSelected", JSON.stringify(this.state.noOfPieces))
      this.props.navigation.navigate("Login2", {
        bookingData: this.state.bookData, 
        grossWeight:this.state.grossWeight, 
        volumeWeight:this.state.volumeWeight, 
        noOfContainers:this.state.containers, 
        bookingCharges:this.state.bookDataCharges, 
        rateId:this.state.id, 
        quoteId:this.state.quoteId, 
        remainingCharges: this.state.remainingCharges, 
        revertData:this.state.revertLoggedData, 
        totalPieces:this.state.noOfPieces, 
        originAirport: this.state.originAirport,
        destinationAirport: this.state.destinationAirport,
        containerType : this.state.containerType,
        clearenceDate: this.state.clearenceDate,
        shipmentMode: this.state.shipmentMode,
        commodity : this.state.commodity,
        commodityHsnCode:this.state.commodityHsnCode,
        chargeableWeight: this.state.chargeableWeight,
        queryFor : this.state.queryFor,
        tarrifMode : this.state.tarrifMode, 
        activityType : this.state.activityType, 
        additionalService : this.state.additionalService,
        queryCharges : this.state.queryCharges,
        density:this.state.density,
        destinationDoor:this.state.destinationDoor
      })
    })
  }
};

componentHideAndShow = () => {
  this.setState((previousState) => ({ content: !previousState.content }))
}

changeCurrency = () => {
  this.setState((previousState) => ({ switchCurrency: !previousState.switchCurrency }))
}

queryRates = () => {
  this.setState((previousState) => ({getQueryRate: !previousState.getQueryRate }))
}

viewProformaInVoice = async() => {
  const token = await AsyncStorage.getItem("userToken")
  fetch(baseUrl + "api/proforma/getByBookingId", {
    method : "Post",
    headers : {
        "Content-Type" : "application/json",
        "authkey" : token,
    },
  body: JSON.stringify({id: this.state.getByBookingId})
}).then((response) => response.json())
  .then((results) => {
      console.log("vvvvvvvvviiiiiiiii",results);
      this.setState({
        //performaInvoice:true,
        getProformaBybookingId: results.result._id
      }, () => {
        this.proformaGetApi(this.state.getProformaBybookingId),
        this.getBookingsApi(this.state.getProformaBybookingId)
      })
  }).catch((error) => console.log("error", error));
}

proformaGetApi = async(getProformaBybookingId) => {
  const token = await AsyncStorage.getItem("userToken")
  fetch(baseUrl + "api/proforma/get", {
    method : "Post",
    headers : {
        "Content-Type" : "application/json",
        "authkey" : token,
    },
  body: JSON.stringify({id: getProformaBybookingId})
}).then((response) => response.json())
  .then((results) => {
      console.log("prformi get api data",results);
      this.setState({
        performaInvoice:true,
        proformaGetData: results.result
      })
  }).catch((error) => console.log("error", error));
}

getBookingsApi = async(getProformaBybookingId) => {
  const token = await AsyncStorage.getItem("userToken")
  fetch(baseUrl + "api/proforma/get", {
    method : "Post",
    headers : {
        "Content-Type" : "application/json",
        "authkey" : token,
    },
  body: JSON.stringify({id: getProformaBybookingId})
}).then((response) => response.json())
  .then((results) => {
      console.log(" get  booking api data",results);
      // this.setState({
      //   performaInvoice:true,
      //   proformaGetData: results.result
      // })
  }).catch((error) => console.log("error", error));
}


csApprovalFunction = async(createBuySaleId) => {
  const customerId = await AsyncStorage.getItem("customerId")
  const token = await AsyncStorage.getItem("userToken")
 let obj = {
    "rateId":this.state.bookData._id,
    "buySaleId": createBuySaleId,
    "quoteId": this.state.quoteId,
    "isCopied": "",
    "copiedFrom": {},
    "isRejected": "Pending",
    "rejectedMessage": "",
    "shipmentType": "Direct",
    "customerId": customerId,
    "branchId": "600edb3d98380309ac6bd39a",
    "containerType":this.state.containerType,
    "containerDetails":this.state.containerType,
    "noOfContainers": this.state.noOfContainers,
    "noOfHouses": 0,
    "scacNumber": "",
    "shippingLineName": "YANG MING (NETHERLANDS) B.V.",
    "shippingLineId": "60435981a00ab52113676cbb",
    "svcContract": "",
    "vesselNo": "",
    "voyageNo": "",
    "placeOfReceipt": "",
    "placeOfDelivery": "",
    "asAgreed": "",
    "blPdfUrl": "",
    "blStatus": "Draft",
    "blNo": "",
    "notifyPartyName": "",
    "notifyPartyAddress": "",
    "notifyPartyCity": "",
    "notifyPartyZipCode": "",
    "notifyPartyCountryId": "",
    "notifyPartyAccountInfo": "",
    "currency": "",
    "shipperOrAgentSignature": "",
    "dateOfSignature": "2021-11-15",
    "carrierOrAgentSignature": "",
    "SCI": "",
    "otherInformation": "",
    "shipmentBookingNo": "",
    "shipmentBookingDate": "",
    "isShipmentBooked": false,
    "isNegativeShipment": false,
    "shipperId": "61173948bd436805416ab765",
    "shipperBranchId": "61173948bd436805416ab766",
    "shipperAccountNo": "",
    "consigneeId": "606ef610e5ab230f741179bc",
    "consigneeBranchId": "606ef610e5ab230f741179be",
    "consigneeAccountNo": "",
    "shipperDetails": "B 29 Third Floor\nSector 1\n Noida Uttar Pradesh India 201301",
    "consigneeDetails": "Hwang Chau Lane\nRoad No 27\n Catli Masqat Oman 249402",
    "issuedBySelectionBranch": "",
    "handlingInfo": "",
    "remarks": "",
    "bookingNo": "",
    "volumeWeight": this.state.volumeWeight,
    "noOfPieces": this.state.totalPieces,
    "accountType": this.state.accountType,
    "incoTermsId": "60a4aa6b36b67b6f679b5d2d",
    "incoTerms": this.state.incoTerms,
    "issuedBySelection": this.state.accountType,
    "natureAndQuantityOfGoods": this.state.commodity,
    "grossWeight": this.state.grossWeight,
    "kgOrLBS": "kg",
    "chargeableWeight": this.state.chargeableWeight 
  }
  fetch(baseUrl + "api/bookings/csApproval", {
    method : "Post",
    headers : {
        "Content-Type" : "application/json",
        "authkey" : token,
    },
  body: JSON.stringify(obj)
}).then((response) => response.json())
  .then(async(results) => {
      console.log("sssttttaaaattteeee",results);
      this.setState({
        csApprovalId : results.result._id
      }, () => {
        this.getByBooking(this.state.csApprovalId),
        this.getBooking(this.state.csApprovalId)
      })
  }).catch((error) => console.log("error", error));
}

submit = async(quoteId, _id, bookData,bookDataCharges, noOfContainers, grossWeight, volumeWeight, containerType, accountType, incoTerms, totalPieces, commodity, chargeableWeight, revertLoggedData, remainingCharges) => {
  console.log("daaaaaaaaaa", this.state.bookDataCharges)
  const token = await AsyncStorage.getItem("userToken")
  const getCharges = await AsyncStorage.getItem("AllCharges")
  const customerId = await AsyncStorage.getItem("customerId")
  console.log("allllll", getCharges)
  let obj = {
    quoteId : quoteId,
    //revertData : JSON.parse(getCharges),
    dimentions: [],
    dimensions: [],
    rateId:_id,
    revertData:bookData,
    remainingCharges: remainingCharges,
    "saleValue": {
      "charges": bookData.charges,
      "totalIgstAmountB": bookDataCharges.chargeIgstAmountB,
      "totalIgstAmountC": bookDataCharges.chargeIgstAmountC,
      "totalSgstAmountB": bookDataCharges.chargeSgstAmountB,
      "totalSgstAmountC": bookDataCharges.chargeSgstAmountC,
      "totalCgstAmountB": bookDataCharges.chargeCgstAmountB,
      "totalCgstAmountC": bookDataCharges.chargeCgstAmountB,
      "totalChargeTaxableB": bookDataCharges.chargeTaxableB,
      "totalChargeTaxableC": bookDataCharges.chargeTaxableC,
      "amountB": bookData.amountB,
      "amountC": bookData.amountC
  },
    otherIncentive: [],
    otherShipment: [],
    gstType: "",
    customer: {
      "customerId": customerId,
      "customerBranchId": "",
      "customerName": "",
      "customerBranchName": "",
      "pos": "",
      "gstType": "",
      "gstNo": "",
    },
    "branchId": "",
    "branchName": "",
    "branchCode": "",
    "branchPos": "",
    "reason": "",
    "buyValue": [],
    "shipperConsigneeData": {
      "shipperName": "",
      "shipperId": "",
      "shipperBranchName": "",
      "shipperBranchId": "",
      "shipperDetails": "",
      "isStoredShipper": true,
      "consigneeName": "",
      "consigneeId": "",
      "consigneeBranchName": "",
      "consigneeBranchId": "",
      "consigneeDetails": "",
      "isStoredConsignee": true
  },
    "NoOfContainer": noOfContainers,
    "totalGross": grossWeight,
    "totalVolume": volumeWeight,
    "containerType": containerType,
    "isRatesStored": true,
    "accountType": accountType,
    "incoTermsId": "",
    "incoTerms": incoTerms,
    "issuedBySelection": accountType,
    "issuedBySelectionBranch": "",
    "natureAndQuantityOfGoods": commodity,
    "confirmedRateId": _id
  }
  fetch(baseUrl + "api/invoice/buySale/create", {
    method:"Post",
    headers:{
      "Content-Type" : "application/json",
      "authkey" : token,
    },
    body : JSON.stringify(obj)
  }).then((response) => response.json())
  .then ((results) => {
    console.log("crrreeeaaattee",results);
    this.setState({
      createBuySaleId : results.result._id,
      performaModal:true
    }, () => {
      this.csApprovalFunction(this.state.createBuySaleId)
    })
  })
  .catch((error) => console.log("error", error));
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
      for(let i=0;i<this.state.pinCodes.length;i++){
        this.state.pinCodes[i].pincode.map(ele=>{
          matches.push(ele)
        })
      }
    //  matches = this.state.pinCodes && this.state.pinCodes.map(codes => {
    //      return codes.pincode.map(pincodes => {
    //       const regex = new RegExp(`${text}`, "gi");
    //         return pincodes.match(regex)
    //      });
    //   })
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
    this.setState({noOfContainers: sum, totalContainerWeight: sumWeight, totalContainerCbm: sumCbm,
      
    }, () => {
  
    })
  }
  

  render() {
    const {queryFor, tarrifMode, activityType, additionalService } = this.props.route.params
    const {data, getrate, originport, destinationport, rates, originAdd, comapanyBranchData, destinationAdd, charge, bookingGst, bookingGstData, bookingData, customerDataName, chargesss} = this.state
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
                             <Button title = "Book" color ="#ff3800" onPress={() => this.booknow(shippingname, this.state.noOfContainers, this.state.grossWeight, this.state.volumeWeight, this.state.pieces)}/>
                           </View>
                           <Text></Text>
                         </View>
                         )
                       })}
                       </View>
         </ScrollView>
                </View>}
             </View> : <ScrollView>
             <ImageBackground source = {require("../../assets/background.jpg")} style = {{height:"100%", width:"100%"}}>     
          <Text style = {{color : "#ffffff", fontSize:30, fontWeight:"bold", alignSelf:"center", marginTop:"5%"}}>Select Commodity</Text>
          <View style = {{display:"flex", flexDirection:"column", padding :"2%",justifyContent:"space-between", marginTop:"10%", height:"100%", paddingBottom:"25%"}}>
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
              <View>
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
              </View>
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
            {/* <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", paddingBottom:"10%"}}> */}
            {/* <TouchableOpacity style = {styles.btn} onPress = {() => this.props.navigation.navigate("OceanGeneral", queryFor, tarrifMode, activityType, additionalService )}>
                <Iconn name= "arrow-left" color="#000000" size={50}/>
            </TouchableOpacity> */}
            <Text></Text>
             {this.state.showAddress ? 
            <TouchableOpacity style={this.state.borderColorId === 7? styles.border : styles.button} onPress={() => this.Select(7)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"50%", justifyContent:"space-between"}}>
              <Icons name="box" size={40} color = "#000000"/>
                  <Text style = {{fontWeight:"600", fontSize:27}}>Drop to</Text>
              </View>
            </TouchableOpacity>
              :
            <TouchableOpacity style={this.state.borderColorId === 7? styles.border : styles.button} onPress={() => this.Select(7)}>
               <View style = {{flexDirection:"row", display:"flex", width:"100%", marginLeft:"50%"}}>
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
                  <View style = {{justifyContent: "space-between", width:"100%"}}>
                    <Text style = {{fontWeight:"700", fontSize:20}}>   Pincode</Text>
                    <Text style = {{fontWeight:"600", fontSize:20}}>   {this.state.pinCode}</Text>
                  </View>
              </View>
              {/* </View> */}
            </TouchableOpacity>
             }
            <Text></Text>
            <Modal transparent={true} visible={this.state.show5}>
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
                      {/* <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/> */}
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
                      {/* <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/> */}
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
                        keyboardType= 'numeric'
                    />
                  <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                </View> 
                <ScrollView>
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
                                    <Text style = {{fontSize:20, color:"#000000"}}>{item && item !== undefined ? item : ""}</Text>
                                </TouchableOpacity>
                    
                               )
                             })
                           } */}
                       </View>
                     )
                })}    
                <TouchableOpacity style = {styles.btn1} onPress={() => this.savePincodeData(this.state.pinCode, this.state.city)}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                </ScrollView>
              </View>
            </View>
          </Modal>
            <TouchableOpacity style = {styles.btn} onPress = {() => this.Search(queryFor, tarrifMode, activityType, additionalService )}>
                <Text style = {{color :"#ffffff", fontSize:20, alignSelf:"center"}}>Search</Text>
            </TouchableOpacity>
            </View><Button title = "change" onPress= {() => this.Search(queryFor, tarrifMode, activityType, additionalService)}/>

             {/* Modal=======================================================================> */}
            <Modal transparent={true} visible={this.state.show} animationType="slide">
          <View style = {{backgroundColor:"#000000aa", flex:1}}>
               <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:320,padding : 10, borderRadius:10}}>  
               <View style = {{padding:"2%", height:"100%"}}>
              <TouchableOpacity onPress={() => this.setState({show:false})}>
                    <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
                    </TouchableOpacity> 
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
                <TouchableOpacity onPress={() => this.setState({show1:false})}>
                     <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
                   </TouchableOpacity> 
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
                      onPress={() => this.setState({shipmentMode:'FCL', showContainerlist:true})}
                      color ="#ff3800"
                    />
                        <Text style = {{marginTop:"1%", fontSize:18, fontWeight:"700"}}>  FCL (Full Container Load)</Text>
                    </View>
                <Text></Text>
                {this.state.showContainerlist ?
                  <View>
                    <Text style = {{fontSize:23, fontWeight:"600",  marginLeft:"2%"}}>Container Type*</Text>
                    <Text></Text>
                    {data && data.map((records,i) => {
                        console.log("daaaaaaaaaaaaaaaaaaaaaattttttttaaaaaa",JSON.stringify(data))
                        return (
                          <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
                              <Text style = {{fontSize:22, fontWeight:"600",  marginTop:10,flexDirection:"column", justifyContent:"space-between"}}>{records.container}</Text>
                              {/* <NumericInput rounded 
                                value={this.state.containerType[i] && this.state.containerType[i].count}
                                onChange={(value) => this.handleContainerCount(value, records.container, records.capacity, records.maxCargoWeight, i)} 
                                rightButtonBackgroundColor='#D0D0D0' 
                                leftButtonBackgroundColor='#D0D0D0'
                                minValue = {0}
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
                    <TouchableOpacity style = {styles.btn1} onPress={() => this.showContainerDetails()}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </TouchableOpacity>
                </View>
                : null }
              </View>
              </View>
          </Modal>
          <Modal transparent={true} visible={this.state.show4}>
           <View style = {{backgroundColor:"#000000aa", flex:1}}>
              <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:400,padding : 10, borderRadius:10}}>
              <Text style = {{fontSize:20, fontWeight:"600"}}>Please Select the Commodity</Text>
                <View style = {{borderWidth:2, borderRadius:10}}>
                <Picker
                  selectedValue={this.state.commodity}
                  style={{height: 50, width: "100%"}}
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
                <TouchableOpacity style = {styles.btn1} onPress = {() => this.showCommodityDetails()}>
                    <View style = {{ alignSelf:"center"}}>
                        <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
                    </View>
                  </TouchableOpacity>
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
          </ImageBackground>
          </ScrollView>
            //modal closed=================================================================>
        }
  </View>
//       <ScrollView>
//       <ImageBackground source = {require("../../assets/background.jpg")} style = {{height:"100%", width:"100%"}}>
//         <Text style = {{color : "#ffffff", fontSize:30, fontWeight:"bold", alignSelf:"center", marginTop:"5%"}}>Select Commodity :</Text>
//          <View style = {{display:"flex", flexDirection:"column", padding :"2%",justifyContent:"space-between", marginTop:"10%", height:"100%", paddingBottom:"25%"}}>
//             <Text></Text>
//             <TouchableOpacity style={this.state.borderColorId === 1? styles.border : styles.button} onPress={() => this.Select(1)}>
//               <View>
//               {this.state.showOrigin ? 
//               <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"60%", justifyContent:"space-between"}}>
//                 <Icons name="home" size={35}/>
//                 <Text style = {{fontWeight:"600", fontSize:27, marginLeft:"5%"}}>Search Origin</Text>
//               </View> : 
//               <View style = {{display:"flex", flexDirection:"row"}}>
//                 <Icons name="home" size={35}/>
//                 <Text style = {{fontWeight:"600", fontSize:21,  marginLeft:"5%", marginTop:"3%"}}>{this.state.originNameSet}</Text>
//               </View>
//               }
                  
//               </View>
//             </TouchableOpacity>
//             <Text></Text>
//             <TouchableOpacity style={this.state.borderColorId === 2? styles.border : styles.button} onPress={() => this.Select(2)}>
//               <View>
//               {this.state.showDestination ? 
//               <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"80%", justifyContent:"space-between"}}>
//                 <Icon name="location-sharp" size={35}/>
//                 <Text style = {{fontWeight:"600", fontSize:27, marginLeft:"5%"}}>Search Destination</Text>
//               </View> : 
//               <View style = {{display:"flex", flexDirection:"row"}}>
//                 <Icon name = "location-sharp" size={35}/>
//                 <Text style = {{fontWeight:"600", fontSize:21,  marginLeft:"5%"}}>{this.state.destinationNameSet}</Text>
//               </View>
//               }
//               </View>
//             </TouchableOpacity>
//             <Text></Text>
//             <TouchableOpacity style={this.state.borderColorId === 3? styles.border : styles.button} onPress={() => this.Select(3)}>
//             <View style = {{ alignSelf:"center", width:"80%"}}>
//               <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
//               <Icon name="calendar" size={40}/>
//                 <View style = {{paddingBottom:10}}>
//                  {/* <Text style = {{fontSize:22, fontWeight:"600"}}>Cargo Ready Date</Text> */}
//                  <DatePicker
//                     // style={{width: "80%", alignSelf:"center"}}
//                     date={this.state.clearenceDate}
//                     mode="date"
//                     format="YYYY-MM-DD"
//                     minDate="2016-05-01"
//                     maxDate="2050-06-01"
//                     TouchableComponent= {TouchableOpacity}
//                     confirmBtnText="Confirm"
//                     cancelBtnText="Cancel"
//                     showIcon = {false}
//                     customStyles={{
//                         dateInput: {
//                         fontSize:35,
//                         borderColor:"transparent",
//                         },
//                         dateText:{
//                             fontSize:25,
//                             fontWeight:"700"
//                         }
//                     }}
//                     onDateChange={(date) => this.onChange(date)}
//                   />
//                 </View>
//                 </View>
//             </View>
//             </TouchableOpacity>
//             <Text></Text>
//             <TouchableOpacity style={this.state.borderColorId === 4? styles.border : styles.button} onPress={() => this.Select(4)}>
//               <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}>
//                   <Icons name="shipping-fast" size={40} color = "#000000"/>
//                   <Text style = {{fontWeight:"600", fontSize:27}}>Shipment Mode</Text>
//               </View>
//             </TouchableOpacity>
//             <Text></Text>
//             <TouchableOpacity style={this.state.borderColorId === 5? styles.border : styles.button} onPress={() => this.Select(5)}>
//               <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}>
//                   <Icons name="box" size={40} color = "#000000"/>
//                   <Text style = {{fontWeight:"600", fontSize:27}}>Package Details</Text>
//               </View>
//             </TouchableOpacity>
//             <Text></Text>
//             <TouchableOpacity style={this.state.borderColorId === 6? styles.border : styles.button} onPress={() => this.Select(6)}>
//               <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}>
//                   <Icons name="box" size={40} color = "#000000"/>
//                   <Text style = {{fontWeight:"600", fontSize:27}}>Commodity HSN</Text>
//               </View>
//             </TouchableOpacity>
//             {/* <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", paddingBottom:"10%"}}> */}
//             {/* <TouchableOpacity style = {styles.btn} onPress = {() => this.props.navigation.navigate("OceanGeneral", queryFor, tarrifMode, activityType, additionalService )}>
//                 <Iconn name= "arrow-left" color="#000000" size={50}/>
//             </TouchableOpacity> */}
//             <TouchableOpacity style = {styles.btn} onPress = {() => this.Search(queryFor, tarrifMode, activityType, additionalService )}>
//                 <Text style = {{color :"#ffffff", fontSize:20, alignSelf:"center"}}>Search</Text>
//             </TouchableOpacity>
//             </View>
//             {/* </View> */}
//          <ScrollView style = {{padding:"2%",height:"100%"}}>
//           <Modal transparent={true} visible={this.state.show} animationType="slide">
//           <View style = {{backgroundColor:"#000000aa", flex:1}}>
//                 <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:320,padding : 10, borderRadius:10}}>  
//                 <View style = {{padding:"2%", height:"100%"}}>
//                 <TouchableOpacity onPress={() => this.setState({show:false})}>
//                      <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
//                    </TouchableOpacity> 
//                   <Text style = {{fontSize:20, fontWeight:"600"}}>Please Select the Origin Port</Text>
//                   <Text></Text>
//                   <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                     <TextInput 
//                         placeholder="Search Origin Port" 
//                         placeholderTextColor= "#000000" 
//                         style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
//                         keyboardType="email-address"
//                         onChangeText={(text) => this.onChangehandler(text)} 
//                         value={this.state.originAirport}
//                     />
//                   <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
//                 </View> 
//                 <View style = {{backgroundColor:"#ffffff",borderRadius:10, marginTop:"1%",}}>   
//                 { this.state.suggestions && this.state.suggestions.map((suggestion , i) =>  
//                     <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandler(suggestion.name, suggestion._id , suggestion.code)}>
//                         <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.name}</Text>
//                     </TouchableOpacity>
//                 )}
//                 </View>
//               </View>
//                 </View>
//               </View>
//           </Modal>
//           <Modal transparent={true} visible={this.state.show1} animationType="slide">
//           <View style = {{backgroundColor:"#000000aa", flex:1}}>
//                 <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:320,padding : 10, borderRadius:10}}>  
//                 <View style = {{padding:"2%", height:"100%"}}>
//                 <TouchableOpacity onPress={() => this.setState({show1:false})}>
//                      <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
//                    </TouchableOpacity> 
//                   <Text style = {{fontSize:20, fontWeight:"600"}}>Select the Destination Port</Text>
//                   <Text></Text>
//                   <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                     <TextInput 
//                         placeholder="Search Destination Port" 
//                         placeholderTextColor= "#000000" 
//                         style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
//                         keyboardType="email-address"
//                         onChangeText={(text) => this.onChangehandlers(text)} 
//                         value={this.state.destinationAirport}
//                     />
//                   <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
//                 </View> 
//                 <View style = {{backgroundColor:"#ffffff",borderRadius:10, marginTop:"1%",}}>   
//                 { this.state.suggestionss && this.state.suggestionss.map((suggestion , index) =>  
//                     <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandlers(suggestion.name, suggestion._id , suggestion.code)}>
//                         <Text style = {{fontSize:20, color : "#000000"}}>{suggestion.name}</Text>
//                     </TouchableOpacity>
//                 )}
//                 </View>
//               </View>
//                 </View>
//               </View>
//           </Modal>
//           <Modal transparent={true} visible={this.state.show2} animationType="slide">
//           <View style = {{backgroundColor:"#000000aa", flex:1}}>
//           <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:480,padding : 10, borderRadius:10}}>
//                   <Text style = {{fontSize:25, fontWeight:"600"}}> Mode </Text>
//                 <Text></Text>
//                 <View style = {{display:"flex", flexDirection:"row"}}>
//                   <RadioButton
//                     animation={'bounceIn'}
//                     isSelected={false}
//                     innerColor="#000000"
//                     outerColor="#000000"
//                     onPress={() => this.LCLcontainer()}
//                   />
//                   <Text style = {{fontSize:20, fontWeight:"600", marginLeft:"5%"}}>LCL (Groupage)</Text>
//                 </View>
//                 <Text></Text>
//                 <View style = {{display:"flex", flexDirection:"row"}}>
//                   <RadioButton
//                     animation={'bounceIn'}
//                     isSelected={true}
//                     // onPress = {() => this.setState({shipmentMode:this.state.shipment})}
//                     innerColor="#000000"
//                     outerColor="#000000"
//                   />
//                   <Text style = {{fontSize:20, fontWeight:"600",  marginLeft:"5%"}}>FCL (Full Container Load)</Text>
//                 </View>
//                 <Text></Text>
//                   <View>
//                     <Text style = {{fontSize:23, fontWeight:"600",  marginLeft:"2%"}}>Container Type*</Text>
//                     <Text></Text>
//                     {data && data.map((records,i) => {
//                         console.log(records)
//                         return (
//                           <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
//                               <Text style = {{fontSize:22, fontWeight:"600",  marginTop:10,flexDirection:"column", justifyContent:"space-between"}}>{records.container}</Text>
//                               <NumericInput rounded 
//                                 value={this.state.value}
//                                 onChange={(value) =>this.handleContainerCount(value,records.container, records.capacity, records.maxCargoWeight, i)} 
//                                 rightButtonBackgroundColor='#D0D0D0' 
//                                 leftButtonBackgroundColor='#D0D0D0'
//                               />
//                             </View>
//                         )
//                     })}
//                     <TouchableOpacity style = {styles.btn1} onPress={() => this.setState({shipmentMode:this.state.shipment, show2:false})}>
//                     <View style = {{ alignSelf:"center"}}>
//                         <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//               </View>
//           </Modal>
//           <Modal transparent={true} visible={this.state.show4}>
//            <View style = {{backgroundColor:"#000000aa", flex:1}}>
//               <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:400,padding : 10, borderRadius:10}}>
//               <Text style = {{fontSize:20, fontWeight:"600"}}>Please Select the Commodity</Text>
//                 <View>
//                 <Picker
//                   selectedValue={this.state.commodity}
//                   style={{height: 60, width: "100%"}}
//                   onValueChange={(itemValue, itemIndex) =>this.setState({commodity: itemValue})}>
//                   <Picker.Item label="Garments" value="Garments" />
//                   <Picker.Item label="Pharmaceutical" value="Pharmaceutical" />
//                   <Picker.Item label="Engineering Goods" value="Engineering Goods" />
//                   <Picker.Item label="Auto Parts" value="Auto Parts" />
//                   <Picker.Item label="Machinery" value="Machinery" />
//                   <Picker.Item label="Handicrafts" value="Handicrafts" />
//                   <Picker.Item label="Leather goods" value="Leather goods" />
//                   <Picker.Item label="Carpets" value="Carpets" />
//                   <Picker.Item label="Fabric" value="Fabric" />
//                 </Picker>
//                 </View>  
//                <Text style = {{fontSize:20, fontWeight:"600"}}>Please Select the HSN code</Text>
//                   <Text></Text>
//                   <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                     <TextInput 
//                         placeholder="Search HSN code" 
//                         placeholderTextColor= "#000000" 
//                         style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
//                         keyboardType="email-address"
//                         onChangeText={(text) => this.onChangehandle(text)} 
//                         value={this.state.commodityHsnCode}
//                     />
//                   <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
//                 </View> 
//                 <View style = {{backgroundColor:"#ffffff",borderRadius:10, marginTop:"1%",}}>   
//                 { this.state.suggest && this.state.suggest.map((suggestion , index) =>  
//                     <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandle(suggestion.hsnCode)}>
//                         <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.hsnCode}</Text>
//                     </TouchableOpacity>
//                 )}
//                 <TouchableOpacity style = {styles.btn1} onPress={() => this.setState({show4:false})}>
//                     <View style = {{ alignSelf:"center"}}>
//                         <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//             </View>
//           </Modal>
//           <Modal transparent={true} visible={this.state.show3} animationType="slide">
//           <View style = {{backgroundColor:"#000000aa", flex:1}}>
//                 <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:370,padding : 10, borderRadius:10}}>  
//                   <Text style = {{fontSize:25, fontWeight:"600"}}>Gross Weight (kgs)*</Text>  
//                       <View style = {{borderWidth:2, borderRadius:10, width:"95%", marginTop:"1%", alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                         <TextInput 
//                             placeholder="Gross Weight" 
//                             placeholderTextColor= "#000000" 
//                             style={{fontSize:20, fontWeight:"600", marginLeft:"5%", width:"100%"}} 
//                             keyboardType="email-address"
//                             onChangeText={(text) => this.setState({"grossWeight":text}, () => {
//                                this.calculateChargeable()
//                                if (this.state.shipment === "FCL") {
//                                 this.weightcapacity()

//                             }
//                             })} 
//                             value={this.state.grossWeight}
//                             keyboardType= 'numeric'
//                         />
//                     </View>
//                     <View style = {{padding:"2%", borderRadius:10}}>
//                     <Text style = {{fontSize:25, fontWeight:"600"}}>No. Of Pieces*</Text>  
//                       <View style = {{borderWidth:2, borderRadius:10, width:"95%", alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                         <TextInput 
//                             placeholder="Pieces" 
//                             placeholderTextColor= "#000000" 
//                             style={{fontSize:20, fontWeight:"600", marginLeft:"5%",width:"100%"}} 
//                             keyboardType="email-address"
//                             onChangeText={(text) => this.setState({"totalPieces":text})} 
//                             value={this.state.totalPieces}
//                             keyboardType= 'numeric'
//                         />
//                     </View>
//                     </View>
//                     <View style = {{padding:"2%", borderRadius:10}}> 
//                     <Text style = {{fontSize:25, fontWeight:"600"}}>Volume Weight (CBM)*</Text>  
//                       <View style = {{borderWidth:2, borderRadius:10, width:"95%",alignSelf:"center", backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                         <TextInput 
//                             placeholder="Volume Weight" 
//                             placeholderTextColor= "#000000" 
//                             style={{fontSize:20, fontWeight:"600", marginLeft:"5%", width:"100%"}} 
//                             keyboardType="email-address"
//                             onChangeText={(text) => this.setState({"volumeWeight":text}, () => {
//                               this.calculateChargeable();
//                               if (this.state.shipment === "FCL") {
//                                 this.volumecapacity()
//                             }
//                             })} 
//                             value={this.state.volumeWeight}
//                             keyboardType= 'numeric'
//                         />
//                     </View>
//                     </View>
//                     <TouchableOpacity style = {styles.btn1} onPress={() => this.setState({show3:false})}>
//                     <View style = {{ alignSelf:"center"}}>
//                         <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
//                     </View>
//                   </TouchableOpacity>
//                 </View>
//               </View>
//           </Modal>
//          <Modal transparent={true} visible={this.state.modal} animationType="slide">
//           <View style = {{backgroundColor:"#000000aa", flex:1}}>
//           <View style = {{backgroundColor:"#ffffff", height:"100%",padding :2, borderRadius:10}}> 
//             <View style={{backgroundColor:"#ffffff" }}> 
//               <View>
//                     <TouchableOpacity onPress={() => this.setState({modal:false})}>
//                      <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
//                    </TouchableOpacity>
//                       <ScrollView style={{ backgroundColor:"#ffffff", borderRadius:10, height:"100%",borderColor:"#ffffff"}}>
//                           <View style = {{display:"flex", flexDirection:"column", borderBottomWidth:1, borderLeftWidth:0.3, borderRightWidth:0.3, borderTopWidth:0.3}}>
//                               <Text style = {{fontSize:20, fontWeight:"600"}}>Shipment Details</Text>
//                               <Text></Text>
//                               <Text style = {{fontSize:15}}>Origin   :  {originport.name}</Text>
//                               <Text style = {{fontSize:15}}>Destination   : {destinationport.name}</Text>
//                               <Text style = {{fontSize:15}}>Total Pcs   : {getrate.totalPieces}</Text>
//                               <Text style = {{fontSize:15}}>Volume Wt   : {getrate.volumeWeight}</Text>
//                               <Text style = {{fontSize:15}}>Gross Wt   : {getrate.grossWeight}</Text>
//                               <Text style = {{fontSize:15}}>chargeable Wt   : {getrate.chargeableWeight}</Text>
//                               <Text style = {{fontSize:15}}>Activity Type   : {getrate.activityType}</Text>
//                               <Text style = {{fontSize:15}}>Tarrif Mode   : {getrate.tarrifMode}</Text>
//                               <Text style = {{fontSize:15}}>Commodity    : {getrate.commodity}</Text>
//                               <Text style = {{fontSize:15}}>Shipment Mode   : {getrate.shipmentMode}</Text>
//                               <Text style = {{fontSize:15}}>No of Container   : {getrate.noOfContainers}</Text>
//                               <Text style = {{fontSize:15}}>Handover Date   :  {getrate.clearenceDate}</Text>
//                             </View>
//                             <Text></Text>
//                               {Array.isArray(this.state.loggedUserCharges) && this.state.loggedUserCharges.map((shippingname) => {
//                                 return (
//                                   <View>
//                                   <View style= {{alignItems:"center"}}>
//                                     <Text style = {{fontSize:20, fontWeight:"600"}}>{shippingname.shippingLineName}</Text>  
//                                   </View>
//                                   <Text></Text>
//                                 <View style = {{display:"flex",width:"80%" ,flexDirection:"row", justifyContent:"space-between"}}>
//                                 <TouchableOpacity onPress = {() => this.componentHideAndShow()} style ={{marginLeft:"10%"}}>
//                                    <Text style = {{fontSize:18, fontWeight:"bold"}}>Freight Summary</Text>
//                                 </TouchableOpacity>
//                                 <TouchableOpacity onPress = {() => this.changeCurrency()}>
//                                    <Text style = {{fontSize:18, fontWeight:"bold"}}>Switch to own</Text>
//                                    <Text style = {{fontSize:18, fontWeight:"bold"}}>Currency</Text>
//                                 </TouchableOpacity>
//                                 </View>
//                                 <Text></Text>
//                                 {
//                                   this.state.content ? 
//                                     <View>  
//                                      <View style = {{display:"flex" , flexDirection:"row", justifyContent:"space-between", padding :"2%"}}>
//                                       <View style = {{width:30}}>
//                                          <Text style = {{fontWeight:"600"}}>Charges</Text>
//                                          <Text style = {{fontWeight:"600"}}>name</Text>
//                                       </View>
//                                       <View style = {{width:25}}>
//                                         <Text style = {{fontWeight:"600"}}>No of</Text>
//                                         <Text style = {{fontWeight:"600"}}>containers</Text>
//                                       </View>
//                                       <View style = {{width:25}}>
//                                       <Text style = {{fontWeight:"600"}}>Rate</Text>
//                                       </View>
//                                       <View style = {{width:30}}>
//                                         <Text style = {{fontWeight:"600"}}>Total</Text>
//                                         <Text style = {{fontWeight:"600"}}>amount</Text>
//                                       </View>
//                                     </View>
//                                     <Text></Text>
//                                     {chargesss && chargesss.map((totalcharge) => {
//                                       //console.log("chargessssssss", totalcharge)
//                                       return (
//                                         <View>
//                                         {
//                                           totalcharge.charges && totalcharge.charges.map((info) => {
//                                           //console.log("inffffffooo",info)
//                                              return (
//                                               <View style = {{flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
//                                               <View style = {{width:30}}>
//                                                  <Text>{info.chargeName}</Text>
//                                               </View>
//                                               <View style = {{width:25}}>
//                                                 <Text>{info.chargeQty}</Text>
//                                               </View>
//                                               <View style = {{width:25}}>
//                                                 <Text>{info.currency}</Text>
//                                                 <Text>{info.chargeRate}</Text>
//                                               </View>
//                                               <View>
//                                                 {
//                                                   this.state.switchCurrency ?
//                                                      <View style = {{width:30}}>
//                                                         <Text>{parseFloat(info.taxableB).toFixed(2)}</Text>
//                                                      </View>
//                                                   :
//                                                     <View style = {{width:30}}>
//                                                         <Text>{parseFloat(info.taxableC).toFixed(2)}</Text>
//                                                     </View>
//                                                 }
//                                               </View>
//                                             </View>
//                                              )
//                                           })
//                                         }
//                                         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                                            <Text style = {{fontSize:15, fontWeight:"bold"}}>TOTAL AMOUNT</Text>
//                                            {
//                                              this.state.switchCurrency ?
//                                               <View>
//                                                  <Text style = {{ fontSize:15,fontWeight:"bold"}}>{parseFloat(totalcharge.amountB).toFixed(2)}</Text>
//                                               </View>
//                                               :
//                                               <View>
//                                                  <Text style = {{ fontSize:15,fontWeight:"bold"}}>{parseFloat(totalcharge.amountC).toFixed(2)}</Text>
//                                               </View>
//                                            }
                                           
//                                         </View>
//                                         </View>
//                                       )
                                          
//                                      })}</View> : null }
//                                 <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
//                                   <Text style = {{fontSize:15}}>Origin : {originport.name} </Text>
//                                   <Text style = {{fontSize:15}}>Destination : {destinationport.name} </Text>
//                                 </View> 
//                                 <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
//                                       <View>
//                                         <Text style = {{fontSize:15}}>Transit Time * : {shippingname.transitTime}  </Text>
//                                       </View>
//                                     <Text style = {{fontSize:15}}>Handover Date : {getrate.clearenceDate}</Text>
//                                     </View>
//                                        <View> 
                                        
//                                               <View style= {{alignItems:"center"}}>
//                                                  {
//                                                   this.state.switchCurrency ? 
//                                                   <View>
//                                                      <Text style = {{fontSize:25, fontWeight:"700"}}>{shippingname.baseCurrency}  {parseFloat(shippingname.amountB).toFixed(2)}</Text>
//                                                   </View>
//                                                   : <View>
//                                                        <Text style = {{fontSize:25, fontWeight:"700"}}>{shippingname.customerCurrency}  {parseFloat(shippingname.amountC).toFixed(2)}</Text>
//                                                   </View>
//                                                  }
//                                               </View> 
//                                        </View>
//                                     <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
//                                       <Text style = {{fontSize:15}}>Weight : {getrate.grossWeight}</Text>
//                                       <Text style = {{fontSize:15}}>Volume Weight(CBM) : {getrate.volumeWeight} m3</Text>
//                                     </View>
//                                     <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", padding:"2%"}}>
//                                       <Text style = {{fontSize:15}}>stuffingType : {getrate.activityType}</Text>
//                                       <Text style = {{fontSize:15}}>Commodity : {getrate.commodity} </Text>
//                                     </View>
//                                     <Text></Text>
//                                     <View style = {{paddingBottom:"15%"}}>
//                                       <Button title = "Book" onPress={() => this.booknow(shippingname)}/>
//                                     </View>
//                                     <Text></Text>
//                                   </View>
//                                   )
//                                 })}
//                                   </ScrollView>
//                                 </View>  
//                               </View>
//                           </View>
//                     </View>
//                </Modal>
//        {/* Mawbview   ========================================================      */}
//        <Modal transparent={true} visible={this.state.performaModal} animationType="slide">
//           <View style = {{backgroundColor:"#000000aa", flex:1}}>
//           <View style = {{backgroundColor:"#ffffff", height:"100%",padding : 10, borderRadius:10}}> 
//             <View style={{backgroundColor:"#ffffff" }}>
//               <View style = {{padding:"2%"}}>
//               <TouchableOpacity onPress={() => this.setState({performaModal:false})}>
//                      <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
//                    </TouchableOpacity>
      //           <ScrollView style={{ backgroundColor:"#ffffff", borderRadius:10, height:"100%", padding:"2%"}}>
      //           <Text style = {{fontSize:22}}> Booking Confirmation </Text>
      //   <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
      //   <View>
      //     <Text>Name</Text>
      //     <Text>Address</Text>
      //     <Text>Country</Text>
      //     <Text>Pan number</Text>
      //     <Text>Client number</Text>
      //     <Text>GST number</Text>
      //     <Text>Booking number</Text>
      //     <Text>Date</Text>
      //     <Text>Payment Terms</Text>
      //     <Text>Our GST number</Text>
      //   </View>
      //   <View>
      //     <Text>Shashank Test Co Pvt Ltd.</Text>
      //     <Text>B 29 Third Floor</Text>
      //     <Text></Text>
      //     <Text>AATCA6549E</Text>
      //     <Text>AAASHA00087</Text>
      //     <Text>09AATCA6549E1Z7</Text>
      //     <Text>{bookingData.bookingNo}</Text>
      //     <Text>{bookingData.dateOfSignature}</Text>
      //     <Text>0 Days</Text>
      //     <Text>09AATCA6549E1Z7</Text>
      //   </View>
      //   </View>
      //   <Text style = {{fontSize:22}}> Shipment Details </Text>
      //   <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
      //   <View>
      //     <View>
      //       <Text>No.of Containers</Text>
      //       <Text>Gross Weight (KGS)</Text>
      //       <Text>No. of pakcages</Text>
      //       <Text>commodity desc</Text>
      //       <Text>Quotation Number</Text>
      //       <Text>INCO terms</Text>
      //       <Text>Terms</Text>
      //     </View>
      //   </View>
      //   <View>
      //     <Text>{bookingData.noOfContainers}</Text>
      //     <Text>{bookingGstData.grossWeight}</Text>
      //     <Text>{bookingGstData.totalPieces}</Text>
      //     <Text>{getrate.commodity}</Text>
      //     <Text>{bookingGstData.jobNo}</Text>
      //     <Text>{bookingData.incoTerms}</Text>
      //     <Text>{bookingData.accountType}</Text>
      //   </View>
      //   </View>
      //   <Text style = {{fontSize:22}}> Shipper/Consignee Details </Text>
      //   <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
      //   <View>
      //   <Text>Shipper</Text>
      //   <Text>Consignee</Text>
      //   <Text>Origin</Text>
      //   <Text>Destination</Text>
      //   </View>
      //   <View>
      //     <Text>{bookingGstData.shipperName}</Text>
      //     <Text>{bookingGstData.consigneeName}</Text>
      //     <Text>{originAdd.name}</Text>
      //     <Text>{destinationAdd.name}</Text>
      //   </View>
      //   </View>
      //   <Text style = {{fontSize:22}}> INTENDED TRANSPORT PLAN DETAILS </Text>
      //   <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"3%"}}>
      //     <Text>From</Text>
      //     <Text>To</Text>
      //     <Text>Vessel no</Text>
      //     <Text>Voyage no</Text>
      //     <Text>ETD</Text>
      //     <Text>ETA</Text>
      //   </View>
      //   <Text style = {{fontSize:22}}> Charges </Text>
      //   <View style = {{paddingBottom:"5%"}}>
      //     <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"space-between"}}>
      //        <Text>Code</Text>
      //        <Text>Description</Text>
      //        <Text>GST</Text>
      //        <View>
      //         <Text>Total Amount</Text>
      //         {Array.isArray(this.state.bookingGstTotalCharge) && this.state.bookingGstTotalCharge.map((amount) => {
      //           return(
      //             <View>
      //               <Text>{bookingGstData.baseCurrency} {parseFloat(amount.taxableB).toFixed(2)}</Text>
      //             </View>
      //           )
      //         })}
      //        </View>
      //     </View>
      //     {bookingGst && bookingGst.map((bookingCode) => {
      //         console.log("bbboookkkiiinnnggg", bookingCode.chargeHsnCode);
      //         return (
      //           <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"space-between"}}>
      //           <Text>{bookingCode.chargeHsnCode}</Text>
      //           <View style = {{width:30}}>
      //           <Text>{bookingCode.chargeName}-{bookingCode.chargeQty} x {bookingCode.altName}</Text>
      //           </View>
      //           <Text>{bookingCode.chargeIgstRate} %</Text>
      //           </View>
      //         )
      //     })} 
      //     <Text></Text>
      //     <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-start"}}>
      //        <Text>Total excl. GST</Text>
      //        <Text>{bookingGstData.currency} {bookingGstData.taxableTotalAmountB}</Text>
      //     </View>
      //     <Text></Text>
      //     <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-start"}}>
      //        <Text>GST Amount</Text>
      //        <Text>{bookingGstData.currency} {parseFloat(bookingGstData.igstTotalAmountB).toFixed(2)} %</Text>
      //     </View>
      //     <Text></Text>
      //     <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-start"}}>
      //        <Text>Total Amount Due</Text>
      //        <Text style = {{marginLeft:"2%"}}>{bookingGstData.baseCurrency} {parseFloat(bookingGstData.totalAmountB).toFixed(2)}</Text>
      //     </View>
      //     <View style = {{paddingBottom:"15%"}}>
      //     <Button title = "proformaInvoice" onPress = {() => this.viewProformaInVoice()}/>
      //     </View>
      //   </View>
      // </ScrollView>
//     </View>  
//     </View>
//                   </View>
//                 </View>
//                </Modal>
//        {/* <============================================================================> */}

//        {/* Perofroma invoice */}

//        <Modal transparent={true} visible={this.state.performaInvoice} animationType="slide">
//           <View style = {{backgroundColor:"#000000aa", flex:1}}>
//           <View style = {{backgroundColor:"#ffffff", height:"100%",padding : 10, borderRadius:10}}> 
//             <View style={{backgroundColor:"#ffffff" }}>
//               <View style = {{padding:"2%"}}>
//               <TouchableOpacity onPress={() => this.setState({performaInvoice:false})}>
//                      <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
//                    </TouchableOpacity>
//                 <ScrollView style={{ backgroundColor:"#ffffff", borderRadius:10, height:"100%", padding:"2%"}}>
//                 <Text style = {{fontSize:22}}> Proforma Invoice </Text>
//         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//         <View>
//           <Text>INVOICE TO</Text>
//           <Text>Proforma Invoice number</Text>
//           <Text>Name</Text>
//           <Text>Address</Text>
//           <Text>Country</Text>
//           <Text>Pan number</Text>
//           <Text>Client number</Text>
//           <Text>GST number</Text>
//           <Text>Booking number</Text>
//           <Text>Date</Text>
//           <Text>Payment Terms</Text>
//           <Text>Our GST number</Text>
//         </View>
//         <View>
//           <Text></Text>
//           <Text></Text>
//           <Text>Shashank Test Co Pvt Ltd.</Text>
//           <Text>B 29 Third Floor</Text>
//           <Text></Text>
//           <Text>AATCA6549E</Text>
//           <Text>AAASHA00087</Text>
//           <Text>09AATCA6549E1Z7</Text>
//           <Text>{bookingData.bookingNo}</Text>
//           <Text>{bookingData.dateOfSignature}</Text>
//           <Text>0 Days</Text>
//           <Text>09AATCA6549E1Z7</Text>
//         </View>
//         </View>
//         <Text style = {{fontSize:22}}> Shipment Details </Text>
//         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
//         <View>
//           <View>
//             <Text>No.of Containers</Text>
//             <Text>Gross Weight (KGS)</Text>
//             <Text>No. of pakcages</Text>
//             <Text>commodity desc</Text>
//             <Text>Quotation Number</Text>
//             <Text>INCO terms</Text>
//             <Text>Terms</Text>
//             <Text>BL Number</Text>
//           </View>
//         </View>
//         <View>
//           <Text>{bookingData.noOfContainers}</Text>
//           <Text>{bookingGstData.grossWeight}</Text>
//           <Text>{bookingGstData.totalPieces}</Text>
//           <Text>{getrate.commodity}</Text>
//           <Text>{bookingGstData.jobNo}</Text>
//           <Text>{bookingData.incoTerms}</Text>
//           <Text>{bookingData.accountType}</Text>
//         </View>
//         </View>
//         <Text style = {{fontSize:22}}> Shipper/Consignee Details </Text>
//         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
//         <View>
//         <Text>Shipper</Text>
//         <Text>Consignee</Text>
//         <Text>Booking No.</Text>
//         <Text>Origin</Text>
//         <Text>ETD</Text>
//         <Text>Destination</Text>
//         <Text>ETD</Text>
//         </View>
//         <View>
//           <Text>{bookingGstData.shipperName}</Text>
//           <Text>{bookingGstData.consigneeName}</Text>
//           <Text>{originAdd.name}</Text>
//           <Text>{destinationAdd.name}</Text>
//         </View>
//         </View>
//         <Text style = {{fontSize:22}}> INTENDED TRANSPORT PLAN DETAILS </Text>
//         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"3%"}}>
//           <Text>From</Text>
//           <Text>To</Text>
//           <Text>Vessel no</Text>
//           <Text>Voyage no</Text>
//           <Text>ETD</Text>
//           <Text>ETA</Text>
//         </View>
//         <Text style = {{fontSize:22}}> Charges </Text>
//         <View style = {{paddingBottom:"5%"}}>
//           <View style ={{display:"flex" ,flexDirection:"column", justifyContent:"space-between"}}>
//              <Text>Code</Text>
//              <Text>Description</Text>
//              <Text>GST</Text>
//              <View>
//               <Text>Total Amount</Text>
//               {this.state.bookingGstTotalCharge && this.state.bookingGstTotalCharge.map((amount) => {
//                 return(
//                   <View>
//                     <Text>{bookingGstData.baseCurrency} {parseFloat(amount.taxableB).toFixed(2)}</Text>
//                   </View>
//                 )
//               })}
//              </View>
//           </View>
//           {bookingGst && bookingGst.map((bookingCode) => {
//               console.log("bbboookkkiiinnnggg", bookingCode.chargeHsnCode);
//               return (
//                 <View style ={{display:"flex" ,flexDirection:"column", justifyContent:"space-between"}}>
//                 <Text>{bookingCode.chargeHsnCode}</Text>
//                 <Text>{bookingCode.chargeName}-{bookingCode.chargeQty} x {bookingCode.altName}</Text>
//                 <Text>{bookingCode.chargeIgstRate} %</Text>
//                 </View>
//               )
//           })} 
//           <Text></Text>
//           <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-start"}}>
//              <Text>Total excl. GST</Text>
//              <Text>{bookingGstData.currency} {bookingGstData.taxableTotalAmountB}</Text>
//           </View>
//           <Text></Text>
//           <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-start"}}>
//              <Text>GST Amount</Text>
//              <Text>{bookingGstData.currency} {parseFloat(bookingGstData.igstTotalAmountB).toFixed(2)} %</Text>
//           </View>
//           <Text></Text>
//           <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-start"}}>
//              <Text>Total Amount Due</Text>
//              <Text style = {{marginLeft:"2%"}}>{bookingGstData.baseCurrency} {parseFloat(bookingGstData.totalAmountB).toFixed(2)}</Text>
//           </View>
//         </View>
//                  </ScrollView>
//                   </View>  
//                     </View>
//                   </View>
//                 </View>
//                </Modal>
//        {/* <=======================================/> */}
//       {/* ==================================================  Shhhiiippppeeeeeerrrrrrrrrr modal  ================================================================        */}
//                <Modal transparent={true} visible={this.state.shipperModal} animationType="slide">
//                   <View style = {{backgroundColor:"#000000aa", flex:1}}>
//                   <View style = {{backgroundColor:"#ffffff",height:"100%",padding : 10, borderRadius:10}}>
//                   <ScrollView style = {{padding:"2%", backgroundColor:"#ffffff", height:"100%"}}>
//         <View style = {{display:"flex", marginTop:"10%"}}>  
//         <TouchableOpacity onPress={() => this.setState({shipperModal:false})}>
//                      <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
//                    </TouchableOpacity>
//         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//         <Text style = {{fontSize:20, fontWeight:"700"}}>Shipper Details</Text>
//           <TouchableOpacity onPress= {() => this.Shipper()}>
//               <Text>New Shipper</Text>
//           </TouchableOpacity>
//         </View>
//           {
//              this.state.addShipper ? 
//              <View>
//                 <View style = {{marginTop:"3%"}}>
//                     <Text style= {{fontSize:15}}>Enter Shipper Name</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                       onChangeText={(text) => this.setState({'shipperName':text})}
//                       value={this.state.shipperName}
//                     />
//                 </View>
//                 {/* {!!this.state.shipperError && (
//                 <Text style={{ color: "red" }}>{this.state.shipperError}</Text>
//               )}  */}
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Enter Address</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                        onChangeText={(text) => this.setState({'shipperAddressLine1':text})}
//                        value={this.state.shipperAddressLine1}
//                     />
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Select Country</Text>
//                     <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
//                 <TextInput 
//                   placeholder="Select Country" 
//                   placeholderTextColor= "#000000" 
//                   style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
//                   keyboardType="email-address"
//                   onChangeText={(text) => this.getAllCountry(text)} 
//                   value={this.state.shipperCountryName}
//                   />
//               <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
//             </View> 
//             { this.state.countrySuggest && this.state.countrySuggest.map((suggestion , index) =>  
//                       <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleCountry(suggestion.name)}>
//                           <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.name}</Text>
//                       </TouchableOpacity>
//                   )}
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>State</Text>
//                      <SelectDropdown
//                       data={this.state.getState}
//                       onSelect={(selectedItem, index) => {
//                         this.setState({shipperStateName: selectedItem.name}, () => {
//                           console.log("stateeeeName Shipper", selectedItem.name )
//                         })
//                         this.setState({shipperStateId: selectedItem._id}, ()=> {
//                               console.log("iiddddd" , selectedItem._id)
//                         })
//                         console.log(selectedItem, index)
//                       }}
//                       buttonTextAfterSelection={(selectedItem, index) => {
//                         return selectedItem.name
//                       }}
//                       rowTextForSelection={(item, index) => {
//                         return item.name
//                       }}
//                       defaultButtonText = "Select State"
//                       buttonStyle ={{width:"100%", borderRadius:10, backgroundColor:"transparent", borderColor:"#000000", borderWidth:2,}}
//                     />
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Enter City Name</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                      onChangeText={(text) => this.setState({'shipperCity':text})}
//                      value={this.state.shipperCity}
//                     />
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Enter Pin Code</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                      onChangeText={(text) => this.setState({'shipperPincode':text})}
//                      value={this.state.shipperPincode}
//                     />
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Enter Shipper Mobile Number</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                      onChangeText={(text) => this.setState({'shipperContact':text})}
//                      value={this.state.shipperContact}
//                     />
//                 </View>
//              </View>
//             : 

//             <View>
//             <Text style= {{fontSize:15}}>Shipper Name</Text>
//              <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                  <TextInput 
//                    placeholder="Select Shipper" 
//                    placeholderTextColor= "#000000" 
//                    style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
//                    keyboardType="email-address"
//                    onChangeText={(text) => this.companyShipper(text)} 
//                    value={this.state.shipperNames}
//                    />
//                <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
//              </View> 
//              { this.state.shipperSuggest && this.state.shipperSuggest.map((suggestion , index) =>  
//                        <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestShipper(suggestion.shipperName)}>
//                            <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.shipperName}</Text>
//                        </TouchableOpacity>
//                    )}
//            <View style = {{marginTop:"3%"}}>
//              <Text style= {{fontSize:15}}>Shipper Branch</Text>
//              <View>
//               <SelectDropdown
//                   data={this.state.shipperBranch}
//                   onSelect={(selectedItem, index) => {
//                     console.log(selectedItem, index)
//                   }}
//                   buttonTextAfterSelection={(selectedItem, index) => {
//                     return selectedItem.branchName
//                   }}
//                   rowTextForSelection={(item, index) => {
//                     return item.branchName
//                   }}
//                   defaultButtonText = "Select Branch"
//                   buttonStyle ={{width:"100%", borderRadius:10, backgroundColor:"transparent", borderColor:"#000000", borderWidth:2,}}
//                 />
//              </View> 
//              </View>
//                <View style = {{marginTop:"3%"}}>
//                  <Text style= {{fontSize:15}}>Shipper Address</Text>
//                  <FlatList
//                     data = {this.state.shipperBranch}
//                     renderItem={({item}) => 
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10, height:100}}
//                     value = {item.addressLine1}
//                    />
//                   }
//                   />    
//                </View>
//              </View>
//           }
//         </View> 
//         <Text></Text>  
//          <View>
//             <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>  
//               <Text style = {{fontSize:20, fontWeight:"700"}}>Consignee Details</Text>
//               <TouchableOpacity onPress={() => this.onConsignee()}>
//                   <Text>New Consignee</Text>
//               </TouchableOpacity>
//             </View> 
//             {
//              this.state.addConsignee ? 
//              <View>
//                 <View style = {{marginTop:"3%"}}>
//                     <Text style= {{fontSize:15}}>Enter Consignee Name</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                      onChangeText={(text) => this.setState({'consigneeName':text})}
//                      value={this.state.consigneeName}
//                     />
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Enter Address</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                      onChangeText={(text) => this.setState({'consigneeAddressLine1':text})}
//                      value={this.state.consigneeAddressLine1}
//                     />
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Select Country</Text>
//                     <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
//                 <TextInput 
//                   placeholder="Select Country" 
//                   placeholderTextColor= "#000000" 
//                   style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
//                   keyboardType="email-address"
//                   onChangeText={(texts) => this.getCountry(texts)} 
//                   value={this.state.consigneeCountryName}
//                   />
//               <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
//             </View> 
//             { this.state.countrySuggest && this.state.countrySuggest.map((suggestion , index) =>  
//                       <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleCountrys(suggestion.name)}>
//                           <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.name}</Text>
//                       </TouchableOpacity>
//                   )}
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>State</Text>
//                     <SelectDropdown
//                       data={this.state.getState}
//                       onSelect={(selectedItem, index) => {
//                         this.setState({consigneeStateName: selectedItem.name}, () => {
//                           console.log("stateeeeName Shipper", selectedItem.name )
//                         })
//                         this.setState({consigneeStateId: selectedItem._id}, ()=> {
//                               console.log("consignee state iiddddd" , selectedItem._id)
//                         })
//                         console.log(selectedItem, index)
//                       }}
//                       buttonTextAfterSelection={(selectedItem, index) => {
//                         return selectedItem.name
//                       }}
//                       rowTextForSelection={(item, index) => {
//                         return item.name
//                       }}
//                       defaultButtonText = "Select State"
//                       buttonStyle ={{width:"100%", borderRadius:10, backgroundColor:"transparent", borderColor:"#000000", borderWidth:2,}}
//                     />
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Enter City Name</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                      onChangeText={(text) => this.setState({'consigneeCity':text})}
//                      value={this.state.consigneeCity}
//                     />
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Enter Pin Code</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                      onChangeText={(text) => this.setState({'consigneePincode':text})}
//                      value={this.state.consigneePincode}
//                     />
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Enter Consignee Contact Details</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                      onChangeText={(text) => this.setState({'consigneeContact':text})}
//                      value={this.state.consigneeContact}
//                     />
//                 </View>
//                 <Text></Text>
//                 <Button title = "Create Shipper/Consignee" onPress = {() => this.createShipper(this.state.shipperName,this.state.shipperAddressLine1)}/>
//              </View>
//             : 
//             <View>
//               <Text style= {{fontSize:15}}>Consignee Name</Text>
//               <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
//                 <TextInput 
//                   placeholder="Select consignee" 
//                   placeholderTextColor= "#000000" 
//                   style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
//                   keyboardType="email-address"
//                   onChangeText={(text) => this.companyConsignee(text)} 
//                   value={this.state.consigneeNames}
//                   />
//               <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
//             </View> 
//             { this.state.consigneesuggest && this.state.consigneesuggest.map((suggestion , index) =>  
//                       <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleConsignee(suggestion.consigneeName)}>
//                           <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.consigneeName}</Text>
//                       </TouchableOpacity>
//                   )}
//           <View style = {{marginTop:"3%"}}>
//             <Text style= {{fontSize:15}}>Consignee Branch</Text>
//             <SelectDropdown
//                   data={this.state.consigneeBranch}
//                   onSelect={(selectedItem, index) => {
//                     console.log(selectedItem, index)
//                   }}
//                   buttonTextAfterSelection={(selectedItem, index) => {
//                     return selectedItem.branchName
//                   }}
//                   rowTextForSelection={(item, index) => {
//                     return item.branchName
//                   }}
//                   defaultButtonText = "Select Branch"
//                   buttonStyle ={{width:"100%", borderRadius:10, backgroundColor:"transparent", borderColor:"#000000", borderWidth:2,}}
//                 />
//           </View>
//           <View style = {{marginTop:"3%"}}>
//             <Text style= {{fontSize:15}}>Consignee Address</Text> 
//                  <FlatList
//                     data = {this.state.consigneeBranch}
//                     renderItem={({item}) => 
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10, height:100}}
//                     value = {item.addressLine1}
//                    />
//                   }
//                   />  
//           </View>
//           </View>
//             }
//         </View>
//         <Text></Text>
//         {this.state.addShipper  || this.state.addConsignee ? null : 
//         <View>
//           <View>
//             <Text style= {{fontSize:15}}>Account Type *</Text>
//                 <Picker
//                   selectedValue={this.state.accountType}
//                   style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
//                   onValueChange={(itemValue, itemIndex) =>this.setState({accountType: itemValue})}>
//                   <Picker.Item label="Prepaid" value="Prepaid" />
//                   <Picker.Item label="Collect" value="Collect" />
//                 </Picker>
//             </View>
//         <View style = {{marginTop:"3%"}}>
//           <Text style= {{fontSize:15}}>Select Incoterms *</Text>
//           <Picker
//                   selectedValue={this.state.incoTerms}
//                   style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
//                   onValueChange={(itemValue, itemIndex) =>this.setState({incoTerms: itemValue})}>
//                   <Picker.Item label="POP" value="POP" />
//                   <Picker.Item label="FOB" value="FOB" />
//                   <Picker.Item label="8965785" value="8965785" />
//                 </Picker>
//         </View>
//         <View style = {{marginTop:"3%"}}>
//           <Text style= {{fontSize:15}}>Number Of Container</Text>
//            <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
//              <Text style = {{fontSize:20}}>{getrate.noOfContainers}</Text>
//            </View>
//         </View>
//         <View style = {{marginTop:"3%"}}>
//           <Text style= {{fontSize:15}}>Gross Weight(KGS)</Text>
//           <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
//              <Text style = {{fontSize:20}}>{getrate.grossWeight}</Text>
//            </View>
//         </View>
//         <View style = {{marginTop:"3%"}}>
//           <Text style= {{fontSize:15}}>Volume Weight (CBM)</Text>
//           <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
//              <Text style = {{fontSize:20}}>{getrate.volumeWeight}</Text>
//            </View>
//         </View>
//         </View> }
//         <View style = {{display:"flex", marginTop:"5%", paddingBottom:"5%"}}>
//           <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//           <Text style = {{fontSize:20, fontWeight:"700"}}>Dimension Details</Text>
//           <TouchableOpacity onPress = {() => this.onDimention()}>
//               <Text>Add Dimensions</Text>
//           </TouchableOpacity>
//           </View>
//           {
//              this.state.addDimention ? 
//              <View>
//              <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                   <View style = {{display:"flex", flexDirection:"row"}}>
//                   <RadioButton
//                       value="CM"
//                       status={ this.state.checked === 'CM' ? 'checked' : 'unchecked' }
//                       onPress={() => this.setState({checked:'CM'})}
//                     />
//                   <Text>  CM</Text>
//                   </View>
//                  <View style = {{display:"flex", flexDirection:"row"}}>
//                  <RadioButton
//                       value="MM"
//                       status={ this.state.checked === 'MM' ? 'checked' : 'unchecked' }
//                       onPress={() => this.setState({checked:'MM'})}
//                     />
//                     <Text>  MM</Text>
//                   </View>
//                   <View style = {{display:"flex", flexDirection:"row"}}>
//                   <RadioButton
//                       value="inches"
//                       status={ this.state.checked === 'inches' ? 'checked' : 'unchecked' }
//                       onPress={() => this.setState({checked:'inches'})}
//                     />
//                     <Text>  INCHES</Text>
//                   </View>
//                   <View style = {{display:"flex", flexDirection:"row"}}>
//                   <RadioButton
//                       value="meter"
//                       status={ this.state.checked === 'meter' ? 'checked' : 'unchecked' }
//                       onPress={() => this.setState({checked:'meter'})}
//                     />
//                     <Text>  METERS</Text>
//                   </View> 
//              </View>
//              <View style = {{marginTop:"3%"}}>
//                     <Text style= {{fontSize:15}}>Length</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Width</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Height</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Pieces</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
//                 </View>
//                 <Text></Text>
//                  <View>
//                   <Text>Select Weight</Text>
//                   <Picker
//                     selectedValue={this.state.account}
//                     style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
//                     onValueChange={(itemValue, itemIndex) =>this.setState({account: itemValue})}>
//                     <Picker.Item label="Kgs" value="Kgs" />
//                     <Picker.Item label="Lbs" value="Lbs" />
//                   </Picker>
//                 </View>
//                 <View style = {{marginTop:"1%"}}>
//                     <Text style= {{fontSize:15}}>Weight Per Piece</Text>
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}} placeholder="Gw/Pc"/>
//                 </View>
//              </View>
//             : null
//           } 
//         </View>
//         {this.state.addShipper  || this.state.addConsignee ? null : 
//         <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", paddingBottom:"30%", marginTop:"5%"}}>  
//           <Text style = {{fontSize:20, fontWeight:"700"}}>HBL Details</Text>
//           <TouchableOpacity onPress= {() => this.hblRequired()}>
//               <Text>HBL Required</Text>
//           </TouchableOpacity>
//           {
//              this.state.contents ? 
//              <View>
//                <Text></Text>
//                 <View style = {{marginTop:"3%"}}>
//                     <Text style= {{fontSize:15}}>Issued By</Text>
//                     <Picker
//                       selectedValue={this.state.companyName}
//                       style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
//                       onValueChange={(itemValue, itemIndex) =>this.setState({companyName: itemValue})}>
//                         <Picker.Item label="OTHERS" value="OTHERS"/>
//                       <Picker.Item label="AAA 2 INNOVATE PVT LTD" value="AAA 2 INNOVATE PVT LTD" />
//                     </Picker>
//                 </View>
//                 <View style = {{marginTop:"3%"}}>
//                     <Text style= {{fontSize:15}}>No Of HBL</Text>
//                     <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
//                       <Text style = {{fontSize:20, padding:"2%"}}>{this.state.noOfHawb}</Text>
//                     </View>
//                 </View>
//                 <View style = {{width:"20%", top:"4%", alignSelf:"center"}}>
//                  <Button title ="Add HBL" onPress={() => this.addHBL()}/>
//                 </View> 
//                 <Text>HBL DETAILS</Text>
//                 <FlatList
//                     data = {this.state.selectHBL}
//                     renderItem={({item}) => 
//                     <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
//                     value = {item}
//                    />

//                   }
//                   /> 
//                   <View>
//                   <View style = {{marginTop:"3%"}}>
//                 <Text style= {{fontSize:15}}>Shipper Name</Text>
//              <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
//                  <TextInput 
//                    placeholder="Select Shipper" 
//                    placeholderTextColor= "#000000" 
//                    style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
//                    keyboardType="email-address"
//                    onChangeText={(text) => this.companyShipper(text)} 
//                    value={this.state.shipperNames}
//                    />
//                <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
//              </View> 
//              { this.state.shipperSuggest && this.state.shipperSuggest.map((suggestion , index) =>  
//                        <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestShipper(suggestion.shipperName)}>
//                            <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.shipperName}</Text>
//                        </TouchableOpacity>
//                    )}
//            <View style = {{marginTop:"3%"}}>
//              <Text style= {{fontSize:15}}>Shipper Branch</Text>
//              <View>
//               <SelectDropdown
//                   data={this.state.shipperBranch}
//                   onSelect={(selectedItem, index) => {
//                     console.log(selectedItem, index)
//                   }}
//                   buttonTextAfterSelection={(selectedItem, index) => {
//                     return selectedItem.branchName
//                   }}
//                   rowTextForSelection={(item, index) => {
//                     return item.branchName
//                   }}
//                   defaultButtonText = "Select Branch"
//                   buttonStyle ={{width:"100%", borderRadius:10, backgroundColor:"transparent", borderColor:"#000000", borderWidth:2,}}
//                 />
//              </View> 
//              </View>   
//                </View>
//                <View>
//               <Text style= {{fontSize:15}}>Consignee Name</Text>
//               <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
//                 <TextInput 
//                   placeholder="Select consignee" 
//                   placeholderTextColor= "#000000" 
//                   style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
//                   keyboardType="email-address"
//                   onChangeText={(text) => this.companyConsignee(text)} 
//                   value={this.state.consigneeNames}
//                   />
//               <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
//             </View> 
//             { this.state.consigneesuggest && this.state.consigneesuggest.map((suggestion , index) =>  
//                       <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleConsignee(suggestion.consigneeName)}>
//                           <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.consigneeName}</Text>
//                       </TouchableOpacity>
//                   )}
//           <View style = {{marginTop:"3%"}}>
//             <Text style= {{fontSize:15}}>Consignee Branch</Text>
//             <SelectDropdown
//                   data={this.state.consigneeBranch}
//                   onSelect={(selectedItem, index) => {
//                     console.log(selectedItem, index)
//                   }}
//                   buttonTextAfterSelection={(selectedItem, index) => {
//                     return selectedItem.branchName
//                   }}
//                   rowTextForSelection={(item, index) => {
//                     return item.branchName
//                   }}
//                   defaultButtonText = "Select Branch"
//                   buttonStyle ={{width:"100%", borderRadius:10, backgroundColor:"transparent", borderColor:"#000000", borderWidth:2,}}
//                 />
//           </View>
//           <View style = {{marginTop:"3%"}}>
//           <Text style= {{fontSize:15}}>Number Of Container</Text>
//            <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
//              <Text style = {{fontSize:20}}>{getrate.noOfContainers}</Text>
//            </View>
//         </View>
//         <View style = {{marginTop:"3%"}}>
//           <Text style= {{fontSize:15}}>Gross Weight(KGS)</Text>
//           <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
//              <Text style = {{fontSize:20}}>{getrate.grossWeight}</Text>
//            </View>
//         </View>
//         <View style = {{marginTop:"3%"}}>
//           <Text style= {{fontSize:15}}>Volume Weight (CBM)</Text>
//           <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
//              <Text style = {{fontSize:20}}>{getrate.volumeWeight}</Text>
//            </View>
//         </View>
//           </View>
//           </View>
//              </View>
//             : null
//           }
//         </View> 
//         }
//         <View style ={{paddingBottom:"5%"}}>
//           <Button title = "Submit" onPress = {() => this.submit(this.state.quoteId, this.state.bookData._id, this.state.bookData, this.state.noOfContainers, this.state.grossWeight, this.state.volumeWeight, this.state.containerType, this.state.accountType, this.state.incoTerms, this.state.totalPieces, this.state.commodity, this.state.chargeableWeight, this.state.revertLoggedData, this.state.remainingCharges, this.state.bookDataCharges)}/>
//         </View>  
//       </ScrollView>
//       </View>
//       </View>
//     </Modal>
// </ScrollView>
// </ImageBackground>
// </ScrollView>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    borderColor:"red",
    borderWidth:2,
    alignItems: 'center',
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
    padding:"3%",
    borderColor:"red",
    borderWidth:2,
  },
  linearGradient: {
    flex: 1,
  },
  btn : {
    padding:"3%",
    backgroundColor:"black",
    height:55,
    // borderColor:"red",
    // borderWidth:2,
    width:"30%",
    alignSelf:"center",
    borderRadius:10
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

export default OceanPortToAddress;