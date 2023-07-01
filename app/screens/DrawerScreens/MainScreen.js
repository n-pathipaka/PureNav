import { useEffect, useState} from "react";
import { DrawerContent } from "../DrawerContent";
import { createDrawerNavigator } from '@react-navigation/drawer';
import AboutScreen from "./AboutScreen";
import NavigationScreen1 from "../Home/NavigationScreen1";
import ContactUs from "./ContactUs";

const Drawer = createDrawerNavigator();

function MainScreen() {
  return (

        <>

        <Drawer.Navigator intialRouteName = 'DrawerHome'
        screenOptions={{headerShown: false}}
        drawerContent= {props => DrawerContent(props) }
        >

        <Drawer.Screen name="DrawerHome" component={NavigationScreen1} /> 
        <Drawer.Screen name="AboutScreen"   component={AboutScreen} />
        <Drawer.Screen name="ContactScreen"   component={ContactUs} />
        <Drawer.Screen name="AppUse"   component={AboutScreen} />
        </Drawer.Navigator>
        
        
        </>

  )
}

export default MainScreen