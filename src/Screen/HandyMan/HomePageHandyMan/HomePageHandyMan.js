import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList,
  TextInput,
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Services from '../../../Assets/Images/servicesbackground.png';

import Electrician from '../../../Assets/Images/electrician.jpeg';
import Carpenter from '../../../Assets/Images/carpenter.jpeg';
import BabySitter from '../../../Assets/Images/babysitter.jpeg';
import Plumber from '../../../Assets/Images/plumber.jpeg';
import { styles } from './HomePageHandyMan.styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import axios from 'axios';
import IP from '../../../Services/IP';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';



export const HomePageHandyMan = ({ navigation }) => {
  const [loading, setLoading] = useState(false);

  const [myServicesFlag, setMyServicesFlag] = useState(true);
  const [requestFlag, setRequestFlag] = useState(false);
  const [inProgressFlag, setInProgressFlag] = useState(false);
  const [historyFlag, setHistoryFlag] = useState(false);

  const [services, setServices] = useState("");
  const [subServices, setSubServices] = useState("");
  const [handymans, setHandyMans] = useState([]);
  const [handyman, setHandyMan] = useState([]);
  const [user, setUser] = useState([]);



  // useEffect(() => {
  //   getAllDataHandyMan();
  // }, []);

  useEffect(() => {
    if (user?.Uid)
      getDataHandyMan(user?.Uid);
  }, [user]);

  useEffect(() => {
    getUserData();

  }, []);

  useEffect(() => {
    if (handyman?.SubServicesId && handyman?.ServiceId)
      fetchSubServices(handyman?.SubServicesId, handyman?.ServiceId);
  }, [handyman]);

  // useEffect(() => {
  //   fetchServices();
  // }, []);


  //  get user detail
  const getUserData = async () => {
    try {
      const email = await AsyncStorage.getItem('uName');
      const baseUrl = `${IP}getUser?Email=${email}`;
      axios.get(baseUrl).then((response) => {

        console.log(response?.data, "----- user response ------",);
        // console.log("response =>",response.data?.Type );
        if (response.status === 200) {
          setUser(response.data)


        } else {
          throw new Error("An error has occurred");
        }
      });
      setLoading(false);
    } catch (error) {
      console.log("error", error)
    }
  };

  const getDataHandyMan = async (id) => {

    try {
      console.log("FetchHandyMan")
      const baseUrl = `${IP}handymanProfile?id=${id}`;
      console.log(baseUrl)
      axios.get(baseUrl).then((response) => {

        console.log(response, "--------response handyman ------- ");
        if (response.status === 200) {
          setHandyMan(response.data)
          // alert(` You have created: ${JSON.stringify(response.data)}`);

        } else {
          throw new Error("An error has occurred");
        }
      });

    } catch (error) {
      console.log("error", error)
    }


  };

  const fetchSubServices = async (subid, serid) => {
    try {
      console.log("FetchsubServices")
      const baseUrl = `${IP}fetchSubServices?id=${subid}&serid=${serid}`;
      console.log(baseUrl)
      axios.get(baseUrl).then((response) => {

        console.log(response);
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


  const fetchServices = async () => {
    try {
      console.log("FetchServices")
      const baseUrl = `${IP}fetchServices`;
      console.log(baseUrl)
      axios.get(baseUrl).then((response) => {

        // console.log(response);
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






  const getAllDataHandyMan = async () => {

    try {
      console.log("FetchAllHandyMan")
      const baseUrl = `${IP}handymanProfile`;
      console.log(baseUrl)
      axios.get(baseUrl).then((response) => {

        // console.log(response,"--------response services ------- ");
        if (response.status === 200) {
          setHandyMans(response.data)
          // alert(` You have created: ${JSON.stringify(response.data)}`);

        } else {
          throw new Error("An error has occurred");
        }
      });

    } catch (error) {
      console.log("error", error)
    }


  };



  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground source={first} resizeMode="cover" style={{ width: wp('100%'), height: hp('56.40%') }} > */}
      <View>
        {/* header */}
        <View
          style={{
            backgroundColor: '#17bba9',
            width: wp(100),
            height: hp(6.29),
            flexDirection: 'row',
            // justifyContent: 'center',
            justifyContent: 'space-between',
            alignItems: 'center',
            marginBottom: '5%',
          }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ paddingLeft: wp('4.96') }}>
            <AntDesign name="arrowleft" size={25} color="white" />
          </TouchableOpacity>

          <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
            HandyMan Panel
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('Settings1Screen')}
            style={{ paddingRight: wp('4%'), flexDirection: 'row' }}>
            <Ionicons name="md-person-sharp" size={25} color="blue" />
            <Text
              style={{
                color: 'blue',
                fontSize: 22,
                fontWeight: 'bold',
                paddingLeft: wp(1),
              }}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
        {/* tab bar */}
        <ScrollView contentContainerStyle={{ marginHorizontal: wp('5%'), marginBottom: hp('3%'), }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
        >

          <TouchableOpacity
            onPress={() => { setMyServicesFlag(true); setRequestFlag(false); setHistoryFlag(false); setInProgressFlag(false) }}
            style={{
              marginTop: 20,
              borderRadius: 10,
              width: wp('30%'),
              height: hp('6%'),
              backgroundColor: myServicesFlag ? '#17bba9' : '#8BDDD3',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 18,
              elevation: 10,
              shadowOpacity: 1,
              shadowOffset: 1,
              shadowColor: 'black',
              flexDirection: 'row',
            }}
          >

            <Text style={{ color: '#FFFF', fontSize: 18, paddingRight: 10 }}>
              My Services
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { setMyServicesFlag(false); setRequestFlag(true); setHistoryFlag(false); setInProgressFlag(false) }}
            style={{
              marginTop: 20,
              borderRadius: 10,
              width: wp('30%'),
              height: hp('6%'),
              backgroundColor: requestFlag ? '#17bba9' : '#8BDDD3',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 18,
              elevation: 10,
              shadowOpacity: 1,
              shadowOffset: 1,
              shadowColor: 'black',
              flexDirection: 'row',
              marginLeft: wp('5%')
            }}
          >

            <Text style={{ color: '#FFFF', fontSize: 18, paddingRight: 10 }}>
              Requests
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { setMyServicesFlag(false); setRequestFlag(false); setHistoryFlag(false); setInProgressFlag(true) }}
            style={{
              marginTop: 20,
              borderRadius: 10,
              width: wp('30%'),
              height: hp('6%'),
              backgroundColor: inProgressFlag ? '#17bba9' : '#8BDDD3',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 18,
              elevation: 10,
              shadowOpacity: 1,
              shadowOffset: 1,
              shadowColor: 'black',
              flexDirection: 'row',
              marginLeft: wp('5%')
            }}
          >

            <Text style={{ color: '#FFFF', fontSize: 18, paddingRight: 10 }}>
              InProgress
            </Text>

          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => { setMyServicesFlag(false); setRequestFlag(false); setHistoryFlag(true); setInProgressFlag(false) }}
            style={{
              marginTop: 20,
              borderRadius: 10,
              width: wp('30%'),
              height: hp('6%'),
              backgroundColor: historyFlag ? '#17bba9' : '#8BDDD3',
              justifyContent: 'center',
              alignItems: 'center',
              fontSize: 18,
              elevation: 10,
              shadowOpacity: 1,
              shadowOffset: 1,
              shadowColor: 'black',
              flexDirection: 'row',
              marginLeft: wp('5%'),
              marginRight: wp('10%')

            }}
          >

            <Text style={{ color: '#FFFF', fontSize: 18, paddingRight: 10 }}>
              Saving History
            </Text>

          </TouchableOpacity>

          <View style={{ marginBottom: hp('5%'), height: hp('6%') }} />

        </ScrollView>
        {/* {console.log(user,'--------users-------')}
            {console.log(handyman,'--------handyMan-------')}
            {console.log(services,'--------services-------')}
            {console.log(subServices,'--------subservices-------')} */}



        {/* body */}
        {myServicesFlag ?

          <FlatList
            data={subServices}
            renderItem={({ item, index }) => (
              <View
                key={index}
                style={{
                  marginVertical: hp("3.69%"),
                  marginHorizontal: wp("6.95%"),
                  borderRadius: 10,
                  marginVertical: hp('1.5'),
                  elevation: 1,
                  shadowOpacity: 1,
                  shadowOffset: 1,
                  shadowColor: 'black',
                  backgroundColor: '#f6f6f6',
                }}
              >
                <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>
                    {item.SubServicesName}
                  </Text>
                  <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>
                    {item.Price}
                  </Text>
                </View>
                <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center' }}>
                    <View style={{ backgroundColor: '#17bba9', height: 30, width: 30, borderRadius: 15, justifyContent: 'center', alignItems: 'center' }}>
                      <Entypo name="check" size={25} color="white" />
                    </View>
                    {item.Reviews ?
                      <Text style={{ color: 'black', fontSize: 18, paddingLeft: wp(2) }}>
                        {item.Reviews}
                      </Text>
                      :
                      <Text style={{ color: 'black', fontSize: 18, paddingLeft: wp(2) }}>
                        2 Reviews
                      </Text>
                    }

                  </View>
                  <Image
                    style={{ width: 70, height: 70 }}
                    source={{ uri: `data:image/jpeg;base64,${item.SubServicesImage}` }}
                  />
                </View>
                <View style={{ flexDirection: 'row', justifyContent: 'center', alignItems: 'center', paddingBottom: hp(2) }}>
                  <MaterialIcons name="star-rate" size={40} color="yellow" />
                  {item.Rating ?
                    <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold', paddingLeft: wp(2) }}>
                      {item.Rating}
                    </Text>

                    : <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold', paddingLeft: wp(2) }}>
                      3.1
                    </Text>}
                </View>
              </View>
            )}
            keyExtractor={item => item.Id}
          />
          :
          null
        }

        {requestFlag ?

          <FlatList
            data={services}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('AdminLocationDashBoard', { item })} style={{
                  marginVertical: hp("3.69%"),
                  marginHorizontal: wp("6.95%"),
                  borderRadius: 10,
                  marginVertical: hp('1.5'),
                  elevation: 1,
                  shadowOpacity: 1,
                  shadowOffset: 1,
                  shadowColor: 'black',
                  backgroundColor: '#f6f6f6',
                }}
              >
                <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%'), }}
                    numberOfLines={2}>
                    Service : {' '}
                  </Text>
                  <TextInput
                    placeholder={'ServicesName'}
                    placeholderTextColor="grey"
                    editable={false} selectTextOnFocus={false}
                    style={{
                      color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                      justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('20%')
                    }}
                    value={'Pipefitting'}
                  />

                </View>

                <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%'), }}
                    numberOfLines={2}>
                    price : {' '}
                  </Text>
                  <TextInput
                    placeholder={'ServicesName'}
                    placeholderTextColor="grey"
                    editable={false} selectTextOnFocus={false}
                    style={{
                      color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                      justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('20%')
                    }}
                    value={'300'}
                  />

                </View>

                <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%'), }}
                    numberOfLines={2}>
                    UserName : {' '}
                  </Text>
                  <TextInput
                    placeholder={'Customer Name'}
                    placeholderTextColor="grey"
                    editable={false} selectTextOnFocus={false}
                    style={{
                      color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                      justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('15%')
                    }}
                    value={'Mahn'}
                  />
                </View>

                <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%') }}>
                    Location : {' '}
                  </Text>
                  <TextInput
                    placeholder={'Location'}
                    placeholderTextColor="grey"
                    editable={false} selectTextOnFocus={false}
                    style={{
                      color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                      justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('28%')
                    }}
                    value={'Rawalpindi'}
                  />
                </View>

                <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%') }}>
                    ContactNum : {' '}
                  </Text>
                  <TextInput
                    placeholder={'ContactNum'}
                    placeholderTextColor="grey"
                    editable={false} selectTextOnFocus={false}
                    style={{
                      color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                      justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('28%')
                    }}
                    value={'0340'}
                  />
                </View>

                <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                  <TouchableOpacity onPress={() => console.log('accept')} style={{ borderColor: '#17bba9', borderWidth: 1, backgroundColor: '#17bba9', borderRadius: 10, marginRight: wp('2%') }}>
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', paddingHorizontal: wp('3%'), paddingVertical: hp('3%') }}>
                      Accept Order
                    </Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={() => console.log('accept')}
                    style={{ borderColor: '#17bba9', borderWidth: 1, backgroundColor: '#17bba9', borderRadius: 10, marginRight: wp('2%') }}
                  >
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold', paddingHorizontal: wp('3%'), paddingVertical: hp('3%') }}>
                      Reject Order
                    </Text>
                  </TouchableOpacity>


                </View>

                <View style={{ marginBottom: hp('20%'), height: hp('4%') }} />


              </TouchableOpacity>
            )}
            keyExtractor={item => item.Id}
          />
          :
          null
        }

        {
          inProgressFlag ?
            <FlatList
              data={services}
              renderItem={({ item, index }) => (
                <TouchableOpacity
                  key={index}
                  onPress={() => navigation.navigate('')} style={{
                    marginVertical: hp("3.69%"),
                    marginHorizontal: wp("6.95%"),
                    borderRadius: 10,
                    marginVertical: hp('1.5'),
                    elevation: 1,
                    shadowOpacity: 1,
                    shadowOffset: 1,
                    shadowColor: 'black',
                    backgroundColor: '#f6f6f6',
                  }}
                >
                  <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                    <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%'), }}
                      numberOfLines={2}>
                      Service : {' '}
                    </Text>
                    <TextInput
                      placeholder={'ServicesName'}
                      placeholderTextColor="grey"
                      editable={false} selectTextOnFocus={false}
                      style={{
                        color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                        justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('20%')
                      }}
                      value={'Pipefitting'}
                    />

                  </View>

                  <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                    <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%'), }}
                      numberOfLines={2}>
                      price : {' '}
                    </Text>
                    <TextInput
                      placeholder={'ServicesName'}
                      placeholderTextColor="grey"
                      editable={false} selectTextOnFocus={false}
                      style={{
                        color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                        justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('20%')
                      }}
                      value={'300'}
                    />

                  </View>



                  <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                    <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%'), }}
                      numberOfLines={2}>
                      UserName : {' '}
                    </Text>
                    <TextInput
                      placeholder={'Customer Name'}
                      placeholderTextColor="grey"
                      editable={false} selectTextOnFocus={false}
                      style={{
                        color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                        justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('15%')
                      }}
                      value={'Mahn'}
                    />
                  </View>

                  <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                    <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%') }}>
                      Location : {' '}
                    </Text>
                    <TextInput
                      placeholder={'Location'}
                      placeholderTextColor="grey"
                      editable={false} selectTextOnFocus={false}
                      style={{
                        color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                        justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('28%')
                      }}
                      value={'Rawalpindi'}
                    />
                  </View>

                  <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                    <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%') }}>
                      ContactNum : {' '}
                    </Text>
                    <TextInput
                      placeholder={'ContactNum'}
                      placeholderTextColor="grey"
                      editable={false} selectTextOnFocus={false}
                      style={{
                        color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                        justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('28%')
                      }}
                      value={'0340'}
                    />
                  </View>

                  <View style={{ justifyContent: 'center', alignItems: 'center', marginTop: hp('2%'), flexDirection: 'row' }}>
                    <TouchableOpacity onPress={() => console.log('accept')} style={{ borderColor: '#17bba9', borderWidth: 1, backgroundColor: '#17bba9', borderRadius: 10, marginRight: wp('2%') }}>
                      <Text numberOfLines={2} style={{ color: 'white', fontSize: 22, fontWeight: 'bold', paddingHorizontal: wp('3%'), paddingVertical: hp('3%') }}>
                        Booking status Ongoing
                      </Text>
                    </TouchableOpacity>

                  </View>

                  <View style={{ marginBottom: hp('20%'), height: hp('4%') }} />


                </TouchableOpacity>
              )}
              keyExtractor={item => item.Id}
            />
            :
            null
        }

        {historyFlag ?

          <FlatList
            data={services}
            renderItem={({ item, index }) => (
              <TouchableOpacity
                key={index}
                onPress={() => navigation.navigate('')} style={{
                  marginVertical: hp("3.69%"),
                  marginHorizontal: wp("6.95%"),
                  borderRadius: 10,
                  marginVertical: hp('1.5'),
                  elevation: 1,
                  shadowOpacity: 1,
                  shadowOffset: 1,
                  shadowColor: 'black',
                  backgroundColor: '#f6f6f6',
                }}
              >
                <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%'), }}
                    numberOfLines={2}>
                    Service : {' '}
                  </Text>
                  <TextInput
                    placeholder={'ServicesName'}
                    placeholderTextColor="grey"
                    editable={false} selectTextOnFocus={false}
                    style={{
                      color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                      justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('20%')
                    }}
                    value={'Pipefitting'}
                  />

                </View>

                <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%'), }}
                    numberOfLines={2}>
                    price : {' '}
                  </Text>
                  <TextInput
                    placeholder={'ServicesName'}
                    placeholderTextColor="grey"
                    editable={false} selectTextOnFocus={false}
                    style={{
                      color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                      justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('20%')
                    }}
                    value={'300'}
                  />

                </View>



                <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%'), }}
                    numberOfLines={2}>
                    UserName : {' '}
                  </Text>
                  <TextInput
                    placeholder={'Customer Name'}
                    placeholderTextColor="grey"
                    editable={false} selectTextOnFocus={false}
                    style={{
                      color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                      justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('15%')
                    }}
                    value={'Mahn'}
                  />
                </View>

                <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%') }}>
                    Location : {' '}
                  </Text>
                  <TextInput
                    placeholder={'Location'}
                    placeholderTextColor="grey"
                    editable={false} selectTextOnFocus={false}
                    style={{
                      color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                      justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('28%')
                    }}
                    value={'Rawalpindi'}
                  />
                </View>

                <View style={{ justifyContent: 'center', paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                  <Text style={{ color: 'black', fontSize: 22, marginTop: hp('1.1%') }}>
                    Date : {' '}
                  </Text>
                  <TextInput
                    placeholder={'ContactNum'}
                    placeholderTextColor="grey"
                    editable={false} selectTextOnFocus={false}
                    style={{
                      color: 'black', fontSize: 22, fontWeight: 'bold', borderWidth: 1, borderColor: '#17bba9', borderRadius: 10,
                      justifyContent: 'center', alignItems: 'center', paddingLeft: wp('3%'), paddingRight: wp('28%')
                    }}
                    value={'29-6-22'}
                  />
                </View>


                <View style={{ marginBottom: hp('20%'), height: hp('4%') }} />


              </TouchableOpacity>
            )}
            keyExtractor={item => item.Id}
          />
          :
          null
        }
{/* second comment */}
{/* third comment */}
{/* forth comment  */}
{/* shahid comment */}
{/* shahid comment 2 */}
      </View>
    </SafeAreaView>
  );
};
