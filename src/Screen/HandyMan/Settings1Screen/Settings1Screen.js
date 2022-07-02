
import Geolocation1 from '@react-native-community/geolocation';
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';

import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import RNSettings from 'react-native-settings';
import Octicons from 'react-native-vector-icons/Octicons';

import { Picker } from '@react-native-picker/picker';
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
import { styles } from './settings1.styles';



export const Settings1Screen = ({ navigation }) => {
  Geocoder.init('AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M', { language: 'en' });
  const [fImage, setfImage] = useState(false);
  const [sImage, setsImage] = useState(false);
  const [firstImage, setFirstImage] = useState('');
  const [secondImage, setSecondImage] = useState('');

  const [selectedValue, setSelectedValue] = useState();
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

  const [subServices, setSubServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [services, setServices] = useState([]);
  const [selectedValue1, setSelectedValue1] = useState();

  var [latitudec, setlatitudec] = useState(0);
  var [longitudec, setlongitudec] = useState(0);



  useEffect(() => {
    getUserData();
  }, []);

  useEffect(() => {
    fetchServices();
  }, []);



  useEffect(() => {
    const result = services.find((val) => val.ServiceName === selectedValue);
    if (result) {
      fetchSubServices(result.Id);
    }
    else {
      setSubServices([])
    }

  }, [selectedValue]);

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

  //  useEffect(() => {
  //   if(services){
  //    fetchSubServices(id);
  //   }
  //  }, [services]);

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

  const fetchServices = async () => {
    try {
      console.log("FetchServices")
      const baseUrl = `${IP}fetchServices`;
      console.log(baseUrl)
      axios.get(baseUrl).then((response) => {

        // console.log(response,"--------response services ------- ");
        if (response.status === 200) {
          setServices(response.data)
          // alert(` You have created: ${JSON.stringify(response.data)}`);

        } else {
          throw new Error("An error has occurred");
        }
      });

    } catch (error) {
      console.log("error", error)
    }
  };

  const fetchSubServices = async (id) => {
    try {
      console.log("FetchsubServices")
      const baseUrl = `${IP}fetchSubServices?id=${id}`;
      console.log(baseUrl)
      axios.get(baseUrl).then((response) => {

        // console.log(response);
        if (response.status === 200) {
          setSubServices(response.data)
          // alert(` You have created: ${JSON.stringify(response.data)}`);

        } else {
          throw new Error("An error has occurred");
        }
      });

    } catch (error) {
      console.log("error", error)
    }
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

        // console.log("response enter ", response)


        // alert(` You have created: ${JSON.stringify(response.data)}`);

        const baseUrl = `${IP}handymanProfile`;
        try {
          // console.log(getUserName,checked,getPassword,getPhoneNumber,getEmail)
          const response = await axios.post(baseUrl, {
            UserId: Number(userId),
            ServiceId: Number(services.find((val) => val.ServiceName === selectedValue).Id),
            SubServicesId: Number(subServices.find((val) => val.SubServicesName === selectedValue1).Id),
            ServiceName: selectedValue,
            ServiceImage: (services.find((val) => val.ServiceName === selectedValue).ServiceImage),
            SkillName: '',
            SkillImage: secondImage,
            Certificate: '',
            CertificateImage: firstImage,
            ServicesSubType: selectedValue1,
            ServicesSubTypeImage: subServices.find((val) => val.SubServicesName === selectedValue1).SubServicesImage,
            Approved: false,
            ExtraStatus: ''

          });
          console.log("response start ", response)
          // console.log("response",response)
          if (response?.status === 200) {

            console.log("response enter ", response)

            // alert(` You have created: ${JSON.stringify(response.data)}`);
            setLoading(false);
            console.log('Save successfully');



          } else {
            console.log(error, '--error from handyman --------')
            throw new Error("An error has occurred");
          }
        } catch (error) {
          console.log(error.response.data, '--error from handyman --------')
          alert("An error has occurred");
          setLoading(false);
        }



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
  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setFirstImage(image.data);
      setfImage(true)
      // console.log(image);
    });
  }

  const uploadImage1 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setSecondImage(image.data);
      setsImage(true)
      // console.log(image);
    });
  }

  // for show services lis
  const renderServicesList = () => {
    // console.log(selectedValue,"-----------selectedVal--------")
    // console.log(services[0].ServiceName,"-----------services--------")
    return services.map((service, index) => {
      return <Picker.Item label={service.ServiceName} value={service.ServiceName} key={index} />
    })

  }
  const renderSubServicesList = () => {
    return subServices.map((subService, index) => {
      // console.log(subService.SubServicesName, "--------subService.SubServiceName----------")
      return <Picker.Item label={subService.SubServicesName} value={subService.SubServicesName} key={index} />
    })
  }

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView
        showsVerticalScrollIndicator={false}

        style={styles.container}>
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
                Profile1
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
          <ScrollView
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{
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
                  <GooglePlacesAutocomplete
                    placeholder={'search Address here'}
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

                  <TouchableOpacity
                    onPress={() => {
                      Geolocation1.getCurrentPosition(
                        position => {
                          console.log('get current Location');

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
                            .catch(error => console.warn(error));
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
            {/* Services Text*/}
            <View
              style={{
                paddingVertical: heightPercentageToDP(1),
                justifyContent: 'center',
                alignItems: 'center',
              }}>
              <Text style={{ fontSize: 25, fontWeight: 'bold', color: 'black' }}>
                Services
              </Text>
            </View>
            {/* Services  */}
            {/* DropDownList or picker in this View */}
            <View style={{

              marginHorizontal: widthPercentageToDP(4.96),
              marginTop: 10,
              borderRadius: 10,
              backgroundColor: 'white',
              shadowColor: "#000",
              shadowOffset: {
                width: 0,
                height: 2,
              }
            }}>
              <Picker
                selectedValue={selectedValue}
                dropdownIconColor={'black'}
                style={{ color: 'black' }}
                onValueChange={(itemValue, itemIndex) => {
                  setSelectedValue(itemValue);
                }}>
                <Picker.Item
                  label="Select of Services"
                  value="0"
                  style={{ fontSize: 13, fontWeight: 'bold' }}
                />
                {renderServicesList()}

                <Picker.Item
                  label="Other"
                  value="Other"
                  style={{ fontSize: 13, fontWeight: 'bold' }}
                />

                {/* <Picker.Item
            label="Plumber"
            value="Plumber"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Carpenter"
            value="Carpenter"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="Electrician"
            value="Electrician"
            style={{fontSize: 13, fontWeight: 'bold'}}
          />
          <Picker.Item
            label="BabySitter"
            value="BabySitter"
            style={{fontSize: 13, fontWeight: 'bold'}}
          /> */}



              </Picker>
            </View>
            {/* Sub Services  */}
            {/* DropDownList or picker in this View */}

            {subServices && selectedValue ?
              // {subServices?.length>0 && selectedValue ?
              <View style={{

                marginHorizontal: widthPercentageToDP(4.96),
                marginTop: 10,
                borderRadius: 10,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                }
              }}>
                <Picker
                  selectedValue={selectedValue1}
                  dropdownIconColor={'black'}
                  style={{ color: 'black' }}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue1(itemValue);
                  }}>
                  <Picker.Item
                    label="Select of Sub Services"
                    value="0"
                    style={{ fontSize: 13, fontWeight: 'bold' }}
                  />
                  {renderSubServicesList()}

                  <Picker.Item
                    label="Other"
                    value="Other"
                    style={{ fontSize: 13, fontWeight: 'bold' }}
                  />

                  {/* <Picker.Item
   label="Plumber"
   value="Plumber"
   style={{fontSize: 13, fontWeight: 'bold'}}
 />
 <Picker.Item
   label="Carpenter"
   value="Carpenter"
   style={{fontSize: 13, fontWeight: 'bold'}}
 />
 <Picker.Item
   label="Electrician"
   value="Electrician"
   style={{fontSize: 13, fontWeight: 'bold'}}
 />
 <Picker.Item
   label="BabySitter"
   value="BabySitter"
   style={{fontSize: 13, fontWeight: 'bold'}}
 /> */}



                </Picker>
              </View>
              :
              null
            }
            {/* if user select other service  then  show */}

            {selectedValue === 'Other' ? (
              <View style={{
                marginHorizontal: widthPercentageToDP(4.96),
                marginVertical: 15,
                borderRadius: 10,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                }
              }}>
                <View style={{}}>
                  <TouchableOpacity
                    onPress={() => {
                      navigation.navigate('AddHandymanOtherServices',)
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
                  >

                    <Text style={{ color: 'white', fontSize: 18 }}>Add Handyman Other Services</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {/* if user select other sub service  then  show */}

            {selectedValue1 === 'Other' ? (
              <View style={{
                marginHorizontal: widthPercentageToDP(4.96),
                marginVertical: 15,
                borderRadius: 10,
                backgroundColor: 'white',
                shadowColor: "#000",
                shadowOffset: {
                  width: 0,
                  height: 2,
                }
              }}>
                {/* {console.log(services.find((val) => val.ServiceName === selectedValue).Id)} */}
                <View style={{}}>
                  <TouchableOpacity
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
                    onPress={() => navigation.navigate('AddHandymanOtherSubServices', { Id: (services.find((val) => val.ServiceName === selectedValue).Id) })}

                  >
                    <Text style={{
                      color: 'white', fontSize: 18
                    }}> Add Handyman Other sub Services</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {/* select Images */}
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                height: '25%',
                alignItems: 'center',
              }}>
              <View
                style={{
                  width: 170,
                  height: 300,
                  borderWidth: 1,
                  marginTop: 20,
                  marginLeft: 10,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => uploadImage()}>
                  {fImage ? (
                    <Image
                      style={{ width: 170, height: 300 }}
                      source={{
                        uri: `data:image/jpeg;base64,${firstImage}`
                        // uri: firstImage,
                        // uri: cameraImages.length>0&&cameraImages[0]?.path
                      }}
                    />
                  ) : (
                    <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>
                      Certificate Image
                    </Text>
                  )}
                </TouchableOpacity>
              </View>
              <View
                style={{
                  width: 175,
                  height: 300,
                  borderWidth: 1,
                  marginTop: 20,
                  marginRight: 3,
                  justifyContent: 'center',
                }}>
                <TouchableOpacity onPress={() => uploadImage1()}>
                  {sImage ? (

                    <Image
                      style={{ width: 175, height: 300 }}
                      source={{
                        uri: `data:image/jpeg;base64,${secondImage}`,

                      }}

                    />
                  ) : (
                    <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 22, fontWeight: 'bold' }}>
                      Skill Image
                    </Text>
                  )}
                </TouchableOpacity>
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
          </ScrollView>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};






