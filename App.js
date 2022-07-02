
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import * as React from 'react';
import Add from './src/Screen/Admin/Add/Add';
import AddSubServices from './src/Screen/Admin/AddSubServices/AddSubServices';
import AdminHomePage from './src/Screen/Admin/AdminHomePage/AdminHomePage';
import AdminLocationDashBoard from './src/Screen/Admin/AdminLocationDashBoard/AdminLocationDashBoard';
import { AdminSettings1Screen } from './src/Screen/Admin/AdminSettings1Screen/AdminSettings1Screen';
import EditServices from './src/Screen/Admin/EditServices/EditServices';
import EditSubServices from './src/Screen/Admin/EditSubServices/EditSubServices';
import Requests from './src/Screen/Admin/Requests/Requests';
import ShowServices from './src/Screen/Admin/ShowServices/ShowServices';
import ShowSubServices from './src/Screen/Admin/ShowSubServices/ShowSubServices';
import ForgotPassword from './src/Screen/ForgotPassword/ForgotPassword';
import AddHandymanOtherServices from './src/Screen/HandyMan/AddHandymanOtherServices/AddHandymanOtherServices';
import AddHandymanOtherSubServices from './src/Screen/HandyMan/AddHandymanOtherSubServices/AddHandymanOtherSubServices';
import { HomePageHandyMan } from './src/Screen/HandyMan/HomePageHandyMan/HomePageHandyMan';
import { Settings1Screen } from './src/Screen/HandyMan/Settings1Screen/Settings1Screen';


import { LoginScreen } from './src/Screen/LoginScreen/Login';
import { SignUpScreen } from './src/Screen/SignUp/SignUp';

import Splash from './src/Screen/Splash/Splash';
import HandymanRating from './src/Screen/User/HandymanRating/HandymanRating';
import { HomePage } from './src/Screen/User/HomePage/HomePage';
import LocationDashBoard from './src/Screen/User/LocationDashBoard/LocationDashBoard';
import Plumber from './src/Screen/User/Plumber/Plumber';
import { SettingsScreen } from './src/Screen/User/SettingsScreen/SettingsScreen';
import SubCatagories from './src/Screen/User/SubCatagories/SubCatagories';




const { Navigator, Screen } = createNativeStackNavigator();
// bottom Tab code

const App = () => {
  return (
    // Stack navigation Code
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }}>
        <Screen
          name="splash"
          component={Splash}
          options={{ title: '', headerShown: false }}
        />
        <Screen
          name="Login"
          component={LoginScreen}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="Signup"
          component={SignUpScreen}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />


        <Screen
          name="SettingsScreen"
          component={SettingsScreen}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="Settings1Screen"
          component={Settings1Screen}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="Homepage1"
          component={HomePage}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="Homepage"
          component={HomePageHandyMan}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="Plumber"
          component={Plumber}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="AdminHomePage"
          component={AdminHomePage}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="ShowServices"
          component={ShowServices}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="Add"
          component={Add}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="EditServices"
          component={EditServices}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="EditSubServices"
          component={EditSubServices}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="AddSubServices"
          component={AddSubServices}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="ShowSubServices"
          component={ShowSubServices}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="LocationDashBoard"
          component={LocationDashBoard}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
              <Screen
          name="AdminLocationDashBoard"
          component={AdminLocationDashBoard}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="HandymanRating"
          component={HandymanRating}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="SubCatagories"
          component={SubCatagories}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="AddHandymanOtherServices"
          component={AddHandymanOtherServices}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />
        <Screen
          name="AddHandymanOtherSubServices"
          component={AddHandymanOtherSubServices}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="Requests"
          component={Requests}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

        <Screen
          name="AdminSettings1Screen"
          component={AdminSettings1Screen}
          options={{
            title: '',
            headerShown: false,
            headerStyle: {
              backgroundColor: '#f5f5dc',
            },
            headerTitleStyle: {
              fontWeight: 'bold',
              fontSize: 22,
            },
          }}
        />

      </Navigator>
    </NavigationContainer>
  );
};
export default App;