import { View, Text, SafeAreaView, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { heightPercentageToDP as hp, widthPercentageToDP as wp } from 'react-native-responsive-screen';
import IP from '../../../Services/IP';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';


export default function Requests({ navigation }) {
  
  const [loading, setLoading] = useState(false); 

  const [subServices, setSubServices] = useState([]);
  const [users, setUsers] = useState([]);
  const [handyman, setHandyMan] = useState([]);
  const [services, setServices] = useState([]);

  useEffect(() => {
    getDataHandyMan();
  }, []);

  useEffect(() => {
    getAllUserData();

  }, []);

  // useEffect(() => {
  //   fetchServices();
  // }, []);



  // useEffect(() => {
  //   const result = services.find((val) => val.ServiceName === selectedValue);
  //   if (result) {
  //     fetchSubServices(result.Id);
  //   }
  //   else{
  //     setSubServices([])
  //   }

  // }, [selectedValue]);



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
      setLoading(false);
    } catch (error) {
      console.log("error", error)
    }
  };

  const getDataHandyMan = async () => {

    try {
      console.log("FetchHandyMan")
      const baseUrl = `${IP}handymanProfile`;
      console.log(baseUrl)
      axios.get(baseUrl).then((response) => {

        // console.log(response,"--------response services ------- ");
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

  const  savaRecord = async (item,flag) => {


        const baseUrl = `${IP}handymanUpdateProfile`;
        try {
          // console.log(getUserName,checked,getPassword,getPhoneNumber,getEmail)
          const response = await axios.post(baseUrl, {
            Id:item.Id,
            UserId:item.UserId,
            ServiceId: item.ServiceId,
            SubServicesId:item.SubServicesId,
            ServiceName:item.ServiceName,
            ServiceImage:item.ServiceImage,
            SkillName:'',
            SkillImage:item.SkillImage,
            Certificate:'',
            CertificateImage:item.CertificateImage,
            ServicesSubType: item.ServicesSubType,
            ServicesSubTypeImage:item.ServicesSubTypeImage,
            Approved:flag,
            ExtraStatus:''

          });
          console.log("response start ", response)
          // console.log("response",response)
          if (response?.status === 200) {
    
            console.log("response enter ", response)
    
            // alert(` You have created: ${JSON.stringify(response.data)}`);
            setLoading(false);
            console.log('Save successfully');
    
    
    
          } else {
          console.log(error,'--error from handyman --------')
            throw new Error("An error has occurred");
          }
        } catch (error) {
          console.log(error.response.data,'--error from handyman --------')
          alert("An error has occurred");
          setLoading(false);
        }

  };
  

  return (
    <View style={{ flex: 1 }}>
      <SafeAreaView>
        {/* header */}
        <View style={{
          backgroundColor: "#17bba9",
          width: '100%',
          height: hp('8%'),
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>
          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: '25%', backgroundColor: "#17bba9", }}>
            <AntDesign name="arrowleft" color="white" size={25} />
          </TouchableOpacity>

          <View style={{
            width: '65%'
          }}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Requests Details </Text>
          </View>

        </View>
        {/* body */}

        <FlatList
                data={handyman}
                renderItem={({ item, index }) => (
                  <TouchableOpacity key={index} onPress={() => navigation.navigate('LocationDashBoard')} style={{
                    backgroundColor: `white`, shadowColor: '#000', shadowOffset: {
                      width: 0,
                      height: 2,
                    },
                    shadowOpacity: 0.25,
                    shadowRadius: 3.84,
                    elevation: 5,
                    borderRadius: 10,
                    paddingHorizontal: 10,
                    paddingVertical: 15,
                    marginVertical: hp('5%'),
                    marginHorizontal: wp('5%'),
                    
                  }}>
          
                   <View style={{justifyContent: 'space-between',flexDirection: 'row'}}>
                   <View>
                    {/* {console.log(item)} */}
                        {/* {console.log(users?.find((val) => val.Uid === item.UserId).Name,'------USER name get---------')} */}
                      <Text style={{ color: '#17bba9', fontSize: 18, paddingRight: 10 }}>
                        {users?.find((val) => val.Uid === item.UserId).Name}
                      </Text>
                    </View>
                    <View style={{ flexDirection: 'row', }}>
                      <TouchableOpacity onPress={()=>savaRecord(item,true)}>
                      <Text style={{ color: 'green', fontSize: 18, paddingRight: 10,fontWeight:'bold',borderWidth:1,borderColor:'#17bba9',marginHorizontal:wp('2%'),paddingHorizontal:wp('2%'),paddingVertical:hp('1%')}}>
                        Approved
                      </Text>
                      </TouchableOpacity>
                      <TouchableOpacity onPress={()=>savaRecord(item,false)}>
                      <Text style={{ color: 'red', fontSize: 18, paddingRight: 10,fontWeight:'bold',borderWidth:1,borderColor:'#17bba9',paddingHorizontal:wp('2%'),paddingVertical:hp('1%') }}>
                        Reject
                      </Text>
                      </TouchableOpacity>
                      
                    </View>
          
                   </View>
                   <TouchableOpacity onPress={()=>navigation.navigate('AdminSettings1Screen',{item,'users':users?.find((val) => val.Uid === item.UserId)})} style={{justifyContent:'center',alignItems:'center',marginTop:hp('2%'),}}>
                   <Text style={{ color: '#17bba9', fontSize: 18,fontWeight:'bold',borderWidth:1,borderColor:'#17bba9',paddingHorizontal:wp('2%'),paddingVertical:hp('2%') }}>
                        View Profile
                      </Text>
                   </TouchableOpacity>
          
          
          
                  </TouchableOpacity>
                )}
                keyExtractor={item => item.Id}
            />
        
      
      </SafeAreaView>
    </View>
  )
}