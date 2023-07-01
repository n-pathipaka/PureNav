import {React, useRef, useState} from "react";
import { View, StyleSheet, Image, Text, FlatList, Dimensions, TouchableOpacity } from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import FeatherIcons from 'react-native-vector-icons/Feather';
import {Portal, Modal} from 'react-native-paper';
import RoundedText from "../../components/Custom/RoundedText";
import colors from "../../config/colors";
import fonts from "../../config/fonts";
import MapView from "react-native-maps";
import MapViewDirections from 'react-native-maps-directions';
import { GOOGLE_MAP_KEY } from "../../constants/GoogleApiKey";
import {showGoodThings, showBadThings, showUserFeedback} from "../../screens/Home/Home/Rating/ratingFunctions";
import ShowUserRatings from "../../screens/Home/Home/Rating/ratingFunctions";
import { ScrollView } from "react-native-gesture-handler";
import HomeRatingModal from "./HomeRatingModal";

const SCREEN_HEIGHT = Dimensions.get('window').height;

function ShowTripModal(props) {
    const places = [{id: 1, place: 'Sunset Blvd'}, {id: 2, place: 'Canyon Blvd'}, {id: 3, place: 'Colorado Ave'}, {id: 4, place: 'Arapahoe Ave'}]

    const { width, height } = Dimensions.get('window');
    const ASPECT_RATIO = width / height;
    const LATITUDE =  Number(props.data['src_lat']);
    const LONGITUDE =  Number(props.data['src_lon']);
    const LATITUDE_DELTA = 0.0922;
    const LONGITUDE_DELTA = LATITUDE_DELTA * ASPECT_RATIO;
    const coordinates = [
        // {
        //   latitude: Number(props.data['src_lat']),
        //   longitude: Number(props.data['src_lon']),
        // },
        // {
        //   latitude:  Number(props.data['dst_lat']),
        //   longitude:  Number(props.data['dst_lon']),
        // },
        {
            latitude: 40.0150,
            longitude: -105.2705,
          },
          {
            latitude: 40.000267,
            longitude: -105.10021,
          },
      ];

    const [coord, setCoord]= useState(coordinates);
    const [isRatingModalVisible, setRatingModalVisible] = useState(false);
    const [feedback, setFeedback] = useState(props.data != null && props.data.feedback != undefined ? props.data.feedback: null);
    const [countRatings, setCountRatings] = useState(feedback != null  ? feedback['rating'] : 0);
    const [showDetails, setShowDetails] = useState(false);

    const mapRef = useRef(null);
    //const mapView = React.createRef();
   
    const onMapPress = (e) => {
        setCoord({
          coordinates: [
            ...coordinates,
            e.nativeEvent.coordinate,
          ],
        });
      }

    const openRatingModal = () => {
        setRatingModalVisible(true);
        console.log("ratings pressed from trip history")
      }
    const renderPlaces = (place) => <RoundedText 
                                    style={styles.places} 
                                    textStyle={styles.placesText} 
                                    text={place}/>
    
    
    const setText = () => {
        
       if(props.data['status'] == "COMPLETED"){
            
           return `Arrived on ${props.data['arrival_date']}`
       }
       else if (props.data['status'] == "CANCELLED"){
           
           return `Canceled on ${props.data['arrival_date']}, ${props.data['start_time']}`
       }
         else if (props.data['status'] == "MISSED"){
              
              return `Missed on ${props.data['arrival_date']}, ${props.data['start_time']}`
         }
    }

  const feedBackChanged = (feedback) => {
      // set the feedback to this trip only not to entire trips.
      if(props.data != null && props.data.feedback != undefined){
             props.data.feedback = feedback;
      }

  }

  const showFeedBack = (userFeedBack) => {


    //let userFeedBack = data.feedback
    if(userFeedBack != null){
    return (
        <>
            <ShowUserRatings 
                   ratings={userFeedBack["rating"]}
                   customPress = {openRatingModal}
                   editable = {true}
            />
            {showGoodThings(userFeedBack["goodLabels"])}
            {showBadThings(userFeedBack["badLabels"])}
            {showUserFeedback(userFeedBack["userFeedBack"])}

            <View style={{marginVertical:40}}></View>
            <View style={{marginVertical:40}}></View>
            <View style={{marginVertical:40}}></View>
            <View style={{marginVertical:40}}></View>
            <View style={{marginVertical:40}}></View>
        </>
    )
    }
    else{
        return(
            <Text style={{color: colors.white, fontSize: 20, fontFamily: fonts.primaryFont, textAlign: 'center'}}>No Feedback Provided</Text>
        )
    }
    

  }  
  return (
        <Portal>
           <Modal 
            visible={props.isModalVisible} 
            dismissable={true}
            animationType="slide"
            contentContainerStyle={styles.modal}
            onDismiss={() => {
                props.setModalVisible(!props.isModalVisible);
            }}
            >
            {/*  Header of the trips */}
                
            <View style={styles.container}>
               
                <TouchableOpacity onPress={() => props.setModalVisible(false)}>
                    <Image
                        source={require("../../assets/pull_down_rectangle.png")}
                        style={{ marginTop: 15, alignSelf: "center" }}>
                    </Image>
                </TouchableOpacity>
              <ScrollView>
                <View style={[styles.rowElements, styles.centerAlign]}>
                    <View>
                        <Text style={styles.topText}> {props.data['src_addr']} </Text>
                    </View>
                    <View style={{marginTop: 27}}>
                        <Ionicons name="arrow-forward" size={20} color={colors.primary}></Ionicons>
                    </View>
                    <View>
                        <Text style={styles.topText}> {props.data['dst']} </Text>
                    </View>
                </View>
                       
                {/* <RoundedText style={styles.titlePrompt} textStyle={styles.titlePromptText} >{setText()} uiuewo</RoundedText> */}
                {/*  Air Qulaity and trip quality */}
            
                { (props.data['status'] === 'COMPLETED') &&
                (<>
                <View style={styles.rowElements}>
                    <View style={styles.timeTaken}>
                        <Text style={styles.smallText}>Total Time</Text>
                        <Text style={styles.bigText}>{props.data['trip_duration']} mins</Text>
                        <Text style={styles.smallText}>Saved {props.data['earlier_time']} mins</Text>
                    </View>
                    <View style={styles.airQuality}>
                        <Text style={styles.smallText}>Road Air Quality</Text>
                        <Text style={styles.bigText}>Good</Text>
                        <Text style={styles.smallText}>10% better</Text>
                    </View>
                </View>
                <View style={styles.rowElements}>
                        <View><Text style={styles.textLeft}>Road Taken</Text></View>
                {/* <View style={styles.viewRight}><Text style={styles.textRight}>Show Details</Text></View> */}
                    <View style={styles.viewRight}>
                        <TouchableOpacity onPress={() => setShowDetails(!showDetails)}><Text style={styles.textRight}>{showDetails ? "Show less" : "Show Details"}</Text></TouchableOpacity>
                                    
                    </View>
                </View>
                <View style={styles.rowElements}>
                    <FeatherIcons name="crosshair" size={20} color={colors.dark_grey} style={styles.places}></FeatherIcons>
                    <FlatList
                        horizontal={true}
                        data={places}
                        keyExtractor={(item) => `${item.id}`}
                        renderItem={({ item }) => renderPlaces(item.place)} />
                </View>
                    </>) 
                 }   
               
                <MapView
                    initialRegion={{
                    latitude: LATITUDE,
                    longitude: LONGITUDE,
                    latitudeDelta: LATITUDE_DELTA,
                    longitudeDelta: LONGITUDE_DELTA,
                    }}
                    
                    style={[styles.map, {height: props.data['status'] === 'COMPLETED'? '40%': '500%'}]}
                    ref= {mapRef}
                    
                >
                <MapView.Marker key="coordinate_0" coordinate={coordinates[0]} />
                
                {(coordinates.length >= 2) && (
                    <MapViewDirections
                        origin={coordinates[0]}
                        waypoints={ (coordinates.length > 2) ? coordinates.slice(1, -1): undefined}
                        destination={coordinates[coordinates.length-1]}
                        apikey={GOOGLE_MAP_KEY}
                        strokeWidth={3}
                        strokeColor="hotpink"
                        optimizeWaypoints={true}
                        onStart={(params) => {
                        console.log(`Started routing between "${params.origin}" and "${params.destination}"`);
                        }}
                        onReady={result => {
                        console.log(`Distance: ${result.distance} km`)
                        console.log(`Duration: ${result.duration} min.`)

                        mapRef.current.fitToCoordinates(result.coordinates, {
                            edgePadding: {
                            right: (width / 20),
                            bottom: (height / 20),
                            left: (width / 20),
                            top: (height / 20),
                            }
                        });
                        }}
                        onError={(errorMessage) => {
                       
                        }}
                    />
                )}
                </MapView> 
                
                 {/* Feed back of the completed trip  */}
                { props.data['status'] === 'COMPLETED'? ( 
                    <View style = {{}}>
                        <Text 
                        style = {[fonts.fontSizes.heading4]}> Your Expereince with the trip 
                        </Text>  
                     {feedback != null ? showFeedBack(feedback) : showFeedBack(props.data.feedback)}
                     {/* {props.data.feedback != undefined && showFeedBack(feedback)} */}
                    
                     <HomeRatingModal isModalVisible={isRatingModalVisible}
                        setModalVisible={setRatingModalVisible}
                        trip_data={[props.data['trip_data']]}
                        countRatings={countRatings}
                        setCountRatings={setCountRatings}
                        setFeedback={feedBackChanged}
                        from ="Trips"
                    ></HomeRatingModal> 
                    
                    </View>  


                    ):
                    (null) }
                  
              </ScrollView>
              
         </View>    
            </Modal>
        </Portal>
  );
}

