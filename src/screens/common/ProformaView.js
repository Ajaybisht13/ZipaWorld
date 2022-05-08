import React, { Component } from 'react';
import { View, Text, ScrollView, FlatList, Button, ActivityIndicator } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RazorpayCheckout from 'react-native-razorpay';

const baseUrl = "https://coapi.zipaworld.com/";


class ProformaView extends Component {
  constructor(props) {
    super(props);
    this.state = {
      "proformaGetData" : "",
      invoiceNo:"",
      otherCharges:[],
      isLoading : true
    };
  }
  
  componentDidMount = async() => {
    const token = await AsyncStorage.getItem("userToken")
    const guestId = await AsyncStorage.getItem("customerId")
    const authId = await AsyncStorage.getItem("authId")
    const authName = await AsyncStorage.getItem("authName")
    const customerBranchId = await AsyncStorage.getItem("customerBranchId")
    const authCustomerBranchId = await AsyncStorage.getItem("authCustomerBranchId");
    console.log("token",token);
    if(token){
      this.setState({customerId : authId, customerBranchId : authCustomerBranchId, authName:authName});
      this.setState({
        getProforma : this.props.route.params.getProforma,
        clearDate : this.props.route.params.date,
      },() => {
        console.log("dd", this.state.getProforma);
        this.proformaGetApi(this.state.getProforma);
        this.getBookingsApi(this.state.getProforma);
      })
    }
}

proformaGetApi = async(getProforma) => {
  const token = await AsyncStorage.getItem("userToken")
  fetch(baseUrl + "api/proforma/get", {
    method : "Post",
    headers : {
        "Content-Type" : "application/json",
        "authkey" : token,
    },
  body: JSON.stringify({id: getProforma})
}).then((response) => response.json())
  .then((results) => {
      console.log("prformi get api data",results);
      this.setState({
        proformaGetData: results.result,
        bookingId: results.result.bookingId
      }, () => {
        this.getBookingsApi(this.state.bookingId);
        this.getByBookingApi(this.state.bookingId);
      })
  }).catch((error) => console.log("error", error));
}

getBookingsApi = async(bookingId) => {
  const token = await AsyncStorage.getItem("userToken")
  fetch(baseUrl + "api/bookings/get", {
    method : "Post",
    headers : {
        "Content-Type" : "application/json",
        "authkey" : token,
    },
  body: JSON.stringify({id: bookingId})
}).then((response) => response.json())
  .then((results) => {
      console.log(" get  booking api data",results);
      this.setState({
        //performaInvoice:true,
        proformaGetData: results.result,
        customerData : results.result.proformaData.customer.customerName,
        proformaId : results.result.proformaData._id,
        proformaTotalAmount: results.result.proformaData.totalAmountB,
        proformaInvoiceNo : results.result.proformaData.invoiceNo,
        currency : results.result.proformaData.currency,
        pos : results.result.proformaData.pos,
        gstType : results.result.proformaData.gstType,
        gstNo: results.result.proformaData.gstNo
      })
  }).catch((error) => console.log("error", error));
}

getByBookingApi = async(bookingId) => {
  const token = await AsyncStorage.getItem("userToken")
  fetch(baseUrl + "api/proforma/getByBookingId", {
    method : "Post",
    headers : {
        "Content-Type" : "application/json",
        "authkey" : token,
    },
  body: JSON.stringify({id: bookingId})
}).then((response) => response.json())
  .then((results) => {
      console.log(" get by booking api data",results);
      this.setState({
        //performaInvoice:true,
        getByBookingIdData: results.result,
        invoiceNo: results.result.invoiceNo,
        bookingId:results.result.bookingId,
        invoiceDate:results.result.invoiceDate,
        grossWeight: results.result.grossWeight,
        totalPieces:results.result.totalPieces,
        jobNo: results.result.jobNo,
        shipperName:results.result.shipperName,
        consigneeName:results.result.consigneeName,
        originPort:results.result.originAirport.name,
        destinationPort:results.result.destinationAirport.name,
        otherCharges:results.result.otherCharges,
        taxableTotalAmountB:results.result.taxableTotalAmountB,
        igstTotalAmountB:results.result.igstTotalAmountB,
        currency:results.result.currency,
        totalAmountB:results.result.totalAmountB,
        isLoading:false
      }, () => {
        console.log("innn", this.state.invoiceNo)
      })
  }).catch((error) => console.log("error", error));
}



paymentHandle = async() => {
  const token = await AsyncStorage.getItem("userToken")
  const authId = await AsyncStorage.getItem("authId")
   let obj = {
      customer: {
          customerId: authId,
          customerBranchId: this.state.customerBranchId,
          customerName: this.state.customerData,
          customerBranchName: "",
          pos: this.state.pos,
          gstType: this.state.gstType,
          gstNo: this.state.gstNo
      },
      performaInvoiceId:this.state.proformaId,
      currency: this.state.currency,
      amount: this.state.proformaTotalAmount,
      receipt: this.state.proformaInvoiceNo,
      type: "PROFORMA INVOICE"
  }

  fetch(baseUrl + "api/masters/pay/createOrder", {
    method : "Post",
    headers : {
        "Content-Type" : "application/json",
        "authkey" : token,
    },
  body: JSON.stringify(obj)
}).then((response) => response.json())
 .then((results) => {
    console.log("aaaaaaaa", results);
    this.setState({
         paymentCurrency: results.result.currency,
         paymentKey: results.result.key,
         paymentAmount : results.result.amount,
         custName: results.result.customer.customerName,
         orderId: results.result.orderId,
    }, () => {
      this.paymentGateWay(this.state.paymentCurrency, this.state.paymentKey,this.state.paymentAmount, this.state.custName, this.state.orderId);
    })
 })
}

paymentGateWay = (paymentCurrency, paymentKey, paymentAmount, custName , orderId) => {
  var options = {
    description: 'PleaseMake Payment',
    image: 'https://i.imgur.com/3g7nmJC.png',
    currency: paymentCurrency,
    key: paymentKey,
    amount: paymentAmount,
    name: "AAA2INNOVATE.COM",
    order_id: orderId,//Replace this with an order_id created using Orders API.
    prefill: {
      email: '',
      contact: '',
      name: ''
    },
    theme: {color: '#53a20e'}
  }
  RazorpayCheckout.open(options).then((data) => {
    // handle success
    alert("Payment Success");
  }).catch((error) => {
    // handle failure
    alert("Oops! Something went worng. Your Payment has been declined as the order is invalid.");
  });
}

