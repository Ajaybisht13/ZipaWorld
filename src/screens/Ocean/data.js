import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet,TextInput, TouchableOpacity, Button, ScrollView, Modal, ImageBackground , FlatList} from 'react-native';
import Icon from 'react-native-vector-icons/Ionicons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import Iconn from 'react-native-vector-icons/MaterialCommunityIcons';
import LinearGradient from 'react-native-linear-gradient';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import DatePicker from 'react-native-datepicker'
import Iconss from 'react-native-vector-icons/Entypo';
import RadioButton from 'react-native-radio-button';
import NumericInput from 'react-native-numeric-input';
import {Picker} from '@react-native-community/picker';
import { ProgressSteps, ProgressStep } from 'react-native-progress-steps';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SelectDropdown from 'react-native-select-dropdown';
import { RadioButtons } from 'react-native-paper';

const baseUrl = "https://coapi.zipaworld.com/";
const customerId = AsyncStorage.getItem("customerId")


class OceanGeneralStep1 extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      "content" : false,
      "switchCurrency" : true,
      "show":false,
      "show1":false,
      'show2':false,
      "show3":false,
      "show4":false,
      "modal" : false,
      "showOrigin": true,
      "showDestination": true,
      "performaModal": false,
      "shipperModal" : false,
      "attachments": [],
      "originId": "",
      "destinationId": "",
      "chargeableWeight": "",
      "customerId": customerId,
      "customerBranchId": "60cc416b4514306fe5339650",
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

      "quoteId": "",
      "rateId": "",
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
      "customerId": "618972c94af0a17c623f58a0",
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
      "customerBranchData" : [],
      "bookingGst" : "",
      "bookingGstData" :""
    }
  }

  componentDidMount = async() => {
    // alert()
    this.setState({
      activityType : this.props.route.params.activityType,
      tarrifMode : this.props.route.params.tarrifMode,
      queryFor:  this.props.route.params.queryFor,
      additionalService: this.props.route.params.additionalService
    })
    const token = await AsyncStorage.getItem("userToken")
    console.log("token",token);
    this.companyShipper();
    this.companyConsignee();
    this.getIncoterms();
    this.getContainer();
    this.handleCountry();
    this.getBranchData();
    //this.getByBooking();
    if(token){
      this.getAllBranch(token);
    }else {
     console.log("error")
    }
    this.getData();
 }


 getByBooking = async() => {
  const token = await AsyncStorage.getItem("userToken")
  //const customerBranchId = await AsyncStorage.getItem("customerBranchId")
  fetch("https://coapi.zipaworld.com/api/bookings/get", {
    method: "Post",
    headers:{
       "Content-Type" : "application/json",
       "authkey" : token
    },
    body : JSON.stringify({id: "619341dc096d4c05ae99b3de"})
    }).then((response) => response.json())
    .then((results) => {
      console.log("",results);
      this.setState({
        bookingGst: results.result.proformaData.otherCharges,
        bookingGstData: results.result.proformaData
      })
    }).catch((error) => console.log("error", error));
 } //bookingGst.chargeIgstRate

 getBranchData = async() => {
  const token = await AsyncStorage.getItem("userToken")
  const customerBranchId = await AsyncStorage.getItem("customerBranchId")
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

 getAllBranch = (token) => {
  fetch(baseUrl + "api/masters/company/branch/getAll", {
      method : "Post",
      headers : {
          "Content-Type" : "application/json",
          "authkey" : token
      },
      body: JSON.stringify({customerId: "606ef470e5ab230f74117965"})
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
      body: JSON.stringify({customerId: "606ef470e5ab230f74117965", search: text})
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
    // console.log(text)
    fetch(baseUrl + "api/masters/consignee/managerCustomer", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
             "authkey" : token
        },
        body: JSON.stringify({customerId: "606ef470e5ab230f74117965"})
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




componentHideAndShow = () => {
this.setState((previousState) => ({ content: !previousState.content }))
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
      this.setState({originAirport:text})
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
        this.setState({destinationAirport:text})
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


getQueryRateFunction =()=>{
   fetch(baseUrl + "api/auth/masters/oceanFreight/getQueryRates", {
    method:"Post",
    headers:{
      "Content-Type" : "application/json",
    },
    body : JSON.stringify(this.state)
  }).then((response) => response.json())
  .then (async(results) => {
    console.log("Charges",results.result);
    try {
     await AsyncStorage.setItem('AllCharges', results.result);
      console.log("AllllllllCCCChhhhhhh", results.result)
    } catch (error) {
      console.log(error)
    }
    if(results.success == true) {
      this.setState({
        rates: results.result,
        // charge: results.result,
        getrate : results.result2, 
        originport:results.result2.originAirport , 
        destinationport : results.result2.destinationAirport,
        modal:true
      });
    }
  })
  .catch((error) => console.log("error", error));
}


createRateLoggedUserFunction =async(quoteId)=>{
  const getCharges = await AsyncStorage.getItem("AllCharges")
  console.log("allllll", getCharges)
  let obj = {
    quoteId : quoteId,
    shipmentMode : this.state.shipmentMode,
    revertData : JSON.parse(getCharges)
  }
  //console.log("daaaata",obj)
 fetch(baseUrl + "api/auth/queries/rates/createRateLoggedUser", {
    method:"Post",
    headers:{
      "Content-Type" : "application/json",
    },
    body : JSON.stringify(obj)
  }).then((response) => response.json())
  .then (async(results) => {
    console.log("idddddddddddddd", results.result)
    try {
      const quote = await AsyncStorage.setItem('quoteId', results.result.quoteId);
      const rateId = await AsyncStorage.setItem('rateId', results.result._id);
      
      console.log("qqqqqqq", quote)
    } catch (error) {
      console.log(error)
    }
         this.setState({
          loggedUserCharges: results.result,
          charge: results.result,
         })
      })
   .catch((error) => console.log("error", error))
}


  Search = async (queryFor, tarrifMode, activityType, additionalService) => {
      const createApi = fetch(baseUrl + "api/auth/queries/create", {
        method:"Post",
        headers:{
          "Content-Type" : "application/json",
        },
        body : JSON.stringify(this.state)
      }).then((result) => {
            result.json().then((res) => {
            console.log(res);
            const qId =res.result._id
            this.setState({
              quoteId:res.result._id,
              queryFor:queryFor, 
              tarrifMode:tarrifMode, 
              activityType:activityType, 
              additionalService:additionalService
            }, () => {
              console.log("crrreattteeIs", res.result._id)
              this.getQueryRateFunction()
              this.createRateLoggedUserFunction(this.state.quoteId)
            });
            //alert(res.message)  
          })
          })
      .catch((error) => console.log("error", error));
  }





  

//<======================add shipper and consignee =============================================>


createShipper =  async(shipperName,shipperAddressLine1) => {
  if (this.state.shipperName.trim() === "") {
    this.setState(() => ({ shipperError: "Shipper Name required." }));
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
    alert(results.message)
    this.setState({shipperModal:false})
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
    this.setState({shipmentMode:"LCL"});
    this.setState({show2:false});
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

booknow = async(shippingname) => {
  //this.props.navigation.navigate("ShipperDetails")
  const token = await AsyncStorage.getItem("userToken")
  console.log("token aa gaya h booking now p",token);
  if(token){
    this.setState({
      shipperModal:true,
      bookData : shippingname

    })
  }else {
    this.props.navigation.navigate("Login")
  }
};

componentHideAndShow = () => {
  this.setState((previousState) => ({ content: !previousState.content }))
}

changeCurrency = () => {
  this.setState((previousState) => ({ switchCurrency: !previousState.switchCurrency }))
}

csApprovalFunction = (createId,rateIdCreate,quoteIdCreate) => {
  
  fetch(baseUrl + "api/bookings/csApproval", {
    method : "Post",
    headers : {
        "Content-Type" : "application/json",
    },
  body: ({
    "rateId":rateIdCreate,
    "buySaleId": createId,
    "quoteId": quoteIdCreate,
    "isCopied": "",
    "copiedFrom": {},
    "isRejected": "Pending",
    "rejectedMessage": "",
    "shipmentType": "Direct",
    "customerId": "606ef470e5ab230f74117965",
    "branchId": "600edb3d98380309ac6bd39a",
    "containerType":containerType,
    "containerDetails":containerType,
    "noOfContainers": noOfContainers,
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
    "volumeWeight": volumeWeight,
    "noOfPieces": totalPieces,
    "accountType": accountType,
    "incoTermsId": "60a4aa6b36b67b6f679b5d2d",
    "incoTerms": incoTerms,
    "issuedBySelection": accountType,
    "natureAndQuantityOfGoods": commodity,
    "grossWeight": grossWeight,
    "kgOrLBS": "kg",
    "chargeableWeight": chargeableWeight
  })
}).then((response) => response.json())
  .then((results) => {
      console.log("sssttttaaaattteeee",results);
  }).catch((error) => console.log("error", error));
}

submit = async(quoteId, _id, bookData, noOfContainers, grossWeight, volumeWeight, containerType, accountType, incoTerms, totalPieces, commodity, chargeableWeight) => {
  console.log("daaaaaaaaaa", this.state.bookData)
  const token = await AsyncStorage.getItem("userToken")
  const getCharges = await AsyncStorage.getItem("AllCharges")
  console.log("allllll", getCharges)
  let obj = {
    quoteId : quoteId,
    shipmentMode : this.state.shipmentMode,
    revertData : JSON.parse(getCharges),
    
    
  }
  fetch(baseUrl + "api/invoice/buySale/create", {
    method:"Post",
    headers:{
      "Content-Type" : "application/json",
      "authkey" : token,
    },
    body : (obj)
  }).then((response) => response.json())
  .then ((results) => {
    console.log("crrreeeaaattee",results);
  })
  .catch((error) => console.log("error", error));
}

  render() {
    const {queryFor, tarrifMode, activityType, additionalService } = this.props.route.params
    const {data, getrate, originport, destinationport, rates, charge, bookingGst, bookingGstData} = this.state
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
      {/* <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} locations={[0,0.5,0.6]} useAngle= {true} angle={257} colors={['#ffac04', '#fe0000']}
      style={styles.linearGradient}>   */}
      <ScrollView>
      <ImageBackground source = {require("../../assets/background.jpg")} style = {{height:"100%", width:"100%"}}>
        <Text style = {{color : "#000000", fontSize:30, fontWeight:"bold", alignSelf:"center", marginTop:"5%"}}>Select Commodity :</Text>
         <View style = {{display:"flex", flexDirection:"column", padding :"2%",justifyContent:"space-between", marginTop:"10%", height:"100%", paddingBottom:"25%"}}>
            <Text></Text>
            <TouchableOpacity style={this.state.borderColorId === 1? styles.border : styles.button} onPress={() => this.Select(1)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"60%", justifyContent:"space-between"}}>
              {this.state.showOrigin ? 
              <View style = {{display:"flex", flexDirection:"row"}}>
                <Icons name="home" size={35}/>
                <Text style = {{fontWeight:"600", fontSize:27, marginLeft:"5%"}}>Search Origin</Text>
              </View> : 
              <View style = {{display:"flex", flexDirection:"row", width:"100%"}}>
                <Icons name="home" size={35}/>
                <Text style = {{fontWeight:"600", fontSize:21,  marginLeft:"5%", marginTop:"3%"}}>{this.state.originNameSet}</Text>
              </View>
              }
                  
              </View>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={this.state.borderColorId === 2? styles.border : styles.button} onPress={() => this.Select(2)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"80%", justifyContent:"space-between"}}>
              {this.state.showDestination ? 
              <View style = {{display:"flex", flexDirection:"row"}}>
                <Icon name="location-sharp" size={35}/>
                <Text style = {{fontWeight:"600", fontSize:27, marginLeft:"5%"}}>Search Destination</Text>
              </View> : 
              <View style = {{display:"flex", flexDirection:"row", width:"100%"}}>
                <Icon name = "location-sharp" size={35}/>
                <Text style = {{fontWeight:"600", fontSize:21,  marginLeft:"5%", marginTop:"3%"}}>{this.state.destinationNameSet}</Text>
              </View>
              }
              </View>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={this.state.borderColorId === 3? styles.border : styles.button} onPress={() => this.Select(3)}>
            <View style = {{ alignSelf:"center", width:"80%"}}>
              <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-around"}}>
              <Icon name="calendar" size={40}/>
                <View style = {{paddingBottom:10}}>
                 {/* <Text style = {{fontSize:22, fontWeight:"600"}}>Cargo Ready Date</Text> */}
                 <DatePicker
                    // style={{width: "80%", alignSelf:"center"}}
                    date={this.state.clearenceDate}
                    mode="date"
                    format="DD-MM-YYYY"
                    minDate="01-05-2016"
                    maxDate="01-06-2050"
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
            </View>
            </TouchableOpacity>
            <Text></Text>
            <TouchableOpacity style={this.state.borderColorId === 4? styles.border : styles.button} onPress={() => this.Select(4)}>
              <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"70%", justifyContent:"space-between"}}>
                  <Icons name="shipping-fast" size={40} color = "#000000"/>
                  <Text style = {{fontWeight:"600", fontSize:27}}>Shipment Mode</Text>
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
            <Text></Text>
            <Pressable style = {styles.btn} onPress = {() => this.Search(queryFor, tarrifMode, activityType, additionalService )}>
                <Iconn name= "arrow-right" color="#000000" size={50}/>
            </Pressable>
            </View>
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
          <Modal transparent={true} visible={this.state.show2} animationType="slide">
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
         <Modal transparent={true} visible={this.state.modal} animationType="slide">
          <View style = {{backgroundColor:"#000000aa", flex:1}}>
          <View style = {{backgroundColor:"#ffffff", height:"100%",padding : 10, borderRadius:10}}> 
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
                              {this.state.loggedUserCharges && this.state.loggedUserCharges.map((shippingname) => {
                                return (
                                  <View style = {{elevation:30}}>
                                  <View style= {{alignItems:"center"}}>
                                    <Text style = {{fontSize:20, fontWeight:"600"}}>{shippingname.shippingLineName}</Text>  
                                  </View>
                                  <Text></Text>
                                <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                <TouchableOpacity onPress = {() => this.componentHideAndShow()}>
                                   <Text style = {{fontSize:18, fontWeight:"bold"}}>Freight Summary</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress = {() => this.changeCurrency()}>
                                   <Text style = {{fontSize:18, fontWeight:"bold"}}>Switch to own Currency</Text>
                                </TouchableOpacity>
                                </View>
                                <Text></Text>
                                {
                                  this.state.content ? 
                                    <View>  
                                     <View style = {{display:"flex" , flexDirection:"row", justifyContent:"space-between"}}>
                                      <View>
                                         <Text style = {{fontWeight:"600"}}>Charges</Text>
                                         <Text style = {{fontWeight:"600"}}>name</Text>
                                      </View>
                                      <View>
                                        <Text style = {{fontWeight:"600"}}>No of</Text>
                                        <Text style = {{fontWeight:"600"}}>containers</Text>
                                      </View>
                                      <Text style = {{fontWeight:"600"}}>Rate</Text>
                                      <View>
                                        <Text style = {{fontWeight:"600"}}>     Total</Text>
                                        <Text style = {{fontWeight:"600"}}>   amount</Text>
                                      </View>
                                    </View>
                                    <Text></Text>
                                    {charge && charge.map((totalcharge) => {
                                      //console.log("chargessssssss", totalcharge)
                                      return (
                                        <View>
                                        {
                                          totalcharge.charges && totalcharge.charges.map((info) => {
                                          //console.log("inffffffooo",info)
                                             return (
                                              <View style = {{display:"flex" , flexDirection:"row", justifyContent:"space-between"}}>
                                              <View>
                                                 <Text>{info.chargeName}</Text>
                                              </View>
                                              <View>
                                                <Text>{info.chargeQty}</Text>
                                              </View>
                                              <View>
                                                <Text>{info.currency}</Text>
                                                <Text>{info.chargeRate}</Text>
                                              </View>
                                              <View>
                                                {
                                                  this.state.switchCurrency ?
                                                     <View>
                                                        <Text>{parseFloat(info.taxableB).toFixed(2)}</Text>
                                                     </View>
                                                  :
                                                    <View>
                                                        <Text>{parseFloat(info.taxableC).toFixed(2)}</Text>
                                                    </View>
                                                }
                                              </View>
                                            </View>
                                             )
                                          })
                                        }
                                        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                                           <Text style = {{fontSize:15, fontWeight:"bold"}}>TOTAL AMOUNT</Text>
                                           {
                                             this.state.switchCurrency ?
                                              <View>
                                                 <Text style = {{ fontSize:15,fontWeight:"bold"}}>{parseFloat(totalcharge.amountB).toFixed(2)}</Text>
                                              </View>
                                              :
                                              <View>
                                                 <Text style = {{ fontSize:15,fontWeight:"bold"}}>{parseFloat(totalcharge.amountC).toFixed(2)}</Text>
                                              </View>
                                           }
                                           
                                        </View>
                                        </View>
                                      )
                                          
                                     })}</View> : null }
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
                                    <View style = {{paddingBottom:"5%"}}>
                                      <Button title = "Book" onPress={() => this.booknow(shippingname)}/>
                                    </View>
                                    <Text></Text>
                                  </View>
                                  )
                                })}
                                  </ScrollView>
                                </View>  
                              </View>
                          </View>
                    </View>
               </Modal>
       {/* Mawbview   ========================================================      */}
       <Modal transparent={true} visible={this.state.performaModal} animationType="slide">
          <View style = {{backgroundColor:"#000000aa", flex:1}}>
          <View style = {{backgroundColor:"#ffffff", height:"100%",padding : 10, borderRadius:10}}> 
            <View style={{backgroundColor:"#ffffff" }}>
              <View style = {{padding:"2%"}}>
                <ScrollView style={{ backgroundColor:"#ffffff", borderRadius:10, height:"100%", padding:"2%"}}>
                <Text style = {{fontSize:22}}> Booking Confirmation </Text>
        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
        <View>
        <Text>Name</Text>
        <Text>Address</Text>
        <Text>Country</Text>
        <Text>Pan number</Text>
        <Text>Client number</Text>
        <Text>GST number</Text>
        <Text>Booking number</Text>
        <Text>Date</Text>
        <Text>Payment Terms</Text>
        <Text>Our GST number</Text>
        </View>
        <View>
          <Text>Shashank Test Co Pvt Ltd</Text>
          <Text>B 29 Third Floor</Text>
          <Text></Text>
          <Text>AATCA6549E</Text>
          <Text>AAASHA00087</Text>
          <Text>09AATCA6549E1Z7</Text>
          <Text>OEINMUN1410202122460637-001</Text>
          <Text>{getrate.clearenceDate}</Text>
          <Text>0 Days</Text>
          <Text>09AATCA6549E1Z7</Text>
        </View>
        </View>
        <Text style = {{fontSize:22}}> Shipment Details </Text>
        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
        <View>
          <View>
            <Text>No.of Containers</Text>
            <Text>Gross Weight (KGS)</Text>
            <Text>No. of pakcages</Text>
            <Text>commodity desc</Text>
            <Text>Quotation Number</Text>
            <Text>INCO terms</Text>
            <Text>Terms</Text>
          </View>
        </View>
        <View>
          <Text>{getrate.noOfContainers}</Text>
          <Text>{getrate.grossWeight}</Text>
          <Text>{getrate.totalPieces}</Text>
          <Text>{getrate.commodity}</Text>
          <Text>OEINMUN1410202122460637</Text>
          <Text>POP</Text>
          <Text>Prepaid</Text>
        </View>
        </View>
        <Text style = {{fontSize:22}}> Shipper/Consignee Details </Text>
        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
        <View>
        <Text>Shipper</Text>
        <Text>Consignee</Text>
        <Text>Origin</Text>
        <Text>Destination</Text>
        </View>
        <View>
          <Text>AAA 2 Innovate Pvt Ltd</Text>
          <Text>Reliance Mart LLP</Text>
          <Text>{originport.name}</Text>
          <Text>{destinationport.name}</Text>
        </View>
        </View>
        <Text style = {{fontSize:22}}> INTENDED TRANSPORT PLAN DETAILS </Text>
        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"3%"}}>
          <Text>From</Text>
          <Text>To</Text>
          <Text>Vessel no</Text>
          <Text>Voyage no</Text>
          <Text>ETD</Text>
          <Text>ETA</Text>
        </View>
        <Text style = {{fontSize:22}}> Charges </Text>
        <View>
          <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"space-between"}}>
             <Text>Code</Text>
             <Text>Description</Text>
             <Text>GST</Text>
             <Text>Total Amount</Text>
          </View>
          <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"space-between"}}>
            <View>
               <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                  <Text>{bookingGst.chargeHsnCode}</Text>
                    <Text>{bookingGst.chargeName}-{bookingGst.chargeQty} x {bookingGst.altName}</Text>
                    <Text>{bookingGst.chargeIgstRate}</Text>
                              <Text>{bookingGstData.currency}{bookingGst.taxableB}</Text>  
                              </View>          
                                 
                  </View>
                                  
          </View>
          
          <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-end"}}>
             <Text>GST Amount</Text>
             <Text>{bookingGstData.currency} {bookingGstData.igstTotalAmountB}</Text>
          </View>
          <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-end"}}>
             <Text>Total Amount Due</Text>
             <Text>{bookingGstData.currency} {bookingGst.chargeTaxableB}</Text>
          </View>
        </View>
                 </ScrollView>
                  </View>  
                    </View>
                  </View>
                </View>
               </Modal>
       {/* <============================================================================> */}
      {/* ==================================================  Shhhiiippppeeeeeerrrrrrrrrr modal  ================================================================        */}
               <Modal transparent={true} visible={this.state.shipperModal} animationType="slide">
                  <View style = {{backgroundColor:"#000000aa", flex:1}}>
                  <View style = {{backgroundColor:"#ffffff",height:"100%",padding : 10, borderRadius:10}}>
                  <ScrollView style = {{padding:"2%", backgroundColor:"#ffffff", height:"100%"}}>
        <View style = {{display:"flex", marginTop:"10%"}}>  
        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <Text style = {{fontSize:20, fontWeight:"700"}}>Shipper Details</Text>
          <TouchableOpacity onPress= {() => this.Shipper()}>
              <Text>New Shipper</Text>
          </TouchableOpacity>
        </View>
          {
             this.state.addShipper ? 
             <View>
                <View style = {{marginTop:"3%"}}>
                    <Text style= {{fontSize:15}}>Enter Shipper Name</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                      onChangeText={(text) => this.setState({'shipperName':text})}
                      value={this.state.shipperName}
                    />
                </View>
                {/* {!!this.state.shipperError && (
                <Text style={{ color: "red" }}>{this.state.shipperError}</Text>
              )}  */}
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Enter Address</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                       onChangeText={(text) => this.setState({'shipperAddressLine1':text})}
                       value={this.state.shipperAddressLine1}
                    />
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Select Country</Text>
                    <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Select Country" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.getAllCountry(text)} 
                  value={this.state.shipperCountryName}
                  />
              <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
            </View> 
            { this.state.countrySuggest && this.state.countrySuggest.map((suggestion , index) =>  
                      <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleCountry(suggestion.name)}>
                          <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.name}</Text>
                      </TouchableOpacity>
                  )}
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>State</Text>
                     <SelectDropdown
                      data={this.state.getState}
                      onSelect={(selectedItem, index) => {
                        this.setState({shipperStateName: selectedItem.name}, () => {
                          console.log("stateeeeName Shipper", selectedItem.name )
                        })
                        this.setState({shipperStateId: selectedItem._id}, ()=> {
                              console.log("iiddddd" , selectedItem._id)
                        })
                        console.log(selectedItem, index)
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.name
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.name
                      }}
                      defaultButtonText = "Select State"
                      buttonStyle ={{width:"100%", borderRadius:10, backgroundColor:"transparent", borderColor:"#000000", borderWidth:2,}}
                    />
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Enter City Name</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                     onChangeText={(text) => this.setState({'shipperCity':text})}
                     value={this.state.shipperCity}
                    />
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Enter Pin Code</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                     onChangeText={(text) => this.setState({'shipperPincode':text})}
                     value={this.state.shipperPincode}
                    />
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Enter Shipper Mobile Number</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                     onChangeText={(text) => this.setState({'shipperContact':text})}
                     value={this.state.shipperContact}
                    />
                </View>
             </View>
            : 

            <View>
            <Text style= {{fontSize:15}}>Shipper Name</Text>
             <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                 <TextInput 
                   placeholder="Select Shipper" 
                   placeholderTextColor= "#000000" 
                   style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                   keyboardType="email-address"
                   onChangeText={(text) => this.companyShipper(text)} 
                   value={this.state.shipperNames}
                   />
               <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
             </View> 
             { this.state.shipperSuggest && this.state.shipperSuggest.map((suggestion , index) =>  
                       <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestShipper(suggestion.shipperName)}>
                           <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.shipperName}</Text>
                       </TouchableOpacity>
                   )}
           <View style = {{marginTop:"3%"}}>
             <Text style= {{fontSize:15}}>Shipper Branch</Text>
             <View>
              <SelectDropdown
                  data={this.state.shipperBranch}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.branchName
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.branchName
                  }}
                  defaultButtonText = "Select Branch"
                  buttonStyle ={{width:"100%", borderRadius:10, backgroundColor:"transparent", borderColor:"#000000", borderWidth:2,}}
                />
             </View> 
             </View>
               <View style = {{marginTop:"3%"}}>
                 <Text style= {{fontSize:15}}>Shipper Address</Text>
                 <FlatList
                    data = {this.state.shipperBranch}
                    renderItem={({item}) => 
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10, height:100}}
                    value = {item.addressLine1}
                   />
                  }
                  />  
               </View>
             </View>
          }
        </View> 
        <Text></Text>  
         <View>
            <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>  
              <Text style = {{fontSize:20, fontWeight:"700"}}>Consignee Details</Text>
              <TouchableOpacity onPress={() => this.onConsignee()}>
                  <Text>New Consignee</Text>
              </TouchableOpacity>
            </View> 
            {
             this.state.addConsignee ? 
             <View>
                <View style = {{marginTop:"3%"}}>
                    <Text style= {{fontSize:15}}>Enter Consignee Name</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                     onChangeText={(text) => this.setState({'consigneeName':text})}
                     value={this.state.consigneeName}
                    />
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Enter Address</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                     onChangeText={(text) => this.setState({'consigneeAddressLine1':text})}
                     value={this.state.consigneeAddressLine1}
                    />
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Select Country</Text>
                    <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Select Country" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(texts) => this.getCountry(texts)} 
                  value={this.state.consigneeCountryName}
                  />
              <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
            </View> 
            { this.state.countrySuggest && this.state.countrySuggest.map((suggestion , index) =>  
                      <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleCountrys(suggestion.name)}>
                          <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.name}</Text>
                      </TouchableOpacity>
                  )}
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>State</Text>
                    <SelectDropdown
                      data={this.state.getState}
                      onSelect={(selectedItem, index) => {
                        this.setState({consigneeStateName: selectedItem.name}, () => {
                          console.log("stateeeeName Shipper", selectedItem.name )
                        })
                        this.setState({consigneeStateId: selectedItem._id}, ()=> {
                              console.log("consignee state iiddddd" , selectedItem._id)
                        })
                        console.log(selectedItem, index)
                      }}
                      buttonTextAfterSelection={(selectedItem, index) => {
                        return selectedItem.name
                      }}
                      rowTextForSelection={(item, index) => {
                        return item.name
                      }}
                      defaultButtonText = "Select State"
                      buttonStyle ={{width:"100%", borderRadius:10, backgroundColor:"transparent", borderColor:"#000000", borderWidth:2,}}
                    />
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Enter City Name</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                     onChangeText={(text) => this.setState({'consigneeCity':text})}
                     value={this.state.consigneeCity}
                    />
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Enter Pin Code</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                     onChangeText={(text) => this.setState({'consigneePincode':text})}
                     value={this.state.consigneePincode}
                    />
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Enter Consignee Contact Details</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                     onChangeText={(text) => this.setState({'consigneeContact':text})}
                     value={this.state.consigneeContact}
                    />
                </View>
                <Text></Text>
                <Button title = "Create Shipper/Consignee" onPress = {() => this.createShipper(this.state.shipperName,this.state.shipperAddressLine1)}/>
             </View>
            : 
            <View>
              <Text style= {{fontSize:15}}>Consignee Name</Text>
              <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Select consignee" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.companyConsignee(text)} 
                  value={this.state.consigneeNames}
                  />
              <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
            </View> 
            { this.state.consigneesuggest && this.state.consigneesuggest.map((suggestion , index) =>  
                      <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleConsignee(suggestion.consigneeName)}>
                          <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.consigneeName}</Text>
                      </TouchableOpacity>
                  )}
          <View style = {{marginTop:"3%"}}>
            <Text style= {{fontSize:15}}>Consignee Branch</Text>
            <SelectDropdown
                  data={this.state.consigneeBranch}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                  }}
                  buttonTextAfterSelection={(selectedItem, index) => {
                    return selectedItem.branchName
                  }}
                  rowTextForSelection={(item, index) => {
                    return item.branchName
                  }}
                  defaultButtonText = "Select Branch"
                  buttonStyle ={{width:"100%", borderRadius:10, backgroundColor:"transparent", borderColor:"#000000", borderWidth:2,}}
                />
          </View>
          <View style = {{marginTop:"3%"}}>
            <Text style= {{fontSize:15}}>Consignee Address</Text> 
                 <FlatList
                    data = {this.state.consigneeBranch}
                    renderItem={({item}) => 
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10, height:100}}
                    value = {item.addressLine1}
                   />
                  }
                  />  
          </View>
          </View>
            }
        </View>
        <Text></Text>
        {this.state.addShipper  || this.state.addConsignee ? null : 
        <View>
          <View>
            <Text style= {{fontSize:15}}>Account Type *</Text>
                <Picker
                  selectedValue={this.state.accountType}
                  style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                  onValueChange={(itemValue, itemIndex) =>this.setState({accountType: itemValue})}>
                  <Picker.Item label="Prepaid" value="Prepaid" />
                  <Picker.Item label="Collect" value="Collect" />
                </Picker>
            </View>
        <View style = {{marginTop:"3%"}}>
          <Text style= {{fontSize:15}}>Select Incoterms *</Text>
          <Picker
                  selectedValue={this.state.incoTerms}
                  style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                  onValueChange={(itemValue, itemIndex) =>this.setState({incoTerms: itemValue})}>
                  <Picker.Item label="POP" value="POP" />
                  <Picker.Item label="FOB" value="FOB" />
                  <Picker.Item label="8965785" value="8965785" />
                </Picker>
        </View>
        <View style = {{marginTop:"3%"}}>
          <Text style= {{fontSize:15}}>Number Of Container</Text>
           <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
             <Text style = {{fontSize:20}}>{getrate.noOfContainers}</Text>
           </View>
        </View>
        <View style = {{marginTop:"3%"}}>
          <Text style= {{fontSize:15}}>Gross Weight(KGS)</Text>
          <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
             <Text style = {{fontSize:20}}>{getrate.grossWeight}</Text>
           </View>
        </View>
        <View style = {{marginTop:"3%"}}>
          <Text style= {{fontSize:15}}>Volume Weight (CBM)</Text>
          <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
             <Text style = {{fontSize:20}}>{getrate.volumeWeight}</Text>
           </View>
        </View>
        </View> }
        <View style = {{display:"flex", marginTop:"5%", paddingBottom:"5%"}}>
          <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
          <Text style = {{fontSize:20, fontWeight:"700"}}>Dimension Details</Text>
          <TouchableOpacity onPress= {() => this.onDimention()}>
              <Text>Add Dimensions</Text>
          </TouchableOpacity>
          </View>
          {
             this.state.addDimention ? 
             <View>
             <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                  <View style = {{display:"flex", flexDirection:"row"}}>
                  <RadioButton
                      value="CM"
                      status={ this.state.checked === 'CM' ? 'checked' : 'unchecked' }
                      onPress={() => this.setState({checked:'CM'})}
                    />
                  <Text>  CM</Text>
                  </View>
                 <View style = {{display:"flex", flexDirection:"row"}}>
                 <RadioButton
                      value="MM"
                      status={ this.state.checked === 'MM' ? 'checked' : 'unchecked' }
                      onPress={() => this.setState({checked:'MM'})}
                    />
                    <Text>  MM</Text>
                  </View>
                  <View style = {{display:"flex", flexDirection:"row"}}>
                  <RadioButton
                      value="inches"
                      status={ this.state.checked === 'inches' ? 'checked' : 'unchecked' }
                      onPress={() => this.setState({checked:'inches'})}
                    />
                    <Text>  INCHES</Text>
                  </View>
                  <View style = {{display:"flex", flexDirection:"row"}}>
                  <RadioButton
                      value="meter"
                      status={ this.state.checked === 'meter' ? 'checked' : 'unchecked' }
                      onPress={() => this.setState({checked:'meter'})}
                    />
                    <Text>  METERS</Text>
                  </View> 
             </View>
             <View style = {{marginTop:"3%"}}>
                    <Text style= {{fontSize:15}}>Length</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Width</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Height</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Pieces</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <Text></Text>
                 <View>
                  <Text>Select Weight</Text>
                  <Picker
                    selectedValue={this.state.account}
                    style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                    onValueChange={(itemValue, itemIndex) =>this.setState({account: itemValue})}>
                    <Picker.Item label="Kgs" value="Kgs" />
                    <Picker.Item label="Lbs" value="Lbs" />
                  </Picker>
                </View>
                <View style = {{marginTop:"1%"}}>
                    <Text style= {{fontSize:15}}>Weight Per Piece</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}} placeholder="Gw/Pc"/>
                </View>
             </View>
            : null
          } 
        </View>
        {this.state.addShipper  || this.state.addConsignee ? null : 
        <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", paddingBottom:"30%", marginTop:"5%"}}>  
          <Text style = {{fontSize:20, fontWeight:"700"}}>HBL Details</Text>
          <TouchableOpacity style = {{top :"10%"}} onPress={this.componentHideAndShow}>
              <Text>HBL Required</Text>
          </TouchableOpacity>
          {
             this.state.content ? 
             <View>
               <Text></Text>
                <View style = {{marginTop:"3%"}}>
                    <Text style= {{fontSize:15}}>Issued By</Text>
                    <Picker
                      selectedValue={this.state.companyName}
                      style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                      onValueChange={(itemValue, itemIndex) =>this.setState({companyName: itemValue})}>
                        <Picker.Item label="OTHERS" value="OTHERS"/>
                      <Picker.Item label="AAA 2 INNOVATE PVT LTD" value="AAA 2 INNOVATE PVT LTD" />
                    </Picker>
                </View>
                <View style = {{marginTop:"3%"}}>
                    <Text style= {{fontSize:15}}>No Of HBL</Text>
                    <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
                      <Text style = {{fontSize:20, padding:"2%"}}>{this.state.noOfHawb}</Text>
                    </View>
                </View>
                <View style = {{width:"20%", top:"4%", alignSelf:"center"}}>
                 <Button title ="Add HBL" onPress={() => this.addHBL()}/>
                </View> 
                <FlatList
                    data = {this.state.selectHBL}
                    renderItem={({item}) => 
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                    value = {item}
                   />
                  }
                  /> 
             </View>
            : null
          }
        </View> 
        }
        <View style ={{paddingBottom:"5%"}}>
          <Button title = "Submit" onPress = {() => this.submit(this.state.quoteId, this.state.bookData._id, this.state.bookData, this.state.noOfContainers, this.state.grossWeight, this.state.volumeWeight, this.state.containerType, this.state.accountType, this.state.incoTerms, this.state.totalPieces, this.state.commodity, this.state.chargeableWeight)}/>
        </View>  
      </ScrollView>
                    </View>
                    </View>
                </Modal>
               </ScrollView>
               </ImageBackground>
               </ScrollView>
           {/* </LinearGradient> */}
      </GestureRecognizer>
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
    height:70,
    borderRadius:10,
    padding:"3%",
  },
  button: {
    alignItems: 'center',
    backgroundColor: 'transparent',
    height:70,
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

export default OceanGeneralStep1;