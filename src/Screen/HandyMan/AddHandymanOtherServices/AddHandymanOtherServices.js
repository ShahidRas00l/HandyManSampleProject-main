import React, { useEffect, useState } from 'react';
import { Image, ImageBackground,ActivityIndicator, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IP from '../../../Services/IP';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import axios from 'axios';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';



const AddHandymanOtherServices = ({ navigation,route }) => {

  const [Name, setName] = useState("");
  const [img, setImg] = useState('');
  const [loading, setLoading] = useState(false);
  const [disable1, setDisable1] = useState(true);


  // if all text field data put then save button disabled
  useEffect(() => {

    if (Name.length > 1 && img.length > 1) {
      // console.log('disabled');
      setDisable1(false);
    }
  }, [Name, img]);


  const addService = async() => {

    if (Name === " "&&img===' ') {
      Alert.alert("please insert data");
    }
    else {
      const baseUrl = `${IP}AddServices`;
      console.log(baseUrl);

  
      try {
        // console.log("Name",Name)
        // console.log("Image",img)
        const response = await axios.post(baseUrl, {
          // const response = await axios.post(baseUrl, {
            ServiceName: Name,
            ServiceImage: img,

            // ServiceName: "abc",
            // ServiceImage: "image",
          });

        console.log("response",response)
        if (response?.status === 200) {
  
          console.log("response enter ", response)
  
          // alert(` You have created: ${JSON.stringify(response.data)}`);

          setName('');
          setImg('');
          setLoading(false)
          navigation.navigate('Settings1Screen')

          

        } else {
          setLoading(false)
          throw new Error("An error has occurred");
        }
      } catch (error) {
        setLoading(false)
        alert("An error has occurred");

      }

    }
  }



  // const ShowCategory=(item)=>{
  //     console.log("enter")
  // };


  const takeImage = () => {
    ImagePicker.openCamera({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true,
    }).then(image => {
      setImg(image.data);
      console.log(image);
    });
  }
  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setImg(image.data);
      console.log(image);
    });
  }


  return (
    // <ImageBackground
    //   style={styles.container}
    //   resizeMode='stretch'
    //   source={require("../../../Assets/Images/handyman.jpg")}>
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
        style={{ width:'25%' }}>
        <AntDesign name="arrowleft" color="white" size={25} />
      </TouchableOpacity>

      <View style={{
        width:'65%'
      }}>
          <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Enter Services Details: </Text>
      </View>

      {/* <TouchableOpacity
        onPress={() => navigation.navigate('Add')}
        style={{ paddingRight: '4%' }}>
        <AntDesign name="plussquareo" color="white" size={40} />
      </TouchableOpacity> */}


    </View>
{/* 
    <Image
      style={{width:430,height:160,marginVertical:10}}
      resizeMode='stretch'
      source={require("../../../Assets/Images/Services.png")}/> */}


    <View style={{
      backgroundColor: `white`,shadowColor:'#000',shadowOffset:{
        width:0,
        height:2,
      },
      shadowOpacity:0.25,
      shadowRadius:3.84,
      elevation:5,
      borderRadius:10,
      paddingHorizontal:10,
      paddingVertical:15
      ,justifyContent:'center',alignItems:'center',
      marginVertical:10,
      marginHorizontal:10
    }}>

<View
          style={{
            width: 300,
            height: 175,
            borderWidth: 1,
            marginTop: 20,
            marginRight: 3,
            justifyContent: 'center',
            borderRadius:15,
            borderColor:'#17bba9',
            marginBottom:20,
          }}>
          <TouchableOpacity onPress={() => uploadImage()}>
            {img ? (
              <Image
                style={{width: 300, height:175 }}
                // source={{
                //   uri: secondImage,
                // }}
                source={{ uri: `data:image/jpeg;base64,${img}` }}
              />
            ) : (
              <Text style={{alignSelf: 'center', textAlign: 'center',fontSize:22,fontWeight:'bold',color:'#17bba9'}}>
                 Select Service Image
              </Text>
            )}
          </TouchableOpacity>
     

        </View>

        <View
            style={{ marginTop:20,flexDirection: 'row', alignItems: 'center', elevation: 2,borderColor:'#17bba9',borderWidth:1, shadowOpacity: 1, shadowOffset: 1, shadowColor: 'black', borderRadius: 10, backgroundColor: 'white', width: widthPercentageToDP(90), height: heightPercentageToDP(8), paddingLeft: 20,marginHorizontal:'4.96%', }}>
            <View
              style={{ backgroundColor: '#17bba9', width: 40, height: 40, borderRadius: 40, justifyContent: 'center', alignItems: 'center' }}>
              <FontAwesome name={'product-hunt'} size={20} color="white" />
            </View>
            <TextInput
              placeholder={'Services Name'}
              keyboardType={'email-address'}
              placeholderTextColor="grey"
              style={{ marginLeft: 20, fontSize: 16, color: 'black' }}
              onChangeText={(Name) => setName(Name)} 
            />
          </View>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              height: heightPercentageToDP(15),
            }}>
            <TouchableOpacity
              onPress={() => { setLoading(true); addService() }}
              style={{
                marginTop: 20,
                borderRadius: 10,
                width: widthPercentageToDP(72),
                height: heightPercentageToDP(8),
                backgroundColor: '#17bba9',
                justifyContent: 'center',
                alignItems: 'center',
                fontSize: 18,
                elevation: 10,
                shadowOpacity: 1,
                shadowOffset: 1,
                shadowColor: 'black',
                flexDirection: 'row',
              }}
              disabled={disable1}>
              {loading ? (
                <ActivityIndicator size={'small'} color={'white'} />
              ) : (
                <Text style={{ color: '#FFFF', fontSize: 18, paddingRight: 10 }}>
                  Save
                </Text>
              )}
            </TouchableOpacity>

          </View>

     
    </View>
        </SafeAreaView>
      </View>
  
  )
}
export default AddHandymanOtherServices;
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


