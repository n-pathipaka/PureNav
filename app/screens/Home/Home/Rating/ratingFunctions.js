import React from 'react';
import { View, Text, Animated, FlatList,TouchableWithoutFeedback, StyleSheet } from "react-native";
import fonts from '../../../../config/fonts';
import colors from '../../../../config/colors';
import RoundedText from '../../../../components/Custom/RoundedText';
import {FontAwesome} from 'react-native-vector-icons';



const userStar = (filled) =>   <FontAwesome name= {filled === true? "star" : "star-o"} color = {filled === true? "blue" : "#999999"} size={13}  style ={{marginVertical:10}} />


const userRating = (ratings, editable , customPress) => {
    let stars = []   
    for(let x =1 ; x <=5; x++)
    {
        stars.push(
            <>
            { editable === true ? (
                <TouchableWithoutFeedback key ={x}
                    onPress = {() => {
                        customPress()
                    }}
                >
                <View  style = {{ padding:5}} key = {x}>
                <Animated.View>
                    {userStar( x <=  ratings? true: false)}
                </Animated.View>
        </ View>
            </ TouchableWithoutFeedback>
            ) : ( <View  style = {{ padding:5}} key = {x}>
                <Animated.View>
                    {userStar( x <=  ratings? true: false)}
                </Animated.View>
        </ View> )}
        </>
        
        )
    }

    return (

        stars

    )
}
    


export default function  ShowUserRatings(props){

    return (

    <View style={{}}>
        <View style= {{flexDirection:'row', justifyContent:'space-between' }}>
            <Text style ={[fonts.fontStyle.heading5, {marginVertical:10}]}> {props.ratings < 3 ? "Bad Expereince" : "Good Experience"}</Text>
            <View style= {{flexDirection:'row', justifyContent:'space-between' }}>
                {userRating(props.ratings, props.editable,  props.customPress)}
             </View>                     
        </View> 
    </View>
    )

}



export const  showGoodThings = (selectedGoodThings) =>
{
    
    return (
    
    <>

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
    </>
    )
} 

export const showBadThings = (selectedBadLabels) =>
{
      
return (

    <>

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

    </>
)
}

export const showUserFeedback = (userFeedback) => {

    return (

        <>

        <View style = {[styles.horizontalLine, {marginVertical:10}]}></View>

        <View style={{flexDirection:'colunm'}}>
        

        <Text style={styles.tableText}>FeedBack Shared</Text>

        {userFeedback.length === 0 ?  (
            <Text style={{marginVertical:10}}>None</Text>
        ):(<Text style={{marginVertical:10}}>{userFeedback}</Text>)}
        </View>

    </>

    )
}



const styles = StyleSheet.create({
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
    tableText: {
        fontWeight: "600",
        fontSize: 17
    },
    horizontalLine: {
        width: '100%',
        height: 1,
        backgroundColor: 'rgba(153, 153, 153, 1)',

    },
    rowElements:{
        flexDirection: 'row',
       
    },

})


