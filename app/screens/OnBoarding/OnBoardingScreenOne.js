import {React,useState, useContext} from 'react';
import {View, Text, StyleSheet, Image} from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';
import AddressBar from '../../components/TextInputs/AddressBar';
import SmallButton from '../../components/Buttons/SmallButton';
import LocationModal from '../../components/LocationModal';
import { useNavigation } from '@react-navigation/native';
import AppContext from '../../../AppContext';
import {connectLocationScreen} from '../../components/Custom/DefaultScreens';
 

function OnBoardingScreenOne(props) {
    const [isModalVisible, setModalVisible] = useState(false);
    const navigation = useNavigation();
    const appContext = useContext(AppContext);
    const onNext = () => {
        navigation.navigate('OnboardingScreenTwo')
    }
    const onAddress = ()=>{
        setModalVisible(true)
    }
    return (
        <SafeAreaView style={
            [styles.container,isModalVisible ? styles.opacity:null]}
        >
        <>
        {! appContext.locServiceEnabled ? (connectLocationScreen()):(
            <>
                <View style={styles.topView}>
                    <View style={styles.homeAddressView}>
                        <Image source={require('../../assets/home_icon.png')}
                            style={styles.image}/>
                        <Text style={styles.text}>Home Address</Text>
                    </View>
                    <Text style={[styles.text, styles.subtext]}>Specify your home address so that the 
                        app can help you how to navigate</Text>
                    <AddressBar imageSource={require('../../assets/Vectorlocation.png')}
                    value={'Home Address'}
                    onPress={onAddress}></AddressBar>
                </View>
                <View style={styles.bottomView}>
                    <SmallButton title={'Next'} onPress={onNext} ></SmallButton>
                </View>
            </>
         )}
        </>
        <LocationModal isModalVisible={isModalVisible} 
        setModalVisible={setModalVisible}></LocationModal>
        </SafeAreaView>
    );
}
const styles = StyleSheet.create({
    container:{
        backgroundColor: 'white',
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center'
    }, 
    topView:{
        padding: 25,
        width: '100%',
        flex: 1,

        marginTop: '10%'
    }, 
    homeAddressView:{
        flexDirection: 'row',
        alignItems: 'center',

        marginBottom: '10%'
    }, 
    text:{
        color: 'black',
        fontSize: 28,
        fontWeight: '600',
    },
    subtext:{
        fontSize: 22,
        marginBottom : 16,
    },
    image:{
        marginRight: 15,

        width: 34,
        height: 34
    },
    bottomView:{
        flex: 1,
        padding: 30.5,
        justifyContent: 'flex-end',
        alignSelf: 'flex-end'
    },
    opacity:{
        backgroundColor: 'grey',
        opacity: .25,
    }
})

export default OnBoardingScreenOne;