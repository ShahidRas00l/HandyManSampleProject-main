import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet, ImageBackground, SafeAreaView, ScrollView, TouchableOpacity } from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IP from '../../../Services/IP';
import axios from 'axios';


const ShowServices = ({ navigation }) => {
  const [services, setServices] = useState("");

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



  const DeleteServices = (id) => {
    // console.log(id);
    // fetch(IP + '/Food/DeleteFood?id=' + id)
    //   .then((response) => response.json())
    //   .then((json) => {

    //     console.log(json);
    // fetchServices();
    //   })
    //   .catch((error) => {
    //     console.error(error);
    //   });
    try {
      console.log("DeleteServices Fun");
      const baseUrl = `${IP}DeleteServices?id=${id}`;
      console.log(baseUrl)
      axios.get(baseUrl).then((response) => {
        if (response.status === 200) {
          console.log("response.data");
          fetchServices();

        } else {
          throw new Error("An error has occurred");
        }
      });

    } catch (error) {
      console.log("error", error)
    }
  }




  const renderItem = ({ item }) => {
    return (

      <ScrollView>
        <TouchableOpacity onPress={() =>
          navigation.navigate('ShowSubServices', { "Item": item })} style={{
            marginHorizontal:'3%',
            marginVertical:'2%',
          }}>
          <View style={{ flex: 6, justifyContent: 'center', alignContent: 'center', paddingLeft: 6, backgroundColor: `white`,shadowColor:'#000',shadowOffset:{
            width:0,
            height:2,
          },
          shadowOpacity:0.25,
          shadowRadius:3.84,
          elevation:5,
          borderRadius:10,
          paddingHorizontal:10,
          paddingVertical:15,
           }}>
            <Text style={{fontSize:18,color:'black',paddingLeft:10}} >{item.ServiceName}</Text>
           <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
           <TouchableOpacity
              onPress={() =>
                navigation.navigate('EditServices', { "Item": item })}
                style={{paddingHorizontal:10}}
                >
              <Text style={{fontSize:18,color:'#17bba9',  fontWeight: 'bold',}}>


                Update

              </Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => DeleteServices(item.Id)} 
              style={{paddingHorizontal:10}}
              >
              <Text style={{fontSize:18,color:'#17bba9',fontWeight: 'bold',}}>

                Delete

              </Text>
            </TouchableOpacity>
           </View>
          </View>

        </TouchableOpacity>
      </ScrollView>
    )
  }
  return (
    // <ImageBackground 
    // style={styles.body}
    // resizeMode='stretch'
    //  source={require('../../../Assets/Images/handyman.jpg')}
    //  >

    <View style={styles.container}>

      <View style={{
        backgroundColor: "#17bba9",
        width: '100%',
        height: '7%',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center'
      }}>

        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={{ paddingLeft: '4%' }}>
          <AntDesign name="arrowleft" color="white" size={25} />
        </TouchableOpacity>

        <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>Services List </Text>

        <TouchableOpacity
          onPress={() => navigation.navigate('Add')}
          style={{ paddingRight: '4%' }}>
          <AntDesign name="plussquareo" color="white" size={40} />
        </TouchableOpacity>


      </View>

      <View style={styles.body}>
        <View style={{ flex: 4, justifyContent: 'center', alignContent: 'center' }}>

          <FlatList
            data={services}
            renderItem={renderItem}
            keyExtractor={item => item.Id}
          />
        </View>
      </View>
    </View>

    // </ImageBackground>
  )
}


export default ShowServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    flex: 1,
    flexDirection: 'row',
    borderWidth: 2,


  },
  body: {
    // flex:1,
    flex: 9,
    flexDirection: 'row',
    fontWeight: 'bold',
    borderWidth: 1,
    paddingTop: 10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  styles: {
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 2,
    padding: 3
  },
})




