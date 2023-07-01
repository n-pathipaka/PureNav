import React from 'react';
import { useState, useEffect , useContext} from "react";
import {View, StyleSheet, Text, FlatList,  SafeAreaView, TouchableOpacity} from 'react-native';
import { ButtonGroup, color } from '@rneui/base';
import ShowTripModal from "../../../components/Modals/ShowTripModal"; 
import colors from '../../../config/colors';
import fonts from "../../../config/fonts";
import TripCards from '../../../components/Custom/TripCards';
import axios from 'axios';
import UpcomingTrips from '../Home/UpcomingTrips';
import AppContext from '../../../../AppContext';
import Menu from 'react-native-vector-icons/Feather';
import { ActivityIndicator } from 'react-native-paper';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {showTripsLandingScreen, serverDown} from '../../../components/Custom/DefaultScreens';
import {processPastTripDetails} from '../../../components/Custom/functions';

function MyTripsScreen(props) {

    const appContext = useContext(AppContext);
    const [selectedIndex, setSelectedIndex] = useState(0);
    const [isShowTripModalVisible, setShowTripModalVisible] = useState(false);
    const [isLoading, setLoading] = useState(true);
    const [isInternalLoading, setInternalLoading] = useState(false);
    const [data, setData] = useState([]);    
    const [pastTrips, setTrips] = useState([]);
    const [upcomingTrips, setUpcomingTrips] = useState([]);
    const [countRatings, setCountRatings] = useState(0);
    const [serverError, setServerError] = useState(false);
    const [checkStatus, setCheckStatus] = useState(200);


    const providedFeedBack = (id) =>{

        let index = pastTrips.findIndex((trip) => trip.id === id);
        let temp = pastTrips;
        temp[index].feedback = true;
        setTrips(temp);
        
    }
    

    const callPastTrips = (controller) => {
            axios.post("http://"+appContext.serverUrl+"/trip/history", {
                 
                      "user_id": appContext.user, 
                       signal : controller.signal
            
            })
            .then( function(response){
                
                let pastTrips = processPastTripDetails(response)

                updateTripsView(pastTrips)
                setLoading(false)
                setInternalLoading(false)
                setServerError(false)

              } )
            .catch(function (error) {
                if ( !controller.signal.aborted)
                {
                    setServerError(true)
                    setLoading(false)
                }
            }
            );     
    }



    useEffect(() => {

        let tripsController = new AbortController();

        let key =  '@'+ appContext.user + '_past_trips';
        let key1 =  '@'+ appContext.user + '_upcoming_trips';
    
        const setUpLoad = async () => {
        try {
            const pastTripsSetup = await AsyncStorage.getItem(key);
            const upcomingTripsSetup = await AsyncStorage.getItem(key1);
            if(pastTripsSetup != null && upcomingTripsSetup != null) {
                setTrips(JSON.parse(pastTripsSetup));
                setUpcomingTrips(JSON.parse(upcomingTripsSetup));
                setLoading(false);
            }
            if(pastTripsSetup == null && upcomingTripsSetup != null){
                setTrips([]);
            }
            if(pastTripsSetup != null && upcomingTripsSetup == null){
                setUpcomingTrips([]);  // Load the upcoming trips
            }
                
        } catch (err) {
            console.log(err);
        }};

        setUpLoad();

        callPastTrips(tripsController)

        return () => {
            tripsController.abort();
        }
            
    } , [])



    useEffect(() => {
        if(appContext.user != null){
            let tripsController = new AbortController();
            setInternalLoading(true)
            callPastTrips(tripsController)

            return () => {
                tripsController.abort();
            }
        }
    }, [appContext.dataChanged, appContext.user])

    // if the serve goes down and user comes back from background to foreground

    useEffect(() => {
        if(appContext.appStateVisible == "active"){
            if(serverError){
                let tripsController = new AbortController();
                setInternalLoading(true)
                callPastTrips(tripsController)

                return () => {
                    tripsController.abort();
                }
            }
        }
    }, [appContext.appStateVisible])

  const updateTripsView = (trips) => {
    setTrips(trips);
    let key =  '@'+ appContext.user + '_past_trips';

    (async () => {
      try {
         await AsyncStorage.setItem(key, JSON.stringify(trips));
      }
       catch (e) {
         console.log(e);
       }
    })();
  };

   
    const renderTripData = () => {
        if (selectedIndex == 0){
            if(pastTrips!= undefined && pastTrips!= null && pastTrips.length == 0){
                return (
                    showTripsLandingScreen()
                )
            }
            else{
            return (
                
                <FlatList
                    data={pastTrips}
                    keyExtractor={(item) => `${item.id}`}
                    renderItem={({ item , index}) => {
                     return (
                        <TripCards  
                           onPress={() => {
                           setData(item);
                           setShowTripModalVisible(true)
                        }}
                         date={item.arrival_date} fromPlace={item.src_addr} toPlace={item.dst} fromTime={item.start_time} toTime={item.end_time}  status= {(item.status=="COMPLETED") ? 'Arrived' : item.status}
                         trip_data={item.trip_data}
                         countRatings={countRatings}
                         setCountRatings={setCountRatings}
                         cardType={item.status == 'COMPLETED' && item.feedback == null ? "Rating": "Trips"}
                         from ="pastTrips"
                         index = {index}
                         pastTrips = {pastTrips}
                         setPastTrips = {setTrips}
                    /> )
                 } }
                />
              )
         }
        }else {
            return (
                <UpcomingTrips/>
            )
        }
    }
    
    
    const showTripDetails = () => {
        return (
            <View style = {{flex:1, flexGrow:1}}>
                <ButtonGroup
                    buttons={['Past Trips', 'Future Trips']}
                    selectedIndex={selectedIndex}
                    onPress={(value) => setSelectedIndex(value)}
                    buttonStyle={styles.buttonStyle}
                    selectedButtonStyle={styles.selectedButtonStyle}
                    containerStyle={styles.containerStyle}
                />

                
               
                {renderTripData()}

                {isInternalLoading && <ActivityIndicator size="large" color={colors.primary} />}
                
                
                <ShowTripModal
                    isModalVisible={isShowTripModalVisible}
                    setModalVisible={setShowTripModalVisible}
                    data={data}
                    setData={setData}
                >
                </ShowTripModal>
                
        </View>
        );
        
    }
    return (
        
        <SafeAreaView style={styles.container}>
            <View style={{ flex: 1, margin:10 }}>
                <View style={{ width: "100%" }}>
                    <TouchableOpacity onPress= {() => props.navigation.toggleDrawer()}>
                    <Menu name = 'menu' size ={28} color = {colors.dark_grey} style = {{paddingBottom:4}}/>
                    </TouchableOpacity>
                    <Text style={[
                    fonts.fontSizes.heading1,
                    {marginBottom: 20 },
                    ]}> My Trips </Text>
                </View>
                {isLoading ? <ActivityIndicator size="large" color={colors.primary} /> : (
                    <>
                     {serverError ? (serverDown()) : (showTripDetails()) }
                    
                    </>
                )}
                
            </View>
        </SafeAreaView>
       
    );
}

