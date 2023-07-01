import { useEffect, useState, useRef} from "react";
import {StyleSheet, AppState, Platform, Alert} from "react-native";
import {
  Provider as PaperProvider,
} from "react-native-paper";
import LaunchScreen from "./app/screens/Login/LaunchScreen";
import LoginScreenPhone from "./app/screens/Login/LoginScreenPhone";
import VerficationScreen from "./app/screens/Login/VerficationScreen";
import GettingStarted from "./app/screens/GettingStarted/GettingStarted";
import { NavigationContainer } from "@react-navigation/native";
import WelcomeScreen from "./app/screens/OnBoarding/WelcomeScreen";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import OnBoardingScreenOne from "./app/screens/OnBoarding/OnBoardingScreenOne";
import OnBoardingScreenTwo from "./app/screens/OnBoarding/OnBoardingScreenTwo";
import config from "./aws-exports";
import Amplify, { ConsoleLogger } from "@aws-amplify/core";
import AppContext from "./AppContext";
import { Auth, Hub } from "aws-amplify";
import NetInfo from "@react-native-community/netinfo";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { GestureHandlerRootView } from "react-native-gesture-handler";
import axios from 'axios';
import * as Notifications from 'expo-notifications';
import MainScreen from "./app/screens/DrawerScreens/MainScreen";
import LoadingScreen from "./app/screens/LoadingScreen/LoadingScreen";
import {URL} from "./app/constants/serverUrl"; 
// import { firebaseConfig } from "./app/constants/GoogleApiKey";
// import {initializeApp} from 'firebase/app'; 
// import { getDatabase, ref, onValue, set } from 'firebase/database';
import appLinking from "./app/linking";
import * as Linking from 'expo-linking';
import * as Location from "expo-location";

import {getAddress} from "./app/components/Custom/getAddress";
import {asyncGet, asyncSet} from "./app/components/Custom/functions";

Amplify.configure(config);
  
Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: true,
    shouldSetBadge: false,
  }),
});


export default function App() {


  //global state
  const [user, setUser] = useState(null);
  const [responses, setResponses] = useState(null);
  const [isRatedLastTrip, setIsRatedLastTrip] = useState(true);
  const [serverUrl, setUrl] = useState(URL);
  const [currentLocation, setCurrentLocation] = useState(null);
  const [previousTrip, setPreviousTrip] = useState([]);
  const [dataChanged, setDataChanged] = useState(false)
  const [isWifiConnected, setIsWifiConnected] = useState(false);
  const [isSetUp, setIsSetup] = useState(false);
  const [locPermission, setLocPermission] = useState(true);
  const [locServiceEnabled, setLocationServiceEnabled] = useState(false);


  const appState = useRef(AppState.currentState);
  const [appStateVisible, setAppStateVisible] = useState(appState.current);
  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const notificationListener = useRef();
  const responseListener = useRef();

  const url = Linking.useURL();

  const globalStates = {
    user: user,
    setUser: setUser,
    responses: responses,
    setResponses: setResponses,
    isRatedLastTrip: isRatedLastTrip,
    setIsRatedLastTrip: setIsRatedLastTrip,
    previousTrip: previousTrip,
    setPreviousTrip: setPreviousTrip,
    serverUrl: serverUrl,
    setUrl: setUrl,
    currentLocation: currentLocation,
    setCurrentLocation: setCurrentLocation,
    appStateVisible: appStateVisible,
    setAppStateVisible: setAppStateVisible,
    dataChanged : dataChanged,
    setDataChanged: setDataChanged,
    isWifiConnected: isWifiConnected,
    setIsWifiConnected: setIsWifiConnected,
    isSetUp: isSetUp,
    setIsSetup: setIsSetup,
    expoPushToken : expoPushToken,
    setExpoPushToken: setExpoPushToken,
    locPermission: locPermission,
    setLocPermission: setLocPermission,
    locServiceEnabled: locServiceEnabled,
    setLocationServiceEnabled: setLocationServiceEnabled,
  };
  
  // intialiaze the firebase app

  //initializeApp(firebaseConfig);
  

  //navigation
   // development and testing.
  const Stack = createNativeStackNavigator();


  /*
  *  function to check whether gps is enabled or not *
  */

  const setAddrees = (address, lat , long) => {
    //console.log("setting Location:", lat, long, address)
    console.log("setting the location from app.js")
    setCurrentLocation({
        latitude: lat,
        longitude: long,
        description: address,
     }) 
    
  }

  const getLocation = async () => {
    try {
        //  check whether user granted permission or not.
        
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== 'granted') {
             const isEnabled = await Location.hasServicesEnabledAsync();
             setLocationServiceEnabled(isEnabled);
             setLocPermission(false);
             return;
        }
        else
        { 
            
            setLocPermission(true);
            const isEnabled = await Location.hasServicesEnabledAsync();
            
            setLocationServiceEnabled(isEnabled);
            if(isEnabled)
            {
                let loc = await Location.getCurrentPositionAsync({});
                
                getAddress(loc.coords.latitude, loc.coords.longitude)
                .then( res =>  {
                    setAddrees(res, loc.coords.latitude, loc.coords.longitude)
                })
               
         
            }
        }
        
      } catch (error) {
        console.log("error in getting the locaion", error)
         setLocationServiceEnabled(false);
      }
    }
    
