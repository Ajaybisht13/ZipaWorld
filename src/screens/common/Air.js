import React, { Component } from 'react';
import { View, Text, Pressable, StyleSheet, TouchableOpacity, ToastAndroid, Image } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import LinearGradient from 'react-native-linear-gradient';
import GestureRecognizer, {swipeDirections} from 'react-native-swipe-gestures';
import { Avatar } from 'react-native-elements';


class Air extends Component {
 
  constructor(props) {
    super(props);
    this.state = {
      gestureName: 'none',
      borderColorId:0,
      general:"General",
      dimension:"Dimensions",
      danger:"Danger",
      other:"Others",
    };
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
      this.setState({tarrifMode : "General Cargo",
      cargoId : "", dimensionId : "",dangerId : "", otherId: ''})
    } else if (id == 2) {
      this.setState({ generalId : "",
      tarrifMode : "Refrigerasted Cargo", dimensionId : "",dangerId : "", otherId: ''})
    } else if (id == 3) {
      this.setState({ generalId : "",
      cargoId : "", tarrifMode : "Dimensions",dangerId : "", otherId: ''})
    } else if (id == 4) {
      this.setState({generalId : "",
      cargoId : "", dimensionId : "",tarrifMode: "Danger", otherId: ''})
    } else if (id == 5) {
      this.setState({generalId : "",
      cargoId : "", dimensionId : "",dangerId : "", tarrifMode: 'Others'})
    }
  };


  navigatePage = (queryFor) => {
    if(this.state.tarrifMode == "General Cargo")
    {
      this.props.navigation.navigate("General", {tarrifMode : "General Cargo", queryFor})
    } else if(this.state.tarrifMode == "Refrigerasted Cargo")
      {
        this.props.navigation.navigate("Pharmaceuticals",{tarrifMode : "Refrigerasted Cargo"})
      } else if(this.state.tarrifMode == "Courier")
      {
        this.props.navigation.navigate("Dimensions",{tarrifMode : "Dimensions"})
      } else if(this.state.tarrifMode == "Danger")
      {
        this.props.navigation.navigate("Danger",{tarrifMode : "Danger"})
      } else if(this.state.tarrifMode == "Others")
      {
        this.props.navigation.navigate("OceanOthers",{tarrifMode : "Others"})
      }else {
        ToastAndroid.showWithGravity(
          "Please Select the Commodity First.",
          ToastAndroid.LONG,
          ToastAndroid.CENTER
        );
      }
  } 
  
  render() {
    const {queryFor} = this.props.route.params
    
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
      <View style = {{backgroundColor:"white", height:"100%"}}>
        <View style = {styles.parent}>
          <View style = {styles.child}>
            <Text style = {{color : "#ffffff", fontSize:28, fontWeight:"500", paddingBottom:"42%"}}>Select Commodity</Text>
          </View>
         </View>
         <View style = {{position:"absolute", padding:"5%", top:"10%", width:"100%", height:"100%"}}>
         <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", alignSelf:"center", width:"82%"}}>
            <TouchableOpacity style={this.state.borderColorId === 1? styles.border : styles.button} onPress={() => this.Select(1)}>
              <View>  
                <Image source = {require("../../assets/4.jpg")} style={{alignSelf:"center", borderRadius:10}} height={110} width={115}/>
              </View>
              <Text style = {{fontWeight:"700", fontSize:15, alignSelf:"center", color :"#ffffff", top:"4%"}}>{this.state.general}</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.borderColorId === 2? styles.border : styles.button} onPress={() => this.Select(2)}>
            <View>
               <Image source = {require("../../assets/dom2.jpg")} style={{alignSelf:"center", borderRadius:10}} height={110} width={115}/>
            </View>
            <Text style = {{fontWeight:"600", fontSize:15, alignSelf:"center", color :"#ffffff", top:"4%"}}>Pharmaceutical</Text>
            </TouchableOpacity>
          </View>
          <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", alignSelf:"center", width:"82%", top:"10%"}}>
            <TouchableOpacity style={this.state.borderColorId === 3? styles.border : styles.button} onPress={() => this.Select(3)}>
              <View>
                <Image source = {require("../../assets/about1.png")} style={{alignSelf:"center", borderRadius:10}} height={110} width={115}/>
              </View>
                  <Text style = {{fontWeight:"600", fontSize:15, alignSelf:"center", top:"4%"}}>Pherishables</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.borderColorId === 4? styles.border : styles.button} onPress={() => this.Select(4)}>
              <View>
                <Image source = {require("../../assets/ocean2.png")} style={{alignSelf:"center", borderRadius:10}} height={110} width={115}/>
              </View>
              <Text style = {{fontWeight:"600", fontSize:15, alignSelf:"center", top:"4%"}}>Odd Dimensions</Text>
            </TouchableOpacity>
            </View>
            <View style = {{display:"flex", flexDirection:"row", justifyContent:"space-between", alignSelf:"center", width:"82%", top:"18%"}}>
            <TouchableOpacity style={this.state.borderColorId === 5? styles.border : styles.button} onPress={() => this.Select(5)}>
              <View>
                <Image source = {require("../../assets/about1.png")} style={{alignSelf:"center", borderRadius:10}} height={110} width={115}/>
              </View>
                  <Text style = {{fontWeight:"600", fontSize:15, alignSelf:"center", top:"4%"}}>Live Animals</Text>
            </TouchableOpacity>
            <TouchableOpacity style={this.state.borderColorId === 6? styles.border : styles.button} onPress={() => this.Select(6)}>
              <View>
                <Image source = {require("../../assets/ocean2.png")} style={{alignSelf:"center", borderRadius:10}} height={110} width={115}/>
              </View>
              <Text style = {{fontWeight:"600", fontSize:15, top:"4%"}}>Dangerous Goods</Text>
            </TouchableOpacity>
            </View>
            <View style = {{ top:"15%", marginLeft:"10%"}}>
              <TouchableOpacity style={this.state.borderColorId === 7? styles.border : styles.button} onPress={() => this.Select(7)}>
              <View>
                <Image source = {require("../../assets/other.png")} style={{alignSelf:"center", borderRadius:10}} height={110} width={115}/>
              </View>
                    <Text style = {{fontWeight:"600", fontSize:15, alignSelf:"center", top:"4%"}}>Animals</Text>
              </TouchableOpacity>
            </View>
            <Pressable style = {styles.btn} onPress = {() => this.navigatePage(queryFor)}>
              <View style = {{ alignSelf:"center"}}>
                  <Text style = {{fontWeight:"400", fontSize:23, color:"#ffffff"}}>Next</Text>
              </View>
            </Pressable>
            </View>
         </View>
      {/* </LinearGradient> */}
      </GestureRecognizer>
    );
  }
}

const styles = StyleSheet.create({
  border: {
    backgroundColor: '#ffffff',
    borderRadius:10,
    width:115,
    height:110,
  },
  button: {
    backgroundColor: '#ffffff',
    borderRadius:10,
    width:115,
    height:110,
  },
  linearGradient: {
    flex: 1,
  },
  btn : {
    padding:"3%",
    backgroundColor:"#000000",
    height:"9%",
    borderRadius:20,
    top:"20%",
    width:"30%",
    alignSelf:"center"
  },
  parent : {
    height : '40%',
    width : '100%',
    transform : [ { scaleX : 2 } ],
    borderBottomStartRadius : 200,
    borderBottomEndRadius : 200,
    overflow : 'hidden',
  },
  child : {
    flex : 1,
    transform : [ { scaleX : 0.5 } ],

    backgroundColor : 'red',
    alignItems : 'center',
    justifyContent : 'center'
  }
})

export default Air;
