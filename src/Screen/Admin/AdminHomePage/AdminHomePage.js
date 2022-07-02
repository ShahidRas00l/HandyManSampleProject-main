import AsyncStorage from "@react-native-async-storage/async-storage";
import React, { useEffect, useState } from "react";
import { StyleSheet, View, Text, Alert, ImageBackground, TouchableOpacity, Image } from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import AntDesign from 'react-native-vector-icons/AntDesign';


import Services from '../../../Assets/Images/servicesbackground.png';

const AdminHomePage = ({ navigation }) => {

    //  useEffect(()=>{  AsyncStorage.setItem('uName', '');
    //  AsyncStorage.setItem('Type', '');
    // },[])

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

    return (
        // <ImageBackground  style={styles.container}
        // resizeMode='stretch'
        //  source={require('../../../Assets/Images/handyman.jpg')}

        //   >

        <View style={styles.container}>


            <View
                style={{
                    backgroundColor: '#17bba9',
                    height: hp(7.23),
                    width: wp(100),
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
                            Home Page Profile
                        </Text>
                    </View>
                    {/* logout */}
                    <TouchableOpacity style={{ paddingRight: 20 }}
                     onPress={() => {
                        clearAllAsyncStorage()
                    }}
                    >
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
                                    style={{ color: 'black', fontSize: hp(3), fontWeight: 'bold' }}>
                                    Categories,{'  '}
                                </Text>
                                <Text style={{ color: 'black', fontSize: hp(3) }}>Admin</Text>
                            </View>
                        </View>
                    </ImageBackground>
                </View>
            </View>

            <TouchableOpacity style={styles.btnStyle}
                onPress={() => {
                    navigation.navigate('ShowServices')
                }}
            >
                <Text style={styles.text}>
                    Services
                </Text>
            </TouchableOpacity>

            <TouchableOpacity style={styles.btnStyle}
                onPress={() => {
                    navigation.navigate('Requests')
                }}
            >
                <Text style={styles.text}>
                    Requests
                </Text>
            </TouchableOpacity>

            {/* <View style={styles.innerContainer}>

                <View style={{}}>
                    <TouchableOpacity

                        onPress={() => {
                            clearAllAsyncStorage()
                        }}>
                        <Text style={{
                            fontSize: 30,
                            fontWeight: 'bold',
                            color: '#17bba9',
                        }}>
                            Logout
                        </Text>
                    </TouchableOpacity>

                </View>
            </View> */}
        </View>
        //  </ImageBackground>
    );
}
export default AdminHomePage;
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // justifyContent: 'space-evenly',
        // alignItems: 'center',
        // backgroundColor: 'powderblue'
    },
    innerContainer: {
        justifyContent: 'space-evenly',
        alignItems: 'center',
        // backgroundColor:'yellow',
        marginTop: hp('25%')




    },
    text: {
        fontSize: 30,
        fontWeight: 'bold',
        color: 'white',
    },
    btnStyle: {

        borderRadius: 10,
        marginTop: hp('5.5'),
        paddingVertical: hp("1.69%"),
        marginHorizontal: wp("3.95%"),
        justifyContent: 'center',
        alignItems: 'center',
        elevation: 1,
        shadowOpacity: 1,
        shadowOffset: 1,
        shadowColor: 'black',
        backgroundColor: '#17bba9',
        // justifyContent: 'center',
        // alignItems: 'center',
        // borderRadius: 20,
        // backgroundColor: '#17bba9',
    }
});