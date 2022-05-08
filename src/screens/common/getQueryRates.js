import React, { Component } from 'react';
import { View, Text, ScrollView, TouchableOpacity, TextInput, FlatList, Button, Linking, Modal } from 'react-native';
import Iconss from 'react-native-vector-icons/Entypo';
import { RadioButton } from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import SelectDropdown from 'react-native-select-dropdown';
import AsyncStorage from '@react-native-async-storage/async-storage';
import SearchableDropdown from 'react-native-searchable-dropdown';

const baseUrl = "https://coapi.zipaworld.com/";
//const customerId = AsyncStorage.getItem("authId")

class getQueryRates extends Component {

    MAX_LENGTH_CM = 318;
    MAX_WIDTH_CM = 224;
    MAX_HEIGHT_CM = 168;
    MAX_LENGTH_INCH = 125.197;
    MAX_WIDTH_INCH = 88.189;
    MAX_HEIGHT_INCH = 64.1732;
    MAX_LENGTH_MM = 3180;
    MAX_WIDTH_MM = 2240;
    MAX_HEIGHT_MM = 1680;
    MAX_LENGTH_MTR = 3.18;
    MAX_WIDTH_MTR = 2.24;
    MAX_HEIGHT_MTR = 1.63;

    MAX_LENGTH_FT = 10.4331;
    MAX_WIDTH_FT = 7.34908;
    MAX_HEIGHT_FT = 5.51181;

  constructor(props) {
    super(props);
    this.state = {
        bookNowData:"",
        "checked":"CM",
        contents : false,
        addShipper : false,
        showConsignee:false,
        proformaView:false,
        selectShow:"show",
        showHBl : false,
        "showOrigin": false,
        "showMatchData": false,
        "show" : false,
        "incoTerms" :"",
        "addDimention" : false,
        "addConsignee":false,
        "shipperNameRecord" : [],
        "shipperSuggest" : [],
        "shipperNames" :"",
        "shipperName": "",
        "consigneeName":"",
      "shipperAddressLine1": "",
      "shipperAddressLine2": "",
      "shipperCountryCode": "IN",
      "getAllCountry" : [],
      "getState" : [],
      "countrySuggest" : [],
      "shipperCountryName":"",

      "shipperCountryId": "",
      "noOfContainers":"",
      "grossWeight" :"",
      "volumeWeight" :"",
      "shipperStateName": "",
      "shipperStateCode": "10",
      "shipperStateId": "",
      "shipperCity": "",
      "shipperPincode": "",
      "shipperContact": "",
      "isStoredShipper": false,
      "customerId": "",
      "userBranchId": "",
      "consigneeAddressLine1": "",
      "consigneeAddressLine2": "",
      "consigneeCountryName": "",
      "consigneeCountryCode": "AS",
      "consigneeCountryId": "",
      "consigneeStateName": "",
      "consigneeStateCode": "",
      "consigneeStateId": "",
      "consigneeCity": "",
      "consigneePincode": "",
      "consigneeContact": "",
      "isStoredConsignee": false,

      "companyName":"",
      "noOfHawb" : 0,
      "issuedBySelection": "",
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
      "shipperBranch" :[],
      "branchSuggest" :[],
      "branchName":"",
      "consigneeNameRecord" : [],
      "consigneesuggest" : [],
      "consigneeNames" :"",
      "consigneeBranch": [],
      "bookNowData" :"",
       

      "dimensionShipperNameRecord":[],
      "dimensionShipperSuggest":[],
      "dimensionShipperName":"",
      "dimensionConsigneeSuggest":[],
      "dimensionConsigneeNameRecord":[],
      "dimensionConsigneeName":"",

      "length":"",
      "width" :"",
      "height" :"",
      "pieces" :"",
      "gw_pc" :"",
      "selectWeight":"",
      "shipperData":{
        "shipperName": "",
        "shipperId": "",
        "shipperBranchName": "",
        "shipperBranchId" :"",
        "shipperDetails": "",
        "isStoredShipper": true,
    }, 
    "consigneeData":{
        
        "consigneeName": "",
        "consigneeId":"",
        "consigneeBranchName": "",
        "consigneeBranchId" :"",
        "consigneeDetails": "",
        "isStoredConsignee": true
    }, 
    };
  }
 
  componentDidMount =async() => {
    const token = await AsyncStorage.getItem("userToken")
    const authId = await AsyncStorage.getItem("authId")
    const csBuddyBranchId = await AsyncStorage.getItem('authCSBuddyBranchId');
    const branchId = await AsyncStorage.getItem("authCustomerBranchId")
    const authName = await AsyncStorage.getItem("authName")
    const authBranchName = await AsyncStorage.getItem("authBranchName")
    console.log("aaaaaaaauuuuuutttttttttttttthhhhhhh", branchId)
    if(token){
      this.setState({
        customerId : authId,
        branchId : branchId,
        userBranchId: branchId,
        customerName : authName,
        authToken: token,
      })
    }
      this.setState({
        bookNow : this.props.route.params.bookingData,
        quoteId : this.props.route.params.quoteId,
        rateId : this.props.route.params.rateId,
        noOfContainers : this.props.route.params.noOfContainers,
        grossWeight : this.props.route.params.grossWeight,
        volumeWeight : this.props.route.params.volumeWeight,
        totalPieces : this.props.route.params.totalPieces,
        bookNowData: this.props.route.params.bookingCharges,
        chargeableWeight : this.props.route.params.chargeableWeight,
        revertLoggedData : this.props.route.params.revertLoggedData,
        remainingCharges : this.props.route.params.remainingCharges,
        originAirport : this.props.route.params.originAirport,
        destinationAirport : this.props.route.params.destinationAirport,
        containerType : this.props.route.params.containerType,
        dateOfSign: this.props.route.params.clearenceDate,
        shipmentMode : this.props.route.params.shipmentMode,
        commodity : this.props.route.params.commodity,
        commodityHsnCode: this.props.route.params.commodityHsnCode,
        //chargeableWeight : this.state.chargeableWeight,
        queryFor : this.props.route.params.queryFor,
        tarrifMode : this.props.route.params.tarrifMode, 
        activityType : this.props.route.params.activityType, 
        additionalService : this.props.route.params.additionalService,
        queryCharges: this.props.route.params.queryCharges,
        density : this.props.route.params.density,
        originDoor: this.props.route.params.originDoor,
        destinationDoor: this.props.route.params.destinationDoor
      },() => {
          console.log("totalPieces", this.state.totalPieces)
          console.log("Destination Airport", this.state.destinationAirport)
          console.log("Date", this.state.chargeableWeight)
      })
    this.companyShipper();
    this.companyConsignee();
    this.getIncoterms();
    this.handleCountry();
  }