/*
*  function to ask user location foreground permission and get the location.
*/
 
useEffect(() => {
  if(user != null){
    console.log("fetching the user location from app.js")
    
      getLocation() 
   }
}, [user])


  
 /*
  *  This function is used to check the app state 
 */
  useEffect(() => {
    const appStateSubscription = AppState.addEventListener('change', _handleAppStateChange);
    return (() => {
      //AppState.removeEventListener('change', _handleAppStateChange);
      appStateSubscription.remove();
    })
  }, []);

  const _handleAppStateChange = (nextAppState) => {
    if(appState.current.match(/inactive|background/) && nextAppState === 'active'){
      // check whether user turned on the location services or not.
       getLocation();
    }
   
    appState.current = nextAppState;
    setAppStateVisible(appState.current);
   
  }


  /*
  *    This function is used to check the internet connection
  */
  useEffect(() => {
    const removeNetInfoSubscription = NetInfo.addEventListener((nextNetworkState) => {
      setIsWifiConnected(nextNetworkState.isConnected);
  });

    return () => {
      removeNetInfoSubscription();
    }
    
  }, []);


  



  // useEffect(() => {
  //   const checkGps = async () => {
  //     const isEnabled = await Location.hasServicesEnabledAsync();
  //     if(!isEnabled){
  //       Alert.alert(
  //         "GPS is disabled",
  //         "Please enable GPS to use this app",
  //         [
  //           {
  //             text: "Cancel",
  //             onPress: () => console.log("Cancel Pressed"),
  //             style: "cancel"
  //           },
  //           { text: "OK", onPress: () => Linking.openSettings() }
  //         ],
  //         { cancelable: false }
  //       );
  //     }
  //   }
  //   checkGps();
  // }, []);






  //did mount / did update
  useEffect(() => {
    checkUser();
  }, []);

  //listener for auth functions
  useEffect(() => {
    const listener = (data) => {
      if (data.payload.event === "SignIn" || data.payload.event === "SignOut") {
        checkUser();
      }
    };

    Hub.listen("auth", listener);
    return () => Hub.remove("auth", listener);
  }, []);

  

  const checkUser = async () => {
    try {
      const response = await Auth.currentAuthenticatedUser();
      setUser(response.username);
    } catch (e) {
      //setUser(10);
      setUser(null);
    }
  };

  // get initial setup from getsettings API.

const checkSetup = (controller) => {
   
  axios.post("http://54.221.174.61/user/settings/get", {
    "user_id": user,
     signal: controller.signal
    }).then(res => {
      if(res['data']['Item']['setup'] === null)
        setIsSetup(false);
      else
        setIsSetup(true);
      setIsRatedLastTrip(res['data']['Item']['isLastTripRated'])
    }).catch(err => {
      console.log(err)
    })
}

const pushToken = (user, token) => {
    axios.post("http://54.221.174.61/user/token/add", {
      "user_id": user,
      "token": token
    }).then(res => {
      console.log("token updated")
    }).catch(err => {
      console.log(err)
    })
}

  

  //Load data to check if the user setup any place already.
