import React, { Component, useEffect, useState } from 'react';
import { View, Text, TouchableOpacity, Image, Button } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import Icons from 'react-native-vector-icons/FontAwesome5';
import { DrawerActions } from '@react-navigation/routers';
import Iconss from 'react-native-vector-icons/FontAwesome'


import SplashScreen from './SplashScreen';

import Home from './src/screens/common/Home';
import Home2 from './src/screens/common/Home2';
import About from './src/screens/tabScreen/About';
import Air from './src/screens/common/Air';
import Ocean from './src/screens/common/Ocean';
import Courier from './src/screens/common/Courier';
import Road from './src/screens/common/Road';
import General from './src/screens/Air/General';
import Pharmaceuticals from './src/screens/Air/Pharmaceuticals';
import Perishables from './src/screens/Air/Perishables';
import Dimensions from './src/screens/Air/Dimensions';
import Animals from './src/screens/Air/Animals';
import Danger from './src/screens/Air/Danger';
import Others from './src/screens/Air/Others';
import Login from './src/screens/auth/Login';
import SignUp from './src/screens/auth/SignUp';
import Login2 from './src/screens/auth/Login2';
import getQueryRates from './src/screens/common/getQueryRates';
import ProformaView from './src/screens/common/ProformaView';
import ShipmentDetail from './src/screens/common/ShipmentDetail';

import OceanGeneral from './src/screens/Ocean/OceanGeneral';
import OceanAddressToPort from './src/screens/Ocean/OceanAddressToPort';
import OceanAddressToAddress from './src/screens/Ocean/OceanAddressToAddress';
import OceanDimensions from './src/screens/Ocean/OceanDimensions';
import OceanDanger from './src/screens/Ocean/OceanDanger';
import OceanOthers from './src/screens/Ocean/OceanOthers';
import OceanGeneralStep1 from './src/screens/Ocean/OceanGeneralStep1';
import ShipperDetails from './src/screens/Ocean/ShipperDetails';
import OceanPortToAddress from './src/screens/Ocean/OceanPortToAddress';
import OceanRefrigeratedCargo from './src/screens/Ocean/OceanRefrigeratedCargo';
import RefrigeratedCargoPortToPort from './src/screens/Ocean/RefrigeratedCargoPortToPort';
import RefrigeratedCargoAddressToPort from './src/screens/Ocean/RefrigeratedCargoAddressToPort';
import RefrigeratedCargoAddressToAddress from './src/screens/Ocean/RefrigeratedCargoAddressToAddress';
import RefrigeratedCargoPortToAddress from './src/screens/Ocean/RefrigeratedCargoPortToAddress';
import DimentionPortToPort from './src/screens/Ocean/DimentionPortToPort';
import DimentionAddressToPort from './src/screens/Ocean/DimentionAddressToPort'
import DimentionAddressToAddress from './src/screens/Ocean/DimentionAddressToAddress';
import DimentionPortToAddress from './src/screens/Ocean/DimentionPortToAddress';
import DangerPortToPort from './src/screens/Ocean/DangerPortToPort';
import DangerAddressToPort from './src/screens/Ocean/DangerAddressToPort';
import DangerAddressToAddress from './src/screens/Ocean/DangerAddressToAddress';
import DangerPortToAddress from './src/screens/Ocean/DangerPortToAddress';
import OthersPortToPort from './src/screens/Ocean/OthersPortToPort';
import OthersAddressToPort from './src/screens/Ocean/OthersAddressToPort';
import OthersAddressToAddress from './src/screens/Ocean/OthersAddressToAddress';
import OthersPortToAddress from './src/screens/Ocean/OthersPortToAddress';
import MawbViewCustomer from './src/screens/Ocean/MawbViewCustomer';
import HBLpdf from './src/screens/common/HBLpdf';
import MBL from './src/screens/common/MBL';
import editHBL from './src/screens/DrawerScreen/editHBL';

import CustomDrawer from './src/screens/DrawerScreen/customDrawer';

import DashBoard from './src/screens/DrawerScreen/DashBoard';
import shipmentManager from './src/screens/DrawerScreen/shipmentManager';
import invoiceManager from './src/screens/DrawerScreen/invoiceManager';
import documentManager from './src/screens/DrawerScreen/documentManager';
import shipperConsigneeMaster from './src/screens/DrawerScreen/shipperConsigneeMaster';
import Profile from './src/screens/DrawerScreen/Profile';
import Tracking from './src/screens/DrawerScreen/Tracking';