  createRateLoggedUserFunction =async(quoteId, queryCharges)=>{
    // const getCharges = await AsyncStorage.getItem("AllCharges")
    // console.log("allllll", getCharges)
    let obj = {
      quoteId : quoteId,
      shipmentMode : this.state.shipmentMode,
      revertData : queryCharges
    }
    // console.log("daaaataaaaa",obj)
   fetch(baseUrl + "api/auth/queries/rates/createRateLoggedUser", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
      },
      body : JSON.stringify(obj)
    }).then((response) => response.json())
    .then (async(results) => {
      //console.log("idddddddddddddd", results)
           this.setState({
            loggedUserCharges: results.result,
            revertLoggedData: results.result[0],
            remainingCharges : results.result[1],
            isLoading:false
           }, () => {
             console.log("charges", this.state.loggedUserCharges)
           })
        })
     .catch((error) => console.log("error", error))
  }

  buySaleFunction = async() => {
    const token = await AsyncStorage.getItem("userToken")
    let objj = {
      quoteId :this.state.quoteId,
      dimentions: [
        {
            "length": this.state.length,
            "width": this.state.width,
            "height": this.state.height,
            "pieces": this.state.pieces,
            "gw_pc": this.state.gw_pc,
            "selectWeight": this.state.selectWeight
        }
    ],
    dimensions: [
        {
          "length": this.state.length,
          "width": this.state.width,
          "height": this.state.height,
          "pieces": this.state.pieces,
          "gw_pc": this.state.gw_pc,
          "selectWeight": this.state.selectWeight
        }
    ],
      rateId:this.state.rateId,
      revertData:this.state.bookNow,
      remainingCharges: this.state.remainingCharges,
      saleValue: {
        "charges": this.state.bookNowData,
    },
      otherIncentive: [],
      otherShipment: [],
      branchId:this.state.branchId,
      gstType: "",
      customer: {
        customerId: this.state.customerId,
        customerBranchId: this.state.branchId,
        customerName: this.state.customerName,
        customerBranchName: "",
        "pos": "",
        "gstType": "",
        "gstNo": ""
    },
      "NoOfContainer": this.state.noOfContainers,
      "totalGross": this.state.grossWeight,
      "totalVolume": this.state.volumeWeight,
      "containerType": this.state.containerType,
      "isRatesStored": true,
      "accountType": this.state.accountType,
      "incoTerms": this.state.incoTerms,
      "issuedBySelection": this.state.accountType,
      "issuedBySelectionBranch": "",
      "natureAndQuantityOfGoods": this.state.commodity,
      "confirmedRateId": this.state.rateId,
      "shipperConsigneeData": {
        "shipperName": this.state.shipperData.shipperName,
        "shipperId": this.state.shipperData.shipperId,
        "shipperBranchName": "",
        "shipperBranchId": this.state.shipperData.shipperBranchId,
        "shipperDetails": "",
        "isStoredShipper": true,
        "consigneeName": this.state.consigneeData.consigneeName,
        "consigneeId": this.state.consigneeData.consigneeId,
        "consigneeBranchName": "",
        "consigneeBranchId": this.state.consigneeData.consigneeBranchId,
        "consigneeDetails": "",
        "isStoredConsignee": true
      },
      "houses": [
        {
            "totalPieces": this.state.totalPieces,
            "gross": this.state.grossWeight,
            "volume": this.state.volumeWeight,
            "chargeable": this.state.grossWeight,
            "NoOfContainer": this.state.noOfContainers,
            "dimensions": [
                {
                    "length": this.state.length1,
                    "width": this.state.width1,
                    "height": this.state.height1,
                    "pieces": this.state.totalpieces,
                    "gw_pc": this.state.gw_pc1,
                    "selectWeight": this.state.weightValue
                }
            ],
            "shipperName": this.state.shipperName,
            "shipperBranchName": "",
            "consigneeName": this.state.consigneeName,
            "consigneeBranchName": "",
            "houseNumber": this.state.noOfHawb,
            "selectedHawb": "",
            "noOfPieces": this.state.totalPieces,
            "grossWeight": this.state.grossWeight,
            "volumeWeight": this.state.volumeWeight,
            "chargeableWeight": this.state.grossWeight,
            "houseNo": this.state.noOfHawb,
            "noOfContainers": this.state.noOfContainers,
            "containerType": this.state.containerType
        }
      ]
    }


    if (this.state.shipperData.shipperName.trim() === "") {
        alert("Select the Shipper")
      } else  {
    fetch(baseUrl + "api/invoice/buySale/create", {
        method:"Post",
        headers:{
          "Content-Type" : "application/json",
          "authkey" : token,
        },
        body : JSON.stringify(objj)
      }).then((response) => response.json())
      .then ((results) => {
        console.log("submit HBL",results);
            this.setState((previousState) => ({
                createBuySaleId : results.result._id,
                proformaView: !previousState.proformaView
                //performaModal:true
              }), () => {
                this.csApprovalFunction(this.state.createBuySaleId);
              })
        
      })
      .catch((error) => console.log("error", error));
  }
}

  submit = async() => {
    const token = await AsyncStorage.getItem("userToken")
    let obj = {
      "attachments": [],
      "branchId": this.state.branchId,
      "csBuddy": "5e21984c844c5b57f2d0f7ef",
      "pricingHead": "5f2a7d2e0aacb678d9bda759",
      "salesPerson": "5f2a7d2e0aacb678d9bda759",
      "financePerson": "5f2a7d2e0aacb678d9bda759",
      "customerId" : this.state.customerId,
      "customerBranchId" : this.state.branchId,
      "temperature": "Normal Temp",
      "temperatureDetails": "",
      "chargeableWeight" : this.state.chargeableWeight,
      "dg": [],
      "contactEmail": "",
      "contactNumber": "",
      "queryEnteredByPhone": "",
      "source": "mobile",
      "grossWeight": this.state.grossWeight,
      "volumeWeight": this.state.volumeWeight,
      "totalPieces": this.state.totalPieces,
      "noOfContainers": this.state.noOfContainers,
      "density": this.state.density,
      "clearenceDate": this.state.dateOfSign,
      "rateType": "",
      "shipmentMode": this.state.shipmentMode,
      "containerType": this.state.containerType,
      "originAirport":this.state.originAirport,
      "originDoor": this.state.originDoor,
    "destination": {},
    "destinationAirport": this.state.destinationAirport,
    "destinationDoor": this.state.destinationDoor,
      "stuffingType": "",
      "custType": "Shipper",
      "otherCommodity": "",
      "commodity": this.state.commodity,
      "commodityHsnCode": this.state.commodityHsnCode,
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
      "queryType": "Ocean Export",
      "queryFrom": "Customer",
      "queryFor": this.state.queryFor,
      "additionalService":this.state.additionalService,
      "activityType" : this.state.activityType,
      "tarrifMode" : this.state.tarrifMode,
      "weight": {
        "gross": "123",
        "volume": "11",
        "chargeable": "11.00"
    },
     "isValid": false,
     "errors": false,
     "charge" :[],
     "chargesss":[],
     "userBranchId": this.state.branchId,
    }
     
    fetch(baseUrl + "api/auth/queries/create", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
        "authkey" : token
      },
      body : JSON.stringify(obj)
    }).then((result) => {
      //alert('hitted')
          result.json().then((res) => {
          console.log("searchhhhhhhhhhhFunctionnnnnnnnnn",res);
            this.setState((previousState) => ({
              quoteId:res.result._id,
              // modal : true
            }), () => {
              this.createRateLoggedUserFunction(this.state.quoteId, this.state.queryCharges)
            });
          
        })
        })
    .catch((error) => {
      //alert('errrrr')
      console.log("error", error)});
      // setTimeout(() => {
      //   this.buySaleFunction();
      // }, 3000)  
      this.buySaleFunction();
  }
  csApprovalFunction = async(createBuySaleId) => {
   // const customerBranch = await AsyncStorage.getItem("customerBranchId") 
    const token = await AsyncStorage.getItem("userToken");
    const authId = await AsyncStorage.getItem("authId");
    console.log("IDddddddddofauth", authId);
    const branchId = await AsyncStorage.getItem("authBranchId");
   let obj = {
      "rateId":this.state.rateId,
      "buySaleId": createBuySaleId,
      "quoteId": this.state.quoteId,
      "isCopied": "",
      "copiedFrom": {},
      "isRejected": "",
      "rejectedMessage": "",
      "shipmentType": "Direct",
      "customerId": this.state.customerId,
      "branchId": this.state.branchId,
      "containerType":this.state.containerType,
      "containerDetails":this.state.container,
      "noOfContainers": this.state.noOfContainers,
      "noOfHouses": this.state.noOfHawb,
      "scacNumber": "",
      "shipperId" : this.state.shipperData.shipperId,
      "consigneeId" : this.state.consigneeData.consigneeId,
      "shipperBranchId" : this.state.shipperData.shipperBranchId,
      "consigneeBranchId" : this.state.consigneeData.consigneeBranchId,
      //"shippingLineName": "YANG MING (NETHERLANDS) B.V.",
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
      "dateOfSignature": this.state.dateOfSign,
      "carrierOrAgentSignature": "",
      "SCI": "",
      "otherInformation": "",
      "shipmentBookingNo": "",
      "shipmentBookingDate": "",
      "isShipmentBooked": false,
      "isNegativeShipment": false,
      "handlingInfo": "",
      "remarks": "",
      "bookingNo": "",
      "volumeWeight": this.state.volumeWeight,
      "noOfPieces": this.state.totalPieces,
      "accountType": this.state.accountType,
      "incoTerms": this.state.incoTerms,
      "issuedBySelection": this.state.accountType,
      "natureAndQuantityOfGoods": this.state.commodity,
      "grossWeight": this.state.grossWeight,
      "chargeableWeight": this.state.chargeableWeight,
      "dimentions": [
        {
            "length": this.state.length,
            "width": this.state.width,
            "height": this.state.height,
            "pieces": this.state.pieces,
            "gw_pc": this.state.gw_pc,
            "selectWeight": this.state.selectWeight
        }
    ],
    "dimensions": [
        {
          "length": this.state.length,
          "width": this.state.width,
          "height": this.state.height,
          "pieces": this.state.pieces,
          "gw_pc": this.state.gw_pc,
          "selectWeight": this.state.selectWeight
        }
    ],
    
    "houses": [
      {
          "totalPieces": this.state.totalPieces,
          "gross": this.state.grossWeight,
          "volume": this.state.volumeWeight,
          "chargeable": this.state.grossWeight,
          "NoOfContainer": this.state.noOfContainers,
          "dimensions": [
              {
                  "length": this.state.length1,
                  "width": this.state.width1,
                  "height": this.state.height1,
                  "pieces": this.state.totalpieces,
                  "gw_pc": this.state.gw_pc1,
                  "selectWeight": this.state.weightValue
              }
          ],
          "shipperName": this.state.shipperName,
          "shipperBranchName": "",
          "consigneeName": this.state.consigneeName,
          "consigneeBranchName": "",
          "houseNumber": this.state.noOfHawb,
          "selectedHawb": "",
          "noOfPieces": this.state.totalPieces,
          "grossWeight": this.state.grossWeight,
          "volumeWeight": this.state.volumeWeight,
          "chargeableWeight": this.state.grossWeight,
          "houseNo": this.state.noOfHawb,
          "noOfContainers": this.state.noOfContainers,
          "containerType": this.state.containerType
      }
  ]
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
        try {
            await AsyncStorage.setItem('csId', results.result._id);
        } catch (error) {
            
        }
        this.setState({
          csApprovalId : results.result._id,
        }, () => {
          console.log("aaaa", this.state.csApprovalId)
          this.getByBooking(this.state.csApprovalId)
          this.getBooking(this.state.csApprovalId)
        })
    }).catch((error) => console.log("error", error));
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
        console.log("get booking",results);
        this.setState({
         // bookingGstTotalCharge: results.result.proformaData,
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
          data: results.result.proformaData.customer,
          bookingData:results.result,
          customerDataName:results.result.customerData,
          comapanyBranchData:results.result.comapanyBranchData,
          originAdd: results.result.proformaData.originAirport,
          destinationAdd: results.result.proformaData.destinationAirport,
        })
      }).catch((error) => console.log("error", error));
   }

