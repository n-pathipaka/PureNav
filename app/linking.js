import * as Linking from 'expo-linking';

const url = Linking.createURL('demo://app');

const config = {
    screens: {
      HomeScreen: {
        screens: {
            DrawerHome :{
                screens: {
                    Trips :'trips'
                }
            }
        }
      },
      HomeScreen: 'home',

     
    },
  };
  
  const appLinking = {
    prefixes: [url],
    config,
  };
  
  export default appLinking;