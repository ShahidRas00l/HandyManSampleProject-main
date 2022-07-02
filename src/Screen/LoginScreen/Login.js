import AsyncStorage from '@react-native-async-storage/async-storage';

import React, { useEffect, useRef, useState } from 'react';
  
import {
  ActivityIndicator, AppState, Dimensions, Image, Text, TextInput, ToastAndroid, TouchableOpacity, View
} from 'react-native';

import {
  heightPercentageToDP, widthPercentageToDP
} from 'react-native-responsive-screen';
import { SafeAreaView } from 'react-native-safe-area-context';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import logo from '../../Assets/Images/Services.png';
// import logo from '../../assets/images/logo.jpg';
import { styles } from './Login.Styles';
import axios from 'axios';
import IP from '../../Services/IP';



const { width } = Dimensions.get('window');

export const LoginScreen = ({ navigation, route }) => {
  const [getEmail, setEmail] = useState('');
  const [getPassword, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable1, setDisable1] = useState(true);






  // if all text field data put then login button disabled
  useEffect(() => {

    if (getEmail.length > 1 && getPassword.length > 1) {
      // console.log('disabled');
      setDisable1(false);
    }
  }, [getEmail, getPassword]);

  
  //check textField from firebase and then  show the Location Screen
  const signIn = async () => {
 try {
      console.log("signin")
      const baseUrl = `${IP}getuser?Email=${getEmail}&Password=${getPassword}`;
     axios.get(baseUrl).then((response) => {
      
        console.log("response =>",response.data );
        // console.log("response =>",response.data?.Type );
        if (response.status === 200) {
      
          // alert(` You have created: ${JSON.stringify(response.data)}`);
          if(response.data?.Type==='user'){
            console.log(" user",response.data?.Email)
            setLoading(false);
            setEmail('');
            setPassword('');
          AsyncStorage.setItem('uName', response.data?.Email);
           AsyncStorage.setItem('Type', "user");
            navigation.navigate('Homepage1')
          }
          else if(response.data?.Type==='handyman'){
            console.log(" handyman",response.data?.Email)
            setLoading(false);
            setEmail('');
            setPassword('');
            AsyncStorage.setItem('uName', response.data?.Email);
           AsyncStorage.setItem('Type', "handyman");
            navigation.navigate('Homepage')
          }
          else if(response.data?.Type==='admin'){
            setLoading(false);
            setEmail('');
            setPassword('');
            AsyncStorage.setItem('uName', response.data?.Email);
            AsyncStorage.setItem('Type', "admin");
            navigation.navigate('AdminHomePage')
          }
          
         
        } else {
          throw new Error("An error has occurred");
        }
      });
      setLoading(false);
    } catch (error) {
      console.log("error",error)
    }
  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* this view show the log image  */}
      <View style={{ width: widthPercentageToDP(100), height: heightPercentageToDP(30), alignItems: 'center', justifyContent: 'center', }}>
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 50,
          }}
          source={logo}
        />
      </View>
      {/* All other item show in this View */}
      <View style={{ alignItems: 'center', justifyContent: 'center' }}>
        {/* Email Text Fields Show  */}
        <View style={{ justifyContent: 'center', alignItems: 'center', borderRadius: 10, backgroundColor: 'white', }}>
          <View
            style={{ flexDirection: 'row', alignItems: 'center', elevation: 2, shadowOpacity: 1, shadowOffset: 1, shadowColor: 'black', borderRadius: 10, backgroundColor: 'white', width: widthPercentageToDP(90), height: heightPercentageToDP(8), paddingLeft: 20, }}>
            <View
              style={{ backgroundColor: '#17bba9', width: 40, height: 40, borderRadius: 40, justifyContent: 'center', alignItems: 'center', }}>
              <Ionicons name={'mail'} size={20} color="white" />
            </View>
            <TextInput
              placeholder={'Email'}
              keyboardType={'email-address'}
              placeholderTextColor="grey"
              style={{ marginLeft: 20, fontSize: 16, color: 'black' }}
              onChangeText={e => setEmail(e)}
            />
          </View>
        </View>
        {/* password Field show Text Fields Show  */}
        <View
          style={{
            justifyContent: 'center',
            alignItems: 'center',
            borderRadius: 10,
            backgroundColor: 'white',
            marginTop: 20,
          }}>
          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              elevation: 2,
              shadowOpacity: 1,
              shadowOffset: 1,
              shadowColor: 'black',
              borderRadius: 10,
              backgroundColor: 'white',
              width: widthPercentageToDP(90),
              height: heightPercentageToDP(8),
              paddingLeft: 20,
            }}>
            <View
              style={{
                backgroundColor: '#17bba9',
                width: 40,
                height: 40,
                borderRadius: 40,
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <MaterialCommunityIcons
                name={'lock-outline'}
                size={20}
                color="white"
              />
            </View>
            <TextInput
              secureTextEntry={true}
              placeholder={'Password'}
              placeholderTextColor="grey"
              style={{ marginLeft: 20, fontSize: 16, color: 'black' }}
              onChangeText={e => setPassword(e)}
            />
          </View>
          <TouchableOpacity onPress={() => navigation.navigate('ForgotPassword')} style={{ alignSelf: 'flex-end', marginRight: 10, marginTop: 10 }}>
            <Text style={{ color: '#17bba9', fontSize: 12, fontWeight: 'bold' }}>
              Forgot Password?
            </Text>
          </TouchableOpacity>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: heightPercentageToDP(15),
            }}>
            <TouchableOpacity
              onPress={() => { setLoading(true); signIn() }}
              style={{
                marginTop: 20,
                borderRadius: 10,
                width: widthPercentageToDP(72),
                height: heightPercentageToDP(8),
                backgroundColor: '#17bba9',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 18,
                elevation: 10,
                shadowOpacity: 1,
                shadowOffset: 1,
                shadowColor: 'black',
                flexDirection: 'row',
              }}
              disabled={disable1}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={{ color: '#FFFF', fontSize: 18, paddingRight: 10 }}>
                  Login
                </Text>
              )}
            </TouchableOpacity>

          </View>
        </View>
        {/* Login Button show and  */}
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            height: heightPercentageToDP(35),
            justifyContent: 'flex-end',
          }}>
          <Text style={styles.txtStyle}>Don't have an account? </Text>
          <TouchableOpacity onPress={() => navigation.navigate('Signup')}>
            <Text
              style={(styles.txtStyle, { fontWeight: 'bold', color: '#17bba9' })}>
              Sign Up
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};
