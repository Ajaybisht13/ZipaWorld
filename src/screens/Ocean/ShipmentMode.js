
import React, { Component } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import RadioButton from 'react-native-radio-button';
import LinearGradient from 'react-native-linear-gradient';
import NumericInput from 'react-native-numeric-input'

class ShipmentMode extends Component {
  constructor(props) {
    super(props);
    this.state = {
        record:[],
        value:""
    };
  }

//   componentDidMount = () => {
//        this.getAll();
//   }

//   getAll = () => {
    
//       fetch("https://coapi.zipaworld.com/api/auth/masters/containers/getAll", {
//         method:"Post",
//         headers:{
//           "Content-Type" : "application/json",
//         },
//       }).then((response) => response.json())
//       .then ((results) => {
//         // console.log(results);
//         this.setState({
//           record : results.result,
//         });
//       })
//       .catch((error) => console.log("error", error));
// }

  getData = () => { 
    fetch("https://coapi.zipaworld.com/api/auth/masters/containers/getAll", {
        method:"Post",
        headers:{
          "Content-Type" : "application/json",
        },
        body: JSON.stringify({tarrifMode: "General Cargo"})
      }).then((response) => response.json())
      .then ((results) => {
        console.log(results);
        this.setState({
          record : results.result,
        });
      })
      .catch((error) => console.log("error", error));
  }
    

  

  render() {
      const {record} = this.state
    return (
        <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} locations={[0,0.5,0.6]} useAngle= {true} angle={257} colors={['#ffac04', '#fe0000']}
      style={styles.linearGradient}>
          <Text></Text>
      <View style = {{padding:"2%", backgroundColor:"#ffffff", width:"95%", marginLeft:"3%", borderRadius:10}}>
        <Text style = {{fontSize:25, fontWeight:"600"}}> Mode </Text>
        <Text></Text>
        <View style = {{display:"flex", flexDirection:"row"}}>
          <RadioButton
             animation={'bounceIn'}
             isSelected={false}
             innerColor="#000000"
             outerColor="#000000"
             onPress={() => alert('hello')}
          />
          <Text style = {{fontSize:20, fontWeight:"600", marginLeft:"5%"}}>LCL (Groupage)</Text>
        </View>
        <Text></Text>
        <View style = {{display:"flex", flexDirection:"row"}}>
          <RadioButton
             animation={'bounceIn'}
             isSelected={true}
             onPress={() => this.getData()}
             innerColor="#000000"
             outerColor="#000000"
          />
          <Text style = {{fontSize:20, fontWeight:"600",  marginLeft:"5%"}}>FCL (Full Container Load)</Text>
        </View>
        <Text></Text>
        <View>
             <Text style = {{fontSize:23, fontWeight:"600",  marginLeft:"2%"}}>Container Type*</Text>
             <Text></Text>
             {record && record.map((records) => {
                 console.log(records)
                 return (
                   <View style = {{flexDirection:"row", justifyContent:"space-between"}}>
                      <Text style = {{fontSize:22, fontWeight:"600", flexDirection:"column", justifyContent:"space-between"}}>{records.container}</Text>
                      <NumericInput rounded 
                         value={this.state.value}
                         onChange={(value) => this.setState({value})} 
                         rightButtonBackgroundColor='#D0D0D0' 
                         leftButtonBackgroundColor='#D0D0D0'
                      />
                    </View>
                 )
             })}
        </View>
      </View>
      </LinearGradient>
    );
  }
}

const styles = StyleSheet.create ({
    linearGradient: {
        flex: 1,
      },
})

export default ShipmentMode;
