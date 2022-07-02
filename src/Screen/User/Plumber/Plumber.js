import React, { useEffect, useState } from 'react';
import {
    ImageBackground,
    ScrollView,
    SafeAreaView,
    Text,
    TouchableOpacity,
    View,
    Image,
} from 'react-native';
import {
    heightPercentageToDP as hp,
    widthPercentageToDP as wp,
} from 'react-native-responsive-screen';
import { styles } from './Plumber.Styles';
import AntDesign from 'react-native-vector-icons/AntDesign';
import Entypo from 'react-native-vector-icons/Entypo';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

export default function Plumber({navigation}) {
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
            <ScrollView showsVerticalScrollIndicator={false}>
                {/* geyser */}
                <TouchableOpacity onPress={()=>navigation.navigate('HandymanRating')} style={styles.maincontainer1}>
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
                </TouchableOpacity>
                {/* pipe */}
                <TouchableOpacity onPress={()=>navigation.navigate('HandymanRating')} style={styles.maincontainer1}>
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
                </TouchableOpacity>

                {/* pipe */}

                <TouchableOpacity onPress={()=>navigation.navigate('HandymanRating')} style={styles.maincontainer2}>
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
                </TouchableOpacity>

            </ScrollView>

        </SafeAreaView>
    )
}