import {Portal, Modal} from 'react-native-paper';
import {React, useState, useContext} from "react";
import { View, StyleSheet, Image, Text, FlatList, TouchableWithoutFeedback,TouchableOpacity, Animated, TextInput} from "react-native";
import Ionicons from 'react-native-vector-icons/Ionicons';
import colors from "../../config/colors";
import RoundedText from '../Custom/RoundedText';
import fonts from '../../config/fonts';
import {FontAwesome} from 'react-native-vector-icons';
import { ScrollView } from 'react-native-gesture-handler';
import KeyBoardWrapper from '../Custom/KeyBoardWrapper';
import RatingStars from '../../screens/Home/Home/Rating/RatingStars';
import { getDate } from '../Custom/time';
import AppContext from '../../../AppContext';
import UserFeedBack from '../../screens/Home/Home/Rating/UserFeedBack';
import { getCurrentTime } from '../Custom/time';
import axios from 'axios';
import { debounce } from "lodash";


function HomeRatingModal(props){

    //const [countRatings, setCountRatings] = useState(0);
    const [reviewFeedBack, setReviewFeedBack] = useState(false)
    const [selectedGoodThings, setSelectecd] = useState([])
    const [selectedBadLabels, setSelectecdBadLabel] = useState([])
    const [canSubmit, setUserSubmit]  = useState(false)
    const [showGoodLabel, setShowGoodLabel] = useState(false)
    const [showBadLabel, setShowBadLabel] = useState(false)
    const [showSelectedGoodLabel, setShowSelectedGoodLabel] = useState(false)
    const [showSelectedBadLabel, setShowSelectedBadLabel] = useState(false)
    const [userFeedBack, setUserFeedBack] = useState(null)

    const [showNextButton, setShowNextButton] = useState(false)

    const appContext = useContext(AppContext);
    const [goodValue, onChangeGoodText] = useState('');
    const [badValue, onChangeBadText] = useState('');
    
    
    const labels = [{goodLabels:[{id: 1, thing: "Arrived on time"}, {id: 2, thing: "Good Road Quality"}, {id: 3, thing: "Good Air Quality"}, {id: 4, thing: "Safer Road"}]},
                    {badLabels: [{id: 1, thing: "Road Closure"}, {id: 2, thing: "Bad Road Quality"}, {id: 3, thing: "Delayed"}, {id: 4, thing: "Bad Air Quality"}, {id: 5, thing: "a lot of trafic"}]}
                   ]
   
    const [goodLabels, setGoodLabels] = useState(labels[0].goodLabels)
    const [badLabels, setBadLabels] = useState(labels[1].badLabels)

    
    

    
    const handleOnPress = (item) => {
        if(selectedGoodThings.some(x => x.thing === item.thing))
        {
            const newSelected = selectedGoodThings.filter((goodItem)=> goodItem.thing != item.thing)
            return setSelectecd(newSelected)
        }
        
        setSelectecd([...selectedGoodThings, item])
        

    }

    const isSelected = (item) =>
    {
        //return selectedGoodThings.includes(item)

        return selectedGoodThings.some(x => x.thing === item.thing)
    }


    const handleBadLabelsOnPress = (item) => {

        if(selectedBadLabels.some(x => x.thing === item.thing))
        {
            const newSelected = selectedBadLabels.filter((badLabel)=> badLabel.thing != item.thing)
            return setSelectecdBadLabel(newSelected)
        }
        
        setSelectecdBadLabel([...selectedBadLabels, item])
        

    }

    const isSelectedBadLabel = (item) =>
    {
        //return selectedGoodThings.includes(item)

        return selectedBadLabels.some(x => x.thing === item.thing)
    }


const callEndTrip = (responses) => {

    axios.post("http://"+appContext.serverUrl+"/trip/end", responses, {headers:{"Content-Type" : "application/json"}}) // Add ending signal.
    .then( function(response){
        appContext.setDataChanged(!appContext.dataChanged)

    } )
}

const submitFeedBack = (responses) => {
    axios.post("http://"+appContext.serverUrl+"/trip/feedback", responses, {headers:{"Content-Type" : "application/json"}}) // Add ending signal.
    .then( function(response){
        appContext.setDataChanged(!appContext.dataChanged)

    } )
}

    
const showGoodThings = () =>
    {
        
        return (
        
        <View>

        <View style = {[styles.horizontalLine, {marginVertical:10}]}></View>

        <View style={{flexDirection:'row'}}>

        <Text style={styles.tableText}> Good Things</Text>

        {selectedGoodThings.length === 0 ?  (
                <RoundedText 
                style={styles.nothingSelected} 
                textStyle={{color: colors.black}} 
                text="None"/> ) : (
            
                <FlatList

                data={selectedGoodThings}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor = {item => `${item.id}`}
                renderItem={({ item }) => {

                     return(
                            
                        <RoundedText 
                        style={styles.goodThingsSelected} 
                        textStyle={styles.goodThingsSelectedText} 
                        text={item.thing}/> )             
                  
                }}

               />
            )}
        </View>
        </View>
        )
    } 





const showBadThings = () =>
    {
          
    return (

        <View>

        <View style = {[styles.horizontalLine, {marginVertical:10}]}></View>

        <View style={{flexDirection:'row'}}>
          

        <Text style={styles.tableText}> Bad Things</Text>

        {selectedBadLabels.length === 0 ?  ( <RoundedText 
            style={styles.nothingSelected} 
            textStyle={{color: colors.black}} 
            text="None"/>) : (

        <FlatList

                data={selectedBadLabels}
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                keyExtractor = {item => `${item.id}`}
                renderItem={({ item }) => {

                            return(
                            
                            <RoundedText 
                            style={styles.goodThingsSelected} 
                            textStyle={styles.goodThingsSelectedText} 
                            text={item.thing}/> )
                    
                  
                }}
               

            />
        )}
        </View>

        </View>
    )
}



    
    
   
    
const renderGoodThings = () =>{ 
                        
    return(

                                    
    <View>
        <View style = {[styles.horizontalLine, {marginVertical:10}]}></View>
        <Text style={styles.tableHeader}>What was good about the trip</Text>

        <View>
            <View style= {{flexDirection:'row', flexWrap:'wrap'}}>
            {goodLabels.map((item, index) => {
                return(
                    < TouchableOpacity key ={index}
                        onPress = {() => {
                                // item.selected = !item.selected
                                // setSelectecd(selected[index] = true)
                                handleOnPress(item)
                                
                                
                        }}
                    >

                        <View>
                        <View style = {[{borderWidth:1,justifyContent:'center', alignItems:'center', backgroundColor: isSelected(item) ?'blue':'#CDD2FD'}, styles.goodThings]}>
                            { index === goodLabels.length -1 ?  (<TextInput
                                style={styles.addLabel}
                                onChangeText={onChangeGoodText}
                                value={goodValue}
                                placeholder='+Add Label'
                                placeholderTextColor={"#6979F8"}
                            />):(<Text style={styles.goodThingsText}> {item.thing} </Text>)}
                        </View>
                        </View>

                      

                    </ TouchableOpacity>
                    
                )
            })}

            </View>

            
        </View>
    </View>
) } 


const renderBadThings = () =>{             
                                                    
    return(
        <View>
            <View style = {[styles.horizontalLine, {marginVertical:10}]}></View>
            <Text style={styles.tableHeader}>What was Bad about the trip</Text>

        <View>
            <View style= {{flexDirection:'row', flexWrap:'wrap'}}>
            {badLabels.map((item, index) => {
                return(
                    < TouchableOpacity key ={index}
                        onPress = {() => {
                                // item.selected = !item.selected
                                // setSelectecd(selected[index] = true)
                            
                                handleBadLabelsOnPress(item)
                                
                        }}
                    >
                    <View>
                        <View style = {[{borderWidth:1,justifyContent:'center', alignItems:'center', backgroundColor: isSelectedBadLabel(item) ?'blue':'#CDD2FD'}, styles.goodThings]}>
                        { index === badLabels.length -1 ?  (<TextInput
                                style={styles.goodThingsText}
                                onChangeText={onChangeBadText}
                                value={badValue}
                                placeholder='+Add Label'
                                placeholderTextColor={"#6979F8"}
                            />):(<Text style={styles.goodThingsText}> {item.thing} </Text>)}
                        </View>
                    </View>

                    

                    </ TouchableOpacity>
                    
                )
            })}

            </View>
        </View>
    </View>
) } 
    

const starsPressed = (x) =>  {

   //let l = [setReviewFeedBack(true), setShowGoodLabel(true), setShowNextButton(true)]
    
    //props.setCountRatings(x)
    
    setReviewFeedBack(true), 
    setShowGoodLabel(true), 
    setShowNextButton(true)
    
  
}



 const provideRating = () => {
        return (
            <View>
                    <View style={{marginVertical:10, }}>
                    <Text style={{fontSize:17, fontWeight:'600'}}> From 1-5, how would you rate your experience ?</Text>
                    </View>
                    <View style={{flexDirection:"row", justifyContent:"space-between"}}>
                            <RatingStars  
                                countRatings = {props.countRatings} 
                                setCountRatings = {props.setCountRatings} 
                                customPress = {starsPressed}
                            />
                    </View>
                    <View>
                        <View style={{flexDirection: "row", justifyContent: "space-between" }}>
                            <Text>Very bad</Text>
                            <Text>Very Good</Text>
                        </View>
                    </View>
            </View>
        )

    }


    const showUserRatings = () => {

        return (

        <View style={{}}>
            <View style= {{flexDirection:'row', justifyContent:'space-between' }}>
                <Text style ={{marginVertical:10}}> {props.countRatings < 3 ? "Bad Expereince" : "Good Experience"}</Text>
                <View style= {{flexDirection:'row', justifyContent:'space-between' }}>
                    {userRating()}
                 </View>                     
            </View> 
        </View>
        )

    }


    const modalSetup = (item) => {
        return (
            <View>
                <View style={{margin:10, alignItems:"center", alignContent:'center', justifyContent:"center"}}>
                    <Text style={fonts.fontSizes.heading5}> Rate Your Previous Trip</Text>
                </View>
                <View style={{justifyContent:"center", borderRadius: 8, borderWidth:1, borderColor:"#6979F8", paddingVertical:15}}>
                    {/* Header of the code */}
                    {/* Heading of the card */}
                    <View style={{flexDirection:'row', alignItems:'center', alignSelf:'center', marginTop:20 }}>
                            <Text style={[styles.topText,{textAlign: 'center'}]}> {item.starts_at.tags == undefined ? item.starts_at.place_name: item.starts_at.tags} </Text>
                            <View style={{paddingHorizontal:10}}>
                            <Ionicons name="arrow-forward" size={20} color = "rgba(153, 153, 153, 1)" ></Ionicons>
                            </View>
                            <Text style={[styles.topText]}> {!item.ends_at.tags? item.ends_at.place_name: item.ends_at.tags} </Text>

                    </View>
                    <View style={[styles.centerAlign, {margin:0}]}>
                        <Text style={{fontSize:13, color:"#666666"}}> {`Arrived on ${getDate()}`}</Text>
                    </View>
                </View>
            </View>

        )
    }

const showNext = () => {

    return (

        <View style={{marginTop:30,flexDirection:"row", justifyContent:"flex-end"}}>
            <TouchableOpacity  style= {styles.button} onPress = {() => {
                if(!showSelectedGoodLabel)
                { 
                    // add Good labels here 
                    //let newGoodLabels = goodLabels.push({id: goodLabels.length + 1, thing: goodValue})
                    //setGoodLabels(newGoodLabels)
                    if (goodValue != '') {
                        
                        handleOnPress({id: goodLabels.length + 1, thing: goodValue})
                        onChangeGoodText('')
                    }

                    setShowSelectedGoodLabel(true)
                    setShowGoodLabel(false)
                    setShowBadLabel(true)
                }
                else
                {
                     //setGoodLabels(newGoodLabels)
                    if (badValue != '') {
                        
                        handleBadLabelsOnPress({id: badLabels.length + 1, thing: badValue})
                        onChangeBadText('')
                    }


                    setShowBadLabel(false)
                    setShowSelectedBadLabel(true)

                    setShowNextButton(false)

                    setUserSubmit(true)
                    
                }
                
            }
            }>
                    <Text style={styles.buttonText}> Next </Text>
            </TouchableOpacity>
        </View>

    )
}

const showSubmit = () => {

    return (
        <View style = {{marginTop:20, marginBottom: 30}}>
        <TouchableOpacity  style= {styles.submitButton}  onPress={() => {

            // set all the states to intial settings  and go to Home screen once the user submitted the review.

            //storeRatingStatus(true)
            // Now send the feedback.
            let responses = {}
            let feedback = {}
            feedback.id = props.trip_data[0].id
            feedback.rating = props.countRatings
            feedback.goodLabels = selectedGoodThings
            feedback.badLabels = selectedBadLabels
            feedback.userFeedBack = userFeedBack

            //call the end trip API to send all the details.

            responses.id = props.trip_data[0].id
            responses.arrived = getCurrentTime()
            responses.trip_feedback = JSON.stringify(feedback)

            if(props.from == "Trips")
            {
                submitFeedBack(responses)
                props.setFeedback(feedback)
            }
            if(props.from == "pastTrips")  // callled from trips history if the user forgot rating for the trip.
            {
                console.log("coming past trips")
                submitFeedBack(responses)
                // update the past trips and set the feedback.
                props.pastTrips[props.index].feedback = feedback
                
                props.setPastTrips(props.pastTrips)
            }
            else
                callEndTrip(responses)
            


            props.setModalVisible(false);

            appContext.setIsRatedLastTrip(true)
            
            props.setCountRatings(0);
            setReviewFeedBack(false)
            setShowGoodLabel(false)
            setShowBadLabel(false)

            setSelectecd([])
            setSelectecdBadLabel([])

            setShowSelectedGoodLabel(false)
            setShowSelectedBadLabel(false)
            setUserSubmit(false)
            
            


            
            }} >
        <Text style={[styles.buttonText, {color: colors.white}]}> Submit </Text>
        </TouchableOpacity>
        </View>
    )

}


    const renderData = (item) => {
        return(
        
                <>
                    
                    {modalSetup(item)} 
                    
                    {/* shows the user to select reviews */}
                    
                    {!reviewFeedBack ? (
                         provideRating()  ) 
                        : ( showUserRatings()
                    )}

                  
                    {/*  show good labels to the user and collect the reviews */}

                    {showGoodLabel && renderGoodThings() }

                    {showSelectedGoodLabel &&  showGoodThings() }

                   
                    {/*  show Bad labels to the user and collect the reviews */}

                    {showBadLabel && renderBadThings() }

                    {showSelectedBadLabel && showBadThings() }


                    {/*  show Feed back screen to the user if availiable */}

                    
                    {showSelectedBadLabel && 
                    
                   
                        
                    <View>
                        <View style = {[styles.horizontalLine, {marginVertical:10}]}></View>
                        
                        <Text style={styles.tableHeader}>Share any feedBack about the Trip</Text>
                            <UserFeedBack  userFeedBack= {userFeedBack} setUserFeedBack = {setUserFeedBack}/>
                    </View>
                       
                   
                    
                    }
                    

                    { (showNextButton) && showNext()}

                    { canSubmit &&  showSubmit()}
                </>
       
       
        )

    }

    

    const star = (filled) =>   <FontAwesome name= {filled === true? "star" : "star-o"} color = {filled === true? "blue" : "#999999"} size={30}  style ={{marginVertical:10}} />

    const userStar = (filled) =>   <FontAwesome name= {filled === true? "star" : "star-o"} color = {filled === true? "blue" : "#999999"} size={10}  style ={{marginVertical:10}} />

    const userRating = () => {

        

        let stars = []

        for(let x =1 ; x <=5; x++)
        {
            
            stars.push(

                <TouchableWithoutFeedback key ={x}
                   onPress = {() => {
                          setReviewFeedBack(false)
                          setShowNextButton(false)
                          setShowGoodLabel(false)
                          setShowBadLabel(false)
                          setShowSelectedGoodLabel(false)
                          setShowSelectedBadLabel(false)
                          setUserSubmit(false)
                         
                   }}
                >

                < View  style = {{ padding:5}}key ={x}
                >
                    <Animated.View>
                         {userStar( x <=  props.countRatings? true: false)}
                    </Animated.View>
                </ View>

                </TouchableWithoutFeedback>
            )
        }

        return (

            stars

        )

    }


    return(
        

        <View>
            <Portal>
                <Modal 
                    visible={props.isModalVisible} 
                    animationType="slide"
                    contentContainerStyle={styles.modal}
                    onDismiss={() => {
                        props.setModalVisible(false);
                }}>

                 <View style={styles.container}>
                    <TouchableOpacity onPress={()=> 
                            {
                                props.setModalVisible(false)}}>
                    <Image
                        source={require("../../assets/pull_down_rectangle.png")}
                        style={{ marginTop: 15, alignSelf: "center" }}>
                    </Image>
                    </TouchableOpacity>

                    
                        
              
                    <FlatList
                        data = {props.trip_data}
                        keyExtractor = {item => `${item}`}
                        renderItem = {({item}) => {     
                        return renderData(item);
                        
                            
                        }}   
                    />

                   

                </View>

                </Modal>
            </Portal>

        </View>
        
    )

}