import { NavigationContainer, DefaultTheme, DarkTheme } from '@react-navigation/native';
import { createStackNavigator, CardStyleInterpolators} from '@react-navigation/stack';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createStackNavigator();
const Drawer = createDrawerNavigator();
const Tab = createBottomTabNavigator();

function App() {
   const [isloggedin , setLogged] = useState(false)
 

  useEffect(async() => {
    const token = await AsyncStorage.getItem("userToken")
    console.log("token aa gaya h",token);
    if(token){
      setLogged(true);
    }else {
      setLogged(false);
    }
   
  }, [])
  
  return(
    <NavigationContainer>
       <Stack.Navigator>
         { isloggedin == true ? 
         (<>
          <Stack.Screen name="SplashScreen" component={SplashScreen} 
                options={({navigation}) => ({
                headerShown: false,
            })}/>
          <Stack.Screen name="Home" component={DrawerRoutes} 
            options={({navigation}) => ({
             headerStyle: {
               backgroundColor: '#ffffff'
             },
             headerLeft : () => (
              <View>
                <TouchableOpacity style = {{marginLeft:"18%"}} onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}>
                  <Iconss name ="bars" size={20} color="black"/>
                </TouchableOpacity>
              </View>
             ),
             headerTitle: () => (
               <View>
                 <TouchableOpacity> 
                  <Image
                   style={{width: 190, height: 30}}
                   source={require('./src/assets/log.png')}
                 />
                </TouchableOpacity> 
               </View>
              ),
             
         })}/>
      
         <Stack.Screen name="HBLpdf" component={HBLpdf} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
         
        }}/> 

        <Stack.Screen name="editHBL" component={editHBL} 
                  options={{
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#ffffff'
                    },
                    headerTitle: () => (
                      <View>
                        <TouchableOpacity> 
                        <Image
                          style={{width: 180, height: 25}}
                          source={require('./src/assets/log.png')}
                        />
                      </TouchableOpacity> 
                      </View>
                    ),
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
         
        }}/> 

         <Stack.Screen name="MBL" component={MBL} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
         
        }}/>
          <Stack.Screen name="Air" component={Air} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
         
        }}/>
        <Stack.Screen name="ShipmentDetail" component={ShipmentDetail} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
         
        }}/>
        <Stack.Screen name="Ocean" component={Ocean} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25, marginLeft:"18%"}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="Courier" component={Courier} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
         <Stack.Screen name="Road" component={Road} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="General" component={General} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Pharmaceuticals" component={Pharmaceuticals} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Perishables" component={Perishables} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Dimensions" component={Dimensions} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Animals" component={Animals} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Danger" component={Danger} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Others" component={Others} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="OceanGeneral" component={OceanGeneral} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>

        <Stack.Screen name="ProformaView" component={ProformaView} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/> 
        <Stack.Screen name="OceanAddressToPort" component={OceanAddressToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanAddressToAddress" component={OceanAddressToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanPortToAddress" component={OceanPortToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanRefrigeratedCargo" component={OceanRefrigeratedCargo} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="RefrigeratedCargoPortToPort" component={RefrigeratedCargoPortToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="RefrigeratedCargoAddressToPort" component={RefrigeratedCargoAddressToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="RefrigeratedCargoAddressToAddress" component={RefrigeratedCargoAddressToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="RefrigeratedCargoPortToAddress" component={RefrigeratedCargoPortToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanDimensions" component={OceanDimensions} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="DimentionPortToPort" component={DimentionPortToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="DimentionAddressToPort" component={DimentionAddressToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
         <Stack.Screen name="DimentionPortToAddress" component={DimentionPortToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
         <Stack.Screen name="DimentionAddressToAddress" component={DimentionAddressToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>

        <Stack.Screen name="OceanDanger" component={OceanDanger} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="DangerPortToPort" component={DangerPortToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="DangerAddressToPort" component={DangerAddressToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
         <Stack.Screen name="DangerAddressToAddress" component={DangerAddressToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="DangerPortToAddress" component={DangerPortToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanOthers" component={OceanOthers} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OthersPortToPort" component={OthersPortToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OthersAddressToPort" component={OthersAddressToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OthersAddressToAddress" component={OthersAddressToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OthersPortToAddress" component={OthersPortToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanGeneralStep1" component={OceanGeneralStep1} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="ShipperDetails" component={ShipperDetails} 
           options={{
            headerShown: false,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
          <Stack.Screen name="Login" component={Login} 
                  options={({navigation}) => ({
                    headerShown: false,
                    headerStyle: {
                      backgroundColor: '#ffffff'
                    },
                    //headerLeft: ()=> null,
                    headerLeft : () => (
                      <View>
                        <TouchableOpacity style = {{marginLeft:"18%"}}>
                          <Iconss name ="bars" size={20} color="black"/>
                        </TouchableOpacity>
                      </View>
                     ),
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                })}/>
                 <Stack.Screen name="Home2" component={DrawerRoute} 
                  options={({navigation}) => ({
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#ffffff'
                    },
                    headerLeft : () => (
                      <View>
                        <TouchableOpacity style = {{marginLeft:"18%"}} onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}>
                          <Iconss name ="bars" size={20} color="black"/>
                        </TouchableOpacity>
                      </View>
                     ),
                    headerTitle: () => (
                      <View>
                        <Image
                          style={{width: 180, height: 25, marginLeft:"18%"}}
                          source={require('./src/assets/log.png')}
                        />
                      </View>
                    ),
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                })}/>
                <Stack.Screen name="getQueryRates" component={getQueryRates} 
                  options={({navigation}) => ({
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#ffffff'
                    },
                    //headerLeft: ()=> null,
                    headerTitle: () => (
                      <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
                        <Image
                          style={{width: 180, height: 25, marginLeft:"18%"}}
                          source={require('./src/assets/log.png')}
                        />
                      </TouchableOpacity> 
                      </View>
                    ),
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                })}/>

                  <Stack.Screen name="Login2" component={Login2} 
                      options={({navigation}) => ({
                        headerShown: false,
                        headerStyle: {
                          backgroundColor: '#ffffff'
                        },
                        //headerLeft: ()=> null,
                        headerTitle: () => (
                          <View>
                            <Image
                              style={{width: 180, height: 25, marginLeft:"18%"}}
                              source={require('./src/assets/log.png')}
                            />
                          </View>
                        ),
                        cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                    })}/>
                <Stack.Screen name="MawbViewCustomer" component={MawbViewCustomer} 
                  options={({navigation}) => ({
                    headerShown: false,
                    headerStyle: {
                      backgroundColor: '#ffffff'
                    },
                    //headerLeft: ()=> null,
                    headerTitle: () => (
                      <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
                        <Image
                          style={{width: 180, height: 25, marginLeft:"18%"}}
                          source={require('./src/assets/log.png')}
                        />
                      </TouchableOpacity> 
                      </View>
                    ),
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                })}/>
                 <Stack.Screen name="SignUp" component={SignUp} 
                options={({navigation}) => ({
                headerShown: false,
                headerStyle: {
                  backgroundColor: '#ffffff'
                },
                headerLeft: ()=> null,
                headerTitle: () => (
                  <View>
                      <Image
                      style={{width: 180, height: 25, marginLeft:"18%"}}
                      source={require('./src/assets/log.png')}
                    />
                  </View>
                  ),
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
              })}/>
         </>
         ): (<>
             <Stack.Screen name="SplashScreen" component={SplashScreen} 
                options={({navigation}) => ({
                headerShown: false,
            })}/>
            <Stack.Screen name="Home" component={Home} 
                options={({navigation}) => ({
                headerShown: true,
                headerStyle: {
                  backgroundColor: '#ffffff'
                },
                headerLeft: ()=> null,
                headerTitle: () => (
                  <View>
                    <TouchableOpacity> 
                      <Image
                      style={{width: 190, height: 30}}
                      source={require('./src/assets/log.png')}
                    />
                    </TouchableOpacity> 
                  </View>
                  ),
                headerRight: () =><Icons name="user-circle" size={40} color="#fe0000" style={{paddingRight:10}} onPress={() => navigation.navigate('Login')}/>
            })}/>
           <Stack.Screen name="Home2" component={DrawerRoute} 
            options={({navigation}) => ({
            headerShown: true,
             headerStyle: {
               backgroundColor: '#ffffff'
             },
             headerLeft : () => (
              <View>
                <TouchableOpacity style = {{marginLeft:"18%"}} onPress = {() => navigation.dispatch(DrawerActions.openDrawer())}>
                  <Iconss name ="bars" size={20} color="black"/>
                </TouchableOpacity>
              </View>
             ),
             headerTitle: () => (
               <View>
                 <TouchableOpacity> 
                  <Image
                   style={{width: 190, height: 30}}
                   source={require('./src/assets/log.png')}
                 />
                </TouchableOpacity> 
               </View>
              ),
             
         })}/>
         <Stack.Screen name="ProformaView" component={ProformaView} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/> 
            <Stack.Screen name="SignUp" component={SignUp} 
                options={({navigation}) => ({
                headerShown: false,
                headerStyle: {
                  backgroundColor: '#ffffff'
                },
                headerLeft: ()=> null,
                headerTitle: () => (
                  <View>
                      <Image
                      style={{width: 180, height: 25, marginLeft:"18%"}}
                      source={require('./src/assets/log.png')}
                    />
                  </View>
                  ),
                  cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
              })}/>
              <Stack.Screen name="getQueryRates" component={getQueryRates} 
                  options={({navigation}) => ({
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#ffffff'
                    },
                    //headerLeft: ()=> null,
                    headerTitle: () => (
                      <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
                        <Image
                          style={{width: 180, height: 25, marginLeft:"18%"}}
                          source={require('./src/assets/log.png')}
                        />
                      </TouchableOpacity> 
                      </View>
                    ),
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                })}/>
                <Stack.Screen name="Login" component={Login} 
                  options={({navigation}) => ({
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#ffffff'
                    },
                    //headerLeft: ()=> null,
                    headerTitle: () => (
                      <View>
                        <TouchableOpacity onPress={() => navigation.navigate('Home')}> 
                        <Image
                          style={{width: 180, height: 25, marginLeft:"18%"}}
                          source={require('./src/assets/log.png')}
                        />
                      </TouchableOpacity> 
                      </View>
                    ),
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                })}/>
                <Stack.Screen name="Login2" component={Login2} 
                  options={({navigation}) => ({
                    headerShown: true,
                    headerStyle: {
                      backgroundColor: '#ffffff'
                    },
                    //headerLeft: ()=> null,
                    headerTitle: () => (
                      <View>
                        <TouchableOpacity> 
                        <Image
                          style={{width: 180, height: 25, marginLeft:"18%"}}
                          source={require('./src/assets/log.png')}
                        />
                      </TouchableOpacity> 
                      </View>
                    ),
                    cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
                })}/>
                <Stack.Screen name="Air" component={Air} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
         
        }}/>
        <Stack.Screen name="Ocean" component={Ocean} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25, marginLeft:"18%"}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="Courier" component={Courier} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
         <Stack.Screen name="Road" component={Road} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="General" component={General} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Pharmaceuticals" component={Pharmaceuticals} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Perishables" component={Perishables} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Dimensions" component={Dimensions} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Animals" component={Animals} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Danger" component={Danger} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="Others" component={Others} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
        }}/>
        <Stack.Screen name="OceanGeneral" component={OceanGeneral} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanAddressToPort" component={OceanAddressToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanAddressToAddress" component={OceanAddressToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanPortToAddress" component={OceanPortToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanRefrigeratedCargo" component={OceanRefrigeratedCargo} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="RefrigeratedCargoPortToPort" component={RefrigeratedCargoPortToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="RefrigeratedCargoAddressToPort" component={RefrigeratedCargoAddressToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="RefrigeratedCargoAddressToAddress" component={RefrigeratedCargoAddressToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="RefrigeratedCargoPortToAddress" component={RefrigeratedCargoPortToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanDimensions" component={OceanDimensions} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="DimentionPortToPort" component={DimentionPortToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="DimentionAddressToPort" component={DimentionAddressToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
         <Stack.Screen name="DimentionPortToAddress" component={DimentionPortToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
         <Stack.Screen name="DimentionAddressToAddress" component={DimentionAddressToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>

        <Stack.Screen name="OceanDanger" component={OceanDanger} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="DangerPortToPort" component={DangerPortToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="DangerAddressToPort" component={DangerAddressToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
         <Stack.Screen name="DangerAddressToAddress" component={DangerAddressToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="DangerPortToAddress" component={DangerPortToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OceanOthers" component={OceanOthers} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OthersPortToPort" component={OthersPortToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OthersAddressToPort" component={OthersAddressToPort} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OthersAddressToAddress" component={OthersAddressToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
        <Stack.Screen name="OthersPortToAddress" component={OthersPortToAddress} 
           options={{
            headerShown: true,
            headerStyle: {
              backgroundColor: '#ffffff'
            },
            headerTitle: () => (
              <View>
                <TouchableOpacity> 
                 <Image
                  style={{width: 180, height: 25}}
                  source={require('./src/assets/log.png')}
                />
               </TouchableOpacity> 
              </View>
             ),
             cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
        }}/>
          <Stack.Screen name="OceanGeneralStep1" component={OceanGeneralStep1} 
            options={{
              headerShown: true,
              headerStyle: {
                backgroundColor: '#ffffff'
              },
              headerTitle: () => (
                <View>
                  <TouchableOpacity> 
                  <Image
                    style={{width: 180, height: 25}}
                    source={require('./src/assets/log.png')}
                  />
                </TouchableOpacity> 
                </View>
              ),
              cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS
          }}/>
          </>
        )}
       </Stack.Navigator>
    </NavigationContainer>
  )
}

function DrawerRoutes() {
  return (
      <Drawer.Navigator initialRouteName="Home" drawerContent={props=> <CustomDrawer {...props}/>}>
        <Drawer.Screen name="Dashboard" component={Home}
           options={{
            drawerIcon: () => (
              <Icon name="home" color="#000000" size={24}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown:false,
          }}
        />
        <Drawer.Screen name="Shipment Manager" component={shipmentManager}
           options={{
            drawerIcon: () => (
              <Icon name="paper-roll" color="#000000" size={24}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown: false
          }}
        />
        <Drawer.Screen name="Invoice Manager" component={invoiceManager}
           options={{
            drawerIcon: () => (
              <Icons name="scroll" color="#000000" size={20}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown: false
          }}
        />
        <Drawer.Screen name="Document Manager" component={documentManager}
           options={{
            drawerIcon: () => (
              <Icon name="newspaper" color="#000000" size={24}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown: false
          }}
        />
        {/* <Drawer.Screen name="SCM" component={shipperConsigneeMaster}
           options={{
            drawerIcon: () => (
              <Icons name="user-tie" color="#000000" size={26}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown: false
          }}
        /> */}
        <Drawer.Screen name="Tracking" component={Tracking}
           options={{
            drawerIcon: () => (
              <Icons name="question-circle" color="#000000" size={24}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown: false
          }}
        />
      </Drawer.Navigator>
  );
}

function DrawerRoute() {
  return (
      <Drawer.Navigator initialRouteName="Home2" drawerContent={props=> <CustomDrawer {...props}/>}>
        <Drawer.Screen name="Dashboard" component={Home}
           options={{
            drawerIcon: () => (
              <Icon name="home" color="#000000" size={24}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown:false,
          }}
        />
        <Drawer.Screen name="Shipment Manager" component={shipmentManager}
           options={{
            drawerIcon: () => (
              <Icon name="paper-roll" color="#000000" size={24}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown: false
          }}
        />
        <Drawer.Screen name="Invoice Manager" component={invoiceManager}
           options={{
            drawerIcon: () => (
              <Icons name="scroll" color="#000000" size={20}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown: false
          }}
        />
        <Drawer.Screen name="Document Manager" component={documentManager}
           options={{
            drawerIcon: () => (
              <Icon name="newspaper" color="#000000" size={24}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown: false
          }}
        />
        {/* <Drawer.Screen name="SCM" component={shipperConsigneeMaster}
           options={{
            drawerIcon: () => (
              <Icons name="user-tie" color="#000000" size={26}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown: false
          }}
        /> */}
        <Drawer.Screen name="Tracking" component={Tracking}
           options={{
            drawerIcon: () => (
              <Icons name="question-circle" color="#000000" size={24}/>
            ),
            drawerActiveTintColor:"#000000",
            drawerActiveBackgroundColor:"#ffffff",
            headerShown: false
          }}
        />
      </Drawer.Navigator>
  );
}

function TabRoutes(){
  return(
    <Tab.Navigator initialRouteName="Home" barStyle={{alignItems:'center'}}>
        <Tab.Screen name="Home" component={Home}
            options={{
              tabBarIcon: () => (
                <Icon name="home" color="#000000" size={32}/>
              ),
              tabBarActiveTintColor:"#000000",
              headerShown: false,
            }}
        />
        <Tab.Screen name="DashBoard" component={DashBoard}
            options={{
              tabBarIcon: () => (
                <Icon name="view-dashboard" color="#000000" size={30}/>
              ),
              tabBarActiveTintColor:"#000000",
              headerShown: false
            }}
        />
        <Tab.Screen name="Profile" component={Profile}
            options={{
              tabBarIcon: () => (
                <Icons name="user-alt" color="#000000" size={28}/>
              ),
              tabBarActiveTintColor:"#000000",
              headerShown: false
            }}
        />
    </Tab.Navigator>
  );
} 


export default App;
