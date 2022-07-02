import {StyleSheet} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export const styles = StyleSheet.create({
  container: {flex: 1,},
  textWrapper: {
    height: hp('70%'), // 70% of height device screen
    width: wp('80%'), // 80% of width device screen
  },
  maincontainer1: {
    // width: wp('41.33%'),\
    // width: wp('43.22%'),
    //totoal height =926 total width=428
    marginVertical:hp("3.69%"),
    marginHorizontal:wp("6.95%"),
    borderRadius:10,
    marginVertical:hp('0.5'),
    // height: hp('15.51%'),
    // justifyContent: 'center',
    // alignItems: 'center',
    elevation: 1,
    shadowOpacity: 1,
    shadowOffset: 1,
    shadowColor: 'black',
    backgroundColor: '#f6f6f6',
  },
  maincontainer1: {
    // width: wp('41.33%'),\
    // width: wp('43.22%'),
    //totoal height =926 total width=428
    marginVertical:hp("3.69%"),
    marginHorizontal:wp("6.95%"),
    borderRadius:10,
    marginVertical:hp('1.5'),
    // height: hp('15.51%'),
    // justifyContent: 'center',
    // alignItems: 'center',
    elevation: 1,
    shadowOpacity: 1,
    shadowOffset: 1,
    shadowColor: 'black',
    backgroundColor: '#f6f6f6',
  },
  maincontainer2: {
    // width: wp('41.33%'),\
    // width: wp('43.22%'),
    //totoal height =926 total width=428
    marginVertical:hp("3.69%"),
    marginHorizontal:wp("6.95%"),
    borderRadius:10,
    marginVertical:hp('.5'),
    // height: hp('15.51%'),
    // justifyContent: 'center',
    // alignItems: 'center',
    elevation: 1,
    shadowOpacity: 1,
    shadowOffset: 1,
    shadowColor: 'black',
    backgroundColor: '#f6f6f6',
    marginBottom:hp(5)
  },
  myText: {
    paddingTop: hp('5%'),
    paddingBottom: hp('5%'),
    fontSize: hp('10%'), // End result looks like the provided UI mockup
    color: '#17bba9',
  },

  txtStyle: {
    marginVertical: hp('5%'),

    fontWeight: 'bold',
    color: '#17bba9',
  },
  avatarContainer: {
    marginBottom: 10,
    alignItems: 'center',
    justifyContent: 'center',
  },
  userAvatar: {
    width: 45,
    height: 45,
    borderRadius: 45,
  },
  avatarEditBtn: {
    bottom: 0,
    right: -8,
    width: 30,
    height: 30,
    borderWidth: 1,
    borderRadius: 50,
    position: 'absolute',
    alignItems: 'center',
    borderColor: '#CECECE',
    backgroundColor: '#FFFFFF',
    justifyContent: 'center',
  },
});