  render() {
    return (
      <View>
        {this.state.isLoading ? 
          <View>
             <ActivityIndicator size = {"large"}/>
          </View> :
        <ScrollView style={{ backgroundColor:"#ffffff", borderRadius:10, height:"100%", padding:"2%"}}>
          <Text style = {{fontSize:22, alignSelf:"center"}}> Proforma Invoice </Text>
          <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
             <Text>INVOICE TO : </Text>
             <View style = {{width:"20%"}}>
               <Button title = "Pay now" color ="#ff3800" onPress = {() => this.paymentHandle()}/>
             </View>
          </View>
          <Text></Text>
         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", borderBottomWidth:1, paddingBottom:"3%"}}>
          <View>
           <Text>Proforma Invoice number :</Text>
           <Text>Name :</Text>
           {/* <Text>Pan number :</Text>
           <Text>Client number :</Text>
           <Text>GST number :</Text> */}
           <Text>Booking number :</Text>
           <Text>Date :</Text>
         </View>
         <View>
           <Text>{this.state.invoiceNo}</Text>
           <Text>{this.state.customerData}</Text>
           {/* <Text></Text>
           <Text></Text>
           <Text></Text> */}
           <Text>{this.state.proformaGetData.bookingNo}</Text>
           <Text>{this.state.clearDate}</Text>
         </View>
         </View>
         <View style = {{borderBottomWidth:1, paddingBottom:"3%"}}>
         <Text style = {{fontSize:22}}> Shipment Details </Text>
         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
         <View>
           <View>
             {/* <Text>No.of Containers</Text> */}
             <Text>Gross Weight (KGS) :</Text>
             <Text>No. of pakcages :</Text>
             <Text>Quotation Number :</Text>
             {/* <Text>INCO terms :</Text>
             <Text>BL Number :</Text> */}
           </View>
         </View>
         <View>
           {/* <Text>{bookingData.noOfContainers}</Text> */}
           <Text>{this.state.grossWeight}</Text>
           <Text>{this.state.totalPieces}</Text>
           {/* <Text></Text> */}
           <Text>{this.state.jobNo}</Text>
           {/* <Text>{this.state.proformaGetData.incoTerms}</Text>
           <Text>{this.state.proformaGetData.blNo}</Text> */}
         </View>
         </View>
         </View>
         <View style = {{borderBottomWidth:1, paddingBottom:"3%"}}>
         <Text style = {{fontSize:22}}> Shipper/Consignee Details </Text>
         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"2%"}}>
         <View>
         <Text>Shipper :</Text>
         <Text>Consignee :</Text>
         <Text>Booking No. :</Text>
         <Text>Origin :</Text>
         <Text>Destination :</Text>
         </View>
         <View>
           <Text>{this.state.shipperName}</Text>
           <Text>{this.state.consigneeName}</Text>
           <Text>{this.state.proformaGetData.bookingNo}</Text>
           <Text>{this.state.originPort}</Text>
           <Text>{this.state.destinationPort}</Text>
         </View>
         </View>
         </View>
         <View style = {{borderBottomWidth:1, paddingBottom:"3%"}}> 
         <Text style = {{fontSize:22}}> INTENDED TRANSPORT PLAN DETAILS </Text>
         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", padding:"3%"}}>
           <Text>From</Text>
           <Text>To</Text>
           <Text>Vessel no</Text>
           <Text>Voyage no</Text>
           <Text>ETD</Text>
           <Text>ETA</Text>
         </View>
         </View>
         <View style = {{borderBottomWidth:1, paddingBottom:"3%"}}>
         <Text style = {{fontSize:22}}> Charges </Text>
         <View style = {{paddingBottom:"5%",  borderBottomWidth:1}}>
           <View style ={{display:"flex" ,flexDirection:"column", justifyContent:"space-between"}}>
             <View style={{flexDirection:"row", display:"flex", justifyContent:"space-between"}}>
             <Text>Code</Text>
             <Text>Description</Text>
             <Text>GST</Text>
             <Text>Total Amount</Text>
             </View>
             <View>
              {this.state.otherCharges && this.state.otherCharges.map((amount, i) => {
                return(
                    <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", paddingBottom:"3%"}}>
                    <Text>{amount.chargeHsnCode}</Text>
                    <View style = {{width:"25%"}}>
                    <Text>{amount.chargeName}-{amount.chargeQty} x {amount.altName}</Text>
                    </View>
                    <View style = {{width:"10%"}}>
                    <Text>{amount.chargeIgstRate} %</Text></View>
                    <View style = {{width:"20%"}}>
                    <Text>{this.state.currency} {parseFloat(amount.chargeTaxableB).toFixed(2)}</Text>
                    </View>
                    </View>
                  )
                })}
             </View>
          </View>
          </View>
          <Text></Text>
          <View style = {{borderBottomWidth:1, paddingBottom:"2%"}}>
          <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-end"}}>
             <Text>Total excl. GST</Text>
             <Text>{this.state.currency} {this.state.taxableTotalAmountB}</Text>
          </View>
          <Text></Text>
          <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-end"}}>
             <Text>GST Amount <Text>{this.state.currency} {parseFloat(this.state.igstTotalAmountB).toFixed(2)}</Text></Text>
          </View>
          </View>
          <View style ={{display:"flex" ,flexDirection:"row", justifyContent:"flex-end"}}>
             <Text>Total Amount Due</Text>
             <Text>{this.state.currency} {parseFloat(this.state.totalAmountB).toFixed(2)}</Text>
          </View>
          </View>
          <Text></Text>
          <View style ={{width:"15%", paddingBottom:"5%", alignSelf:"center"}}>
           <Button title ="Next" color ="#ff3800" onPress = {() => alert("Waiting for bl number")}/>
           </View>
        </ScrollView>
         }
      </View>
    );
  }
}

export default ProformaView;
