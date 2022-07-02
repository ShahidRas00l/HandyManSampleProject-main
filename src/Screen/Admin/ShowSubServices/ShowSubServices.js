import React, { useState, useEffect } from 'react';
import { View, Text, FlatList, StyleSheet,ImageBackground,SafeAreaView,ScrollView,TouchableOpacity} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';
import IP from '../../../Services/IP';
import axios from 'axios';

const ShowSubServices = ({ navigation,route }) => {
  const [services, setServices] = useState("");
 console.log(route?.params?.Item,"route")
 var id=route?.params?.Item?.Id;
//  console.log(route?.params?.Item?.Id)


  useEffect(() => {
    fetchServices(id);
  }, []);
  const fetchServices = async (id) => {
    try {
      console.log("FetchsubServices")
      const baseUrl = `${IP}fetchSubServices?id=${id}`;
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
      console.log("error",error)
    }
  };



  const DeleteServices = (id) => {
    console.log("Delete id",id)
    try {
      console.log("DeleteSubServices Fun");
      const baseUrl = `${IP}DeleteSubServices?id=${id}`;
      console.log(baseUrl)
     axios.get(baseUrl).then((response) => {
        if (response.status === 200) {
        // console.log(response.data);
          fetchServices();
  
        } else {
          throw new Error("An error has occurred");
        }
      });

    } catch (error) {
      console.log("error",error)
    }
  }




  const renderItem = ({ item }) => {
    return (
      <View>
      <View  style={{
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
         <View style={{flexDirection:'row',justifyContent:'space-between'}}>
         <Text style={{fontSize:18,color:'black',paddingLeft:10}} >{item.SubServicesName}</Text>

         <View style={{flexDirection:'row',justifyContent:'space-between',alignItems:'center',paddingRight:10}}>
        <Text style={{fontSize:18,color:'black',paddingRight:10}} >Price</Text>
        <Text style={{fontSize:16,color:'black',}} >{item.Price}</Text>
        </View>
        

         </View>
         <View style={{flexDirection:'row',justifyContent:'center',alignItems:'center'}}>
         <TouchableOpacity
             onPress={()=>
              navigation.navigate('EditSubServices',{"Item":item,ServiceName:route?.params?.Item?.ServiceName})}
              style={{paddingHorizontal:10}}
              >
            <Text style={{fontSize:18,color:'#17bba9',fontWeight: 'bold',}}>


              Update

            </Text>
          </TouchableOpacity>
              {console.log("item =>",item)}
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


      </View>
    </View>
    )
  }

  
  return (
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

      <Text style={{ color: 'white', fontSize: 22, fontWeight: 'bold' }}>{route?.params?.Item?.ServiceName } Sub Services </Text>

      <TouchableOpacity
        onPress={() => navigation.navigate('AddSubServices',{Id:id})}
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

    
//     <ImageBackground 
//     style={styles.body}
//     resizeMode='stretch'
//      source={require('../../../Assets/Images/handyman.jpg')}
//      >
// <View style={styles.container}>
//       <View style={styles.header}>
//         <View style={{ flex: 2,  justifyContent: 'center', alignItems: 'center' }}>
//           <AntDesign name="back" color="black" size={40} onPress={() => navigation.goBack()} />
//         </View>
//         <View style={{ flex: 6, justifyContent: 'center', alignItems: 'center' }}>
//           <Text style={{ fontSize: 20, fontWeight: 'bold' }}>{route?.params?.Item?.ServiceName } Sub Services </Text>
//         </View>
//         <View style={{ flex: 2,  justifyContent: 'center', alignItems: 'center' }}>
//           <AntDesign name="plussquareo" color="black" size={40} onPress={() => navigation.navigate('AddSubServices',{SerId:route?.params?.Item})} />
//         </View>
//       </View>

//       <View style={styles.body}>
//         <View style={{ flex: 4, justifyContent: 'center', alignContent: 'center' }}>

//           <FlatList
//             data={services}
//             renderItem={renderItem}
//             keyExtractor={item => item.Id}
//           />
//         </View>
//       </View>
//     </View>
    
//     </ImageBackground>
  )
}


export default ShowSubServices;

const styles = StyleSheet.create({
  container: {
    flex: 1,

  },
  header: {
    flex: 1,
     flexDirection: 'row',
     borderWidth:2,


  },
  body: {
    // flex:1,
    flex:9,
    flexDirection: 'row',
    fontWeight: 'bold',
    borderWidth:1,
    paddingTop:10
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold'
  },
  styles: {
    flexDirection: 'row',
    paddingTop: 5,
    borderWidth: 2,
    padding:3
  },
})




