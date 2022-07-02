import AsyncStorage from '@react-native-async-storage/async-storage';
import Geolocation from '@react-native-community/geolocation';

// import {useIsFocused} from '@react-navigation/native';
import moment from 'moment';
import React, { useEffect, useState } from 'react';
import {
  Alert,
  Image,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import MapView, { Callout, Marker, PROVIDER_GOOGLE } from 'react-native-maps';
import Modal from 'react-native-modal';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';
import RNSettings from 'react-native-settings';
import Entypo from 'react-native-vector-icons/Entypo';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import UserAvatar from '../../assets/images/DummyImage.jpeg';
import UserAvatar from '../../../Assets/Images/babysitter.jpeg';

import axios from 'axios';
import IP from '../../../Services/IP';



const LATITUDE_DELTA = 0.009;
const LONGITUDE_DELTA = 0.009;



export default function AdminLocationDashBoard({ navigation }) {
  Geocoder.init('AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M', { language: 'en' });
  // Geocoder.init('AIzaSyAjZ_9fmyelwEt1tzv9cKzfW5WMrYVi1Xw', { language: 'en' }); //ya pehly wali thi
  var [latitudec1, setlatitudec1] = useState(0);
  var [longitudec1, setlongitudec1] = useState(0);
  var [currLatitudec1, setCurrLatitudec1] = useState(0);
  var [currLongitudec1, setCurrLongitudec1] = useState(0);
  var [multiple, setMultiple] = useState([]);
  const [getImg, setImg] = useState('');
  const [flag, setflag] = useState(false);

  const [show, setshow] = useState(false);
  const [show1, setshow1] = useState(false);
  const [ind, setInd] = useState('');
  const [refreshing, setRefreshing] = React.useState(false);

  const [fromAddress, setFromAddress] = useState('');
  const [toAddress, setToAddress] = useState('');
  const [users, setUsers] = useState([]);



  useEffect(() => {
    getAllUserData();

  }, []);


  //  get user detail
  const getAllUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('uName');
      const baseUrl = `${IP}getAllUser`;
      axios.get(baseUrl).then((response) => {

        console.log(response?.data, "----- user response ------",);
        // console.log("response =>",response.data?.Type );
        if (response.status === 200) {
          setUsers(response.data)


        } else {
          throw new Error("An error has occurred");
        }
      });
    } catch (error) {
      console.log("error", error)
    }
  };


  // const [locationPermissionGranted,setLocationPermissionGranted]=useState(false);

  var diff_hour = 0;
  var sampleColorIndex = [];

  const wait = timeout => {
    return new Promise(resolve => setTimeout(resolve, timeout));
  };
  const onRefresh = React.useCallback(() => {
    setRefreshing(true);
    getImageRefFireBase();

   

    Geolocation.getCurrentPosition(
      info => {
        setlatitudec1(info.coords.latitude);
        setlongitudec1(info.coords.longitude);
        setCurrLatitudec1(info.coords.latitude);
        setCurrLongitudec1(info.coords.longitude);
        getAddress(info);
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
    );

  
    wait(3000).then(() => setRefreshing(false));
  }, []);


  // for ChangeColorAccordingToMarkerFun in local arry
  const ChangeColorAccordingToMarkerFun = async index => {
    sampleColorIndex.push(index);
  };
  // getImagefrom Firebase
  const getImageRefFireBase = async () => {
  };

  // for logout all data clear in asyncstorage
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
            setshow(false);
            setshow1(false);
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



  useEffect(() => {
    (async () => {
      setTimeout(() => {
          Geolocation.getCurrentPosition(
            info => {
              setlatitudec1(info.coords.latitude);
              setlongitudec1(info.coords.longitude);
              setCurrLatitudec1(info.coords.latitude);
              setCurrLongitudec1(info.coords.longitude);
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
          );
        
      }, 5000);
    })();
  }, []);
  // make a obj and add latitudeDelta and LongitudeDelta
  const getMapRegion1 = () => ({
    latitude: latitudec1,
    longitude: longitudec1,
    latitudeDelta: LATITUDE_DELTA,
    longitudeDelta: LONGITUDE_DELTA,
  });
  const setUserLocation = async coordinate => {
    //alert("User location changed MAP SHOULDNT MOVE")
    setlatitudec1(coordinate.latitude);
    setlongitudec1(coordinate.longitude);
    setCurrLatitudec1(coordinate.latitude);
    setCurrLongitudec1(coordinate.longitude);
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <ScrollView
        contentContainerStyle={{ flex: 1 }}
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }>
        <View
          style={{
            flex: 1,
            padding: 10,
            paddingTop: 10,
            backgroundColor: '#ecf0f1',
          }}>
          <MapView
            // style={{flex: 1,}}
            onUserLocationChange={locationChangedResult => {
              setUserLocation(locationChangedResult.nativeEvent.coordinate);
            }}
            style={styles.map}
            provider={PROVIDER_GOOGLE}
            userLocationPriority={'high'}
            region={getMapRegion1()}
          // key={}
          >
            {/* show multiple marker */}
            
                  return  (
                    <Marker
                      pinColor={diff_hour > 1 ? 'yellow' : 'red'}
                      coordinate={{
                        latitude: e.latitude,
                        longitude: e.longitude,
                        latitudeDelta: LATITUDE_DELTA,
                        longitudeDelta: LONGITUDE_DELTA,
                      }}
                      key={index}
                      onPress={() => {
                        setshow1(!show1);
                        setInd(index);
                        setlatitudec1(e.latitude);
                        setlongitudec1(e.longitude);
                      }}
                    />
                  ) 
              
             
            <Marker
              coordinate={{
                latitude: currLatitudec1,
                longitude: currLongitudec1,
                latitudeDelta: LATITUDE_DELTA,
                longitudeDelta: LONGITUDE_DELTA,
              }}
            // title="My Current Location"
            // description="oh this is me"
            >
              <FontAwesome name="male" size={40} color="green" />

              <Callout tooltip={true} alphaHitTest={true}>
                {/* <View
                  style={{
                    alignSelf: 'center',
                    backgroundColor: '#FFFF',
                    borderRadius: 10,
                    width: widthPercentageToDP(40),
                    height: heightPercentageToDP(22),
                    marginTop: 130,
                    marginLeft: 100,
                  }}>
                  <View
                    style={{
                      backgroundColor: '#ff0000',
                      borderRadius: 10,
                      width: widthPercentageToDP(40),
                      height: heightPercentageToDP(4),
                      justifyContent: 'center',
                      alignItems: 'flex-end',
                      paddingRight: 10,
                      // marginBottom:10
                    }}>
                    <Text
                      style={{
                        fontSize: 12,
                        // fontWeight: 'bold',
                        color: 'white',
                      }}>
                      My Current Location
                    </Text>
                  </View>
                  <View style={{padding: 5, paddingTop: 15}}>
                    <Text
                      style={{fontSize: 16, color: 'black'}}
                      numberOfLines={3}>
                      oh this is me
                    </Text>
                  </View>
                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'space-between',
                    }}></View>
                </View> */}


                <View
                  style={{
                    alignSelf: 'center',
                    backgroundColor: '#FFFF',
                    borderRadius: 10,
                    // width: widthPercentageToDP("50%"),
                    // height: heightPercentageToDP("90%"),
                    width: widthPercentageToDP(40),
                    height: heightPercentageToDP(22),
                    marginTop: heightPercentageToDP(19),
                    marginLeft: widthPercentageToDP(25),
                  }}>
                  {/*time wala  */}
                  <View
                    style={{
                      backgroundColor:
                        sampleColorIndex.filter(val => val === ind).length != 0
                          ? 'yellow'
                          : '#ff0000',
                      // backgroundColor: '#ff0000',
                      borderRadius: 10,
                      width: widthPercentageToDP("50%"),
                      height: heightPercentageToDP(4),
                      justifyContent: 'space-between',
                      alignItems: 'center',
                      paddingHorizontal: 20,
                      flexDirection: 'row'
                    }}>
                    <Text
                      style={{
                        fontSize: 17,
                        // fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {/* {moment(multiple[ind].realDateTime).fromNow()} */}
                      Ali
                    </Text>
                    <Text
                      style={{
                        fontSize: 12,
                        // fontWeight: 'bold',
                        color: 'black',
                      }}>
                      {/* {moment(multiple[ind].realDateTime).fromNow()} */}
                      10:00 Am
                    </Text>
                  </View>
                  {/* body content */}
                  <View>
                    <Text
                      style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}
                      numberOfLines={3}>
                      {/* Robber are typing to loot visitor at National park. */}
                      Pipefitting Services
                      {'...'}
                    </Text>
                    <TouchableOpacity
                      //   onPress={() => navigation.navigate('Trendings')}
                      style={{
                        padding: 5
                      }}>

                      <View
                        style={{
                          padding: 10,
                          alignItems: 'center',
                          justifyContent: 'center', alignItems: 'center',
                        }}>
                        <View
                          style={{
                            width: 100,
                            height: 40,
                            borderRadius: 5,
                            backgroundColor: '#ff0000',
                            marginBottom: 10,
                            flexDirection: 'row',
                            justifyContent: 'center',
                            alignSelf: 'center',
                            alignItems: 'center',
                          }}>
                          {/* <Entypo name="arrow-down" size={20} color="white" /> */}
                          <Text style={{ color: 'white', fontSize: 18 }}>
                            Order Place
                          </Text>
                        </View>
                    
                      </View>

                    </TouchableOpacity>

                  </View>

                </View>
              </Callout>
            </Marker>
          </MapView>
          {show1 && (
            <Modal
              isVisible={show1}
              onBackdropPress={() => {
                setshow1(false);
              }}
              transparent={true}
              visible={show1}
              onRequestClose={() => {
                // alert('Modal has been closed.');
                setshow1(false);
              }}>
              <View
                style={{
                  alignSelf: 'center',
                  backgroundColor: '#FFFF',
                  borderRadius: 10,
                  width: widthPercentageToDP("50%"),
                  height: heightPercentageToDP("90%"),
                  // width: widthPercentageToDP(40),
                  // height: heightPercentageToDP(22),
                  marginTop: heightPercentageToDP(19),
                  marginLeft: widthPercentageToDP(25),
                }}>
                {/*time wala  */}
                <View
                  style={{
                    backgroundColor:
                      sampleColorIndex.filter(val => val === ind).length != 0
                        ? 'yellow'
                        : '#ff0000',
                    // backgroundColor: '#ff0000',
                    borderRadius: 10,
                    width: widthPercentageToDP("50%"),
                    height: heightPercentageToDP(4),
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    paddingHorizontal: 20,
                    flexDirection: 'row'
                  }}>
                  <Text
                    style={{
                      fontSize: 17,
                      // fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {/* {moment(multiple[ind].realDateTime).fromNow()} */}
                    Ali
                  </Text>
                  <Text
                    style={{
                      fontSize: 12,
                      // fontWeight: 'bold',
                      color: 'black',
                    }}>
                    {/* {moment(multiple[ind].realDateTime).fromNow()} */}
                    10:00 Am
                  </Text>
                </View>
                {/* body content */}
                <View>
                  <TouchableOpacity
                    //   onPress={() => navigation.navigate('Trendings')}
                    style={{
                      padding: 5
                    }}>
                    <Text
                      style={{ fontSize: 15, color: 'black', fontWeight: 'bold' }}
                      numberOfLines={3}>
                      {/* Robber are typing to loot visitor at National park. */}
                      Plumber Services
                      {'...'}
                    </Text>
                    <Text
                      style={{ fontSize: 15, color: 'black' }}
                      numberOfLines={3}>
                      {/* Robber are typing to loot visitor at National park. */}
                      I have five year experience in this field
                    </Text>
                  </TouchableOpacity>

                  <TextInput
                    placeholder={'From'}
                    keyboardType={'email-address'}
                    placeholderTextColor="grey"
                    style={{ marginLeft: 20, fontSize: 16, color: 'black' }}
                    onChangeText={e => setFromAddress(e)}
                  />

                  <TextInput
                    placeholder={'To'}
                    keyboardType={'email-address'}
                    placeholderTextColor="grey"
                    style={{ marginLeft: 20, fontSize: 16, color: 'black' }}
                    onChangeText={e => setToAddress(e)}
                  />

                  <View
                    style={{
                      padding: 10,
                      alignItems: 'center',
                      justifyContent: 'center', alignItems: 'center',
                    }}>
                    <View
                      style={{
                        width: 100,
                        height: 40,
                        borderRadius: 5,
                        backgroundColor: '#ff0000',
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        alignItems: 'center',
                      }}>
                      {/* <Entypo name="arrow-down" size={20} color="white" /> */}
                      <Text style={{ color: 'white', fontSize: 18 }}>
                        Order Place
                      </Text>
                    </View>
                    {/* <View
                      style={{
                        width: 60,
                        height: 30,
                        backgroundColor: '#50ff1d',
                        marginBottom: 10,
                        flexDirection: 'row',
                        justifyContent: 'center',
                        alignItems: 'center',
                        borderRadius: 5,
                      }}>
                      <Entypo name="arrow-up" size={20} color="white" />
                      <Text style={{color: 'white', fontSize: 18}}>
                        {multiple[ind].upVote}
                      </Text>
                    </View> */}
                  </View>
                </View>






              </View>
            </Modal>
          )}
        </View>
      </ScrollView>
      <View
        style={{
          position: 'absolute',
          marginTop: Platform.OS === 'ios' ? 40 : 20,
          flexDirection: 'row',
          padding: 20,
          width: widthPercentageToDP(100),
          height: heightPercentageToDP(20),
          alignItems: 'center',
        }}>
        <TouchableOpacity
          // onPress={() => navigation.navigate('info1')}
          style={{
            width: 50,
            height: 50,
          }}>
          <Image
            source={require("../../../Assets/Images/handyman.jpg")}
            style={{
              width: 50,
              height: 50,
            }}
          />
        </TouchableOpacity>

        <GooglePlacesAutocomplete
          placeholder="Search"
          onPress={(data, details = null) => {
            Geocoder.from(data.description)
              .then(json => {
                console.log(location.lat, "location.lat", location.lng, "location.lng")
                var location = json.results[0].geometry.location;
                setlatitudec1(location.lat);
                setlongitudec1(location.lng);
              })
              .catch(error => console.warn(error));
          }}
          query={{
            key: 'AIzaSyDmzf1knXZJMScgw25cZnwOXcN_TmLSLLM',
            // key: 'AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M',
            // key: 'YOUR API KEY',
            language: 'en',
          }}
          styles={{
            row: {
              backgroundColor: '#17bba9',
            },
            textInput: {
              // height: 220,
              // color: '#5d5d5d',
              color: 'black',
              fontSize: 16,
              backgroundColor: 'white',
              width: widthPercentageToDP(60),
              height: 40,
              borderRadius: 5,
              alignItems: 'center',
              justifyContent: 'center',
              // backgroundColor:'red',
              // flex:1
            },
            predefinedPlacesDescription: {
              color: '#1faadb',
            },
          }}
        />
        <TouchableOpacity
          onPress={() => setshow(!show)}
          style={{
            backgroundColor: 'white',
            width: 40,
            height: 40,
            marginLeft: 5,
          }}>
          <Image
            source={flag ? { uri: getImg } : UserAvatar}
            // source={require('./Rectangle.png')}
            style={{
              width: 40,
              height: 40,
            }}
          />
        </TouchableOpacity>
      </View>
      {/* pop up show when profile picture click and 2 item show setting and logout */}
      {/* when again press then off popup */}
      {show ? (
        <View
          style={{
            position: 'absolute',
            marginTop: Platform.OS === 'ios' ? 80 : 40,

            padding: 80,
            marginLeft: 200,

            width: widthPercentageToDP(50),
            height: heightPercentageToDP(40),
            alignItems: 'center',
          }}>
          <View
            style={{
              backgroundColor: 'white',
              elevation: 5,
              shadowColor: '#707070',
              justifyContent: 'space-between',
              width: widthPercentageToDP(25),
              height: heightPercentageToDP(10),
              paddingHorizontal: 10,
              borderRadius: 10,
            }}>
            <TouchableOpacity
              onPress={() => navigation.navigate('SettingsScreen')}>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 5,
                  paddingTop: 4,
                  color: '#17bba9',
                }}>
                Settings
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => clearAllAsyncStorage()}>
              <Text
                style={{
                  fontSize: 16,
                  marginTop: 5,
                  paddingBottom: 4,
                  color: '#17bba9',
                }}>
                Logout
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : null}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  map: {
    ...StyleSheet.absoluteFillObject,
  },
});