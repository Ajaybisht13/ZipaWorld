import React, { Component } from 'react';
import { View, Text, TextInput, TouchableOpacity, ScrollView, StyleSheet } from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
import Autocomplete from 'react-native-dropdown-autocomplete-textinput';
import Icon from 'react-native-vector-icons/Entypo';

class destinationPort extends Component {
  constructor(props) {
    super(props);
    this.state = {
        record : [],
        text:"",
        suggestions: []
    };
  }


// getAll = () => {
    
//       fetch("https://coapi.zipaworld.com/api/auth/masters/ports/manager", {
//         method:"Post",
//         headers:{
//           "Content-Type" : "application/json",
//         },
//         body : JSON.stringify({search: ""})
//       }).then((response) => response.json())
//       .then ((results) => {
//         console.log(results);
//         this.setState({
//           record : results.result.data,
//         });
//       })
//       .catch((error) => console.log("error", error));
// }

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
           return codes.name.match(regex)
        })
      }
      console.log(matches)
      this.setState({suggestions: matches})
      this.setState({text:text})
    }

onSuggestHandler = (text) => {
    this.setState({suggestions: []})
    this.setState({text:text})
}   

  render() {
    return (
    <LinearGradient start={{x: 0.0, y: 0.25}} end={{x: 0.5, y: 1.0}} locations={[0,0.5,0.6]} useAngle= {true} angle={257} colors={['#ffac04', '#fe0000']}
      style={styles.linearGradient}>
      <ScrollView style = {{padding:"2%", height:"100%"}}>
          <Text style = {{fontSize:20, fontWeight:"600"}}>Please Select the Origin Port</Text>
          <Text></Text>
          <View style = {{borderWidth:2, borderRadius:10, backgroundColor:"#ffffff", display:"flex", flexDirection:"row", justifyContent:"space-between"}}>
            <TextInput 
                placeholder="Search Destination Port" 
                placeholderTextColor= "#000000" 
                style={{fontSize:20, fontWeight:"600", width:"70%", marginLeft:"5%"}} 
                keyboardType="email-address"
                onChangeText={(text) => this.onChangehandler(text)} 
                value={this.state.text}
            />
           <Icon name = "triangle-down" size = {30} style = {{marginTop:"3%"}}/>
        </View> 
        <View style = {{backgroundColor:"#ffffff",borderRadius:10, marginTop:"1%",}}>   
        { this.state.suggestions && this.state.suggestions.map((suggestion , index) =>  
             <TouchableOpacity style = {{padding:"3%", borderWidth:1}} onPress = {() => this.onSuggestHandler(suggestion.name)}>
                 <Text style = {{fontSize:20}}>{suggestion.name}</Text>
             </TouchableOpacity>
        )}
         </View>
      </ScrollView>
    </LinearGradient>
    );
  }
}

const styles = StyleSheet.create ({
    linearGradient: {
        flex: 1,
      },
})

export default destinationPort;
