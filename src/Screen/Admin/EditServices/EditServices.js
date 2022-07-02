import React, { useEffect, useState } from 'react';
import { Image, ImageBackground, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View,ActivityIndicator } from 'react-native';
import ImagePicker from 'react-native-image-crop-picker';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IP from '../../../Services/IP';
import axios from 'axios';
import { heightPercentageToDP, widthPercentageToDP } from 'react-native-responsive-screen';
import FontAwesome from 'react-native-vector-icons/FontAwesome';





const EditServices = ({ navigation, route }) => {
  const [id, setId] = useState(route?.params?.Item?.Id);

  const [Name, setName] = useState(route?.params?.Item?.ServiceName);
  const [img, setImg] = useState(route?.params?.Item?.ServiceImage);
  const [loading, setLoading] = useState(false);
  const [disable1, setDisable1] = useState(true);


  useEffect(() => {

    if (Name.length > 1 && img.length > 1) {
      // console.log('disabled');
      setDisable1(false);
    }
  }, [Name, img]);

  const addService = async () => {

    if (Name === " ") {
      Alert.alert("please insert data");
    }
    else {
      const baseUrl = `${IP}UpdateServices`;
      console.log(baseUrl);

      try {
        console.log("Name", Name)
        const response = await axios.post(baseUrl, {
          // const response = await axios.post(baseUrl, {
          Id: id,
          ServiceName: Name,
          ServiceImage: img,

          // ServiceName: "abc",
          // ServiceImage: "image",
        });

        console.log("response", response)
        if (response?.status === 200) {

          console.log("response enter  update",)

          // alert(` You have created: ${JSON.stringify(response.data)}`);

          setName('');
          setImg('');
          navigation.navigate('ShowServices')

        } else {
          throw new Error("An error has occurred");
        }
      } catch (error) {
        alert("An error has occurred");

      }


    }
  }




  const uploadImage = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 400,
      cropping: true,
      includeBase64: true
    }).then(image => {
      setImg(image.data);
      // console.log(image);
    });
  }


  return (
    // <ImageBackground
    //   style={styles.container}
    //   resizeMode='stretch'
    //   source={require("../../../Assets/Images/handyman.jpg")}>
    //   <View style={{ flex: 1 }}>
    //     <SafeAreaView>
    //       <View style={styles.header}>
    //         <View style={{}}>
    //           <AntDesign name="back" color="black" size={40} onPress={() => navigation.navigate('ShowServices')} />
    //         </View>
    //         <View style={{ paddingLeft: 30 }}>
    //           <Text style={{ fontSize: 25, fontWeight: 'bold' }}> Update Services Items : </Text>
    //         </View>

    //       </View>

    //       <View style={{ flexDirection: 'row', marginTop: 60, marginHorizontal: 20 }}>
    //         <View >
    //           <Text style={{ ...styles.text }}>
    //           Services Name :
    //           </Text>
    //         </View>
    //         <View style={{ paddingLeft: 2 }}>
    //           <TextInput style={styles.textInput}
    //             onChangeText={(Name) => setName(Name)} 
    //             value={Name}
    //             />
    //         </View>
    //       </View>


    //       <View style={{ justifyContent: 'center', alignItems: 'center' }}>
    //           <View style={{ paddingHorizontal:20, marginHorizontal: 20 }}>

    //             <TouchableOpacity style={{...styles.btn,width:"80%",marginVertical:20}}
    //               onPress={uploadImage}>
    //               <Text style={{...styles.text,paddingHorizontal:50}}>
    //                 Upload Image
    //               </Text>
    //             </TouchableOpacity>
    //           </View>

    //         {img ? <View style={{ paddingHorizontal: 70 }}>
    //           <Image style={{ height: 160, width: 170 }}
    //             source={{ uri: `data:image/jpeg;base64,${img}` }} />
    //         </View> : null}

    //         {/* <View style={{ flexDirection: 'row',}}>
    //         <View style={{ flex: 1, width: 150, paddingLeft: 1 }}>
    //           <Button
    //             title=" Take Picture"
    //             onPress={takeImage}

    //           />
    //         </View>
    //         <View style={{ flex: 1, paddingHorizontal: 70 }}>
    //           <Image style={{ height: 160, width: 170 }}
    //             source={{ uri: `data:image/jpeg;base64,${img}` }} />
    //         </View>

    //       </View> */}
    //       </View>
    //       <View style={{ paddingLeft: 20,alignItems:'center' }}>
    //         <TouchableOpacity style={styles.btn}
    //           onPress={addService}>
    //           <Text style={styles.text}>
    //             Save
    //           </Text>
    //         </TouchableOpacity>
    //       </View>
    //     </SafeAreaView>
    //   </View>
    // </ImageBackground>
    //   )
    // }
    // export default EditServices;
    // const styles = StyleSheet.create({
    //   container: {
    //     flex: 1,
    //     // paddingTop: 50,

    //   },
    //   header: {
    //     flexDirection: 'row',
    //     borderWidth: 2,
    //     paddingHorizontal: 20
    //   },
    //   text: {
    //     fontSize: 20,
    //     fontWeight: 'bold',
    //     color: 'red',


    //   },
    //   textInput: {
    //     borderWidth: 2,
    //     width: 200,
    //     height: 48,
    //     padding: 10,
    //     fontSize: 18,
    //     fontWeight: 'bold',
    //     color: 'black',
    //     backgroundColor: '#CFDEBF',
    //     marginStart: 10

    //   },
    //   btn: {
    //     width: "40%",
    //     borderRadius: 25,
    //     height: 60,
    //     alignItems: 'center',
    //     justifyContent: 'center',
    //     backgroundColor: `#D0F0D1`,
    //     fontSize: 20
    //   }
    // });

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
            <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Update Services Items : </Text>
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
          marginHorizontal: 10
        }}>

          <View
            style={{
              width: 300,
              height: 175,
              borderWidth: 1,
              marginTop: 20,
              marginRight: 3,
              justifyContent: 'center',
              borderRadius: 15,
              borderColor: '#17bba9',
              marginBottom: 20,
            }}>
            <TouchableOpacity onPress={() => uploadImage()}>
              {img ? (
                <Image
                  style={{ width: 300, height: 175 }}
                  // source={{
                  //   uri: secondImage,
                  // }}
                  source={{ uri: `data:image/jpeg;base64,${img}` }}
                />
              ) : (
                <Text style={{ alignSelf: 'center', textAlign: 'center', fontSize: 22, fontWeight: 'bold', color: '#17bba9' }}>
                  Select Service Image
                </Text>
              )}
            </TouchableOpacity>


          </View>

          <View
            style={{ marginTop: 20, flexDirection: 'row', alignItems: 'center', elevation: 2, borderColor: '#17bba9', borderWidth: 1, shadowOpacity: 1, shadowOffset: 1, shadowColor: 'black', borderRadius: 10, backgroundColor: 'white', width: widthPercentageToDP(90), height: heightPercentageToDP(8), paddingLeft: 20, marginHorizontal: '4.96%', }}>
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
              value={Name}
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
export default EditServices;

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





