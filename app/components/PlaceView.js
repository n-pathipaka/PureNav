import React from "react";
import {
  View,
  Image,
  Text,
  ScrollView,
  StyleSheet,
  Pressable,
} from "react-native";
import ScheduleView from "./PlaceScheduleView";
import fonts from "../config/fonts";
import colors from "../config/colors";
function PlaceView(props) {

  const showEmoji = (item) => {

      let x = String.fromCodePoint(parseInt(item.split("+")[1],16))

      return <Text style = {{fontSize: 28}}>{x}</Text>
  
    }
  
 
  

  return (
    <Pressable style={styles.container} onPress={props.onPress}>
      {/* Heading */}
      <View style={styles.head}>
        <View style={styles.headerTop}>
          {/* { props.icon && <Image source={props.icon} style={{ height: 22, width: 22 }}></Image>} */}
          {showEmoji(props.emoji)}
          <Text
            style={[
              fonts.fontStyles.text,
              fonts.fontStyles.subtext,
              { color: colors.primary, marginLeft: 10 },
            ]}
          >
            {props.place}
          </Text>
        </View>
      </View>

      {/*Address details*/}
      <Text
        style={[
          fonts.fontStyles.text,
          fonts.fontStyles.subtext,
          { marginTop: 15, fontWeight: "500", fontSize: 17 },
        ]}
      >
        {props.address}
      </Text>

      <ScrollView
        horizontal={true}
        style={styles.scroll}
        showsHorizontalScrollIndicator={false}
        keyboardShouldPersistTaps='always'
      >
        {/* {props.schedules.length != 0
          ? props.schedules.map((x, index) => (
              <>
              {Object.keys(x).map((key, index1) => (
                <ScheduleView
                    key={index1}
                    schedule={key.substring(0,3) + ". "+ x[key].join(",")}
                ></ScheduleView>
              ))}
              </>
              
            ))
          : null} */}

         {Object.keys(props.schedules).length > 0 
          ? (
              <>
              {Object.keys(props.schedules).map((key, index1) => (
               
                <ScheduleView
                    key={index1}
                    schedule={key.substring(0,3) + ". "+ props.schedules[key].join(",")}
                ></ScheduleView>
              ))}
              </>
          )
          : null}
      </ScrollView>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: "white",
    padding: 16,

    borderRadius: 4,
    borderWidth: 1,
    borderColor: colors.grey,

    marginBottom: 15,
    shadowOpacity: 0.05,
  },
  headerTop: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    alignSelf: "center",
  },
  head: {
    flexDirection: "row",
    backgroundColor: "white",
    justifyContent: "space-between",

    alignItems: "center",
  },
  scroll: {
    marginTop: 10,
  },
  info: {
    backgroundColor: "white",
    height: 28,
    width: 28,

    borderRadius: 5,
    borderColor: colors.grey,
    borderWidth: 1,

    shadowOpacity: 0.05,
    alignItems: "center",
    justifyContent: "center",
  },
});

export default PlaceView;
