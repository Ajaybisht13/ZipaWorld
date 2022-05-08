const base_url = "https://coapi.zipaworld.com/";

exports.PostRequest= async (data,endPoint)=>{
  var userAuth="";
  await AsyncStorage.getItem('user').then((user)=>{

  user = JSON.parse(user);
    if(user != null){
      userAuth= user.authToken;
    }  
  });

    return fetch(base_url+endPoint, {
        method: 'POST',
        body: JSON.stringify(data),
        headers : new Headers({
            'Content-Type' : 'application/json',
             'authToken' : userAuth
        })
        })
        .then((response) => response.json())
        .then((responseJson) => {
            return(responseJson);
        })
        .catch((error) => {
            alert("Something went wrong. please try again later.");
        });
};

exports.GetRequest=async (data,endPoint)=>{
     var userAuth="";
     await AsyncStorage.getItem('user').then((user)=>{
      user = JSON.parse(user);
      if(user != null){
        userAuth= user.authToken;
      }

  });
   
    return fetch(base_url+endPoint, {
          method: 'GET',
          headers : new Headers({
            'Content-Type':'application/json',
            'authToken' : userAuth
          })
          })
          .then((response) => response.json())
          .then((responseJson) => {
            return(responseJson);
          })
          .catch((error)=>{
            alert("Something went wrong. please try again later.");
          });   
  };



exports.PostRequestForm=async (data, endPoint)=>{
    var userAuth="";
    await AsyncStorage.getItem('user').then((user)=>{
        user = JSON.parse(user);
        if(user != null){
          userAuth= user.authToken;
        }

    });
  
  return fetch(base_url+endPoint, {
        method: 'POST',
        body: data,
        headers : new Headers({
          'Content-Type':'multipart/form-data',
          'authToken' : userAuth
        })
        })
        .then((response) => response.json())
        .then((responseJson) => {
          return(responseJson);
        })
        .catch((error)=>{
          alert("Something went wrong. please try again later.");
        });   
};