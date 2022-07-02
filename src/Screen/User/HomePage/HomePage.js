import React, { useEffect, useState } from 'react';
import {
  ImageBackground,
  ScrollView,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
  Image,
  FlatList
} from 'react-native';
import {
  heightPercentageToDP as hp,
  widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import Plumber from '../../../Assets/Images/plumber.jpeg';
import { styles } from './homePage.styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Services from '../../../Assets/Images/servicesbackground.png';
import IP from '../../../Services/IP';
import axios from 'axios';
import { FlatGrid } from 'react-native-super-grid';



import Electrician from '../../../Assets/Images/electrician.jpeg';
import Carpenter from '../../../Assets/Images/carpenter.jpeg';
import BabySitter from '../../../Assets/Images/babysitter.jpeg';
import AsyncStorage from '@react-native-async-storage/async-storage';


export const HomePage = ({ navigation }) => {
  // useEffect(()=>{  AsyncStorage.setItem('uName', '');
  //   AsyncStorage.setItem('Type', '');
  // },[])
  const [services, setServices] = useState([]);

  useEffect(() => {
    fetchServices();
  }, []);
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



  return (
    <SafeAreaView style={styles.container}>
      {/* <ImageBackground source={first} resizeMode="cover" style={{ width: wp('100%'), height: hp('56.40%') }} > */}
      {/* <ScrollView showsVerticalScrollIndicator={false}> */}

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
            Customer Panel
          </Text>
          <TouchableOpacity
            onPress={() => navigation.navigate('SettingsScreen')}
            style={{ paddingRight: wp('4%'), flexDirection: 'row' }}>
            <Ionicons name="md-person-sharp" size={25} color="blue" />
            <Text style={{ color: 'blue', fontSize: 22, fontWeight: 'bold', paddingLeft: wp(1) }}>
              Profile
            </Text>
          </TouchableOpacity>
        </View>
        {/* services */}
        <View
          style={{
            paddingHorizontal: wp('4%'),
            // paddingVertical: hp('3%'),


          }}>
          <View>
            <ImageBackground
              source={Services}
              style={{ height: hp('28.57%'), width: wp('91.46%') }}
              imageStyle={{ borderRadius: 10 }}>
              <View
                style={{
                  marginLeft: wp('4%'),
                  marginTop: hp('22.20%'),
                  position: 'absolute',

                  elevation: 3,
                  shadowOpacity: 1,
                  shadowOffset: { width: 10, height: 10 },
                  shadowColor: 'black',
                  backgroundColor: '#f6f6f6',
                  borderRadius: 15,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    width: wp('82.46%'),
                    height: hp('8.86%'),
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{ color: 'black', fontSize: hp(2), fontWeight: 'bold' }}>
                    Categories,{'  '}
                  </Text>
                  <Text style={{ color: 'black', fontSize: hp(2) }}>HandyMan</Text>
                </View>
              </View>
            </ImageBackground>
          </View>
        </View>
        {/*body  */}
        {/* <View style={{ paddingHorizontal: wp('5.6%'),
            justifyContent: 'center',
            marginVertical:hp("2%")
            }}> */}
                <FlatGrid
        itemDimension={150}
        data={services}
        style={{marginTop:hp('5%'),flex:1,marginHorizontal:wp('1%')}}
        spacing={5}
        renderItem={({item,index})=>(

          <TouchableOpacity
          key={index}
            style={styles.maincontainer}
            onPress={() => navigation.navigate('SubCatagories',{"obj":item})}>

              <View style={{justifyContent:'flex-end',borderRadius:5}}>
              <Image
              style={{ width: 160, height: 200 }}
              source={{ uri: `data:image/jpeg;base64,${item.ServiceImage}` }}
            />
            <Text
              style={{
                color: 'black',
                fontSize: 17,
                fontWeight: 'bold',
                paddingTop: hp('1'),
                justifyContent:'center',
                textAlign:'center'
              }}>
              {item.ServiceName}
            </Text>
              </View>
            {/* <Image source={Electrician} style={{ width: 100, height: 100 }} /> */}
           
          </TouchableOpacity>
          
        )}
          />
        {/* </View> */}
      
                   {/* <FlatList
            data={services}
            renderItem={(item, index) => renderItem(item, index)}
          keyExtractor={item => item.Id}
          /> */}
          {/* {services?.((item,index)=>
          // renderItem121(item, index)
         { console.log(index)}
          )} */}

        {/* <View
          style={{
            paddingHorizontal: wp('5.6%'),
            justifyContent: 'center',
            height: hp(60),
            // backgroundColor:'red'
          }}> */}

         
      {/* {     services.map((data) => {
      return (
        <View><Text>{data.ServiceName}</Text></View>
      )
    }) } */}

          {/* <View style={{ flexDirection: 'row' }}>
            <TouchableOpacity
              style={styles.maincontainer}
              onPress={() => navigation.navigate('Electrician')}>
              <Image source={Electrician} style={{ width: 100, height: 100 }} />
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 'bold',
                  paddingTop: hp('1'),
                }}>
                Electrician
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.maincontainer1}
              onPress={() => navigation.navigate('BabySitter')}>
              <Image source={BabySitter} style={{ width: 100, height: 100 }} />
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 'bold',
                  paddingTop: hp('1%'),
                }}>
                {' '}
                BabySitter
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* <View style={{flexDirection: 'row'}}>
            <TouchableOpacity
              style={styles.maincontainer}
              onPress={() => navigation.navigate('Plumber')}>
              <Image source={Plumber} style={{width: 100, height: 100}} />
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 'bold',
                  paddingTop: hp('1%'),
                }}>
                Plumber
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              style={styles.maincontainer1}
              onPress={() => navigation.navigate('Carpenter')}>
              <Image source={Carpenter} style={{width: 100, height: 100}} />
              <Text
                style={{
                  color: 'black',
                  fontSize: 17,
                  fontWeight: 'bold',
                  paddingTop: hp('1%'),
                }}>
                Carpenter
              </Text>
            </TouchableOpacity>
          </View> */}
          {/* <TouchableOpacity style={styles.maincontainer2} onPress={()=>navigation.navigate('Profile')}>
        <Boy  />
        <Text style={{color: "black", fontSize: hp(1.5), fontWeight: 'bold',paddingTop:hp('1%')}}>Profile</Text>
        </TouchableOpacity> */}
        {/* </View> */}
      {/* </ScrollView> */}
    </SafeAreaView>
  );
};
