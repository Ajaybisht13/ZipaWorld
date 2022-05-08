import React, { Component } from 'react';
import { View, Text, TouchableOpacity, TextInput, ScrollView, Button, ActivityIndicator} from 'react-native';
import { RadioButton } from 'react-native-paper';
import {Picker} from '@react-native-community/picker';
import AsyncStorage from '@react-native-async-storage/async-storage';

class editHBL extends Component {
  constructor(props) {
    super(props);
    this.state = {
        checked :"CM",
        shipperDetail : false,
        consigneeDetail : false,
        notifyDetail : false,
        dimensionType : false,
        containerLifeCycles : false,
        stuffingDetail : false,
        bookingNo:"",
        houses : [],
        containerType : [],
        isLoading: true
    };
  }


  componentDidMount = () => {
      this.setState({
          editHblById : this.props.route.params.bookingId
      }, () => {
          console.log("HBL id", this.state.editHblById)
          this.getBookingDetails(this.state.editHblById)
      })
  }
 
  

  shipperDetails = () => {
    this.setState((previousState) => ({ shipperDetail: !previousState.shipperDetail}))
  }

  consigneeDetails = () => {
    this.setState((previousState) => ({ consigneeDetail: !previousState.consigneeDetail}))
  }

  notifyDetails = () => {
    this.setState((previousState) => ({ notifyDetail: !previousState.notifyDetail}))
  }

  dimensionTypes = () => {
    this.setState((previousState) => ({ dimensionType : !previousState.dimensionType}))
  }

  containerLifeCycle = () => {
    this.setState((previousState) => ({ containerLifeCycles : !previousState.containerLifeCycles}))
  }
  
  stuffingDetails = () => {
    this.setState((previousState) => ({ stuffingDetail : !previousState.stuffingDetail}))
  }

