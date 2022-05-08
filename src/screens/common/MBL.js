import React, { Component } from 'react';
import { View, Text, PermissionsAndroid, Platform, Button } from 'react-native';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

class MBL extends Component {
  constructor(props) {
    super(props);
    this.state = {
        link : []
    };
  }

  componentDidMount = async() => {
       this.setState({
           bookingId : this.props.route.params.bookingId
       }, () => {
           console.log("ddddddddd", this.state.bookingId);
           this.invoiceManagerPdf(this.state.bookingId)
       })
    }

  invoiceManagerPdf = async(bookingId) => {

    const token = await AsyncStorage.getItem("userToken")
    fetch("https://coapi.zipaworld.com/api/bookings/get", {
        method : "Post",
        headers : {
            "Content-Type" : "application/json",
            "authkey" : token
        },
        body: JSON.stringify({id:bookingId})
    }).then((response) => response.json())
      .then((results) => {
          console.log("iiiiiiinnnnnnnnn", JSON.stringify(results.result));
          this.setState({
            invoiceM : results.result,
            isloading:false, 
            link : results.result.blPdfUrl
          }, () => {
              console.log("okkk", this.state.link)
          });
      }).catch((error) => console.log("error", error));
 }

 historyDownload() {
    //Function to check the platform
    //If iOS the start downloading
    //If Android then ask for runtime permission
    if (Platform.OS === 'ios') {
      this.downloadHistory();
    } else {
      try {
        PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
          {
            title:'storage title',
            message:'storage_permission',
          },
        ).then(granted => {
          if (granted === PermissionsAndroid.RESULTS.GRANTED) {
            //Once user grant the permission start downloading
            console.log('Storage Permission Granted.');
            this.downloadHistory();
          } else {
            //If permission denied then show alert 'Storage Permission Not Granted'
           Alert.alert('storage_permission');
          }
        });
      } catch (err) {
        //To handle permission related issue
        console.log('error', err);
      }
    }
  }

  async downloadHistory() {
    const { config, fs } = RNFetchBlob;
    let PictureDir = fs.dirs.PictureDir;
    let date = new Date();
    let options = {
      fileCache: true,
      addAndroidDownloads: {
        //Related to the Android only
        useDownloadManager: true,
        notification: true,
        path:
          PictureDir +
          '/Report_Download' +
          Math.floor(date.getTime() + date.getSeconds() / 2),
        description: 'Risk Report Download',
      },
    };
    config(options)
      .fetch('GET', this.state.link)
      .then((res) => {
        //Showing alert after successful downloading
        console.log('res -> ', JSON.stringify(res));
        alert('File Download.');
      });
  }

 render() {
    let yourPDFURI = {uri: this.state.link, cache: true};
     console.log("gggggggggg", yourPDFURI)
    return <View style={{flex: 1}}>
      <Pdf
        source={yourPDFURI}
        style={{flex: 1}}
        onError={(error)=>{console.log(error);}} />
        <Text></Text>
       <View style = {{width:"40%", alignSelf:"center"}}>
           <Button title = "Download"  color = "#ff3800" onPress = {() => this.historyDownload()}/>
       </View>
    </View>
  }
}

export default MBL;
