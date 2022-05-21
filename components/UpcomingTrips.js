/* eslint-disable prettier/prettier */
import React, { useState } from "react";
import { View, Text, Image, ScrollView, StyleSheet, Dimensions, FlatList, TouchableOpacity } from "react-native";
import { Button, Card } from 'react-native-paper';
import Feather from 'react-native-vector-icons/Feather'
import Icon from 'react-native-vector-icons/MaterialIcons'
import Arrow from 'react-native-vector-icons/AntDesign'



const renderData = (item) => {
    console.log(item.color)
    return (
        <View>
            <Card style={[style.cardStyle]}>
                <View style={style.card}>
                    <View style={style.cardStart}>
                        <View style={style.cardHeaderLeft}>
                            <Icon name='access-time' color={item.color} size={16} />
                            <Text style={{ color: item.color, fontSize: 12 }}> {item.status}</Text>
                        </View>
                        <View>
                            <Text style={{ fontSize: 12, color: "rgba(153, 153, 153, 1)", fontWeight: '400' }}> In  {item.start_time}</Text>
                        </View>
                    </View>
                    <View style={style.verticleLine}></View>
                    <View style={style.cardMiddle}>
                        <Text style={style.travelText}>{item.starts_at[0]}</Text>
                        <Arrow style={{ padding: 10, alignSelf: "center" }} name='arrowright' color="rgba(153, 153, 153, 1)" size={20} />
                        <Text style={style.travelText}>{item.ends_at[0]}</Text>
                    </View>
                </View>
            </Card>
        </View>
    )

}
export default function UpcomingTrips() {

    const upcomingTrip =
        [
            { starts_at: ['Work', '90.756', '-102.304'], ends_at: ['Kids School', '90.756', '-102.304'], start_time: '04h:30m', status: 'LONGER' },
            { starts_at: ['Grocery', '90.756', '-102.304'], ends_at: ['Home', '90.756', '-102.304'], start_time: '05h.30m', status: 'ON TIME' },
            { starts_at: ['Home', '90.756', '-102.304'], ends_at: ['Work', '90.756', '-102.304'], start_time: '05h.30m', status: 'LONGER' },
            { starts_at: ['Home', '90.756', '-102.304'], ends_at: ['College', '90.756', '-102.304'], start_time: '05h.30m', status: 'LONGER' },
            { starts_at: ['College', '90.756', '-102.304'], ends_at: ['Bar', '90.756', '-102.304'], start_time: '05h.30m', status: 'ON TIME' },
            { starts_at: ['Bar', '90.756', '-102.304'], ends_at: ['Home', '90.756', '-102.304'], start_time: '05h.30m', status: 'LONGER' },

        ]

    return (

        <View style={style.container} >

            {console.log("Hello")}

            <FlatList

                data={upcomingTrip}
                renderItem={({ item }) => {

                    if (item.status === 'ON TIME')
                        item = { ...item, color: '#32cd32' }
                    else
                        item = { ...item, color: 'orange' }

                    return renderData(item)

                }}
            // keyExtractor = {item => `${item.question_id}`}

            />

        </View >
    );
}

const style = StyleSheet.create({
    container: {
        position: "relative",
        width: Dimensions.get("window").width,
        //height : 983 , 
        backgroundColor: "rgba(255, 255, 255, 1)"
    },
    cardStyle: {
        margin: 7,
        borderRadius: 4,
        width: '90%',
        borderWidth: 1, borderColor: "rgba(228, 228, 228, 0.6)",
        backgroundColor: "rgba(255, 255, 255, 0.9)",
        flexDirection: 'column',
    },
    card: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingTop: 5
    },
    cardStart: {
        paddingLeft: 15,
        paddingBottom: 10,
        paddingRight: 25,
    },
    cardHeaderLeft: {
        flexDirection: 'row',
        alignItems: "center"
    },
    verticleLine: {
        height: '80%',
        paddingBottom: 10,
        width: 1,
        backgroundColor: 'rgba(153, 153, 153, 1)',

    },
    cardMiddle: {
        alignItems: "center",
        paddingLeft: 15,
        flexDirection: 'row'
    },
    travelText: { fontSize: 14, color: "rgba(153, 153, 153, 1)", alignSelf: 'center', fontWeight: '400' },
    shadowProp: {
        shadowColor: '#171717',
        shadowOffset: { width: -2, height: 4 },
        shadowOpacity: 0.2,
        shadowRadius: 3,
    },




})