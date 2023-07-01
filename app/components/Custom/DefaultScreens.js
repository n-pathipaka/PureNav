import React from 'react';
import {
    View,
    Text,
    StyleSheet,
    Image
  } from "react-native";
import EvilIcons from 'react-native-vector-icons/EvilIcons';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '../../config/colors';


//{"\U+2713"}
//<Text>{String.fromCodePoint(parseInt("0x2713", 16))}</Text>

const renderLocationBenefits = (item) => {
    return (

            <View style={{flexDirection:'row', marginBottom:20}}>
            <View style={styles.drawCircle}>
                <Text style={{color:'#FFFFFF', fontSize: 18, alignSelf:'center'}}>{String.fromCodePoint(parseInt("0x2713", 16))}</Text>
            </View>
            <Text style={{fontWeight:'700', fontSize:16}}>{item}</Text>
        </View>
    )
}


export const connectWifiScreen = () => {
    return(
        <View style={styles.landingScreen}>
            <AntDesign name="wifi" size={100} color={colors.dark_grey}/>
            <Text style={styles.landingText}>Please make sure you are connected to the internet for the app to load</Text>
        </View>
    );
}

export const connectLocationScreen = () => {
    return(
        <View style={styles.locationLandingScreen}>
            <Text style={styles.locationLandingText}>Please allow PureNav to use your mobile location </Text>
            <View style={styles.locationInfo}>
                <Text style={styles.locationInfoText} >In order for us to come up with the best outcomes of this study we need you device location to be Always enabled, given that the device location will be encrypted secured and will be only use by the resarch team.</Text>
                {renderLocationBenefits("Suggested Routes")}
                {renderLocationBenefits("Only Used by the Research Group")}
                {renderLocationBenefits("Encrypted and secured")}
            </View>
        </View>
    );
}

export const serverDown = () => {
    return(
        <View style={styles.landingScreen}>
            <View style = {styles.logo}>
                <Image source = {require('../../assets/Drawer_logo.png')}
                        style = {{height:40, width:100, resizeMode:'contain'}}
                />
            </View>
            <Text style={styles.landingText}>Server is down Please try again after some time. </Text>
        </View>
    );
}

export const showTripsLandingScreen = () => {
    return(
        <View style={styles.landingScreen}>
            {/* <EvilIcons name="location" size={100} color={colors.dark_grey}/> */}
            <View style = {styles.logo}>
                <Image source = {require('../../assets/Drawer_logo.png')}
                        style = {{height:40, width:100, resizeMode:'contain'}}
                />
            </View>
            <Text style={styles.landingText}>No Past Trips found. If you haven't added any place, Please add a place to use the App.</Text>
        </View>
    );
}

const styles = StyleSheet.create({
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
    locationLandingScreen:{
        display:'flex',
        top: '20%',
        marginHorizontal: 20,
        alignItems: 'center',
    },
    locationLandingText:{
        fontSize: 22,
        fontWeight: "700",
        color: '#333333',
        alignSelf:'stretch',
        alignItems: 'center',
    },
    locationInfo:{
        display:'flex',
        justifyContent:'space-between',
        
        padding: 20,
        backgroundColor: '#F9F9F9',
        borderRadius: 12,
    },
    locationInfoText:{
        fontSize: 16,
        lineHeight:19,
        fontWeight: "400",
        color: '#000000',
        alignSelf:'stretch',
        marginBottom: 20,
    },
    drawCircle :{
        width: 22,
        height: 22,
        borderRadius: 22/2,
        backgroundColor: 'black',
        marginRight: 16,
    }

})