export default MyTripsScreen;
const styles = StyleSheet.create({
    arrowIcon: {
        marginLeft: 1,
        marginRight: 1
    },
    tripDate:{
        padding: 0,
        margin: 0,
        borderWidth: 0,
        elevation: 0,
        width: '40%',
        alignSelf:'center'
    },
    tripDetails:{
        padding: 0,
        margin: 0,
        borderWidth: 0,
        elevation: 0,
        width: '60%',
        alignItems:'center'
    },
    tripDateText: {
        fontSize: 13,
        color: colors.primary
    },
    tripTimeText: {
        fontSize: 12,
        color: colors.dark_grey,
        alignSelf:'center'
    },  
    verticleLine: {
        height: '100%',
        width: 1,
        backgroundColor: colors.grey,
    },
    landingScreen: {
        alignItems: 'center', 
        marginTop: 240,
        margin: 30,
        paddingTop: 10,
        backgroundColor: "white"
    },
    landingText: {
        fontSize: 20,
        fontWeight: "400",
        color: colors.dark_grey,
        marginTop: 16,
        marginBottom: 16,
        textAlign: 'center'
    },  
    container: {
        flex: 1,
        marginTop:34,
        backgroundColor: '#fff'
    },
    rowElements:{
        flexDirection: 'row'
    },
    card:{
        margin: 10,
        borderWidth: 1,
        borderColor: colors.grey,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
    },
    menu:{
        width: 1,
        marginTop: 30,
        marginBottom: 12,
        marginLeft:0
    },
    iconButton: {
        backgroundColor: "white",
    },
    selectedButtonStyle: {
        backgroundColor: colors.primary,
        borderRadius: 3
    },
    buttonStyle: {
        backgroundColor: colors.grey,
        borderRadius: 3,
        borderWidth: 0,
    },
    containerStyle:{ 
        margin: 10,
        padding: 2, 
        backgroundColor: colors.grey, 
        borderRadius: 3
    },
    feedback: {
        fontWeight: "500",
        fontSize: 11,
        textTransform: 'uppercase',
        color: colors.primary
    },
    timeTaken: {
        fontWeight: "300",
        fontSize: 13,
        color: colors.dark_grey
    }
})