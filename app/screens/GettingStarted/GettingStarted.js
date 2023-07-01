import * as React from 'react';
import { StatusBar, Animated, Text, Image, View, StyleSheet, Dimensions, TouchableOpacity, FlatList} from 'react-native';
import { useNavigation } from '@react-navigation/native';

const {width, height} = Dimensions.get('screen');

const bgs = ['#A5BBFF', '#DDBEFE', '#FF63ED', '#B98EFF'];
const DATA = [
  {
    "key": "3571572",
    "title": "Never be late to your favorite places",
    "description": "Add the common places that you go often to allow the app to help you get there on time.",
    "image": require("../../assets/Vector2.png")
  },
  {
    "key": "3571747",
    "title": "Get customised route recommendations",
    "description": "The app gives you custmised recommendations to your places.",
    "image": require("../../assets/Vector1.png")
  },
  {
    "key": "3571680",
    "title": "Get alerted when its time to go or traffic changes",
    "description": "The App monitors the routes that you use daily and will tell you if something changes.",
    "image": require("../../assets/Vector.png")
  }
]
const Indicator = ({scrollX}) => {
  return (
    <View style={{position: 'absolute', bottom: 140, flexDirection: 'row'}}>
      {DATA.map((_, i) => {
        const inputRange = [(i - 1) * width, i * width, (i + 1) * width];
        const scale = scrollX.interpolate({
          inputRange,
          outputRange: [0.8, 1.4, 0.8],
          extrapolate: 'clamp',
        });
        return <Animated.View
        key = {`indicator-${i}`}
        style = {{height: 10, width: 10, borderRadius: 5, backgroundColor: '#333', margin: 10,
        transform: [{
          scale
        }]}}/>
        
      })}
    </View>
  )
    }


      


export default function GettingStarted(props) {
  const scrollX = React.useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();

  const getStarted = () =>{
    navigation.navigate('login screen')
  }

  return (
    <View style={styles.container}>
      <StatusBar hidden />
      
      <Animated.FlatList
      data = {DATA}
      showsHorizontalScrollIndicator  = {false}
      horizontal
      scrollEventThrottle={32}
      
      onScroll={Animated.event(
        [{nativeEvent: {contentOffset: {x: scrollX}}}],
        {useNativeDriver: false}
      )}
      contentContainerStyle = {{paddingBottom: 100}}
      keyExtractor = {item => item.key}
      paddingEnabled
      renderItem={({item}) => {
        return  (<View style = {{width, alignItems: 'center', padding: 20}}>
          <View style = {{flex: 0.7, justifyContent: 'center'}}>
          <Image source = {item.image} style = {{width: width / 2, height: height / 2, resizeMode: 'contain'}} />
          </View>
          <View style = {{flex: 0.3}}>
          <Text style = {{fontSize: 28, fontWeight: '600', marginBottom: 10, lineHeight: 34}}>{item.title}</Text>
          <Text style = {{fontSize: 15, fontWeight: '400', marginTop: 10, lineHeight: 20}}>{item.description}</Text>
          </View>
          </View>
        );
          }}
  
          />
          <Indicator scrollX= {scrollX} />
          
            <TouchableOpacity style = {{ bottom: 50, marginHorizontal: 20,  backgroundColor: '#6979F8', width: 325, height: 50, borderRadius: 5, alignItems: 'center', justifyContent: 'center'}}
               onPress={getStarted}>
              <Text style = {{fontSize: 16, color: '#fff'}}>Start using the app</Text>
            </TouchableOpacity>
          
    </View>
    
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});