useEffect(() => {
    if(user != null){
      let controller = new AbortController();
      let key =  '@'+ user + '_isSetup';
      asyncGet(key).then((savedSetup) => {
        if (savedSetup == 'true')
          setIsSetup(true); //console.log("setup is true")
        else
          checkSetup(controller);
      })
      
      return () => {
        controller.abort();
      }
    }
  }, [user]);

  // For the user to recieve notificatons.

  /*
  * Added listeners for push notifications 
  */

  useEffect(() => {
    
    if(user != null){
    
      registerForPushNotificationsAsync().then(token => {
      
        setExpoPushToken(token)
        // const db = getDatabase();
        // const reference = ref(db, 'users/' + user);
        // set(reference, {
        //   expoPushToken : token,
        // });
        //post the token to the server
        pushToken(user, token);
      
    });

    // This listener is fired whenever a notification is received while the app is foregrounded
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    

    // This listener is fired whenever a user taps on or interacts with a notification (works when app is foregrounded, backgrounded, or killed)
    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      
      //{tripId: response.notification.request.content.data.tripId}
      //response.notification.request.content.data.url
     
      console.log("checking notification resp:",response.notification.request.content.body);
      if(response.notification.request.content.data['data']== 'In-App Notification')
         setIsRatedLastTrip(false) // Show the previous trip in the home screen.
      

    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }
  }, [user]);


  /*
  *  This function is used to check the notification permission for the user 
  */

  async function registerForPushNotificationsAsync() {
    let token;

      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Please allow PureNav to send you notifications for better experience');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      // get the token from the device and send it to the server.
      let token1 = (await Notifications.getDevicePushTokenAsync()).data;
      console.log("Adding device token:", token1);
      console.log(token);
    
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token1;
  }



  
  return (
    <AppContext.Provider value={globalStates}>
      {
        <PaperProvider>
        <GestureHandlerRootView style={{flex:1}}>
        <NavigationContainer linking={appLinking}>
         
         { user === null  ? (
              <Stack.Navigator screenOptions={{ headerShown: false }}>
                  <>
                    <Stack.Screen
                      name="launch screen"
                      component={LaunchScreen}
                    ></Stack.Screen>
                    <Stack.Screen
                      name="get started"
                      component={GettingStarted}
                    ></Stack.Screen>
                    <Stack.Screen
                      name="login screen"
                      component={LoginScreenPhone}
                    ></Stack.Screen>
                    <Stack.Screen
                      name="verification screen"
                      component={VerficationScreen}
                    ></Stack.Screen>
                  </>
            </Stack.Navigator>
          ) :(
            !isSetUp ? (
            <Stack.Navigator screenOptions={{ headerShown: false }}>
              <>
                <Stack.Screen
                  name="welcome screen"
                  component={WelcomeScreen}
                ></Stack.Screen>
                <Stack.Screen
                  name="onboarding screen one"
                  component={OnBoardingScreenOne}
                ></Stack.Screen>
                <Stack.Screen
                  name="OnboardingScreenTwo"
                  component={OnBoardingScreenTwo}
                ></Stack.Screen>
                <Stack.Screen
                  name="loading screen"
                  component = {LoadingScreen}
                ></Stack.Screen>
                <Stack.Screen
                  name="HomeScreen"
                  component = {MainScreen}
                ></Stack.Screen>
              </>
              </Stack.Navigator>) : ( 
              <>
                <MainScreen />
              </>
            )
          )  
        }
        </NavigationContainer>
        </GestureHandlerRootView>
        </PaperProvider>
      }
    </AppContext.Provider>
  );
}

const style = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  button:{
    backgroundColor:'#4169e1',
    paddingHorizontal: 15,
    borderRadius: 15,
   },
   logo:{
      height:150,
      alignItems:'center',
      justifyContent:'center',
      marginBottom: 100

   },
   buttonText:{
    color:'black',
    textAlign:'center',
    fontWeight:'400',
    fontSize:20
  },
  buttonData:
  {
    flexDirection:'row',
    paddingLeft: 20
  },
  item: {
    flexDirection: 'row',
    alignItems: 'center',
  },
 
  
  iconContainer: {
    marginHorizontal: 16,
    width: 24,
    alignItems: 'center',
  },
});