  getBookingDetails = async(editHblById)=> {
    const token = await AsyncStorage.getItem("userToken")
    fetch("https://coapi.zipaworld.com/api/bookings/get", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
            "authkey" : token
        },
        body: JSON.stringify({id : editHblById})
    }).then((response) => response.json())
      .then((results) => {
          console.log("dtaaa", results.result.bookingNo)
          this.setState({
              bookingNo: results.result.bookingNo,
              houses : results.result.houses,
              originName : results.result.originAirport.name,
              destinationName : results.result.destinationAirport.name,
              noOfHouses: results.result.noOfHouses,
              address: results.result.shipperDetails,
              consigneeAddress: results.result.consigneeDetails,
              shipperName: results.result.shipperId.shipperName,
              shipperBranch: results.result.shipperBranchId.branchName,
              shipperAccountNo : results.result.shipperAccountNo,
              consigneeAccountNo : results.result.consigneeAccountNo,
              consigneeName: results.result.consigneeId.consigneeName,
              consigneeBranch: results.result.consigneeBranchId.branchName,
              containerType : results.result.containerType,
              houses: results.result.houses,
              isLoading:false
          }, () => {
              console.log("consigneeBranch", this.state.houses)
          })
      }).catch((error) => console.log("error", error));
  }


  render() {
    return (
      <View>
        <ScrollView>
          {this.state.isLoading ?
            <View>
                <ActivityIndicator size={"large"}/>
            </View>
          :
          <View style = {{padding: "2%", backgroundColor:"#ffffff"}}> 
             <View style = {{borderBottomWidth:1, paddingBottom:"4%"}}> 
              <View>
                  <Text>HBL NUMBER</Text>
                  {this.state.houses && this.state.houses.map((item, i) => {
                      console.log("houses data", item.houseNo)
                      return (
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderBottomColor:"#000000", borderRadius:10}}
                        editable={false}
                         value = {item.houseNo}
                        />
                      )
               })}
              </View>
              <View>
                  <Text>BL NUMBER</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                  editable={false}/>
              </View>
              <View>
                  <Text>Booking No</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                   value = {this.state.bookingNo}
                   editable={false}
                  />
              </View>
              <View>
                  <Text>Job No</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                  editable={false}/>
              </View>
              <View>
                  <Text>Shipment Booking No</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                   editable={false}
                  />
              </View>
              <View>
                  <Text>Origin Port</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                    value = {this.state.originName}
                    editable={false}
                  />
              </View>
              <View>
                  <Text>Destination Port</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                    value = {this.state.destinationName}
                    editable={false}
                  />
              </View>
              <View>
                  <Text>No. of Hbl</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                  value = {this.state.noOfHouses}
                  editable={false}
                  />
              </View>
              </View>
              <Text></Text>  
              <View style = {{borderBottomWidth:1, paddingBottom:"5%"}}>
              { this.state.shipperDetail ? 
              <View>
                <View style = {{width :"50%"}}>
                   <Button title = "- Shipper Details" color ="#ff3800" onPress = {() => this.shipperDetails()}/>
                </View> 
              <Text></Text>
              <View style ={{marginLeft:"2%"}}> 
              <View>
                  <Text>Shipper Name *</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                    value = {this.state.shipperName}
                  />
              </View>
              <View>
                  <Text>Shipper Branch *</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                   value = {this.state.shipperBranch}
                  />
              </View>
              <View>
                  <Text>Shipper Address</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                  value = {this.state.address}
                  editable= {false}
                  />
              </View>
              <View>
                  <Text>Shipper Account No.</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                   value = {this.state.shipperAccountNo}
                   placeholder = "Account No."
                  />
              </View>
              </View>
              </View>
              : 
              <View style = {{width :"40%"}}>
                <Button title = "+ Shipper Details" color ="#ff3800" onPress = {() => this.shipperDetails()}/>
              </View>  
              }
             </View> 
             <Text></Text>
             <View style = {{borderBottomWidth:1, paddingBottom:"5%"}}>
              { this.state.consigneeDetail ? 
              <View>
              <View style = {{width :"40%"}}>
                <Button title = "- Consignee Details" color ="#ff3800" onPress = {() => this.consigneeDetails()}/>
              </View> 
              <View>
                  <Text>Consignee Name *</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                   value = {this.state.consigneeName}
                  />
              </View>
              <View>
                  <Text>Consignee Branch *</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                    value = {this.state.consigneeBranch}
                  />
              </View>
              <View>
                  <Text>Consignee Address</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                    value = {this.state.consigneeAddress}
                    editable = {false}
                  />
              </View>
              <View>
                  <Text>Consignee Account No.</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                    value = {this.state.consigneeAccountNo}
                    placeholder = "Account Number"
                  />
              </View>
              </View>
              : 
              <View style = {{width :"42%"}}>
                <Button title = "+ Consignee Details" color ="#ff3800" onPress = {() => this.consigneeDetails()}/>
              </View> 
              }
             </View> 
             <Text></Text>
              <View style = {{borderBottomWidth:1, paddingBottom:"5%"}}>
              { this.state.notifyDetail ?
              <View>
                    <View style = {{width :"42%"}}>
                        <Button title = "- Notify Party Details" color ="#ff3800" onPress = {() => this.notifyDetails()}/>
                    </View> 
                <View>
                    <Text>Notify Party</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Address</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>City</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Zip Code</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Country</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>State</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Account Info</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Contact Name</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Contact Number</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>

                <View>
                    <Text>Notify Party 2</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Address 2</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>City 2</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Zip Code 2</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Country 2</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>State 2</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Account Info 2</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Contact Name 2</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View>
                <View>
                    <Text>Contact Number 2</Text>
                    <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                </View> 
                </View>
              :  
              <View style = {{width :"42%"}}>
                <Button title = "+ Notify Party Details" color ="#ff3800" onPress = {() => this.notifyDetails()}/>
              </View>
              }
              </View>
              <View style = {{borderBottomWidth:1, paddingBottom:"5%"}}>
              <Text></Text>
              { this.state.dimensionType ? 
                <View>
                <View style = {{width :"40%"}}>
                    <Button title = "- Dimension Details" color ="#ff3800" onPress = {() => this.dimensionTypes()}/>
                </View>
                 <View>
                     <Text>Please Enter Dimensions</Text>
                 </View>
                 <View>
                     <Text>DIMENSION TYPE:</Text>
                 </View>
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
                               selectedValue={this.state.itemValue}
                               style={{height: 60, width: "100%", borderWidth:2, borderColor:"black"}}
                               onValueChange={(itemValue, itemIndex) =>this.setState({itemValue:itemValue})}>
                               <Picker.Item label="Kgs" value="Kgs" />
                               <Picker.Item label="Lbs" value="Lbs" />
                             </Picker>
                           </View>
                           <View style = {{marginTop:"1%"}}>
                               <Text style= {{fontSize:15}}>Weight Per Piece</Text>
                               <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}} placeholder="Gw/Pc"/>
                           </View>
                        </View>
                    :  
                    <View style = {{width :"40%"}}>
                        <Button title = "+ Dimension Details" color ="#ff3800" onPress = {() => this.dimensionTypes()}/>
                    </View>
                    }
                    </View>
                    <View style = {{borderBottomWidth:1, paddingBottom:"5%"}}>
               <Text></Text>     
              { this.state.containerLifeCycles ?
              <View>
                    <View style = {{width :"50%"}}>
                        <Button title = "- Container Life Cycle" color ="#ff3800" onPress = {() => this.containerLifeCycle()}/>
                    </View>
                    <Text></Text>
                    <View style = {{marginLeft:"1%"}}>
                    <View>
                        <Text>Container Type</Text>
                        {this.state.containerType && this.state.containerType.map((item, i) => {
                                    console.log("dddddddddd", item.name)
                          return (
                            <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                              value = {item.name}
                              editable = {false}
                            />
                          )          
                        })}
                    </View>
                    <View>
                        <Text>Container Number</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "Container No."
                          editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Seal No.</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                           placeholder = "Seal No."
                           editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Container Shipper Seal No.</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                    </View>
                    <View>
                        <Text>Truck No.</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "Container Seal No."
                          editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Driver No.</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                           placeholder = "Driver No."
                           editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                           placeholder = "dd/mm/yyyy"
                           editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Empty Container Pickup Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "dd/mm/yyyy"
                          editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Pickup Location</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "Pick Up Location"
                          editable = {false}
                         />
                    </View>

                    <View>
                        <Text>Stuffing Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "dd/mm/yyyy"
                          editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Stuffing Location</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                    </View>
                    <View>
                        <Text>Handover Date / Gate In Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "dd/mm/yyyy"
                          editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Shipped Onboard/Depature Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                           placeholder = "dd/mm/yyyy"
                           editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Arrival Final Destination</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                           placeholder = "dd/mm/yyyy"
                           editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Discharge Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                            placeholder = "dd/mm/yyyy"
                            editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Delivery Date/Loaded Out Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                            placeholder = "dd/mm/yyyy"
                            editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Empty Return Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                            placeholder = "dd/mm/yyyy"
                          editable = {false}
                        />
                    </View>
                    <Text></Text>
                    </View>
                    <View style = {{marginLeft:"1%"}}>
                    <View>
                        <Text>Container Type</Text>
                        {this.state.containerType && this.state.containerType.map((item, i) => {
                                    console.log("dddddddddd", item.name)
                          return (
                            <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                              value = {item.name}
                              editable = {false}
                            />
                          )          
                        })}
                    </View>
                    <View>
                        <Text>Container Number</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "Container No."
                          editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Seal No.</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                           placeholder = "Seal No."
                           editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Container Shipper Seal No.</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                    </View>
                    <View>
                        <Text>Truck No.</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "Container Seal No."
                          editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Driver No.</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                           placeholder = "Driver No."
                           editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                           placeholder = "dd/mm/yyyy"
                           editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Empty Container Pickup Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "dd/mm/yyyy"
                          editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Pickup Location</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "Pick Up Location"
                          editable = {false}
                         />
                    </View>

                    <View>
                        <Text>Stuffing Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "dd/mm/yyyy"
                          editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Stuffing Location</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
                    </View>
                    <View>
                        <Text>Handover Date / Gate In Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                          placeholder = "dd/mm/yyyy"
                          editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Shipped Onboard/Depature Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                           placeholder = "dd/mm/yyyy"
                           editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Arrival Final Destination</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                           placeholder = "dd/mm/yyyy"
                           editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Discharge Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                            placeholder = "dd/mm/yyyy"
                            editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Delivery Date/Loaded Out Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                            placeholder = "dd/mm/yyyy"
                            editable = {false}
                        />
                    </View>
                    <View>
                        <Text>Empty Return Date</Text>
                        <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                            placeholder = "dd/mm/yyyy"
                            editable = {false}
                        />
                    </View>
                    <Text></Text>
                    </View>
                </View>
              : 
              <View style = {{width :"50%"}}>
                <Button title = "+ Container Life Cycle" color ="#ff3800" onPress = {() => this.containerLifeCycle()}/>
              </View>
              }
            </View>
            <Text></Text>  
            <View style = {{borderBottomWidth:1, paddingBottom:"5%"}}>
              { this.state.stuffingDetail ? 
              <View> 
              <View style = {{width :"30%"}}>
                <Button title = "- Stuffing" color ="#ff3800" onPress = {() => this.stuffingDetails()}/>
              </View>
              <Text></Text>
              <View style ={{marginLeft:"1%"}}> 
              <View>
                  <Text>Shipping Bill Number</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}/>
              </View>
              <View>
                  <Text>Date</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                   placeholder = "dd/mm/yyyy"
                   editable ={ false}
                  />
              </View>
              <View>
                  <Text>Invoice Number</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     editable ={ false}
                  />
              </View>
              <View>
                  <Text>Invoice Date</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                    placeholder = "dd/mm/yyyy"
                    editable ={ false}
                  />
              </View>
              <Text></Text>
              <Text style = {{fontSize:22, fontWeight:"700"}}>Package Details : </Text>
              <Text></Text>
              <View>
                  <Text>Query Pieces</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     editable ={ false}
                  />
              </View>
              <View>
                  <Text>Actual Pieces</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     editable ={ false}
                   />
              </View>
              <View>
                  <Text>Query Gross (KGS/LBS)</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     editable ={ false}
                  />
              </View>
              <View>
                  <Text>Actual Gross (KGS/LBS)</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     editable ={ false}
                  />
              </View>
              <View>
                  <Text>Query Volume</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     editable ={ false}
                  />
              </View>
              <View>
                  <Text>Actual Volume (KGS)</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     editable ={ false}
                  />
              </View>
              <View>
                  <Text>Cargo Type</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     editable ={ false}
                  />
              </View>
              <View>
                  <Text>Commodity</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     editable ={ false}
                  />
              </View>
              <View>
                  <Text>Packing Type</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     editable ={ false}
                  />
              </View>
              <View>
                  <Text>Stuffing Date</Text>
                  <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"2%", borderRadius:10}}
                     placeholder = "dd/mm/yyyy"
                     editable ={ false}
                  />
              </View>
              </View>
              </View>
              : 
              <View style = {{width :"30%"}}>
              <Button title = "+ Stuffing" color ="#ff3800" onPress = {() => this.stuffingDetails()}/>
            </View>
              }
             </View>
             <Text></Text>
             <View style = {{width:"23%", alignSelf:"center"}}>
              <Button color ="#ff3800" title = "Update"/>
             </View> 
             </View>
         }
          </ScrollView>
      </View>
    );
  }
}

export default editHBL;
