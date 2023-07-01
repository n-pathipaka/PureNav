import { React, useState, useContext, useEffect } from "react";
import { StyleSheet, View, SafeAreaView, Image, Text , ActivityIndicator} from "react-native";
import AddressBar from "../../components/TextInputs/AddressBar";
import SmallButton from "../../components/Buttons/SmallButton";
import colors from "../../config/colors";
import WorkSetup from "../../components/Buttons/WorkSetup";
import { ScrollView } from "react-native";
import AddPlaceModal from "../../components/Modals/AddPlaceModal";
import AsyncStorage from '@react-native-async-storage/async-storage';
import AppContext from "../../../AppContext";


function OnBoardingScreenTwo(props) {
  const [isModalVisible, setModalVisibility] = useState(false);
  //const [modal, setModal] = useState("clear");
  
  const appContext = useContext(AppContext);


  const onNext = () => {

    let key =  '@'+ appContext.user + '_isSetup';

     (async () => {
       try {
          await AsyncStorage.setItem(key, 'true');
       }
        catch (e) {
          console.log(e);
        }
     })();
   
     
     props.navigation.navigate("loading screen")
    //props.navigation.navigate("home screen");


  };
  const onSetup = () => {
    setModalVisibility(true);
  };

  const listview = () => {};
  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.topView}>
        <View style={styles.homeAddressView}>
          <Image
            source={require("../../assets/office_icon.png")}
            style={styles.image}
          />
          <Text style={styles.text}>Common Places</Text>
        </View>
        <Text style={(styles.text, styles.subtext)}>
          Specifiy at least one place that you go to often to help you navigate
          to it easily
        </Text>
        <WorkSetup onPress={onSetup}></WorkSetup>
        <ScrollView></ScrollView>
      </View>
      <View style={styles.bottomView}>
        <SmallButton title={"Done"} onPress={onNext}></SmallButton>
      </View>
      <AddPlaceModal
        isModalVisible={isModalVisible}
        setModalVisible={setModalVisibility}
        from={"onboarding"}
      ></AddPlaceModal>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    flex: 1,
  },
  topView: {
    padding: 25,
    width: "100%",
    flex: 1,

    marginTop: "10%",
  },
  text: {
    color: "black",
    fontSize: 28,
    fontWeight: "600",
  },
  subtext: {
    fontSize: 22,
    marginBottom: 16,
  },
  image: {
    marginRight: 15,

    width: 34,
    height: 34,
  },
  bottomView: {
    flex: 1,
    padding: 30.5,
    justifyContent: "flex-end",
    alignSelf: "flex-end",
  },
  opacity: {
    backgroundColor: "grey",
    opacity: 0.25,
  },
  homeAddressView: {
    flexDirection: "row",
    alignItems: "center",

    marginBottom: "10%",
  },
});

export default OnBoardingScreenTwo;