const styles = StyleSheet.create({
    centerAlign: {
        alignSelf: 'center'
    },
    modal:{
        height: '100%',
        marginBottom: -80,
        justifyContent: 'flex-end',
    },
    container: {
        height: "90%",
        width: "100%",
        backgroundColor: "white",
        padding: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    // modal: {
    //     flex:1,
    //     flexGrow: 1,
    //     justifyContent: "flex-end",
    //     height : SCREEN_HEIGHT ,
    //     position: "absolute",
    //     top: SCREEN_HEIGHT/30,
    // },
    topText: {
        justifyContent: 'center',
        marginTop: 27,
        fontSize: 20,
        color: colors.primary
    },
    titleText: {
        fontSize: 20,
        fontWeight: "600",
        textAlign: "center"
    },
    smallText: {
        color: "white",
        fontSize: 12,
        fontWeight: "500",
        textAlign: "center"
    },
    bigText: {
        color: "white",
        fontSize: 34,
        fontWeight: "600",
        textAlign: "center",
        marginTop: 4,
        marginBottom: 4
    },
    row:{
        flexDirection: 'row', 
        flexWrap: 'wrap' 
    },
    card:{
        elevation: 0,
        shadowColor: '#111111',
        padding: 5,
        borderWidth: 1,
        margin: 17
    },
    table:{
        marginTop: 17.7,
        width: '100%',
        height: '40%',
        justifyContent: 'flex-start',
    },
    tableHeader: {
        marginTop: 16.5,
        fontWeight: "600",
        fontSize: 20
    },
    tableText: {
        fontWeight: "600",
        fontSize: 17
    },
    star:{
        paddingRight: 11.3,
        paddingRight: 11.3
    },
    places: {
        marginTop: 17,
        borderRadius: 40,
        backgroundColor: colors.white,
        height: 24,
        marginLeft: 8
    },  
    placesText: {
        textAlign: "center",
        color: colors.black
    },
    goodThings: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5,
        borderRadius: 40,
        borderColor: colors.primary,
        height: 24,
        backgroundColor: colors.primary
    },
    goodThingsText: {
        color: colors.white
    },
    titlePrompt: {
        marginTop: 15,
        width: 210,
        marginBottom: 15,
        marginLeft: 5,
        borderRadius: 40,
        backgroundColor: colors.primary,
        height: 24,
        borderColor: colors.primary,
        alignSelf: "center"
    },
    titlePromptText: {
        color: colors.white
    },
    badThings: {
        marginTop: 15,
        marginBottom: 15,
        marginLeft: 5,
        borderRadius: 40,
        borderColor: colors.grey,
        height: 24,
        backgroundColor: colors.grey
    },
    badThingsText: {
        color: colors.dark_grey
    },
   
    rowElements:{
        flexDirection: 'row'
    },
    feedbackRow: {
      borderBottomWidth: 0
    },
    feedbackText: {
        fontSize: 13,
        fontWeight: "300"
    },
    airQuality: {
        width: 161, 
        height: 113, 
        paddingLeft: 6, 
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 8, 
        marginRight: 20, 
        backgroundColor: colors.bgColorAirQuality,
        borderRadius: 4
    },
    timeTaken: {
        width: 161, 
        height: 113, 
        paddingLeft: 6, 
        paddingTop: 16,
        paddingBottom: 16,
        paddingRight: 8, 
        marginRight: 13, 
        backgroundColor: colors.bgColorTripTime,
        borderRadius: 4
    },
    viewRight: {
        marginLeft: 164,
        padding: 2
    },
    textLeft: {
        marginTop:13,
        color: colors.black,
        padding: 2,
        fontWeight: "600",
    },
    textRight: {
        marginTop: 13,
        color: colors.dark_grey,
        fontSize: 12,
        textAlign: "right",
        fontWeight: "500",
    },
    map: {
        width: "100%",
        marginVertical:13,
        marginLeft:0,
        borderRadius: 13,
        
      },
    scroll: {
        flex: 1,
        flexGrow: 1,
        width: "95%",
        paddingBottom: 10,
    },
});

export default ShowTripModal;
