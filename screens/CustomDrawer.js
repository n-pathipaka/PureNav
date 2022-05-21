import React from 'react';
import { View, StyleSheet, Image } from 'react-native';
import {
    useTheme,
    Avatar,
    Title,
    Caption,
    Paragraph,
    Drawer,
    Text,
    TouchableRipple,
    Switch
} from 'react-native-paper';

import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import {
  DrawerContentScrollView,
  DrawerItem,
  DrawerItemList
} from '@react-navigation/drawer';


export function CustomDrawer(props) {
   

    return(
        <View>
          <DrawerContentScrollView {...props}>
          <View style = {style.logo}>
           <Image source = {require('/Users/khanna/Documents/navi/src/images/Logo.jpeg')}
              style = {{height:70, width:130}}
           />
          </View>
            <DrawerItemList {...props}/>
          </DrawerContentScrollView>
            
        </View>
    );
}

const style = StyleSheet.create({

  logo:{
    height:150,
    alignItems:'center',
    justifyContent:'center',
    marginBottom: 100

 },
    drawerContent: {
      flex: 1,
    },
    userInfoSection: {
      paddingLeft: 20,
    },
    title: {
      fontSize: 16,
      marginTop: 3,
      fontWeight: 'bold',
    },
    caption: {
      fontSize: 14,
      lineHeight: 14,
    },
    row: {
      marginTop: 20,
      flexDirection: 'row',
      alignItems: 'center',
    },
    section: {
      flexDirection: 'row',
      alignItems: 'center',
      marginRight: 15,
    },
    paragraph: {
      fontWeight: 'bold',
      marginRight: 3,
    },
    drawerSection: {
      marginTop: 15,
    },
    bottomDrawerSection: {
        marginBottom: 15,
        borderTopColor: '#f4f4f4',
        borderTopWidth: 1
    },
    preference: {
      flexDirection: 'row',
      justifyContent: 'space-between',
      paddingVertical: 12,
      paddingHorizontal: 16,
    },
  });



