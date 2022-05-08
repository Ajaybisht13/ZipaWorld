import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { Component } from 'react';
import { View, Text ,TextInput, ScrollView , Button, TouchableOpacity, FlatList} from 'react-native';
import Iconss from 'react-native-vector-icons/Entypo';
import {Picker} from '@react-native-community/picker';
import { RadioButton } from 'react-native-paper';
import SelectDropdown from 'react-native-select-dropdown'

const baseUrl = "https://coapi.zipaworld.com/";

class ShipperDetails extends Component {
  constructor(props) {
    super(props);
    this.state = {
        "content" : false,
        "addShipper" : false,
        "addDimention" : false,
        "addConsignee":false,
        "shipperNameRecord" : [],
        "suggest" : [],
        "shipperNames" :"",

        "shipperBranch" :[],
        "branchSuggest" :[],
        "branchName":"",

        "getAllCountry" : [],
        "countrySuggest" : [],
        "shipperCountryName":"",
        "consigneeCountryName": "",

        "consigneeNameRecord" : [],
        "consigneesuggest" : [],
        "consigneeNames" :"",
        "consigneeBranch": [],
        "accountType":"",
        "Incoterms":[],
        "incoTerms":"",
        "checked" : "CM",
        "getState" : [],
        "selectCountry":"",
        "consigneeName": "",

      // "shipperName": "",
      // "shipperAddressLine1": "",
      // "shipperAddressLine2": "",
      // "shipperCountryCode": "IN",
      // "shipperCountryId": "609e4c66cfbb794919e62ba9",
      // "shipperStateName": "",
      // "shipperStateCode": "10",
      // "shipperStateId": "",
      // "shipperCity": "",
      // "shipperPincode": "",
      // "shipperContact": "",
      // "isStoredShipper": false,
      // "customerId": "618972c94af0a17c623f58a0",
      // "userBranchId": "600edb3d98380309ac6bd39a",
      // "consigneeName": "",
      // "consigneeAddressLine1": "",
      // "consigneeAddressLine2": "",
      // "consigneeCountryCode": "AS",
      // "consigneeCountryId": "5e0095f3720281676d136a2d",
      // "consigneeStateName": "",
      // "consigneeStateCode": "",
      // "consigneeStateId": "",
      // "consigneeCity": "",
      // "consigneePincode": "",
      // "consigneeContact": "",
      // "isStoredConsignee": false,

      "companyName":"",
      "noOfHawb" : 0,
      "selectHBL": []
  }
}

