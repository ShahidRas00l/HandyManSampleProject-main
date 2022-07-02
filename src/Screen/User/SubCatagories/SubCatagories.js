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
    Alert,

} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp
} from 'react-native-responsive-screen';
import { styles } from './SubCatagories.Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import axios from 'axios';
import IP from '../../../Services/IP';
import AsyncStorage from '@react-native-async-storage/async-storage';
import UserAvatar1 from '../../../Assets/Images/locationSetting.png';
import Octicons from 'react-native-vector-icons/Octicons';

import Geocoder from 'react-native-geocoding';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import Geolocation1 from '@react-native-community/geolocation';
import RNSettings from 'react-native-settings';
import { Picker } from '@react-native-picker/picker';





export default function SubCatagories({ navigation, route }) {

    Geocoder.init('AIzaSyATZ-ukfN5kt6CSKPkNnEygValbz82Hl4M', { language: 'en' });


    const [subServices, setSubServices] = useState("");
    const [bookingModel, setBookingModel] = useState(false);
    const [user, setUser] = useState([]);
    const [address, setAddress] = useState();
    var [latitudec, setlatitudec] = useState(0);
    var [longitudec, setlongitudec] = useState(0);
    const [loading, setLoading] = useState(false);
    const [allusers, setAllUsers] = useState([]);
  const [selectedValue, setSelectedValue] = useState();





    console.log(route?.params?.obj, "route")
    var id = route?.params?.obj?.Id;
    //  console.log(route?.params?.Item?.Id)

    useEffect(() => {
        getUserData();

    }, []);

    useEffect(() => {
        fetchSubServices(id);
    }, []);

    useEffect(() => {
        getAllUserData();
    }, []);


    const fetchSubServices = async (id) => {
        try {
            console.log("FetchsubServices")
            const baseUrl = `${IP}fetchSubServices?id=${id}`;
            console.log(baseUrl)
            axios.get(baseUrl).then((response) => {

                // console.log(response);
                if (response.status === 200) {
                    console.log(response.data, '--------fetch sub services data')
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

    const getAllUserData = async () => {

        try {
            console.log("FetchAllUserData")
            const baseUrl = `${IP}getAllUser`;
            //   console.log(baseUrl)
            axios.get(baseUrl).then((response) => {

                if (response.status === 200) {
                    console.log(response.data, "--------response all Users ------- ");

                    function compare(a, b) {
                        if (a.Range > b.Range) {
                            return -1;
                        }
                        if (a.Range < b.Range) {
                            return 1;
                        }
                        return 0;
                    }

                    var sortedArray = response?.data?.sort(compare);

                    console.log(sortedArray, '-------sortedArray--------')

                    var temp = []
                    sortedArray.map((ele, index) => {
                        if (ele.Range) {
                            var tem = [];
                            tem = {
                                Name: ele.Name,
                                Range: ele.Range,
                                Uid: ele.Uid,
                            }
                            temp.push(tem)
                        }
                    })
                    // console.log(temp,'-------temp--------')
                   var temp1= temp.map((ele, index) => {
                        return { Uid: ele.Uid, Name: `${ele.Name} In Range ${ele.Range} km` }
                    })
                    console.log(temp1,'-------temp1--------')
                             setAllUsers(temp1)
                    // alert(` You have created: ${JSON.stringify(response.data)}`);

                } else {
                    throw new Error("An error has occurred");
                }
            });

        } catch (error) {
            console.log("error", error)
        }


    };


    const savaOrder = async () => {
        var date = new Date().getDate();
        var month = new Date().getMonth();
        var year = new Date().getFullYear();
        var Fulldate = date + '-' + month + '-' + year;

        const baseUrl = `${IP}saveOrderBYuserId`;

        console.log({ UserId: user?.Uid, ServicesId: subServices[0].ServicesId, SubServicesId: subServices[0]?.Id, PickUpLocation: address, HandymanId: allusers.find((ele)=>ele.Name===selectedValue).Uid,
            HandymanName: selectedValue.split(" ")[0], OrderPlaceDate: Fulldate, UserOrderProgress: false}, '========check value=======')

        try {
            const response = await axios.post(baseUrl, {
                UserId: user?.Uid, ServicesId: subServices[0].ServicesId, SubServicesId: subServices[0]?.Id,HandymanId: allusers.find((ele)=>ele.Name===selectedValue).Uid, PickUpLocation: address, 
                HandymanName: selectedValue.split(" ")[0], OrderPlaceDate:Fulldate, UserOrderProgress: 'false',
                HandyManOrderProgress:'',IsCanceled:'',IsDelivered:'',ExtraStatus:''
            },
            );
            // console.log("response start ", response)
            // console.log("response",response)
            if (response?.status === 200) {

                console.log("response enter ", response)

                // alert(` You have created: ${JSON.stringify(response.data)}`);
                setLoading(false);
                console.log('Save successfully');



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



     // for show services lis
  const renderServicesList = () => {
    // console.log(selectedValue,"-----------selectedVal--------")
    // console.log(services[0].ServiceName,"-----------services--------")
    console.log(allusers,'--------allusers--------')
   
    return allusers.map((na, index) => {
      return <Picker.Item label={na.Name} value={na.Name} key={index} />
    })

  }



    return (
        <SafeAreaView style={styles.container}>
            {/* header */}
            <View
                style={{
                    backgroundColor: '#17bba9',
                    width: wp(100),
                    height: hp(6.29),
                    flexDirection: 'row',
                    justifyContent: 'center',
                    //   justifyContent: 'space-between',
                    alignItems: 'center',
                    marginBottom: '5%',
                }}>
                <TouchableOpacity
                    onPress={() => navigation.goBack()}
                    style={{ paddingLeft: wp('4.96'), width: wp(31) }}>
                    <AntDesign name="arrowleft" size={25} color="white" />
                </TouchableOpacity>

                <View style={{ width: wp(69) }}>
                    <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>
                        Sub Categories
                    </Text>
                </View>

            </View>
            {/* body */}

            <FlatList
                data={subServices}
                renderItem={({ item, index }) => (
                    <TouchableOpacity onPress={() => setBookingModel(!bookingModel)}
                        // <TouchableOpacity onPress={() => navigation.navigate('LocationDashBoard',{'subServicesItem':item})} 
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
                            {/* <Image
                        resizeMode="stretch"
                        style={{ height: 70, width: 70 }}
                        source={require('../../../Assets/Images/gizer.jpeg')}
                    /> */}
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
                    </TouchableOpacity>
                )}
                keyExtractor={item => item.Id}
            />

            <View>
                {bookingModel ?
                    <View style={{
                        height: hp('40%'), width: wp('100%'), paddingHorizontal: wp("5.95%"),
                        borderTopEndRadius: 10,
                        paddingVertical: hp('1.5'),
                        elevation: 2,
                        shadowOpacity: 1,
                        shadowOffset: 1,
                        shadowColor: 'black',
                        backgroundColor: 'white',
                        // backgroundColor: '#f6f6f6',
                        position: 'absolute',
                        bottom: -250,
                        // Top:'60%',
                        zIndex: 1000,


                    }}>

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
                            paddingHorizontal: 5,
                            // marginLeft: wp('6.4%'), marginRight: wp('4.4%'),
                            justifyContent: 'center',
                            marginVertical: wp('1.6%'),
                            height: hp(7), width: wp(90),
                            // height: hp('9.75%'), width: wp('90%'),
                        }}>
                            <View
                                style={{
                                    flexDirection: 'row',
                                    alignItems: 'center',
                                    justifyContent: 'space-between',
                                    paddingRight: wp('3.25'),
                                    flexGrow: 1,
                                }}>
                                <View style={{ marginLeft: wp('3.96%') }}>
                                    <Image style={{
                                        width: 30,
                                        height: 30,
                                        borderRadius: 50,
                                    }} source={UserAvatar1} />
                                </View>
                                <GooglePlacesAutocomplete
                                    placeholder={'Pick Up Location'}
                                    // styles={{
                                    //     textInputContainer: {
                                    //       backgroundColor: 'grey',
                                    //     },
                                    //     textInput: {
                                    //       height: 38,
                                    //       color: '#5d5d5d',
                                    //       fontSize: 16,
                                    //     },
                                    // }}
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
                                            // color: 'black',
                                            color: '#17bba9',
                                            fontSize: 16,
                                            backgroundColor: 'white',
                                            width: wp(50),
                                            // height: 60,
                                            height: hp('7%'),

                                            borderRadius: 5,
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            paddingLeft: wp('5%')
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


                        <View style={{

                            marginHorizontal: wp(4.96),
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
                                    label="Select HandyMan and Range"
                                    value="0"
                                    style={{ fontSize: 13, fontWeight: 'bold' }}
                                />
                                {renderServicesList()}


                            </Picker>
                        </View>

                        <TouchableOpacity
                            onPress={() => {
                                savaOrder();
                            }}
                            style={{
                                marginTop: hp('5%'),
                                marginLeft: wp(4.96),
                                justifyContent: 'center',
                                alignItems: 'center',
                                width: '90%',
                                height: 40,
                                backgroundColor: '#17bba9',
                                padding: 5,
                                borderRadius: 10,
                            }}
                        >

                            <Text style={{ color: 'white', fontSize: 18 }}>Save</Text>
                        </TouchableOpacity>

                    </View>
                    :
                    null
                }

            </View>


            <ScrollView showsVerticalScrollIndicator={false}>

                {/* geyser */}
                {/* <TouchableOpacity onPress={()=>navigation.navigate('HandymanRating')} style={styles.maincontainer1}>
            <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>
                    Geyser Services
                </Text>
                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>
                    Price: 1000
                </Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'center' }}>
                    <View style={{ backgroundColor: '#17bba9', height: 30, width: 30, borderRadius: 15, justifyContent: 'center',alignItems:'center' }}>
                        <Entypo name="check" size={25} color="white" />
                    </View>
                    <Text style={{ color: 'black', fontSize:18 ,paddingLeft:wp(2)}}>
                       2 Reviews
                    </Text>
                </View>
                <Image
                    resizeMode="stretch"
                    style={{ height: 70, width: 70 }}
                    source={require('../../../Assets/Images/gizer.jpeg')}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:hp(2)}}>
            <MaterialIcons name="star-rate" size={40} color="yellow" />
                <Text style={{ color: 'black', fontSize:22,fontWeight:'bold' ,paddingLeft:wp(2)}}>
                     3.1
                </Text>
            </View>
        </TouchableOpacity> */}
                {/* pipe */}
                {/* <TouchableOpacity onPress={()=>navigation.navigate('HandymanRating')} style={styles.maincontainer1}>
            <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>
                    Pipe Services
                </Text>
                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>
                    Price: 500
                </Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'center' }}>
                    <View style={{ backgroundColor: '#17bba9', height: 30, width: 30, borderRadius: 15, justifyContent: 'center',alignItems:'center' }}>
                        <Entypo name="check" size={25} color="white" />
                    </View>
                    <Text style={{ color: 'black', fontSize:18 ,paddingLeft:wp(2)}}>
                        2 Reviews
                    </Text>
                </View>
                <Image
                    resizeMode="stretch"
                    style={{ height: 70, width: 70 }}
                    source={require('../../../Assets/Images/pipe1.jpeg')}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:hp(2)}}>
            <MaterialIcons name="star-rate" size={40} color="yellow" />
                <Text style={{ color: 'black', fontSize:22,fontWeight:'bold' ,paddingLeft:wp(2)}}>
                     2.1
                </Text>
            </View>
        </TouchableOpacity> */}

                {/* pipe */}

                {/* <TouchableOpacity onPress={()=>navigation.navigate('HandymanRating')} style={styles.maincontainer2}>
            <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>
                    Pipe Services
                </Text>
                <Text style={{ color: 'black', fontSize: 22, fontWeight: 'bold' }}>
                    Price: 500
                </Text>
            </View>
            <View style={{ justifyContent: 'space-between', flexDirection: "row", paddingHorizontal: wp(4), paddingVertical: hp(2) }}>
                <View style={{ flexDirection: 'row', justifyContent: 'center',alignItems:'center' }}>
                    <View style={{ backgroundColor: '#17bba9', height: 30, width: 30, borderRadius: 15, justifyContent: 'center',alignItems:'center' }}>
                        <Entypo name="check" size={25} color="white" />
                    </View>
                    <Text style={{ color: 'black', fontSize:18 ,paddingLeft:wp(2)}}>
                        2 Reviews
                    </Text>
                </View>
                <Image
                    resizeMode="stretch"
                    style={{ height: 70, width: 70 }}
                    source={require('../../../Assets/Images/pipe.jpeg')}
                />
            </View>
            <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center',paddingBottom:hp(2)}}>
            <MaterialIcons name="star-rate" size={40} color="yellow" />
                <Text style={{ color: 'black', fontSize:22,fontWeight:'bold' ,paddingLeft:wp(2)}}>
                     2.1
                </Text>
            </View>
        </TouchableOpacity> */}

            </ScrollView>

        </SafeAreaView>
    )
}