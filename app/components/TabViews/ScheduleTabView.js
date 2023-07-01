import React, { useState } from "react";
import { StyleSheet, View } from "react-native";
import { Tab, TabView } from "react-native-elements";
import colors from "../../config/colors";
import SwitchAddress from "../Custom/SwitchTime";
function ScheduleTabView(props) {
  //Array(7).fill(null)
  //Array.from(Array(3), () => {})
  const [scheduleType, setScheduleType] = useState(
    props.scheduleType != null ? props.scheduleType : 1
  );
  const [daysOfWeek, setDaysOfWeek] = useState({});
  
  const schedules = props.schedule
 
  // const [schedules, updateSchedule] = useState(
  //    props.schedules != null ? props.schedules : emptySchedule
  // );
  const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

  const updateScheduleView = (scheduleType, day, value) => {
   
    //schedule[scheduleType] has key day exists or not.
   
    if(day == "Everyday")
      {
          for(let i =0 ; i < days.length; i++)
            daysOfWeek[days[i]] = [value];
      }
    else
      daysOfWeek[day] = [value]
    
    setDaysOfWeek(daysOfWeek)
   
    props.schedule[scheduleType] = daysOfWeek
    props.updateSchedules(props.schedule);


    // if (props.updateSchedule != null) {
    //   props.updateSchedule(schedules);
    // }
    // if (props.setScheduleType != null) {
    //   props.setScheduleType(scheduleType);
    // }
  };

  return (
    <View style={styles.container}>
      {/* Create Tabs */}
      <Tab
        variant="default"
        indicatorStyle={{
          height: "100%",
          backgroundColor: colors.primary,
          borderRadius: 5,
          opacity: 0.25,
        }}
        value={scheduleType}
        onChange={(choice) => setScheduleType(choice)}
      >
        <Tab.Item
          title="Everyday"
          titleStyle={[
            { fontSize: 13, textTransform: "none", color: "grey" },
            scheduleType == 0 ? { color: colors.primary } : null,
          ]}
          containerStyle={[
            {
              backgroundColor: colors.grey,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
            },
          ]}
        ></Tab.Item>
        <Tab.Item
          title="Weekdays"
          titleStyle={[
            { fontSize: 13, textTransform: "none", color: "grey" },
            scheduleType == 1 ? { color: colors.primary } : null,
          ]}
          containerStyle={[
            {
              backgroundColor: colors.grey,
            },
          ]}
        ></Tab.Item>
        <Tab.Item
          title="Custom"
          titleStyle={[
            { fontSize: 13, textTransform: "none", color: "grey" },
            scheduleType == 2 ? { color: colors.primary } : null,
          ]}
          containerStyle={[
            {
              backgroundColor: colors.grey,
              borderTopRightRadius: 5,
              borderBottomEndRadius: 5,
            },
          ]}
        ></Tab.Item>
      </Tab>
      {/* Create Tab Views */}
      <TabView
        value={scheduleType}
        onChange={setScheduleType}
        animationType="spring"
      >
        <TabView.Item style={styles.tabViewitem}>
          <SwitchAddress
            isSwitchEnabled={false}
            placeholder={"Everyday before"}
            time={schedules[0]}
            setTime={(value) => {
              updateScheduleView("Everyday", "Everyday", value);
            }}
          ></SwitchAddress>
        </TabView.Item>
        <TabView.Item style={styles.tabViewitem}>
          <View>
            <SwitchAddress
              isSwitchEnabled={false}
              placeholder={"Monday before"}
              time={schedules[1]}
              setTime={(value) => {
                updateScheduleView("weekdays", "Monday", value);
              }}
            ></SwitchAddress>
            <SwitchAddress
              isSwitchEnabled={false}
              placeholder={"Tuesday before"}
              time={schedules[1]}
              setTime={(value) => {
                updateScheduleView("weekdays", "Tuesday", value);
              }}
            ></SwitchAddress>
            <SwitchAddress
              isSwitchEnabled={false}
              placeholder={"Wednesday before"}
              time={schedules[1]}
              setTime={(value) => {
                updateScheduleView("weekdays", "wednesday", value);
              }}
            ></SwitchAddress>
            <SwitchAddress
              isSwitchEnabled={false}
              placeholder={"Thursday before"}
              time={schedules[1]}
              setTime={(value) => {
                updateScheduleView("weekdays", "Thursday", value);
              }}
            ></SwitchAddress>
            <SwitchAddress
              isSwitchEnabled={false}
              placeholder={"Friday before"}
              time={schedules[1]}
              setTime={(value) => {
                updateScheduleView("weekdays", "Friday", value);
              }}
            ></SwitchAddress>
          </View>
        </TabView.Item>
        <TabView.Item style={styles.tabViewitem}>
          <View>
            <SwitchAddress
              isSwitchEnabled={true}
              placeholder={"Monday before"}
              time={schedules[2]}
              setTime={(value) => {
                updateScheduleView("custom", "Monday", value);
              }}
            ></SwitchAddress>
            <SwitchAddress
              isSwitchEnabled={true}
              placeholder={"Tuesday before"}
              time={schedules[2]}
              setTime={(value) => {
                updateScheduleView("custom", "Tuesday", value);
              }}
            ></SwitchAddress>
            <SwitchAddress
              isSwitchEnabled={true}
              placeholder={"Wednesday before"}
              time={schedules[2]}
              setTime={(value) => {
                updateScheduleView("custom", "Wednesday", value);
              }}
            ></SwitchAddress>
            <SwitchAddress
              isSwitchEnabled={true}
              placeholder={"Thursday before"}
              time={schedules[2]}
              setTime={(value) => {
                updateScheduleView("custom", "Thursday", value);
              }}
            ></SwitchAddress>
            <SwitchAddress
              isSwitchEnabled={true}
              placeholder={"Friday before"}
              time={schedules[2]}
              setTime={(value) => {
                updateScheduleView("custom", "Friday", value);
              }}
            ></SwitchAddress>
            <SwitchAddress
              isSwitchEnabled={true}
              placeholder={"Saturday before"}
              time={schedules[2]}
              setTime={(value) => {
                updateScheduleView("custom", "Saturday", value);
              }}
            ></SwitchAddress>
            <SwitchAddress
              isSwitchEnabled={true}
              placeholder={"Sunday before"}
              time={schedules[2]}
              setTime={(value) => {
                updateScheduleView("custom", "Sunday", value);
              }}
            ></SwitchAddress>
          </View>
        </TabView.Item>
      </TabView>
    </View>
  );
}
const styles = StyleSheet.create({
  container: { marginTop:10 },
  tabView: {},
  tabViewitem: {
    width: "90%",
  },
});

export default ScheduleTabView;
