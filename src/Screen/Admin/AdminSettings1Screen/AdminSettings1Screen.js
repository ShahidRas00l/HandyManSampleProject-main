import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Electrician from '../../../Assets/Images/electrician.jpeg';
import Carpenter from '../../../Assets/Images/carpenter.jpeg';
import BabySitter from '../../../Assets/Images/babysitter.jpeg';
import Plumber from '../../../Assets/Images/plumber.jpeg';

import { Picker } from '@react-native-picker/picker';
import {
  ActivityIndicator,
  Alert,
  Image,
  PermissionsAndroid,
  RefreshControl,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import {
  launchCamera as LaunchImageCamera,
  launchImageLibrary as LaunchImageLibrary,
} from 'react-native-image-picker';
import {
  heightPercentageToDP,
  widthPercentageToDP,
} from 'react-native-responsive-screen';

import Ionicons from 'react-native-vector-icons/Ionicons';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import UserAvatar from '../../../Assets/Images/DummyImage.jpeg';
import UserAvatar1 from '../../../Assets/Images/locationSetting.png';
import { styles } from './settings1.styles';
import ImagePicker from 'react-native-image-crop-picker';
import AsyncStorage from '@react-native-async-storage/async-storage';
import IP from '../../../Services/IP';
import axios from 'axios';



export const AdminSettings1Screen = ({ navigation,route }) => {
  console.log(route?.params,'---------route.params----')
  const [fImage, setfImage] = useState(route?.params?.item?.CertificateImage?true:false);
  const [sImage, setsImage] = useState(route?.params?.item?.SkillImage?true:false);
  const [firstImage, setFirstImage] = useState(route?.params?.item?.CertificateImage);
  const [secondImage, setSecondImage] = useState(route?.params?.item?.SkillImage);

  const [selectedValue, setSelectedValue] = useState(route?.params?.item?.ServiceName);
  const [getUserName, setUserName] = useState(route?.params?.users?.Name);
  const [getEmail, setEmail] = useState(route?.params?.users?.Email);
  const [getPhoneNumber, setPhoneNumber] = useState(route?.params?.users?.PhoneNum);
  const [address, setAddress] = useState(route?.params?.users?.Address);
  const [range, setRange] = useState(route?.params?.users?.Range);



  const [getImg, setImg] = useState(route?.params?.users?.UserImage);

  
  const [flag1, setflag1] = useState(route?.params?.users?.UserImage?true:false);

  const [subServices, setSubServices] = useState(route?.params?.item?.ServicesSubType);
  const [services, setServices] = useState(route?.params?.item?.ServiceName);
  const [selectedValue1, setSelectedValue1] = useState(route?.params?.item?.ServicesSubType);


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
                {getUserName} Profile
              </Text>
            </View>
            {/* logout */}
            <TouchableOpacity style={{ paddingRight: 20 }}
              >
              <Text
                style={{
                  color: 'white',
                  fontSize: 22,
                  fontWeight: 'bold',
                  color: 'white',
                }}>
                   {'   '}
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
                  flag1 ? { uri: getImg ? `data:image/jpeg;base64,${getImg}`:null } : UserAvatar
                }
              // source={UserAvatar}
              />
              <TouchableOpacity>
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
                    editable={false} selectTextOnFocus={false}
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
                    editable={false} selectTextOnFocus={false}
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
                    editable={false} selectTextOnFocus={false}
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
                    placeholder={'Address'}
                    placeholderTextColor={'grey'}
                    editable={false} selectTextOnFocus={false}
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
                    editable={false} selectTextOnFocus={false}
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
                }}
                >
                <Picker.Item
                  label={services}
                  value="0"
                  style={{ fontSize: 13, fontWeight: 'bold' }}
                />
              

              </Picker>
            </View>
            {/* Sub Services  */}
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
                  selectedValue={selectedValue1}
                  dropdownIconColor={'black'}
                  style={{ color: 'black' }}
                  onValueChange={(itemValue, itemIndex) => {
                    setSelectedValue1(itemValue);
                  }}>
                  <Picker.Item
                    label={subServices}
                    value="0"
                    style={{ fontSize: 13, fontWeight: 'bold' }}
                  />
                </Picker>
              </View>
        
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
                        uri:`data:image/jpeg;base64,${firstImage}`
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
                <TouchableOpacity onPress={() =>  uploadImage1()}>
                  {sImage ? (
                   
                    <Image
                      style={{ width: 175, height: 300 }}
                      source={{
                        uri:`data:image/jpeg;base64,${secondImage}` ,
                        
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


         
          </ScrollView>
        </View>
      </ScrollView>

    </SafeAreaView>
  );
};