const styles = StyleSheet.create({

    container: {
       
        width: "100%",
        height: '100%',
        marginTop: '10%',
        backgroundColor: "white",
        padding: 25,
        borderTopLeftRadius: 20,
        borderTopRightRadius: 20,
    },
    nothingSelected: {
       
        marginLeft: 10,
        borderRadius: 30,
        borderColor: colors.grey,
        height: 24,
        backgroundColor: colors.grey
    },
    goodThingsSelected: {
       
        marginLeft: 10,
        borderRadius: 30,
        borderColor: colors.primary,
        height: 24,
        backgroundColor: colors.primary
    },
    goodThingsSelectedText: {
        color: colors.white
       
    },
    horizontalLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(153, 153, 153, 1)',

    },
    rowElements:{
        flexDirection: 'row',
       
    },
    centerAlign: {
        alignSelf: 'center',
        alignItems:"center",
    },
    topText: {
        flex: 1,
        fontSize:20,
        color: colors.primary,
        fontWeight:'bold', 
        flexWrap: 'wrap',
    },
    button:{
       
        borderWidth:1,
        borderColor:"#6979F8",
        justifyContent:'center',
        borderRadius: 6,
    },
    buttonText:{
        margin:15,
        color:"#6979F8",
        textAlign:'center',
        
    },
    tableHeader: {
        marginTop: 16.5,
        fontWeight: "600",
        fontSize: 17
    },
    goodThings: {
        marginTop: 16,
        marginBottom: 5,
        marginRight: 12,
        borderRadius: 40,
        padding:10,
        borderColor: colors.primary,
        
    
    },
    addLabel:{
        textAlign:'center',
        fontSize: 13,
    },
    goodThingsText: {
        color: "#6979F8",
        textAlign:'center',
        fontSize: 13,
    },
    modal: {
        
    },
    tableText: {
        fontWeight: "600",
        fontSize: 17
    },
    submitButton:{
        backgroundColor:  colors.primary,
        width: '100%',
        height: 53,
        borderRadius: 6,
    },
});
export default HomeRatingModal;