  componentDidMount = async() => {
    const token = await AsyncStorage.getItem("userToken")
        console.log("token",token);
        this.companyShipper();
        this.companyConsignee();
        this.getIncoterms();
        this.handleCountry();
        this.getAllCountry();
        if(token){
          this.getAllBranch(token);
        }else {
         console.log("error")
        }
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
    fetch(baseUrl+"/api/masters/incoTerms/manager", {
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
    const token = await AsyncStorage.getItem("userToken")
    // console.log(text)
    fetch(baseUrl+"api/masters/shipper/managerCustomer", {
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
    this.setState({suggest: matches})
    this.setState({shipperNames:text})
  }

    onSuggestHandle = async(text) => {
      this.setState({suggest: []})
      this.setState({shipperNames:text}, () => {
        console.log(text)
      })

      const token = await AsyncStorage.getItem("userToken")
      // console.log(text)
      fetch(baseUrl+"api/masters/shipper/Branch/getBranches", {
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
 
     //<=============getAll Country ================>
         
     getAllCountry = async(text, texts) => {
      const token = await AsyncStorage.getItem("userToken")
      // console.log(text)
      fetch(baseUrl+"api/auth/masters/country/getAll", {
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
        matches = this.state.getAllCountry.filter(codes => {
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
      //this.setState({consigneeCountryName:texts})
  }

  handleCountry = async(text, texts) => {
    this.setState({countrySuggest: []})
    //this.setState({consigneeCountryName:texts})
    this.setState({shipperCountryName:text}, () => {
      console.log("shipper country",text)
    })
      const token = await AsyncStorage.getItem("userToken")
      fetch(baseUrl+"api/auth/masters/state/getByCountry", {
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
     
     //<===========================================>
      
    companyConsignee = async(text) => {
        const token = await AsyncStorage.getItem("userToken")
        // console.log(text)
        fetch(baseUrl+"/api/masters/consignee/managerCustomer", {
            method : "Post",
            headers : {
                "Content-Type" : "application/json",
                 "authkey" : token
            },
            body: JSON.stringify({customerId: customerId })
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
          fetch(baseUrl+"api/masters/consignee/Branch/getBranches", {
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

  // getAllCountry = async() => {
  //   const token = await AsyncStorage.getItem("userToken")
  //        fetch("https://coapi.zipaworld.com/api/auth/masters/country/getAll", {
  //         method:"Post",
  //         headers:{
  //           "Content-Type" : "application/json",
  //           "authkey" : token
  //         },
  //         body : JSON.stringify({start : 0})
  //       }).then((response) => response.json())
  //       .then ((results) => {
  //         console.log("countttrrrryyyyyyyyy",results.result);
  //         this.setState({
  //           getAllCountry : results.result
  //         });
  //       })
  //       .catch((error) => console.log("error", error));     
  //     }




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

  submit = async(shippingname) => {
    const token = await AsyncStorage.getItem("userToken");
    const charges = await AsyncStorage.getItem("AllCharges")
    fetch(baseUrl + "api/invoice/buySale/create", {
      method:"Post",
      headers:{
        "Content-Type" : "application/json",
        "authkey" : token,
      },
      body : (this.state, {saleValue : charges, quoteId: shippingname.quoteId })
    }).then((response) => response.json())
    .then ((results) => {
      console.log("crrreeeaaattee",results);
    })
    .catch((error) => console.log("error", error));
  }

  // createShipper =  async() => {
  //   const token = await AsyncStorage.getItem("userToken")
  //   fetch(baseUrl+"api/masters/shipper/createShipperAndConsignee", {
  //     method:"Post",
  //     headers:{
  //       "Content-Type" : "application/json",
  //       "authkey" : token
  //     },
  //     body : JSON.stringify({
  //       "shipperName": "Shipper",
  //       "shipperAddressLine1": "Address",
  //       "shipperAddressLine2": "",
  //       "shipperCountryName": "",
  //       "shipperCountryCode": "AS",
  //       "shipperCountryId": "5e0095f3720281676d136a2d",
  //       "shipperStateName": "Eastern",
  //       "shipperStateCode": "",
  //       "shipperStateId": "5fb25cbbf5f3d3244b1a4dc0",
  //       "shipperCity": "City",
  //       "shipperPincode": "2345698",
  //       "shipperContact": "9876854530",
  //       "isStoredShipper": false,
  //       "customerId": "606ef470e5ab230f74117965",
  //       "userBranchId": "600edb3d98380309ac6bd39a",
  //       "consigneeName": "Rll",
  //       "consigneeAddressLine1": "addd",
  //       "consigneeAddressLine2": "",
  //       "consigneeCountryName": "American Samoa",
  //       "consigneeCountryCode": "AS",
  //       "consigneeCountryId": "5e0095f3720281676d136a2d",
  //       "consigneeStateName": "Swains Island",
  //       "consigneeStateCode": "",
  //       "consigneeStateId": "5fb25cbbf5f3d3244b1a4dc2",
  //       "consigneeCity": "iyutydrt",
  //       "consigneePincode": "99090",
  //       "consigneeContact": "8769968576",
  //       "isStoredConsignee": false
  //     })
  //   }).then((response) => response.json())
  //   .then ((results) => {
  //     console.log("crrreeeaaattee",results);
  //   })
  //   .catch((error) => console.log("error", error));
  // }

  addHBL =  async() => {
    const token = await AsyncStorage.getItem("userToken")
    fetch(baseUrl+"api/masters/hawbstock/createHawbNo", {
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

  render() {
    const {shippingname} = this.props.route.params;
    return (
      <ScrollView style = {{padding:"2%", backgroundColor:"#ffffff", height:"100%"}}>
        <View style = {{display:"flex", marginTop:"10%"}}>  
        <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
        <Text style = {{fontSize:20, fontWeight:"700"}}>{shippingname.quoteId}</Text>
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
             { this.state.suggest && this.state.suggest.map((suggestion , index) =>  
                       <TouchableOpacity style = {{padding:"3%"}} onPress = {() => this.onSuggestHandle(suggestion.shipperName)}>
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
                  onChangeText={(texts) => this.getAllCountry(texts)} 
                  value={this.state.consigneeCountryName}
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
                        this.setState({consigneeStateName: selectedItem.name}, () => {
                          console.log("state name",selectedItem.name)
                        })
                        this.setState({consigneeStateId: selectedItem._id}, ()=> {
                              console.log("iiddddd consignee" , selectedItem._id)
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
                <Button title = "Create Shipper/Consignee" onPress = {() => this.createShipper()}/>
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
             <Text style = {{fontSize:20}}></Text>
           </View>
        </View>
        <View style = {{marginTop:"3%"}}>
          <Text style= {{fontSize:15}}>Gross Weight(KGS)</Text>
          <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}} editable = {false}/>
        </View>
        <View style = {{marginTop:"3%"}}>
          <Text style= {{fontSize:15}}>Volume Weight (CBM)</Text>
          <TextInput style = {{borderColor:"#000000", borderWidth:2, marginTop:"4%", borderRadius:10}} editable = {false}/>
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
                    value = {item}/>
                  }
                  />  
             </View>
            : null
          }
        </View> 
        }
        <View style ={{paddingBottom:"5%"}}>
          <Button title = "SUbmit" onPress = {() => this.submit(shippingname)}/>
        </View>  
      </ScrollView>
    );
  }
}

export default ShipperDetails;