//    getBooking = async(csApprovalId) => {
//     const token = await AsyncStorage.getItem("userToken")
//    //const customerBranchId = await AsyncStorage.getItem("customerBranchId")
//     fetch(baseUrl + "api/proforma/getByBookingId", {
//       method: "Post",
//       headers:{
//          "Content-Type" : "application/json",
//          "authkey" : token
//       },
//       body : JSON.stringify({id: csApprovalId})
//       }).then((response) => response.json())
//       .then((results) => {
//         console.log("get booking By id data",results);
//         this.setState({
//           bookingGstTotalCharge: results.result.proformaData,
//           getByBookingId:results.result.bookingId,
//           getById:this.state._id
//         })
//       }).catch((error) => console.log("error", error));
//    }

   createShipper =  async(shipperName,shipperAddressLine1, consigneeAddressLine1) => {
    const token = await AsyncStorage.getItem("userToken");
    const customerId = await AsyncStorage.getItem("authId")
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
        "shipperCountryName": this.state.shipperCountryName,
        "shipperCountryCode": "AS",
        "shipperCountryId": this.state.countryId,
        "shipperStateName": this.state.shipperStateName,
        "shipperStateCode": "",
        "shipperStateId": this.state.shipperStateId,
        "shipperCity": "",
        "shipperPincode": "",
        "userBranchId" : this.state.userBranchId,
        "shipperContact": "",
        "isStoredShipper": false,
        "customerId": customerId ,
        "consigneeName": this.state.consigneeName,
        "consigneeAddressLine1": consigneeAddressLine1,
        "consigneeAddressLine2": "",
        "consigneeCountryName": this.state.consigneeCountryName,
        "consigneeCountryCode": "AS",
        "consigneeCountryId": "",
        "consigneeStateName": "",
        "consigneeStateCode": "",
        "consigneeStateId": this.state.consigneeStateId,
        "consigneeCity": "",
        "consigneePincode": "",
        "consigneeContact": "",
        "isStoredConsignee": false
      })
    }).then((response) => response.json())
    .then ((results) => {
      console.log("crrreeeaaattee",results);
      alert(results.message)
    })
    .catch((error) => console.log("error", error));
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
         // performaInvoice:true,
          getProformaBybookingId: results.result._id
        }, () => {
            console.log("p id", this.state.getProformaBybookingId)
             this.props.navigation.navigate("ProformaView", {getProforma:this.state.getProformaBybookingId, date: this.state.dateOfSign})
        //   this.proformaGetApi(this.state.getProformaBybookingId),
        //   this.getBookingsApi(this.state.getProformaBybookingId)
        })
    }).catch((error) => console.log("error", error));
  }

   hblRequired = () => {
    this.setState((previousState) => ({ 
      contents: !previousState.contents 
    }), () => {
      this.setState({
        noOfHawb : 0
      })
    })
    }
  
    Shipper = () => {
    this.setState((previousState) => ({ addShipper: !previousState.addShipper }))
    }
    
    onDimention = () => {
    this.setState((previousState) => ({ addDimention: !previousState.addDimention }))
    }
    
    // onConsignee = () => {
    // this.setState((previousState) => ({ addConsignee: !previousState.addConsignee }))
    // }


    getAllCountry = async(text) => {
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
                getAllCountry :  results.result,
                //getId :results.result._id
              });
            }).catch((error) => console.log("error", error));
      
         let matches = []
         if(undefined !==text && text.length > 0){
          matches = this.state.getAllCountry && this.state.getAllCountry.filter(codes => {
              const regex = new RegExp(`${text}`, "gi");
              return codes.name.match(regex)
            })
          }
        console.log(matches)
        this.setState({countrySuggest: matches})
        this.setState({shipperCountryName:text})
      }

      handleCountry = async(text, _id) => {
        this.setState({countrySuggest: []})
        this.setState({countryId: _id}, () => {
            console.log("IdddCCCCC", _id)
        })
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
            body: JSON.stringify({countryId: _id})
          }).then((response) => response.json())
            .then((results) => {
                console.log("sssttt",results.result);
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
      
      handleCountrys = async(texts, _id) => {
        this.setState({countrySuggest: []})
        this.setState({country : _id}, () => console.log("country id", _id))
        this.setState({consigneeCountryName:texts})
          const token = await AsyncStorage.getItem("userToken")
          fetch("https://coapi.zipaworld.com/api/auth/masters/state/getByCountry", {
              method : "Post",
              headers : {
                  "Content-Type" : "application/json",
                  "authkey" : token
              },
            body: JSON.stringify({countryId: _id})
          }).then((response) => response.json())
            .then((results) => {
                console.log("sssttttaaaattteeee",results.result);
                this.setState({
                  getState :  results.result
                });
            }).catch((error) => console.log("error", error));
      }


    companyShipper = async(text) => {
        const token = await AsyncStorage.getItem("userToken");
        const customerId = await AsyncStorage.getItem("authId");
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
              console.log("companyshipper", results);
              this.setState({
                shipperNameRecord :  results.result.data
              });
            }).catch((error) => console.log("error", error));
      
         let matches = []
         if(undefined !==text && text.length > 0){
          matches = this.state.shipperNameRecord && this.state.shipperNameRecord.filter((codes,i) => {
              console.log("shipper iddd", codes._id)
              const regex = new RegExp(`${text}`, "gi");
              return codes.shipperName.match(regex)
            })
          }
        console.log(matches)
        this.setState({shipperSuggest: matches})
        this.setState({shipperNames:text})
      }
      
      onSuggestShipper = async(text, _id, branchId ) => {
            let obj = {}
            obj.shipperId = _id,
            obj.shipperName = text,
            obj.shipperBranchId = branchId,
            this.setState({
              shipperData : obj,
              shipId : _id
            },()=>{
              console.log("shipper data", this.state.shipId);
              this.companyShipperBranch(this.state.shipId)
            }) 
          this.setState({shipperSuggest: []})
          this.setState({shipperNames:text})
      }


      companyShipperBranch = async(shipId) => {
        const token = await AsyncStorage.getItem("userToken")
        fetch(baseUrl + "api/masters/shipper/Branch/getBranches", {
          method : "Post",
          headers : {
              "Content-Type" : "application/json",
               "authkey" : token
          },
          body: JSON.stringify({id: shipId})
          }).then((response) => response.json())
          .then((results) => {
            console.log("Shipppppeeeeeerrrrrr",results);
            this.setState({
              shipperBranch :  results.result,
              codeCountry : results.result.countryId
            });
          }).catch((error) => console.log("error", error));
      }
        
      companyConsignee = async(text) => {
          const token = await AsyncStorage.getItem("userToken")
          const customerId = await AsyncStorage.getItem("authId")
          // console.log(text)
          fetch(baseUrl + "api/masters/consignee/managerCustomer", {
              method : "Post",
              headers : {
                  "Content-Type" : "application/json",
                   "authkey" : token
              },
              body: JSON.stringify({customerId: customerId, search: text})
              }).then((response) => response.json())
              .then((results) => {
                console.log("cooonnnnnnnnnnnnnnnssssssssiiiiiiiiiggggg",results);
                this.setState({
                  consigneeNameRecord :  results.result.data
                }, () => {
                  console.log("aaaaaaaaaaaaaaa", this.state.consigneeNameRecord.name)
                });
              }).catch((error) => console.log("error", error));
      
          //  let matches = []
          //  if(undefined !==text && text.length > 0){
          //   matches = this.state.consigneeNameRecord && this.state.consigneeNameRecord.filter((codes, i) => {
          //       const regex = new RegExp(`${text}`, "gi");
          //       return codes.consigneeName.match(regex)
          //     })
          //   }
          // console.log(matches)
          // this.setState({consigneesuggest: matches})
          // this.setState({consigneeNames:text})
      }
      
      
      handleConsignee = async(text, _id, branchId) => {
        let obj = {}
        obj.consigneeId = _id,
        obj.consigneeName = text,
        obj.consigneeBranchId = branchId
        this.setState({
          consigneeData: obj,
          consigneeId : _id
        },()=>{
          console.log("Consignee data",this.state.consigneeData)
        })
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
                body: JSON.stringify({id: _id})
                }).then((response) => response.json())
                .then((results) => {
                  console.log("consignessssssss",results);
                  this.setState({
                    consigneeBranch :  results.result
                  });
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
              body : JSON.stringify({noOfHawb:1, companyName: this.state.companyName})
            }).then((response) => response.json())
            .then ((results) => {
              console.log("crrreeeaaattee",results.result);
              this.setState((previousState) => ({
                selectHBL: results.result,
                noOfHawb: this.state.noOfHawb + 1,
                showMatchData : true
              }))
              // hblRequired = () => {
              //   this.setState((previousState) => ({ contents: !previousState.contents }))
              //   }
            })
            .catch((error) => console.log("error", error));
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

  downloadCSV = () => {
    Linking.openURL("https://test231220.s3.ap-south-1.amazonaws.com/akash/s3Bucketoo0.7056215923785736-1612094389549.csv")
  }


  dimensionShipper = async(text) => {
    const token = await AsyncStorage.getItem("userToken");
    const customerId = await AsyncStorage.getItem("authId");
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
          console.log("companyshipper", results);
          this.setState({
            dimensionShipperNameRecord :  results.result.data
          });
        }).catch((error) => console.log("error", error));
  
     let matches = []
     if(undefined !==text && text.length > 0){
      matches = this.state.dimensionShipperNameRecord && this.state.dimensionShipperNameRecord.filter((codes,i) => {
          console.log("shipper iddd", codes._id)
          const regex = new RegExp(`${text}`, "gi");
          return codes.shipperName.match(regex)
        })
      }
    console.log(matches)
    this.setState({dimensionShipperSuggest: matches})
    this.setState({dimensionShipperName:text})
  }
  
  onSuggestDimensionShipper = async(text, _id, branchId ) => {
        let obj = {}
        obj.shipperId = _id,
        obj.shipperName = text,
        obj.shipperBranchId = branchId,
        this.setState({
          shipperData : obj,
          shipId : _id
        },()=>{
          console.log("shipper data",_id)
        }) 
      this.setState({dimensionShipperSuggest: []})
      this.setState({dimensionShipperName:text})
  
      const token = await AsyncStorage.getItem("userToken")
      fetch(baseUrl + "api/masters/shipper/Branch/getBranches", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
             "authkey" : token
        },
        body: JSON.stringify({id: _id})
        }).then((response) => response.json())
        .then((results) => {
          console.log("Shipppppeeeeeerrrrrr",results);
          this.setState({
            shipperBranch :  results.result,
            codeCountry : results.result.countryId
          });
        }).catch((error) => console.log("error", error));
      // console.log(text)
      }
    
  dimensionConsignee = async(text) => {
      const token = await AsyncStorage.getItem("userToken")
      const customerId = await AsyncStorage.getItem("authId")
      // console.log(text)
      fetch(baseUrl + "api/masters/consignee/managerCustomer", {
          method : "Post",
          headers : {
              "Content-Type" : "application/json",
               "authkey" : token
          },
          body: JSON.stringify({customerId: customerId, search: text})
          }).then((response) => response.json())
          .then((results) => {
            this.setState({
              dimensionConsigneeNameRecord :  results.result.data
            });
          }).catch((error) => console.log("error", error));
  
       let matches = []
       if(undefined !==text && text.length > 0){
        matches = this.state.dimensionConsigneeNameRecord && this.state.dimensionConsigneeNameRecord.filter((codes,i) => {
            const regex = new RegExp(`${text}`, "gi");
            return codes.consigneeName.match(regex)
          })
        }
      console.log(matches)
      this.setState({dimensionConsigneesuggest: matches})
      this.setState({dimensionConsigneeName:text})
  }
  
  
  handleDimensionConsignee = async(text, _id, branchId) => {
    let obj = {}
    obj.consigneeId = _id,
    obj.consigneeName = text,
    obj.consigneeBranchId = branchId
    this.setState({
      consigneeData: obj
    },()=>{
      console.log("Consignee data",this.state.consigneeData)
    })
        this.setState({dimensionConsigneesuggest: []})
        this.setState({dimensionConsigneeName:text}, () => {
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
            body: JSON.stringify({id: _id})
            }).then((response) => response.json())
            .then((results) => {
              console.log("consignessssssss",results);
              this.setState({
                consigneeBranch :  results.result
              });
            }).catch((error) => console.log("error", error));
      }

  hideHBlData = (id) => {
    const filteredData = this.state.selectHBL.filter(item => item.id !== id);
    this.setState({ selectHBL: filteredData });
  }

  checkForValidatingHouseAndMasterData = () => {
    let quoteData =  this.state.quoteData
    let houseData = this.state.houseData
    let array = []

    let totalVolumeHouses=0
    let totalPiecesHouses=0
    let totalGrossHouses=0
    houseData && houseData.map((item, i) => {
        totalVolumeHouses=parseFloat(item.volumeWeight)+parseFloat(totalVolumeHouses)
        totalPiecesHouses=parseFloat(item.noOfPieces)+parseFloat(totalPiecesHouses)
        totalGrossHouses=parseFloat(item.grossWeight)+parseFloat(totalGrossHouses)
    })
    quoteData.volumeWeight=parseFloat(quoteData.volumeWeight).toFixed(2)
    quoteData.totalPieces=Math.round(quoteData.totalPieces)
    quoteData.grossWeight=parseFloat(quoteData.grossWeight).toFixed(2)

    totalVolumeHouses=parseFloat(totalVolumeHouses).toFixed(2)
    totalPiecesHouses=Math.round(totalPiecesHouses)
    totalGrossHouses=parseFloat(totalGrossHouses).toFixed(2)

    quoteData.totalVolumeHouses=totalVolumeHouses
    quoteData.totalPiecesHouses=totalPiecesHouses
    quoteData.totalGrossHouses=totalGrossHouses
    this.setState({quoteData})

};


  render() {
    const {data, getrate, originport, destinationport, rates, originAdd, comapanyBranchData, destinationAdd, charge, bookingGst, bookingGstData, bookingData, customerDataName, chargesss} = this.state
    return (
        <View>
            {this.state.proformaView ? 
             <ScrollView style={{ backgroundColor:"#ffffff", borderRadius:10, height:"100%", padding:"2%"}}>
             <Text style = {{fontSize:22, fontWeight:"700"}}> Booking Confirmation </Text>
                <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottomWidth:1, padding:"3%", borderTopWidth:0.1,borderLeftWidth:0.1, borderRightWidth:0.1}}>
                <View>
                <Text style = {{fontSize:15, fontWeight:"600"}}>Name</Text>
                {/* <Text style = {{fontSize:15, fontWeight:"600"}}>Address</Text>
                <Text style = {{fontSize:15, fontWeight:"600"}}>Country</Text> */}
                <Text style = {{fontSize:15, fontWeight:"600"}}>Pan number</Text>
                {/* <Text style = {{fontSize:15, fontWeight:"600"}}>Client number</Text> */}
                {/* <Text style = {{fontSize:15, fontWeight:"600"}}>GST number</Text> */}
                <Text style = {{fontSize:15, fontWeight:"600"}}>Booking number</Text>
                <Text style = {{fontSize:15, fontWeight:"600"}}>Date</Text>
                <Text style = {{fontSize:15, fontWeight:"600"}}>Payment Terms</Text>
                </View>
                <View>
       <Text>{customerDataName.customerName}</Text>
       {/* <Text>{customerDataName.customerCode}</Text> */}
       <Text>{customerDataName.panNo}</Text>
       {/* <Text>{data.gstNo}</Text> */}
       <Text>{bookingData.bookingNo}</Text>
       <Text>{bookingData.dateOfSignature}</Text>
       <Text>{bookingGstData.paymentTerms}</Text>
       {/* <Text>{data.gstNo}</Text> */}
     </View>
     </View>
     <Text></Text>
     <View style ={{borderBottomWidth:1}}>
     <Text style = {{fontSize:22, fontWeight:"700"}}> HBL Details </Text>
     <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
     <View>
     <Text style = {{fontSize:15, fontWeight:"600"}}>Shipper</Text>
     <Text style = {{fontSize:15, fontWeight:"600"}}>Consignee</Text>
     <Text style = {{fontSize:15, fontWeight:"600"}}>HBL No.</Text>
     <Text style = {{fontSize:15, fontWeight:"600"}}>No of Pieces</Text>
     </View>
     {/* <View>
       <Text>{bookingGstData.shipperName}</Text>
       <Text>{bookingGstData.consigneeName}</Text>
       <Text></Text>
       <Text>{bookingGstData.totalPieces}</Text>
     </View> */}
     </View>
     </View>
     <Text></Text>
     <View style ={{borderBottomWidth:1}}>
     <Text style = {{fontSize:22, fontWeight:"700"}}> Shipment Details </Text>
     <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
     <View>
       <View>
         <Text style = {{fontSize:15, fontWeight:"600"}}>No.of Containers</Text>
         <Text style = {{fontSize:15, fontWeight:"600"}}>Gross Weight (KGS)</Text>
         <Text style = {{fontSize:15, fontWeight:"600"}}>No. of pakcages</Text>
         {/* <Text style = {{fontSize:15, fontWeight:"600"}}>commodity desc</Text> */}
         <Text style = {{fontSize:15, fontWeight:"600"}}>Quotation Number</Text>
         <Text style = {{fontSize:15, fontWeight:"600"}}>INCO terms</Text>
         <Text style = {{fontSize:15, fontWeight:"600"}}>Terms</Text>
       </View>
     </View>
     <View>
       <Text>{bookingData.noOfContainers}</Text>
       <Text>{bookingGstData.grossWeight}</Text>
       <Text>{bookingGstData.totalPieces}</Text>
       {/* <Text>{getrate.commodity}</Text> */}
       <Text>{bookingGstData.jobNo}</Text>
       <Text>{bookingData.incoTerms}</Text>
       <Text>{bookingData.accountType}</Text>
     </View>
     </View>
     </View>
     <View style ={{borderBottomWidth:1}}>
     <Text style = {{fontSize:22, fontWeight:"700"}}> Shipper/Consignee Details </Text>
     <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
     <View>
     <Text style = {{fontSize:15, fontWeight:"600"}}>Shipper</Text>
     <Text style = {{fontSize:15, fontWeight:"600"}}>Consignee</Text>
     <Text style = {{fontSize:15, fontWeight:"600"}}>Origin</Text>
     <Text style = {{fontSize:15, fontWeight:"600"}}>Destination</Text>
     </View>
     <View>
       <Text>{bookingGstData.shipperName}</Text>
       <Text>{bookingGstData.consigneeName}</Text>
       <Text>{originAdd.name}</Text>
       <Text>{destinationAdd.name}</Text>
     </View>
     </View>
     </View>
     <View style ={{borderBottomWidth:1}}>
     <Text style = {{fontSize:22, fontWeight:"700"}}> INTENDED TRANSPORT PLAN DETAILS </Text>
     <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"3%"}}>
       <Text>From</Text>
       <Text>To</Text>
       <Text>Vessel no</Text>
       <Text>Voyage no</Text>
       <Text>ETD</Text>
       <Text>ETA</Text>
     </View>
     </View>
     <View style ={{borderBottomWidth:1}}>
     <Text style = {{fontSize:22, fontWeight:"700"}}> Charges </Text>
     <View style = {{paddingBottom:"5%"}}>
       <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"space-between"}}>
          <Text style = {{fontSize:15, fontWeight:"600"}}>Code</Text>
          <Text style = {{fontSize:15, fontWeight:"600"}}>Description</Text>
          <Text style = {{fontSize:15, fontWeight:"600"}}>GST</Text>
          <View>
           <Text style = {{fontSize:15, fontWeight:"600"}}>Total Amount</Text>
          </View>
       </View>
       {bookingGst && bookingGst.map((bookingCode, i) => {
           console.log("bbboookkkiiinnnggg", bookingCode.chargeHsnCode);
           return (
             <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"space-between"}}>  
             <Text>{bookingCode.chargeHsnCode}</Text>
             <View style = {{width:"15%"}}>
             <View>    
             <Text>{bookingCode.chargeName}-{bookingCode.chargeQty}</Text>
             <Text> x {bookingCode.altName}</Text>
             </View>
             </View>
             <Text>{bookingCode.chargeIgstRate} %</Text>
             <Text>{bookingGstData.baseCurrency} {parseFloat(bookingCode.taxableB).toFixed(2)}</Text>
             </View>
           )
       })} 
       <Text></Text>
       <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-end"}}>
          <Text style = {{fontSize:15, fontWeight:"600"}}>Total excl. GST</Text>
          <Text>  {bookingGstData.currency} {bookingGstData.taxableTotalAmountB}</Text>
       </View>
       <Text></Text>
       <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-end"}}>
          <Text style = {{fontSize:15, fontWeight:"600"}}>GST Amount</Text>
          <Text>  {bookingGstData.currency} {parseFloat(bookingGstData.igstTotalAmountB).toFixed(2)}</Text>
       </View>
       <Text></Text>
       <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-end"}}>
          <Text style = {{fontSize:15, fontWeight:"600"}}>Total Amount Due</Text>
          <Text style = {{marginLeft:"2%"}}>{bookingGstData.baseCurrency} {parseFloat(bookingGstData.totalAmountB).toFixed(2)}</Text>
       </View>
       <Text></Text>
       <View style ={{paddingBottom:"5%", width:"20%", alignSelf:"center"}}>
         <Button title = "Next"  color ="#ff3800" onPress = {() => this.viewProformaInVoice()}/>
       </View>
       
     </View>
     </View>
   </ScrollView>
             
              : 
              
    <View>
        <ScrollView style = {{padding:"2%", backgroundColor:"#ffffff", height:"100%"}}>
           <View style = {{display:"flex"}}>     
            {
                     this.state.addShipper ? 
                     <View style = {{height:"100%"}}>
                        <View style = {{marginTop:"2%"}}>
                        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                        <Text style = {{fontSize:20, fontWeight:"700"}}>Shipper Details</Text>
                         <View style = {{width:"20%"}}> 
                          <Button title = "remove" color ="#ff3800" onPress= {() => this.Shipper()}/>
                         </View>
                        </View>
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
                              <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleCountry(suggestion.name, suggestion._id )}>
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
                        <View>
                          <Text></Text>
                         <Text style = {{fontSize:20, fontWeight:"800"}}>Consignee Details</Text> 
                        <View style = {{marginTop:"3%"}}>
                            <Text style= {{fontSize:15}}>Enter Consignee Name</Text>
                            <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                             onChangeText={(text) => this.setState({consigneeName:text})}
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
                              <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleCountrys(suggestion.name, suggestion._id)}>
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
                        <View style ={{width:"18%", alignSelf:"center"}}>
                        <Button title = "Create" color ="#ff3800" onPress = {() => this.createShipper(this.state.shipperName,this.state.shipperAddressLine1,this.state.consigneeAddressLine1)}/>
                        </View>
                     </View>
                     </View>
                    : 
        
                    <View>
                      <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                      <Text style = {{fontSize:20, fontWeight:"700"}}>Shipper Details</Text>
                      <View style = {{width:"40%"}}>
                       <Button title = "Add Shipper/Consignee" color ="#ff3800" onPress= {() => this.Shipper()}/>
                       </View>
                      </View>
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
                               <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestShipper(suggestion.shipperName, suggestion._id, suggestion.branchId._id)}>
                                   <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.shipperName}</Text>
                               </TouchableOpacity>
                           )}
                   <View style = {{marginTop:"3%"}}>
                     <Text style= {{fontSize:15}}>Shipper Branch</Text>
                     <View>
                     {/* <Button title = "ok" onPress ={() => this.companyShipperBranch(this.state.shipId)}/> */}
                     {/* <TouchableOpacity onPress = {() => this.companyShipperBranch()}>
                         <View>
                         {this.state.showOrigin ? 
                          <View style = {{display:"flex", flexDirection:"row", alignSelf:"center", width:"60%", justifyContent:"space-between", marginTop:"3%"}}>
                            <Text style = {{fontWeight:"600", fontSize:27, marginLeft:"5%"}}>Select Branch</Text>
                          </View> : 
                          <View style = {{display:"flex", flexDirection:"row"}}>
                            <Text style = {{fontWeight:"600", fontSize:21,  marginLeft:"5%", marginTop:"3%"}}>{this.state.branchName}</Text>
                          </View>
                        }
                         </View>
                     </TouchableOpacity>
                     <Modal transparent={true} visible={this.state.show} animationType="slide">
                      <View style = {{backgroundColor:"#000000aa", flex:1}}>
                          <View style = {{backgroundColor:"#ffffff", marginTop: 100, height:320,padding : 10, borderRadius:10}}>  
                          <View style = {{padding:"2%", height:"100%"}}>
                          <TouchableOpacity onPress={() => this.setState({show:false})}>
                            <Iconss name = "cross" size={30} style = {{alignSelf:"flex-end"}} />
                          </TouchableOpacity> 
                            <Text></Text> 
                            <View style = {{backgroundColor:"#ffffff",borderRadius:10, marginTop:"1%",}}>   
                            { this.state.shipperBranch && this.state.shipperBranch.map((suggestion , i) =>  
                                <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.setState({
                                   branchName: suggestion.branchName,
                                   show : false
                                })}>
                                    <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.branchName}</Text>
                                </TouchableOpacity>
                            )}
                            </View>
                          </View>
                            </View>
                          </View>
                     </Modal> */}
                      <SelectDropdown
                          data={this.state.shipperBranch}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            this.setState({showOrigin:true})
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
                     {this.state.showOrigin ?
                       <View style = {{marginTop:"3%"}}>
                         <FlatList
                            data = {this.state.shipperBranch}
                            renderItem={({item}) => 
                            <View>
                              <Text style= {{fontSize:15}}>Shipper Address</Text>
                              <Text></Text>
                                <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10, height:100}}
                                value = {item.addressLine1}
                              />
                           </View>
                          }
                          />    
                       </View> : null }
                     </View>
                  }
                </View> 
                <Text></Text>  
                 <View>
                    {/* <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>  
                      <Text style = {{fontSize:20, fontWeight:"700"}}>Consignee Details</Text>
                      <TouchableOpacity onPress={() => this.onConsignee()}>
                          <Text>New Consignee</Text>
                      </TouchableOpacity>
                    </View>  */}
                    <View>
                      <Text style= {{fontSize:15}}>Consignee Name</Text>
                      <SearchableDropdown
          onTextChange={(text) => console.log(text)}
          //On text change listner on the searchable input
          onItemSelect={(item) => alert(JSON.stringify(item))}
          //onItemSelect called after the selection from the dropdown
          containerStyle={{ padding: 5 }}
          //suggestion container style
          textInputStyle={{
            //inserted text style
            padding: 12,
            borderWidth: 1,
            borderColor: '#ccc',
            backgroundColor: '#FAF7F6',
          }}
          itemStyle={{
            //single dropdown item style
            padding: 10,
            marginTop: 2,
            backgroundColor: '#FAF9F8',
            borderColor: '#bbb',
            borderWidth: 1,
          }}
          itemTextStyle={{
            //text style of a single dropdown item
            color: '#222',
          }}
          itemsContainerStyle={{
            //items container style you can pass maxHeight
            //to restrict the items dropdown hieght
            maxHeight: '50%',
          }}
          items={this.state.consigneeNameRecord}
          //mapping of item array
          defaultIndex={2}
          //default selected item index
          placeholder="placeholder"
          //place holder for the search input
          resetValue={false}
          //reset textInput Value with true and false state
          underlineColorAndroid="transparent"
          //To remove the underline from the android input
        />
                      {/* <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                        <TextInput 
                          placeholder="Select consignee" 
                          placeholderTextColor= "#000000" 
                          style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                          keyboardType="email-address"
                          onChangeText={(text) => this.companyConsignee(text)} 
                          value={this.state.consigneeNames}
                          />
                      <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                    </View>  */}
                    {/* { this.state.consigneesuggest && this.state.consigneesuggest.map((suggestion , index) =>  
                              <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleConsignee(suggestion.consigneeName, suggestion._id, suggestion.branchId._id)}>
                                  <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.consigneeName}</Text>
                              </TouchableOpacity>
                          )} */}
                  <View style = {{marginTop:"3%"}}>
                    <Text style= {{fontSize:15}}>Consignee Branch</Text>
                    <SelectDropdown
                          data={this.state.consigneeBranch}
                          onSelect={(selectedItem, index) => {
                            console.log(selectedItem, index)
                            this.setState({
                              showConsignee:true
                            })
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
                  {this.state.showConsignee ?
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
                  </View> : null }
                  </View>
                </View>
                <Text></Text>
                {this.state.addShipper  || this.state.addConsignee ? null : 
                <View>
                  <View>
                    <Text style= {{fontSize:15}}>Account Type *</Text>
                    <View style = {{borderRadius:10, borderWidth:2}}>
                        <Picker
                          selectedValue={this.state.accountType}
                          style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                          onValueChange={(itemValue, itemIndex) =>this.setState({accountType: itemValue})}>
                          <Picker.Item label="Prepaid" value="Prepaid" />
                          <Picker.Item label="Collect" value="Collect" />
                        </Picker>
                      </View>  
                    </View>
                <View style = {{marginTop:"3%"}}>
                  <Text style= {{fontSize:15}}>Select Incoterms *</Text>
                  <View style = {{borderRadius:10, borderWidth:2}}>
                  <Picker
                          selectedValue={this.state.incoTerms}
                          style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                          onValueChange={(itemValue, itemIndex) =>this.setState({incoTerms: itemValue})}>
                          <Picker.Item label="POP" value="POP" />
                          <Picker.Item label="FOB" value="FOB" />
                          <Picker.Item label="8965785" value="8965785" />
                  </Picker>
                  </View>      
                </View>
                <View style = {{marginTop:"3%"}}>
                  <Text style= {{fontSize:15}}>Number Of Container</Text>
                   <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
                     <Text style = {{fontSize:20}}>{this.state.noOfContainers}</Text>
                   </View>
                </View>
                <View style = {{marginTop:"3%"}}>
                  <Text style= {{fontSize:15}}>Gross Weight(KGS)</Text>
                  <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
                     <Text style = {{fontSize:20}}>{this.state.grossWeight}</Text>
                   </View>
                </View>
                <View style = {{marginTop:"3%"}}>
                  <Text style= {{fontSize:15}}>Volume Weight (CBM)</Text>
                  <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
                     <Text style = {{fontSize:20}}>{this.state.volumeWeight}</Text>
                   </View>
                </View>
                </View> }
                <View style = {{display:"flex", marginTop:"5%", paddingBottom:"5%"}}>
                  {
                     this.state.addDimention ? 
                     <View>
                       <View style = {{display:"flex"}}>
                         <Text style = {{fontSize:20, fontWeight:"700"}}>Dimension Details</Text>
                         <View style = {{width:"30%"}}>
                           <Button title = "Remove" color ="#ff3800" onPress = {() => this.onDimention()}/>
                         </View>
                    </View>
                     <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"1%"}}>
                          <View style = {{display:"flex", flexDirection:"row"}}>
                          <RadioButton
                              value="CM"
                              status={ this.state.checked === 'CM' ? 'checked' : 'unchecked' }
                              onPress={() => this.setState({checked:'CM'})}
                              color ="#ff3800"
                            />
                          <Text>  CM</Text>
                          </View>
                         <View style = {{display:"flex", flexDirection:"row"}}>
                         <RadioButton
                              value="MM"
                              status={ this.state.checked === 'MM' ? 'checked' : 'unchecked' }
                              onPress={() => this.setState({checked:'MM'})}
                              color ="#ff3800"
                            />
                            <Text>  MM</Text>
                          </View>
                          <View style = {{display:"flex", flexDirection:"row"}}>
                          <RadioButton
                              value="inches"
                              status={ this.state.checked === 'inches' ? 'checked' : 'unchecked' }
                              onPress={() => this.setState({checked:'inches'})}
                              color ="#ff3800"
                            />
                            <Text>  INCHES</Text>
                          </View>
                          <View style = {{display:"flex", flexDirection:"row"}}>
                          <RadioButton
                              value="meter"
                              status={ this.state.checked === 'meter' ? 'checked' : 'unchecked' }
                              onPress={() => this.setState({checked:'meter'})}
                              color ="#ff3800"
                            />
                            <Text>  METERS</Text>
                          </View> 
                     </View>
                     <View style = {{marginTop:"3%"}}>
                            <Text style= {{fontSize:15}}>Length</Text>
                            <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                              onChangeText={(text) => this.setState({length:text}, () => {
                                console.log("Meter", this.state.length)
                              })}
                            />
                        </View>
                        <View style = {{marginTop:"1%"}}>
                            <Text style= {{fontSize:15}}>Width</Text>
                            <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                            onChangeText={(text) => this.setState({width:text})}/>
                        </View>
                        <View style = {{marginTop:"1%"}}>
                            <Text style= {{fontSize:15}}>Height</Text>
                            <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                             onChangeText={(text) => this.setState({height:text})}
                            />
                        </View>
                        <View style = {{marginTop:"1%"}}>
                            <Text style= {{fontSize:15}}>Pieces</Text>
                            <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                            onChangeText={(text) => this.setState({pieces:text})}
                            />
                        </View>
                        <Text></Text>
                         <View>
                          <Text>Select Weight</Text>
                          <View style = {{borderWidth:2, borderRadius:10}}>
                          <Picker
                            selectedValue={this.state.selectWeight}
                            style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                            onValueChange={(itemValue, itemIndex) =>this.setState({selectWeight:itemValue})}>
                            <Picker.Item label="Kgs" value="Kgs" />
                            <Picker.Item label="Lbs" value="Lbs" />
                          </Picker>
                          </View>
                        </View>
                        <View style = {{marginTop:"1%"}}>
                            <Text style= {{fontSize:15}}>Weight Per Piece</Text>
                            <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}} placeholder="Gw/Pc"
                             onChangeText={(text) => this.setState({gw_pc:text})}
                            />
                        </View>
                        <Text></Text>
                        {/* <View style = {{width:"20%", alignSelf:"center", marginTop:"2%"}}>
                          <Button title = "Add" color ="#ff3800" onPress={() => this.dimensionAdd()}/>
                        </View>
                         <View>
                            
                         </View> */}
                        <Text></Text>
                        <Text>Download Dimension Format</Text>
                        <View style = {{width:"50%", alignSelf:"center", marginTop:"2%"}}>
                          <Button title = "Download CSV Format" color ="#ff3800" onPress = {() => this.downloadCSV()}/>
                        </View>
                     </View>
                    :  
                    <View style = {{display:"flex"}}>
                      <Text style = {{fontSize:20, fontWeight:"700"}}>Dimension Details</Text>
                      <View style = {{width:"30%"}}>
                       <Button title = "Add Dimensions" color ="#ff3800" onPress = {() => this.onDimention()}/>
                      </View>
                    </View>
                  } 
                </View>
                {this.state.addShipper  || this.state.addConsignee ? null : 
                <View style = {{display:"flex", flexDirection:"column", justifyContent:"space-between", paddingBottom:"30%", marginTop:"5%"}}>  
                  {/* <Text style = {{fontSize:20, fontWeight:"700"}}>HBL Details</Text>
                  <TouchableOpacity onPress= {() => this.hblRequired()}>
                      <Text>HBL Required</Text>
                  </TouchableOpacity> */}
                  {
                     this.state.contents ? 
                     <View>
                       <View style = {{marginTop:"2%", display:"flex", flexDirection:"row"}}>
                    <RadioButton
                              value="show"
                              status={ this.state.selectShow === 'show' ? 'checked' : 'unchecked' }
                              onPress= {() => this.hblRequired()}
                              color ="#ff3800"
                            />
                        <Text style = {{fontSize:20, fontWeight:"800", marginTop:"1%"}}>  HBL required</Text>    
                        {/* <Button title = "HBL" color ="#ff3800" onPress= {() => this.hblRequired()}/> */}
                      </View>
                        <View style = {{marginTop:"3%"}}>
                            <Text style= {{fontSize:15}}>Issued By</Text>
                            <View style = {{borderWidth:2, borderRadius:10}}>
                            <Picker
                              selectedValue={this.state.companyName}
                              style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                              onValueChange={(itemValue, itemIndex) =>{
                                 if(this.state.noOfHawb != 0) {
                                   alert("Houses Must Be 0 For Switching Issued By")
                                   this.setState({companyName: itemValue})
                                 }else {
                                  this.setState({companyName: itemValue})
                                 }
                              }}>
                                <Picker.Item label="Select" value=""/>
                                <Picker.Item label="OTHERS" value="OTHERS"/>
                                <Picker.Item label="AAA 2 INNOVATE PVT LTD" value="AAA 2 INNOVATE PVT LTD" />
                            </Picker>
                            </View>
                        </View>
                        <View style = {{marginTop:"3%"}}>
                            <Text style= {{fontSize:15}}>No Of HBL</Text>
                            <View>
                              {this.state.companyName !== "OTHERS" ?
                                <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
                                  <Text style = {{fontSize:20, padding:"2%"}}>{this.state.noOfHawb}</Text>
                                </View>
                              :
                              <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
                                <TextInput placeholder= "Code"/>
                              </View>
                              }
                            </View>
                        </View>
                        <Text></Text>
                        <View style = {{width:"20%", alignSelf:"center"}}>
                         <Button title ="Add HBL" color ="#ff3800" onPress={() => this.addHBL()}/>
                        </View>
                        {this.state.showMatchData && this.state.noOfHawb !== 0  ?
                        <View>
                        <View style = {{padding:"3%", flexDirection:"column"}}>
                        <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
                           <Text>#</Text>
                           <View>
                            <Text>Volume</Text>
                            <Text>Weight</Text>
                           </View>
                           <View>
                           <Text>Gross</Text>
                           <Text>Weight</Text>
                           </View>
                           <Text>No of Pieces</Text>
                        </View>
                        <View style = {{paddingRight:"10%"}}>
                        <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
                           <Text>Houses</Text>
                           <Text>{this.state.volumeWeight}</Text>
                           <Text>{this.state.grossWeight}</Text>
                           <Text>{this.state.totalPieces}</Text>
                        </View>
                        <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
                           <Text>Masters</Text>
                           <Text>{this.state.volumeWeight}</Text>
                           <Text>{this.state.grossWeight}</Text>
                           <Text>{this.state.totalPieces}</Text>
                        </View>
                        </View>
                        <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
                           <Text>#</Text>
                           {this.state.volumeWeight==this.state.volumeWeight?<Text style={{backgroundColor:"green"}} >Matched</Text>:<Text style={{backgroundColor:"red"}}>Unmatched</Text>}
                           {this.state.grossWeight==this.state.grossWeight?<Text style={{backgroundColor:"green"}}>Matched</Text>:<Text style={{backgroundColor:"red"}}>Unmatched</Text>}
                           {this.state.totalPieces==this.state.totalPieces?<Text style={{backgroundColor:"green"}}>Matched</Text>:<Text style={{backgroundColor:"red"}}>Unmatched</Text>}
                        </View>
                        </View>
                        
                        <FlatList
                            data = {this.state.selectHBL}
                            //keyExtractor={({item}) => item.id}
                            renderItem={({item}) =>
                            <View>
                            <Text></Text> 
                            {this.state.showMatchData && this.state.noOfHawb !== 0  ?
                            <View>
                            <View style ={{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                              <Text style = {{fontSize:20, fontWeight:"700"}}>HBL DETAILS</Text>
                              <View style = {{width:"15%"}}>
                                <Button title = "Remove" onPress={() => {

                                }}/>
                              </View>  
                            </View>
                            <View>
                            {this.state.companyName == "OTHERS" ?  
                              <TextInput placeholder= "HBL Number" style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}/>
                            : 
                            <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}}
                              value = {item}
                              editable ={false}
                            />
                            }</View>
                        <View style = {{marginTop:"3%"}}>
                          <Text style= {{fontSize:15}}>Shipper Name</Text>
                        <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                          <TextInput 
                            placeholder="Select Shipper" 
                            placeholderTextColor= "#000000" 
                            style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                            keyboardType="email-address"
                            onChangeText={(text) => this.dimensionShipper(text)} 
                            value={this.state.shipperNames}
                            />
                        <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                      </View> 
                      { this.state.shipperSuggest && this.state.shipperSuggest.map((suggestion , index) =>  
                                <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestDimensionShipper(suggestion.shipperName, suggestion._id, suggestion.branchId._id)}>
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
                              this.setState({
                                  shipperBranch:selectedItem
                              })
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
                           </View>
                        <View>
              <Text style= {{fontSize:15}}>Consignee Name</Text>
              <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Select consignee" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.dimensionConsignee(text)} 
                  value={this.state.consigneeNames}
                  />
              <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
            </View> 
            { this.state.consigneesuggest && this.state.consigneesuggest.map((suggestion , index) =>  
                      <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleDimensionConsignee(suggestion.consigneeName, suggestion._id, suggestion.branchId._id)}>
                          <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.consigneeName}</Text>
                      </TouchableOpacity>
                  )}
          <View style = {{marginTop:"3%"}}>
            <Text style= {{fontSize:15}}>Consignee Branch</Text>
            <SelectDropdown
                  data={this.state.consigneeBranch}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    this.setState({
                        consigneeBranch:selectedItem
                    })
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
          <Text style= {{fontSize:15}}>Number Of Container</Text>
           <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
             <Text style = {{fontSize:20}}>{this.state.noOfContainers}</Text>
           </View>
        </View>
        <View style = {{marginTop:"3%"}}>
          <Text style= {{fontSize:15}}>Gross Weight(KGS)</Text>
          <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
             <Text style = {{fontSize:20}}>{this.state.grossWeight}</Text>
           </View>
        </View>
        <View style = {{marginTop:"3%"}}>
          <Text style= {{fontSize:15}}>Volume Weight (CBM)</Text>
          <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
             <Text style = {{fontSize:20}}>{this.state.volumeWeight}</Text>
           </View>
        </View>
          <View style = {{marginTop:"1%"}}>
              <Text style = {{fontSize:20, fontWeight:"800"}}>Please Enter Dimensions</Text>
                <Text>Length</Text>
                <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Length" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({length1:text})} 
                  //value={this.state.length}
                  />
            </View> 
            <Text>Width</Text>
                <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Width" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({width1:text})} 
                  //value={this.state.width}
                  />
                </View> 
                <Text>Height</Text>
                <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Height" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({height1:text})} 
                  //value={this.state.height}
                  />
            </View> 
            <Text>Pieces</Text>
                <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Pieces" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({totalpieces:text})} 
                  //value={this.state.pieces}
                  />
            </View> 
            <View>
                <Text style= {{fontSize:15}}>Select Weight</Text>
                 <View style = {{borderRadius:10, borderWidth:2}}>
                    <Picker
                        selectedValue={this.state.weightValue}
                        style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                        onValueChange={(itemValue, itemIndex) =>this.setState({weightValue: itemValue})}>
                        <Picker.Item label="Lbs" value="Lbs" />
                        <Picker.Item label="Kgs" value="Kgs" />
                        </Picker>
                  </View>
            </View>
            <Text>Gross weight per piece</Text>
                <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Weight" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({gw_pc1:text})} 
                  //value={this.state.consigneeNames}
                  />
            </View> 
          </View>
                        </View>
                        </View> : null}
                        </View>
                          }
                          /> 
                        </View>: null }
                          <View>
                            {/* <View style = {{marginTop:"3%"}}>
                          <Text style= {{fontSize:15}}>Shipper Name</Text>
                        <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
                          <TextInput 
                            placeholder="Select Shipper" 
                            placeholderTextColor= "#000000" 
                            style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                            keyboardType="email-address"
                            onChangeText={(text) => this.dimensionShipper(text)} 
                            value={this.state.shipperNames}
                            />
                        <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
                      </View> 
                      { this.state.shipperSuggest && this.state.shipperSuggest.map((suggestion , index) =>  
                                <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestDimensionShipper(suggestion.shipperName)}>
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
                              this.setState({
                                  shipperBranch:selectedItem
                              })
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
                           </View>
                        <View>
              <Text style= {{fontSize:15}}>Consignee Name</Text>
              <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Select consignee" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.dimensionConsignee(text)} 
                  value={this.state.consigneeNames}
                  />
              <Iconss name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
            </View> 
            { this.state.consigneesuggest && this.state.consigneesuggest.map((suggestion , index) =>  
                      <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.handleDimensionConsignee(suggestion.consigneeName)}>
                          <Text style = {{fontSize:20, color:"#000000"}}>{suggestion.consigneeName}</Text>
                      </TouchableOpacity>
                  )}
          <View style = {{marginTop:"3%"}}>
            <Text style= {{fontSize:15}}>Consignee Branch</Text>
            <SelectDropdown
                  data={this.state.consigneeBranch}
                  onSelect={(selectedItem, index) => {
                    console.log(selectedItem, index)
                    this.setState({
                        consigneeBranch:selectedItem
                    })
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
          <Text style= {{fontSize:15}}>Number Of Container</Text>
           <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
             <Text style = {{fontSize:20}}>{this.state.noOfContainers}</Text>
           </View>
        </View>
        <View style = {{marginTop:"3%"}}>
          <Text style= {{fontSize:15}}>Gross Weight(KGS)</Text>
          <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
             <Text style = {{fontSize:20}}>{this.state.grossWeight}</Text>
           </View>
        </View>
        <View style = {{marginTop:"3%"}}>
          <Text style= {{fontSize:15}}>Volume Weight (CBM)</Text>
          <View style ={{borderColor:"#000000", borderWidth:2, borderRadius:10, height:50}}>
             <Text style = {{fontSize:20}}>{this.state.volumeWeight}</Text>
           </View>
        </View>
          <View style = {{marginTop:"1%"}}>
              <Text style = {{fontSize:20, fontWeight:"800"}}>Please Enter Dimensions</Text>
                <Text>Length</Text>
                <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Length" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({length1:text})} 
                  //value={this.state.length}
                  />
            </View> 
            <Text>Width</Text>
                <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Width" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({width1:text})} 
                  //value={this.state.width}
                  />
                </View> 
                <Text>Height</Text>
                <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Height" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({height1:text})} 
                  //value={this.state.height}
                  />
            </View> 
            <Text>Pieces</Text>
                <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Pieces" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({totalpieces:text})} 
                  //value={this.state.pieces}
                  />
            </View> 
            <View>
                <Text style= {{fontSize:15}}>Select Weight</Text>
                 <View style = {{borderRadius:10, borderWidth:2}}>
                    <Picker
                        selectedValue={this.state.weightValue}
                        style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                        onValueChange={(itemValue, itemIndex) =>this.setState({weightValue: itemValue})}>
                        <Picker.Item label="Lbs" value="Lbs" />
                        <Picker.Item label="Kgs" value="Kgs" />
                        </Picker>
                  </View>
            </View>
            <Text>Gross weight per piece</Text>
                <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between", marginTop:"2%"}}>
                <TextInput 
                  placeholder="Weight" 
                  placeholderTextColor= "#000000" 
                  style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                  keyboardType="email-address"
                  onChangeText={(text) => this.setState({gw_pc1:text})} 
                  //value={this.state.consigneeNames}
                  />
            </View> 
          </View>
                        </View> */}
                            </View>
                     </View>   
                    
                    : 
                    <View>
                    <View style = {{marginTop:"2%", display:"flex", flexDirection:"row"}}>
                    <RadioButton
                              value="show"
                              status={ this.state.checked === 'show' ? 'checked' : 'unchecked' }
                              onPress= {() => this.hblRequired()}
                              color ="#ff3800"
                            />
                        <Text style = {{fontSize:20, fontWeight:"800", marginTop:"1%"}}> HBL required</Text>    
                        {/* <Button title = "HBL" color ="#ff3800" onPress= {() => this.hblRequired()}/> */}
                      </View>
                    </View>  
                  }
                </View> 
                }
               <View style ={{paddingBottom:"15%", width:"20%", alignSelf:"center"}}>
                  <Button title = "Submit"  color ="#ff3800" onPress = {() => this.submit()}/>
               </View> 
              </ScrollView> 
        </View>
        }
        </View>
    );
  }
}

export default getQueryRates;
