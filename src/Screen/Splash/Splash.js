import AsyncStorage from '@react-native-async-storage/async-storage';
import React from 'react';
import {Animated, Image, Text} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';


const Splash = ({navigation}) => {
  
  React.useEffect(() => {
    (async () => {
      const userData = await AsyncStorage.getItem('uName');
      const userData1 = await AsyncStorage.getItem('Type');
      console.log(userData,userData1)
      setTimeout(() => {
        if (!userData) {
          // navigation.navigate('AdminHomePage')
          navigation.replace('Login');
                      // navigation.navigate('Homepage')

        } else {

          if(userData1==='user'){
            // navigation.navigate('AdminHomePage')

            navigation.navigate('Homepage1')
          }
          else if(userData1==='handyman'){

            navigation.navigate('Homepage')
          }
          else
          {
            navigation.navigate('AdminHomePage')
          }



          // navigation.replace('Login');
          // navigation.replace('Homepage');
          // navigation.replace('');
        }
      }, 10000);
    })();
  }, []);
  const fadeAnim = React.useRef(new Animated.Value(0)).current;
  // setTimeout(() => {
  //   navigation.navigate('Login');
  // }, 5000);
  React.useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 10000,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);

  return (
    <SafeAreaView
      style={{
        flex: 1,
        backgroundColor: '#17bba9',
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <Animated.View // Special animatable View
        style={{
          opacity: fadeAnim,
          transform: [
            {
              rotate: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: ['0deg', '360deg'],
              }),
            },
          ],
        }}>
        <Text style={{color: 'white', fontSize: 50, fontWeight: 'bold'}}>
          HandyMan
        </Text>
        {/* <Image
          resizeMode="stretch"
          style={{height: 150, width: 200}}
          source={require('../../assets/images/Services.png')}
        /> */}
      </Animated.View>
    </SafeAreaView>
  );
};
export default Splash;
