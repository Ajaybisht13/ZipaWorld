import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';

class MawbViewCustomer extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "csApproval" : [],
      "rateId": "",
      "buySaleId": "61890a730c974c7aaa4d3ae9",
      "quoteId": "618908ff0c974c7aaa4d352d",
      "isCopied": "",
      "copiedFrom": {},
      "isRejected": "Pending",
      "rejectedMessage": "",
      "shipmentType": "Direct",
      "customerId": "606ef470e5ab230f74117965",
      "branchId": "6164217242b852300fcf41d0",
      "noOfContainers": 1,
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
      "dateOfSignature": "2021-11-08",
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
      "pricingApproval": false,
      "csBuddyApproval": false,
      "bookingNo": "",
      "volumeWeight": "13",
      "noOfPieces": "12",
      "accountType": "Prepaid",
      "incoTermsId": "60a4aa6b36b67b6f679b5d2d",
      "incoTerms": "POP",
      "issuedBySelection": "Prepaid",
      "natureAndQuantityOfGoods": "Auto Parts",
      "dimentions": [],
      "dimensions": [],
      "grossWeight": "80",
      "kgOrLBS": "kg",
      "chargeableWeight": "13.00"
    };
  }

  componentDidMount = () => {
    this.getData()
  }

  getData = async() => { 
    const token = await AsyncStorage.getItem("userToken")
    fetch("https://coapi.zipaworld.com/api/bookings/csApproval", {
        method:"Post",
        headers:{
          "Content-Type" : "application/json",
          "authkey" : token
        },
       body: JSON.stringify(this.state)
      }).then((response) => response.json())
      .then ((results) => {
        console.log("cssssssss",results);
        this.setState({
          csApproval : results.result
        })
      })
      .catch((error) => console.log("error", error));
  }  

  render() {
    const origin = AsyncStorage.getItem('originPort');
    const {bookingData} = this.props.route.params;
    return (
      <ScrollView>
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
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
        </View>
        </View>
        <Text style = {{fontSize:22}}> Shipment Details </Text>
        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
        <View>
          <View>
            <Text>No.of Containers</Text>
            <Text>Gross Weight (KGS</Text>
            <Text>No. of pakcages</Text>
            <Text>Commodity HSN</Text>
            <Text>Commodity Description</Text>
            <Text>Quotation Number</Text>
            <Text>INCO terms</Text>
            <Text>Terms</Text>
          </View>
        </View>
        <View>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
          <Text></Text>
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
          <Text>Name</Text>
          <Text>Consignee</Text>
          <Text>{origin.name}</Text>
          <Text>Destination</Text>
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
        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
          <Text>Code</Text>
          <Text>Description</Text>
          <Text>GST</Text>
          <Text>Total Amount</Text>
        </View>
      </ScrollView>
    );
  }
}

export default MawbViewCustomer;
