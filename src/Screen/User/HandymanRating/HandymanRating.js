import React, { useState, useEffect } from 'react';
import { Image, SafeAreaView, StyleSheet, Text, TouchableOpacity, View, ScrollView } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import { Rating, AirbnbRating } from 'react-native-ratings';

export default function HandymanRating({navigation}) {
  const [img, setImg] = useState('aadfaf');
  const WATER_IMAGE = require('../../../Assets/Images/handyman.jpg')

  const ratingCompleted = (rating) => {
    console.log("Rating is: " + rating)
  }
  return (
    <View style={{ flex: 1 }}>


      <SafeAreaView>

        <View style={{
          backgroundColor: "#17bba9",
          width: '100%',
          height: '10%',
          flexDirection: 'row',
          justifyContent: 'center',
          alignItems: 'center'
        }}>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{ width: '25%' }}>
            <AntDesign name="arrowleft" color="white" size={25} />
          </TouchableOpacity>

          <View style={{
            width: '65%'
          }}>
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>HandyMan Details </Text>
          </View>

        </View>

        <ScrollView Style={{}}>


          <TouchableOpacity onPress={() => navigation.navigate('LocationDashBoard')} style={{
            backgroundColor: `white`, shadowColor: '#000', shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 15
            , justifyContent: 'center', alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>

            <View
              style={{
                width: 150,
                height: 105,
                borderWidth: 1,
                marginTop: 20,
                marginRight: 3,
                justifyContent: 'center',
                borderRadius: 15,
                borderColor: '#17bba9',
                marginBottom: 20,


              }}>
              <View >
                {img ? (
                  // <Image
                  //   style={{width: 300, height:175 }}
                  //   // source={{
                  //   //   uri: secondImage,
                  //   // }}
                  //   source={{ uri: `data:image/jpeg;base64,${img}` }}
                  // />
                  <Image
                    source={require("../../../Assets/Images/DummyImage.jpeg")}
                    style={{
                      width: 150,
                      height: 105,
                    }}
                  />
                ) : (
                  <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: '#17bba9' }}>
                    Select Service Image
                  </Text>
                )}
              </View>



              {/* <AirbnbRating
  count={11}
  reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
  defaultRating={11}
  size={20}
/> */}



              {/* <Rating
  type='custom'
  ratingImage={WATER_IMAGE}
  ratingColor='#3498db'
  ratingBackgroundColor='#c8c7c8'
  ratingCount={10}
  imageSize={30}
  onFinishRating={ratingCompleted}
  style={{ paddingVertical: 10 }}
/> */}


            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ color: '#17bba9', fontSize: 18, paddingRight: 10 }}>
                Ali
              </Text>
            </View>

            <Rating
              // showRating
              onFinishRating={ratingCompleted}
              style={{ paddingVertical: 10 }}
            />

            <Text style={{ color: '#17bba9', fontSize: 18, paddingRight: 10 }}>
              Reviews (3)
            </Text>
          </TouchableOpacity>

          <TouchableOpacity onPress={() => navigation.navigate('LocationDashBoard')} style={{
            backgroundColor: `white`, shadowColor: '#000', shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 15
            , justifyContent: 'center', alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
          }}>

            <View
              style={{
                width: 150,
                height: 105,
                borderWidth: 1,
                marginTop: 20,
                marginRight: 3,
                justifyContent: 'center',
                borderRadius: 15,
                borderColor: '#17bba9',
                marginBottom: 20,


              }}>
              <View >
                {img ? (
                  // <Image
                  //   style={{width: 300, height:175 }}
                  //   // source={{
                  //   //   uri: secondImage,
                  //   // }}
                  //   source={{ uri: `data:image/jpeg;base64,${img}` }}
                  // />
                  <Image
                    source={require("../../../Assets/Images/DummyImage.jpeg")}
                    style={{
                      width: 150,
                      height: 105,
                    }}
                  />
                ) : (
                  <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: '#17bba9' }}>
                    Select Service Image
                  </Text>
                )}
              </View>



              {/* <AirbnbRating
  count={11}
  reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
  defaultRating={11}
  size={20}
/> */}



              {/* <Rating
  type='custom'
  ratingImage={WATER_IMAGE}
  ratingColor='#3498db'
  ratingBackgroundColor='#c8c7c8'
  ratingCount={10}
  imageSize={30}
  onFinishRating={ratingCompleted}
  style={{ paddingVertical: 10 }}
/> */}


            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ color: '#17bba9', fontSize: 18, paddingRight: 10 }}>
                Abid
              </Text>
            </View>

            <Rating
              // showRating
              onFinishRating={ratingCompleted}
              style={{ paddingVertical: 10 }}
            />

            <Text style={{ color: '#17bba9', fontSize: 18, paddingRight: 10 }}>
              Reviews (2)
            </Text>
          </TouchableOpacity>
          <TouchableOpacity onPress={() => navigation.navigate('LocationDashBoard')} style={{
            backgroundColor: `white`, shadowColor: '#000', shadowOffset: {
              width: 0,
              height: 2,
            },
            shadowOpacity: 0.25,
            shadowRadius: 3.84,
            elevation: 5,
            borderRadius: 10,
            paddingHorizontal: 10,
            paddingVertical: 15
            , justifyContent: 'center', alignItems: 'center',
            marginVertical: 10,
            marginHorizontal: 10,
            marginBottom: 100
          }}>

            <View
              style={{
                width: 150,
                height: 105,
                borderWidth: 1,
                marginTop: 20,
                marginRight: 3,
                justifyContent: 'center',
                borderRadius: 15,
                borderColor: '#17bba9',
                marginBottom: 20,


              }}>
              <View >
                {img ? (
                  // <Image
                  //   style={{width: 300, height:175 }}
                  //   // source={{
                  //   //   uri: secondImage,
                  //   // }}
                  //   source={{ uri: `data:image/jpeg;base64,${img}` }}
                  // />
                  <Image
                    source={require("../../../Assets/Images/DummyImage.jpeg")}
                    style={{
                      width: 150,
                      height: 105,
                    }}
                  />
                ) : (
                  <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: '#17bba9' }}>
                    Select Service Image
                  </Text>
                )}
              </View>



              {/* <AirbnbRating
  count={11}
  reviews={["Terrible", "Bad", "Meh", "OK", "Good", "Hmm...", "Very Good", "Wow", "Amazing", "Unbelievable", "Jesus"]}
  defaultRating={11}
  size={20}
/> */}



              {/* <Rating
  type='custom'
  ratingImage={WATER_IMAGE}
  ratingColor='#3498db'
  ratingBackgroundColor='#c8c7c8'
  ratingCount={10}
  imageSize={30}
  onFinishRating={ratingCompleted}
  style={{ paddingVertical: 10 }}
/> */}


            </View>
            <View style={{ justifyContent: 'center', alignItems: 'center', }}>
              <Text style={{ color: '#17bba9', fontSize: 18, paddingRight: 10 }}>
                Zahid
              </Text>
            </View>

            <Rating
              // showRating
              onFinishRating={ratingCompleted}
              style={{ paddingVertical: 10 }}
            />

            <Text style={{ color: '#17bba9', fontSize: 18, paddingRight: 10 }}>
              Reviews (1)
            </Text>
          </TouchableOpacity>
        </ScrollView>
      </SafeAreaView>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // paddingTop: 50,

  },
  header: {
    flexDirection: 'row',
    borderWidth: 2,
    paddingHorizontal: 20
  },
  text: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#17bba9',


  },
  textInput: {
    borderWidth: 2,
    width: 200,
    height: 48,
    padding: 10,
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black',
    backgroundColor: '#CFDEBF',
    marginStart: 10

  },
  btn: {
    width: "40%",
    borderRadius: 25,
    height: 60,
    alignItems: 'center',
    justifyContent: 'center',
    // backgroundColor: `#D0F0D1`,
    fontSize: 20
  }
});
