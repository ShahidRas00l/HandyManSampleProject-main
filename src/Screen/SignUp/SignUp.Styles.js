import {StyleSheet} from 'react-native'
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';


export const styles = StyleSheet.create({
    container: { flex: 1  },
    textWrapper: {
      height: hp('70%'), // 70% of height device screen
      width: wp('80%')   // 80% of width device screen
    },
    myText: {
      paddingTop:hp('5%'),
      paddingBottom:hp('5%'),
      fontSize: hp('10%') ,// End result looks like the provided UI mockup
      color:'#17bba9'
    },
    txtStyle: {
      // marginVertical: hp('5%'),

      
      color:'#17bba9',
      fontSize:16
      
  },

  });