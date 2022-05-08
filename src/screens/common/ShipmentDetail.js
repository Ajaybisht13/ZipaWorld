import React, { Component } from 'react';
import { View, Text, StyleSheet, Dimensions, Button, PermissionsAndroid, Platform } from 'react-native';
import Pdf from 'react-native-pdf';
import AsyncStorage from '@react-native-async-storage/async-storage';
import RNFetchBlob from 'rn-fetch-blob';

class PerfomaView extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  componentDidMount =async() => {
    await AsyncStorage.getItem("userToken")
    this.setState({
      inVoiceDetails : this.props.route.params.details,
      url : this.props.route.params.url
    }, () => {
      console.log("bbbbbbbbbb", this.state.url)
      })
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
    .fetch('GET', this.state.url)
    .then((res) => {
      //Showing alert after successful downloading
      console.log('res -> ', JSON.stringify(res));
      alert('File Download.');
    });
}


  render() {
    let yourPDFURI = {uri: this.state.url, cache: true};

    return <View style={{flex: 1}}>
      <Pdf
        source={yourPDFURI}
        style={{flex: 1}}
        onError={(error)=>{console.log(error);}} />
        <Text></Text>
       <View style = {{width:"40%", alignSelf:"center", paddingBottom:"5%"}}>
           <Button title = "Download" color = "#ff3800" onPress = {() => this.historyDownload()}/>
       </View>
    </View>
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    marginTop: 25,
  },
  pdf: {
    flex: 1,
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
  },
});

export default PerfomaView;
