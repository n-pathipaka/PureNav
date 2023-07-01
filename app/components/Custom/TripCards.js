import React, {useState} from "react" ;
import { View, Text, StyleSheet} from "react-native";
import { Card } from 'react-native-paper';
import colors from "../../config/colors";
import Ionicons from 'react-native-vector-icons/Ionicons';
import RatingStars from "../../screens/Home/Home/Rating/RatingStars";
import HomeRatingModal from "../Modals/HomeRatingModal";
import TransportTypeQuestion from "../TabViews/OnBoardingQuestionaire/TransportTypeQuestion";




export default function TripCards(props) {

  const set_color = [{"Arrived": colors.Arrived, "Missed": colors.Missed}]

  const [modalVisible, setModalVisible] = useState(false);


  const openRatingModal = () => {
    setModalVisible(true);
  }

  return (
        <Card style={styles.card} onPress={props.onPress} mode='outlined'>
        <Card.Content> 
                <View style={styles.rowElements}>
                    <View style={styles.tripDate}>
                        <Text style={[styles.tripDateText, {color: props.status === 'Arrived'? colors.primary: 'orange'}]}> {props.status}</Text>
                        <Text style={[styles.tripDateText, {color: props.status === 'Arrived'? colors.primary: 'orange'}]}>{props.date}</Text>
                    </View>
                    <View style={styles.verticleLine} />
                    <View style={styles.tripDetails}>
                        <View style={styles.rowElements}>
                            <View  style={{flex:1, flexWrap:'wrap'}}>
                                <Text style={styles.tripDetailsText}>{props.fromPlace}</Text>
                                <Text style={styles.tripTimeText}>{props.fromTime}</Text>
                            </View>
                            <View style={styles.arrowIcon}>
                                <Ionicons name="arrow-forward" size={20} />
                            </View>
                            <View style={{flex:1, flexWrap:'wrap'}}>
                                <Text style={styles.tripDetailsText}>{props.toPlace}</Text>
                                <Text style={styles.tripTimeText}>{props.toTime}</Text>
                            </View>
                        </View>
                    </View>
                </View>
               
                {
                    
                    props.cardType === "Rating" ? (
                        <View>
                       
                        <View style={{flexDirection:"row", justifyContent:"space-around", marginTop: 20, backgroundColor: "#F4F4F4", borderRadius:7}}>
                            <RatingStars  
                                countRatings = {props.countRatings} 
                                setCountRatings = {props.setCountRatings} 
                                customPress = {openRatingModal}
                            />
                        </View>

                        <HomeRatingModal isModalVisible={modalVisible}
                        setModalVisible={setModalVisible}
                        trip_data={[props.trip_data]}
                        countRatings={props.countRatings}
                        setCountRatings={props.setCountRatings}
                        from = {props.from}
                        index = {props.from == 'pastTrips' ? props.index : 0}
                        pastTrips = {props.from == 'pastTrips' ? props.pastTrips : []}
                        setPastTrips = {props.from == 'pastTrips' ? props.setPastTrips: () => {}}
                        ></HomeRatingModal> 

                        </View>
                     
                        ):(null)
                }

                
        </Card.Content>
        </Card>
       

  )
}



const styles = StyleSheet.create({
    arrowIcon: {
        flex: 0.4,
    },
    tripDate:{
        padding: 0,
        margin: 0,
        borderWidth: 0,
        elevation: 0,
        width: '30%',
        alignSelf:'center'
    },
    tripDetails:{
        padding: 0,
        margin: 0,
        borderWidth: 0,
        elevation: 0,
        width: '70%',
        paddingHorizontal:10,
        //alignItems:'center',
        alignContent:'flex-start'
    },
    tripDetailsText:{ flex:1, fontSize: 13, color: "rgba(153, 153, 153, 1)", alignSelf: 'center', fontWeight: '400' , flexWrap: 'wrap', textAlign:'center'},
    tripDateText: {
        fontSize: 13,
        //color: colors.primary
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
    
    container:{
        flex: 1,
        paddingTop: 10,
        backgroundColor: "white"
    }, 
    rowElements:{
        flexDirection: 'row', 
        alignItems: 'center',
    },
    
    card:{
        margin: 10,
        borderWidth: 1,
        borderColor: colors.grey,
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        alignItems: 'center',
    }
})