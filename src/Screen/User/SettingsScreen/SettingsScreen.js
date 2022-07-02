
import Geolocation1 from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNSettings from 'react-native-settings';
import Octicons from 'react-native-vector-icons/Octicons';
import {
  ActivityIndicator,
  Alert,
  Image, SafeAreaView,
  ScrollView,
  Text,
  TextInput, TouchableOpacity,
  View
} from 'react-native';
import {
  heightPercentageToDP,
  widthPercentageToDP
} from 'react-native-responsive-screen';

import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import ImagePicker from 'react-native-image-crop-picker';
import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserAvatar from '../../../Assets/Images/DummyImage.jpeg';
import UserAvatar1 from '../../../Assets/Images/locationSetting.png';
import IP from '../../../Services/IP';
import { styles } from './setting.styles';


export const SettingsScreen = ({ navigation }) => {
  Geocoder.init('AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M', { language: 'en' });


  const [getUserName, setUserName] = useState();
  const [getEmail, setEmail] = useState();
  const [getPhoneNumber, setPhoneNumber] = useState();
  const [address, setAddress] = useState();
  const [range, setRange] = useState("");
  const [userId, setUserId] = useState("");


  const [getImg, setImg] = useState('');
  const [disable1, setDisable1] = useState(false);
  const [loading, setLoading] = useState(false);

  const [flag1, setflag1] = useState(false);

  const [users, setUsers] = useState([]);


  var [latitudec, setlatitudec] = useState(0);
  var [longitudec, setlongitudec] = useState(0);




  useEffect(() => {
    setLoading(false);

    getUserData();
  }, []);




  // if all text field data put then Save button disabled
  useEffect(() => {
    if (
      getUserName?.length > 0 &&
      getPhoneNumber?.length > 0
      // getEng.length > 0 &&
      // uriImage.length > 0 &&
      // getImg.length > 0
    ) {
      console.log('disabled');
      setDisable1(false);
    }
  }, [getUserName, getPhoneNumber]);


  const clearAllAsyncStorage = () => {
    Alert.alert('Do you want to Logout', '', [
      {
        text: 'Cancel',
        onPress: () => console.log('Cancel Pressed'),
        style: 'cancel',
      },
      {
        text: 'Yes',
        onPress: () => {
          try {
            AsyncStorage.setItem('uName', '');
            // await AsyncStorage.clear()
            navigation.navigate('Login');
          } catch (e) {
            console.log(e);
          }
        },
      },
    ]);

    console.log('Done.');
  };



  //  get user detail
  const getUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('uName');
      const baseUrl = `${IP}getuser?Email=${email}`;
      axios.get(baseUrl).then((response) => {

        console.log(response.data, "----- user response ------",);
        // console.log("response =>",response.data?.Type );
        if (response.status === 200) {
          setUserId(response?.data?.Uid)
          setUsers(response.data)
          setUserName(response?.data?.Name)
          setEmail(response?.data?.Email)
          setAddress(response?.data?.Address)
          setPhoneNumber(response?.data?.PhoneNum)
          setRange(response?.data?.Range)


        } else {
          throw new Error("An error has occurred");
        }
      });
      setLoading(false);
    } catch (error) {
      console.log("error", error)
    }
  };

  // setLoading(false);

  const savaRecord = async () => {

    const baseUrl = `${IP}modifyUser`;

    try {
      const response = await axios.post(baseUrl, {
        Uid: userId, Name: getUserName, Email: getEmail,
        Address: address, Range: range, UserImage: getImg
      }
      );
      // console.log("response start ", response)
      // console.log("response",response)
      if (response?.status === 200) {

        console.log("response enter ", response);

        console.log('Save successfully');
      setLoading(false);




      } else {
        console.log('--error from else uer --------')
        throw new Error("An error has occurred");
      }
    } catch (error) {
      console.log(error.response.data, '--error from user --------')
      // console.log(error,'--error from user --------')
      alert("An error has occurred");
      setLoading(false);
    }





  };

  const uploadImageMain = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setImg(image.data);
      setflag1(true);

    });
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
               showsVerticalScrollIndicator={false}

               style={{...styles.container,height: "100%"}}>
               <View
                 style={{
                   backgroundColor: '#17bba9',
                   height: heightPercentageToDP(7.23),
                   width: widthPercentageToDP(100),
                   justifyContent: 'center',
                 }}>
                 <View
                   style={{
                     alignItems: 'center',
                     justifyContent: 'space-between',
                     flexDirection: 'row',
                   }}>
                   <TouchableOpacity
                     onPress={() => navigation.goBack()}
                     style={{ paddingLeft: 20 }}>
                     <AntDesign name="arrowleft" size={30} color="white" />
                   </TouchableOpacity>
                   <View style={{}}>
                     <Text
                       style={{
                         color: 'white',
                         fontSize: 22,
                         fontWeight: 'bold',
                         color: 'white',
                       }}>
                       Profile
                     </Text>
                   </View>
                   {/* logout */}
                   <TouchableOpacity style={{ paddingRight: 20 }}
                     onPress={() => {
                       clearAllAsyncStorage()
                     }}>
                     <Text
                       style={{
                         color: 'white',
                         fontSize: 22,
                         fontWeight: 'bold',
                         color: 'white',
                       }}>
                       Logout
                     </Text>
                   </TouchableOpacity>
                 </View>
               </View>



        {/* All other item show in this View */}

        <View style={{ alignItems: 'center' }}>
          {/* show image plus logo */}
          <View style={styles.avatarContainer}>
            <View>
              <Image
                style={styles.userAvatar}
                // show default image or selected image
                source={
                  // getImg?
                  //  {uri: getImg} : UserAvatar
                  flag1 ? { uri: getImg ? `data:image/jpeg;base64,${getImg}` : null } : UserAvatar
                }
              // source={UserAvatar}
              />
              <TouchableOpacity onPress={() => uploadImageMain()}>
                <View style={styles.avatarEditBtn}>
                  <MaterialCommunityIcons
                    name={'playlist-edit'}
                    size={25}
                    color="white"
                  />
                </View>
              </TouchableOpacity>
            </View>

            <View style={{ alignSelf: 'flex-end', marginBottom: 20 }}>
              {/* <Text style={styles.txtStyle1}>Edit Info</Text> */}
            </View>
          </View>
          <View style={{
              width: widthPercentageToDP(100),
              height: heightPercentageToDP(190),
            }}>
            {/* All Input Field in this View */}
            <View
              style={{
                marginTop: 20,
                alignItems: 'center',
                justifyContent: 'center',
              }}>
              {/* Name input Field */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialIcons
                      name={'person-outline'}
                      size={18}
                      color="white"
                    />
                  </View>
                  <TextInput
                    placeholder={'Name'}
                    placeholderTextColor={'grey'}
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      padding: 0,
                    }}
                    onChangeText={e => setUserName(e)}
                    value={getUserName}
                  />
                </View>
              </View>
              {/* Email input Field */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Ionicons name={'mail'} size={18} color="white" />
                  </View>
                  <TextInput
                    placeholder={'Email'}
                    placeholderTextColor={'grey'}
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      padding: 0,
                    }}
                    onChangeText={e => setEmail(e)}
                    value={getEmail}
                  />
                </View>
              </View>
              {/* PHone Number input Field */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <MaterialCommunityIcons
                      name={'phone-outline'}
                      size={18}
                      color="white"
                    />
                  </View>
                  <TextInput
                    placeholder={'Phone Number'}
                    keyboardType={'phone-pad'}
                    placeholderTextColor={'grey'}
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      padding: 0,
                    }}
                    onChangeText={e => setPhoneNumber(e)}
                    value={getPhoneNumber}
                  />
                </View>
              </View>

              {/* Location input Field */}
              {/* country */}
              {/* <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    <Image style={styles.userAvatar1} source={UserAvatar1} />
                  </View>
                  <TextInput
                    placeholder={'Address'}
                    placeholderTextColor={'grey'}
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      padding: 0,
                    }}
                    onChangeText={e => setAddress(e)}
                    value={address}
                  />
                </View>
              </View> */}
                <View style={{
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                },
                shadowOpacity: 0.25,
                shadowRadius: 3.84,
                elevation: 1,
                borderRadius: 10,
                paddingHorizontal:5 ,
                // marginLeft: widthPercentageToDP('6.4%'), marginRight: widthPercentageToDP('4.4%'),
                justifyContent: 'center',
                marginTop: widthPercentageToDP('1.6%'),
                height: heightPercentageToDP(7), width: widthPercentageToDP(90),
                // height: heightPercentageToDP('9.75%'), width: widthPercentageToDP('90%'),
              }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    paddingRight: widthPercentageToDP('3.25'),
                    flexGrow: 1,
                  }}>
                   <View style={{marginLeft:widthPercentageToDP('3.96%')}}>
                   <Image style={styles.userAvatar1} source={UserAvatar1} />
                   </View>
                 <ScrollView>
                 <GooglePlacesAutocomplete
                    placeholder={'search Address here'}

                    keyboardShouldPersistTaps = {'handled'}
                    minLength={1} // minimum length of text to search
                    returnKeyType={'search'}
                    listViewDisplayed={'auto'} 
                    autoFocus={false}
                    fetchDetails={true}

                    numberOfLines={3}
                    onPress={(data, details = null) => {
                      // 'details' is provided when fetchDetails = true
                      console.log('deta', data.description);
                      setAddress(data.description);
                      Geocoder.from(data.description)
                        .then(json => {
                          var location = json.results[0].geometry.location;

                          setlatitudec(location.lat);
                          setlongitudec(location.lng);
                        })
                        .catch(error => console.warn(error));
                    }}
                    query={{
                      key: 'AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M',
                      // key: 'YOUR API KEY',
                      language: 'en',
                    }}
                    textInputProps={{
                      onChangeText: text => {
                        setAddress(text);
                      },
                      value: address,
                    }}
                    getDefaultValue={() => {
                      // text input default value
                      return address;
                    }}
                    styles={{
                      row: {
                        backgroundColor: '#17bba9',
                      },

                      textInput: {
                        color: 'black',
                        fontSize: 16,
                        backgroundColor: 'white',
                        width: widthPercentageToDP(50),
                        // height: 60,
                        height: heightPercentageToDP(7),
                        
                        borderRadius: 5,
                        alignItems: 'center',
                        justifyContent: 'center',
                        paddingLeft:widthPercentageToDP('5%')
                      },

                      predefinedPlacesDescription: {
                        color: '#1faadb',
                      },
                    }}
                  />
                 </ScrollView>

                  <TouchableOpacity
                    onPress={() => {
                      Geolocation1.getCurrentPosition(
                        position => {
                          console.log('get current Location');
                          console.log(position.coords.latitude,position.coords.longitude)

                          // getAddress(position)

                          Geocoder.from(
                            position.coords.latitude,
                            position.coords.longitude,
                          )
                            .then(
                              json => {
                                setlatitudec(position.coords.latitude);
                                setlongitudec(position.coords.longitude);
                                var addressComponent =
                                  json.results[2].formatted_address;
                                console.log(addressComponent,'------addressComponent-----')
                                setAddress(addressComponent);
                              },
                              error => {
                                if (
                                  error.message === 'No location provider available.'
                                ) {
                                  //Show alert or something here that GPS need to turned on.
                                  Alert.alert(
                                    '"Location permission denied So please Accept that"',
                                    '',
                                    [
                                      {
                                        text: 'Cancel',
                                        onPress: () => console.log('Cancel Pressed'),
                                        style: 'cancel',
                                      },
                                      {
                                        text: 'Yes',
                                        onPress: () => {
                                          RNSettings.openSetting(
                                            RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                                          ).then(result => {
                                            if (result === RNSettings.ENABLED) {
                                              console.log('location is enabled');
                                              navigation.navigate('splash');
                                            }
                                          });
                                        },
                                      },
                                    ],
                                  );
                                  console.log('location permission denied');
                                }
                              },
                              { enableHighAccuracy: false, timeout: 50000 },
                            )
                            .catch(error => console.log(error,'-----error ---------'));
                        },
                        error => {
                          if (error.message === 'No location provider available.') {
                            Alert.alert(
                              '"Location permission denied So please Accept that"',
                              '',
                              [
                                {
                                  text: 'Cancel',
                                  onPress: () => console.log('Cancel Pressed'),
                                  style: 'cancel',
                                },
                                {
                                  text: 'Yes',
                                  onPress: () => {
                                    RNSettings.openSetting(
                                      RNSettings.ACTION_LOCATION_SOURCE_SETTINGS,
                                    ).then(result => {
                                      if (result === RNSettings.ENABLED) {
                                        console.log('location is enabled');
                                        navigation.navigate('splash');
                                      }
                                    });
                                  },
                                },
                              ],
                            );
                            console.log('location permission denied');
                          }
                        },
                        { enableHighAccuracy: false, timeout: 50000 },
                        // {enableHighAccuracy: true, timeout: 15000, maximumAge: 10000}
                      );
                    }}>
                      
                    <Octicons name={'location'} size={22} color="#17bba9" />
                  </TouchableOpacity>
                </View>
              </View>

              {/* range */}
              <View
                style={{
                  justifyContent: 'center',
                  alignItems: 'center',
                  borderRadius: 10,
                  backgroundColor: 'white',
                  marginTop: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    borderRadius: 10,
                    backgroundColor: 'white',
                    width: widthPercentageToDP(90),
                    height: heightPercentageToDP(7),
                    paddingLeft: 20,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#17bba9',
                      width: 30,
                      height: 30,
                      borderRadius: 40,
                      justifyContent: 'center',
                      alignItems: 'center',
                    }}>
                    {/* <MaterialCommunityIcons
                    name={'phone-outline'}
                    size={18}
                    color="white"
                  /> */}
                    <Image style={styles.userAvatar1} source={UserAvatar1} />
                  </View>
                  <TextInput
                    placeholder={'Range'}
                    keyboardType={'phone-pad'}
                    placeholderTextColor={'grey'}
                    style={{
                      marginLeft: 20,
                      fontSize: 16,
                      color: 'black',
                      padding: 0,
                    }}
                    onChangeText={e => setRange(e)}
                    value={range}
                  />
                </View>
              </View>
            </View>
        
            {/* save button code */}
            <TouchableOpacity
              onPress={() => {
                setLoading(true);
                savaRecord();
              }}
              style={{
                marginTop: 20,
                marginLeft: widthPercentageToDP(4.96),
                justifyContent: 'center',
                alignItems: 'center',
                width: '90%',
                height: 40,
                backgroundColor: '#17bba9',
                padding: 5,
                borderRadius: 10,
              }}
              disabled={disable1}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={{ color: 'white', fontSize: 18 }}>Save</Text>
              )}
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};