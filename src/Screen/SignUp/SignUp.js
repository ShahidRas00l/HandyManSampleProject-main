import AsyncStorage from '@react-native-async-storage/async-storage';
import React, { useEffect, useState } from 'react';
import {
  ActivityIndicator,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { styles } from './SignUp.Styles';
import logo from '../../Assets/Images/Services.png';
import { RadioButton } from 'react-native-paper';
import axios from 'axios';
import IP from '../../Services/IP';
// import logo from '../../assets/images/logo.jpg';

export const SignUpScreen = ({ navigation }) => {

  const [getUserName, setUserName] = useState('');
  const [getPassword, setPassword] = useState('');
  const [getEmail, setEmail] = useState('');
  const [getPhoneNumber, setPhoneNumber] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable1, setDisable1] = useState(true);
  const [checked, setChecked] = useState('user');

  // if all text field data put then SignUp button disabled

 
  useEffect(() => {
    if (
      getEmail.length > 1 &&
      getPassword.length > 1 &&
      getUserName.length > 1 &&
      getPhoneNumber.length > 1
    ) {
      console.log('disabled');
      setDisable1(false);
    }
  }, [getEmail, getPassword, getUserName, getPhoneNumber]);

  // return current date
  const getCurrentDate = () => {
    var date = new Date().getDate();
    var month = new Date().getMonth() + 1;
    var year = new Date().getFullYear();
    // You can turn it in to your desired format
    return date + '-' + month + '-' + year; //format: dd-mm-yyyy;
  };
  // simple toastprompt
  function toastPrompt(msg) {
    if (Platform.OS === 'android') {
      ToastAndroid.show(msg, ToastAndroid.SHORT);
    } else {
      alert(msg);
    }
  }

  //save textField data in  firebase in users and then  show the Login Screen
  const signIn = async () => {


    const baseUrl = `${IP}getuser`;
    // console.log(baseUrl);

    try {
      // console.log(getUserName,checked,getPassword,getPhoneNumber,getEmail)
      const response = await axios.post(baseUrl, {
        // const response = await axios.post(baseUrl, {
        Name: getUserName,
        Email: getEmail,
        PhoneNum: getPhoneNumber,
        Password: getPassword,
        Type: checked,
      });
      console.log("response start ", response)
      // console.log("response",response)
      if (response?.status === 200) {

        console.log("response enter ", response)

        // alert(` You have created: ${JSON.stringify(response.data)}`);
        setLoading(false);

        AsyncStorage.setItem('uName', getEmail);
        console.log("checked", checked);
        AsyncStorage.setItem('Type', checked);

        setUserName('');
        setEmail('');
        setChecked('user');
        setPassword('');
        setPhoneNumber('');
     
        if(checked==="user"){
          navigation.navigate('Homepage1')
        }
        else{
          navigation.navigate('Homepage')
        }
        

      } else {
        throw new Error("An error has occurred");
      }
    } catch (error) {
      alert("An error has occurred");
      setLoading(false);
    }


  };

  return (
    <SafeAreaView style={{ flex: 1, backgroundColor: 'white' }}>
      {/* <KeyboardAvoidingView behavior="position"> */}

      {/* this view show the log image  */}
      <View
        style={{
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(25),
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Image
          style={{
            width: 200,
            height: 200,
            borderRadius: 50,
          }}
          source={logo}
        />
      </View>
      <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
        <RadioButton
          value="user"
          status={checked === 'user' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('user')}
        />
        {/* <RadioButtonRN data={data} selectedBtn={e => console.log(e)} /> */}
        <Text> user</Text>

        {/* <RadioButtonRN data={data} selectedBtn={e => console.log(e)} /> */}
        <RadioButton
          value="handyman"
          status={checked === 'handyman' ? 'checked' : 'unchecked'}
          onPress={() => setChecked('handyman')}
        />
        <Text> handyman</Text>
      </View>
      {/* All other item show in this View */}
      <View
        style={{ alignItems: 'center', justifyContent: 'center' }}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Name Text Fields Show  */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
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
                marginBottom: 10,
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
                <MaterialIcons
                  name={'person-outline'}
                  size={20}
                  color="white"
                />
              </View>
              <TextInput
                onChangeText={e => setUserName(e)}
                placeholder={'Name'}
                placeholderTextColor={'grey'}
                style={{ marginLeft: 20, fontSize: 16, color: 'black' }}
              />
            </View>
          </View>
          {/* Email Text Fields Show  */}
          <View
            style={{
              justifyContent: 'center',
              alignItems: 'center',
              borderRadius: 10,
              backgroundColor: 'white',
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
                marginTop: 10,
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
                <Ionicons name={'mail'} size={20} color="white" />
              </View>
              <TextInput
                placeholder={'Email'}
                keyboardType={'email-address'}
                style={{ marginLeft: 20, fontSize: 16, color: 'black' }}
                onChangeText={e => setEmail(e)}
                placeholderTextColor={'grey'}
              />
            </View>
          </View>
          {/* PhoneNumber Text Fields Show  */}
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
                  name={'phone-outline'}
                  size={20}
                  color="white"
                />
              </View>
              <TextInput
                placeholder={'Phone Number'}
                keyboardType={'phone-pad'}
                style={{ marginLeft: 20, fontSize: 16, color: 'black' }}
                onChangeText={e => setPhoneNumber(e)}
                placeholderTextColor={'grey'}
              />
            </View>
          </View>
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
              marginTop: 20,
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
              style={{ marginLeft: 20, fontSize: 16, color: 'black' }}
              onChangeText={e => setPassword(e)}
              placeholderTextColor={'grey'}
            />
          </View>
          {/* Password Text Fields Show  */}
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
                placeholder={'Confirm Password'}
                style={{ marginLeft: 20, fontSize: 16, color: 'black' }}
                onChangeText={e => setPassword(e)}
                placeholderTextColor={'grey'}
              />
            </View>
            {/* SignUp Button Show  */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: heightPercentageToDP(15),
              }}>
              <TouchableOpacity
                onPress={() => {
                  setLoading(true);
                  signIn();
                }}
                style={{
                  // marginTop: 30,
                  borderRadius: 10,
                  width: widthPercentageToDP(90),
                  height: heightPercentageToDP(8),
                  backgroundColor: '#17bba9',
                  justifyContent: 'center',
                  alignItems: 'center',
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
                  <Text
                    style={{ color: '#FFFF', fontSize: 18, paddingRight: 10 }}>
                    Sign Up
                  </Text>
                )}
              </TouchableOpacity>
              {/* <Image source={require('./fingerprint.png')} style={{ marginTop: 20, marginLeft: 10 }} /> */}
            </View>
          </View>

          <View
            style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text style={styles.txtStyle}>Already have an account?</Text>
            <TouchableOpacity onPress={() => navigation.navigate('Login')}>
              <Text
                style={
                  (styles.txtStyle, { fontWeight: 'bold', color: '#17bba9' })
                }>
                {' '}
                Login
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
      {/* </KeyboardAvoidingView> */}
    </SafeAreaView>
  );
};
