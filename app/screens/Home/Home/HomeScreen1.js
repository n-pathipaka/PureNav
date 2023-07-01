/* eslint-disable prettier/prettier */
import {
    SafeAreaView,
    View,
    Image,
    StyleSheet,
    Text,
    TouchableOpacity,
    AppState
  } from "react-native";
import React, { useEffect, useState, useContext } from 'react';
import Frame139 from './Frame139';
import UpcomingTrips from './UpcomingTrips';
import Menu from 'react-native-vector-icons/Feather'
import fonts from "../../../config/fonts";
import colors from "../../../config/colors";
import { useNavigation } from '@react-navigation/native';
import axios from 'axios';
import TripCards from "../../../components/Custom/TripCards";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import LongButton from "../../../components/Buttons/LongButton";
import AddPlaceModal from "../../../components/Modals/AddPlaceModal";
import EmptyFrame from "../../LoadingScreen/EmptyFrame";

import AppContext from "../../../../AppContext";
import * as Location from "expo-location";

import { processNextTripDetails } from "../../../components/Custom/functions";
import { getDate} from "../../../components/Custom/time";
import { getAddress } from "../../../components/Custom/getAddress";
import { formatAddress } from "../../../components/Custom/time";
import { connectWifiScreen, serverDown , connectLocationScreen} from "../../../components/Custom/DefaultScreens";


 export default function HomeScreen1(props) {

    const appContext = useContext(AppContext);
    const navigation = useNavigation();
    const [nextTrip, setNextTrip] = useState([]);
    const [countRatings, setCountRatings] = useState(0);
    const [addPlaces, setAddPlaces] = useState(false);
    const [isLocationEnabled, setIsLocationEnabled] = useState(true);
    const [isAddPlaceModalVisible, setisAddPlaceModalVisible] = useState(false);
    const [isNextTripLoading, setIsNextTripLoading] = useState(true);
    const [location, setLocation] = useState(false)
    const [isLoading, setIsLoading] = useState(false);
    const [serverError, setServerError] = useState(false);
    const [checkStatus, setCheckStatus] = useState(200);
    const  [count, setCount] = useState(0);


    const addPlaceScreen = () => {
        return(
            <View style={styles.landingScreen}>
                <EvilIcons name="location" size={100} color={colors.dark_grey}/>
                <Text style={styles.landingText}>You don't have any place added. Please add a place to start using the app</Text>
                <LongButton  disabled={false} title={'Add a place'} onPress={() => {

                    setisAddPlaceModalVisible(true)
                    }}></LongButton>
            </View>
        );
    }
    const checkPlaces = (controller) => {

        axios.post("http://"+appContext.serverUrl+"/place/all", {
             
                  'user_id': appContext.user,
                   signal : controller.signal
        
        })
        .then( function(response){
           
            let c = response['data']['Count']  

             if(c == 0){
                setAddPlaces(true)
             }
             else{
                setAddPlaces(false)
             }
           
          } ) 
        .catch( function(error){
            if(!controller.signal.aborted)
                  console.log(error)
        }
        )
    }

    const getNextTrip = (controller) => {
   
       // fetch data whenever the current location got set 
       if(appContext.currentLocation != undefined )
       {
       
       
        axios.post("http://"+appContext.serverUrl+"/trip/next", {
            
                  "user_id":appContext.user,
                  "src": null,
                  "src_lat": appContext.currentLocation.latitude,
                  "src_lon": appContext.currentLocation.longitude,
                  "src_addr":  formatAddress(appContext.currentLocation.description),
                  "interval": 0,
                  signal : controller.signal
        
        })
        .then( function(response){
            
            let c= response['data']['Count']
            if(c == 0){
                setAddPlaces(true)
            }
            // process the next trip details 
            let currentTrip = processNextTripDetails(response, appContext.currentLocation.latitude,appContext.currentLocation.longitude, appContext.currentLocation.description)
            
            setNextTrip(currentTrip)
            setAddPlaces(false)
            setIsNextTripLoading(false)
            setIsLoading(false)  //used to show the loading screen if trip is getting updated
            setCount(0)
            setCheckStatus(200)
            
          } ) .catch( function(error){
              if(!controller.signal.aborted)
              {
                  console.log(error)
                  console.log("checking server status from next trip:", error.response.status)
                  console.log("setting the error status now to:", )
                  // get the error code.
                    if(error.response != undefined)
                    {
                        console.log("setting the status of the API:", error.response.status + count)
                        setCheckStatus(error.response.status + count)
                    }
                        
              }
          }
        )
      }
    }

    // gets the address from lat and long using the goolge gecoding API
    const setAddrees = (address, lat , long) => {
        //console.log("setting Location:", lat, long, address)
        appContext.setCurrentLocation({
            latitude: lat,
            longitude: long,
            description: address,
         })
         setLocation(!location)
    }

    const getLocation = (locController) => {
        (async () => {
            try{
                if(appContext.setLocationServiceEnabled){
                    let loc = await Location.getCurrentPositionAsync({});
                    if(locController)
                    {
                        getAddress(loc.coords.latitude, loc.coords.longitude)
                        .then( res =>  {
                            setAddrees(res, loc.coords.latitude, loc.coords.longitude)
                        })
                    }
            }}
            catch(error){
                console.log(error)
            }
        })();
    }
    /*
    *  Currently fetcing the location from APP.js
    *
    * */
    
    // useEffect(() => {
    //     console.log("getting the location")
    //     if(appContext.setLocationServiceEnabled){
    //         let locController = new AbortController();
    //         getLocation(locController);
    //         return () => {
    //             locController?.abort();
    //         };
    //    }
        
    // }, []);

    // Initial fetch on the first time the appp is opened.
    useEffect(() => {
        let placesController   = new AbortController();
        let nextTripController = new AbortController();
        while(appContext.appStateVisible != "active"){
            console.log("App is on background")
        }
        checkPlaces(placesController)
        //  No need to fetch the next trip, wihtout setting the current location.
        //getNextTrip(nextTripController)
        return()=>{ 
            placesController.abort()
            //nextTripController.abort()
        }
    }, [])


    // fetching whenever the current location got set in app.js if the current trip still not got set.
    useEffect(() => {
        if(nextTrip.length == 0 && appContext.currentLocation != undefined){
            console.log("fetching whenver the location got set in Main APP.js")
            let locRecievedController = new AbortController();
            getNextTrip(locRecievedController)

            return () => locRecievedController?.abort();
        }
    }, [appContext.currentLocation])



    

    /**
     * Triggers whenever the user logs in or logs out.
     * Add or edit or delete some places 
     */
    useEffect(() => {
       if( nextTrip.length != 0){
            let dataChangeController = new AbortController();
            let locController        = new AbortController();
            setIsLoading(true)
            //getLocation(locController);  //location will be called from app.js // current location would not have changed let's check later..
            setTimeout(() => {
            getNextTrip(dataChangeController)}, 5000);
            return () => {
                dataChangeController?.abort();
                locController?.abort();
            }
        }
    }, [appContext.dataChanged])


    /*
    *   Triggers whenever the user comes back after a server down error.
    *   Comes back from background to go to foreground.
    */

    useEffect(() => {
      if(appContext.appStateVisible == "active")
      {
        // if recently we got a serve error, then check the status of the server.
        if(serverError)
        {
            let locRecievedController = new AbortController();
            console.log("location got set")
            getNextTrip(locRecievedController)
    
            return () => locRecievedController?.abort();
            
        }
      }
        
    },[appContext.appStateVisible])

    /*
       Triggers whenever the api Fails to fetch the next trip.
    */

    useEffect(() => {

        console.log("chekcing status from useeffect :", checkStatus)
       
        if(checkStatus != 200)
        {
            let apiCount = count + 1
            console.log("setting the count to :", apiCount)
            setCount(apiCount)
            console.log("chekcing status inside useeffect :", checkStatus)

            let dataChangeController = new AbortController();

            if(apiCount >= 10)
            {
                console.log("server got down")
                // May be server is down, Tell the user to come back later.
                setServerError(true)
                setCount(0)
            }
            else{
                if(apiCount < 5)
                setTimeout(() => {getNextTrip(dataChangeController)},3000);
                else
                setTimeout(() => {getNextTrip(dataChangeController)}, 30000);
            }

            return () => dataChangeController?.abort();
             
        }
    }, [checkStatus])
    

   const headerDetails = (props) => {

     {/* header code in Home */}

     return (

         <>
         <View style={{display:'flex', flexDirection:"column", alignItems:'flex-start', width:'100%', marginBottom:20}}>
         <TouchableOpacity onPress= {() => props.navigation.toggleDrawer()}>
             <Menu name = 'menu' size ={28} color = {colors.dark_grey} style = {{paddingBottom:4}}/>
         </TouchableOpacity>
         <View style={{flexDirection:'row', width:'100%',backgroundColor:'white'}}>
             <Image
                 source={require("../../../assets/home_icon.png")}
                 style={{ height: 41, width: 41, marginRight: 10 }}
             ></Image>
             <Text
                 style={[
                 fonts.fontSizes.heading1,
                 ]}
             >
                 At Home
             </Text>
         </View>
        </View>
        </>
     )

   }

   const ShowDetails = (props) => {
    

    return(
            <>

            {/* Check whether previous trip rating missed, if missed show the user dailog. */}

            {appContext.isRatedLastTrip == false ? (
            <View>
                <Text 
                        style={[
                            fonts.fontSizes.heading5,{fontWeight:'600'}
                        ]}
                    > Rate Your Previous Trip</Text>
            <TripCards
            date={getDate()} fromPlace={!appContext.previousTrip.starts_at.tags? appContext.previousTrip.starts_at.place_name: appContext.previousTrip.starts_at.tags} toPlace={!appContext.previousTrip.ends_at.tags? appContext.previousTrip.ends_at.place_name: appContext.previousTrip.ends_at.tags} fromTime="12:30 pm" toTime="1:01 pm"  status= "Arrived" cardType="Rating"
            countRatings = {countRatings} 
            setCountRatings = {setCountRatings}
            trip_data = {appContext.previousTrip}
            setRatedLastTrip = {appContext.setIsRatedLastTrip}
            from="Home"
            /> 
            </View>) : null}
            {/*  Next Trip  and card Details */}
            <View style = {{display:'flex', alignItems:"flex-start", alignSelf:'stretch', marginBottom:30}}>
                <View style={{marginBottom:8}}>
                    <Text 
                        style={[
                            fonts.fontSizes.heading5,{fontWeight:'600'}
                        ]}
                    >
                            Next Trip
                    </Text>
                </View>

                {/*  Card Content  */}

                {!isNextTripLoading ? (
                    !addPlaces ? (
                <View style={{width:'100%'}}>
                    <Frame139 trip={nextTrip} countRatings ={countRatings} setCountRatings = {setCountRatings} isLoading={isLoading} ></Frame139>
                </View>): (addPlaceScreen)) : ( 
                <View style={{width:'100%'}}> 
                    <EmptyFrame/> 
                </View>
                )}           
            </View>
            {/* Upcoming Trip Details */}
            <View style={{width:'100%'}}>
                <UpcomingTrips/>
            </View>

        </>
    )

   }

//    console.log("checking location enabled:", appContext.locServiceEnabled)
//    console.log("checking wifi permission status:", appContext.isWifiConnected)
//    console.log("location permission status:", appContext.locPermission)


    return ( 
        
        <SafeAreaView style={styles.container}>
            <View style={{flex:1, marginLeft: 10, marginRight: 10, marginTop:10 }}>

            {headerDetails(props)}

            {serverError ? ( serverDown()):(
            <>

            {!appContext.isWifiConnected && appContext.locServiceEnabled && connectWifiScreen()}
            {(!appContext.locServiceEnabled || !appContext.locPermission) && appContext.isWifiConnected && connectLocationScreen()}
            {!appContext.isWifiConnected && !appContext.locServiceEnabled && connectWifiScreen()}
            {/*  if both are enabled just show the Home Screen */}
            {appContext.isWifiConnected && appContext.locServiceEnabled && appContext.locPermission && (
                !isNextTripLoading ? ( 
                    <>
                    {nextTrip.length == 0 ? addPlaceScreen() : ShowDetails(props)}
                    </>
                ): ShowDetails(props)

            )}
            </>

            )}

           

            {/* {appContext.isWifiConnected ? (
                !isNextTripLoading ? ( 
                <>
                {nextTrip.length == 0 ? addPlaceScreen() : ShowDetails(props)}
                </>
            ): ShowDetails(props) ):(connectWifiScreen())} */}

            <AddPlaceModal
            isModalVisible={isAddPlaceModalVisible}
            setModalVisible={setisAddPlaceModalVisible}
            addPlaces={addPlaces}
            setAddPlaces={setAddPlaces}
            from={"Home"}
            ></AddPlaceModal>

            </View>
            
        </SafeAreaView>
    );
  }

  const styles = StyleSheet.create({
        heading: {
        color : "#151522" , 
        fontSize : 16 , 
        letterSpacing : 0 , 
        fontStyle : "normal" , 
        fontWeight : 'bold' , 
        textAlign : "left" 
        },
        modal: {
            justifyContent: 'flex-end',
            marginBottom: -100,
        },
        landingScreen: {
            display:'flex',
            top: '30%',
            justifyContent:'flex-end',
            alignItems: 'center'
            
        },
        landingText: {
            fontSize: 20,
            fontWeight: "400",
            color: colors.dark_grey,
            marginTop: 16,
            marginBottom: 16,
            textAlign: 'center'
        },  
        Trip:{
            position : "relative" , 
            alignItems:'flex-start',
            flexDirection: 'row',
            width: '100%',
            height : 22,
            flexWrap: 'wrap',
            justifyContent:'space-between',
            marginBottom:12
        },
        container: {
            flex: 1,
            marginTop:34,
            backgroundColor: '#fff'
        },
        label:{
            marginBottom: 20,
            fontSize: 24,
            color:'black',
            fontWeight: '900',
        },
        screenTop:{
            flexDirection:'row',
            justifyContent: 'space-between',
            width: '100%'
        },
        menuStyle:{
           paddingLeft:10,
           paddingBottom:15
        }
  })