import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
// import AsyncStorage from '@react-native-async-storage/async-storage';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { SafeAreaProvider } from 'react-native-safe-area-context';

import Login from './Login';
import Accueil from './Accueil';
import CategoryView from '../components/CategoryView';
import Enregistre from '../components/enregistre';
import Header from '../components/header';
import VideoPlayer from '../components/VideoPlayer';
import Recordings from './Recordings';
import VideoWebPlayer from '../components/VideoWebPlayer';
import Room from '../components/room/room';
import ExpressionList from './ExpressionList';
import Homelayout from '../layouts/Homelayout';
import Audios from './Audios';
import Audioplayer from './Audioplayer';
import Images from './Images';
import ImageViewer from './ImageViewer';
import Dem from './Dem';
import SplashScreen from './SplashScreen';
import Cam from '../../Cam';
import Alo from './Alo';
import Onboarding from './Onboarding'; 
import Elv3 from './Elv3';
import Chat from './Chat';
import ChatScreen from './ChatScreen';
import ChatInitializer from './ChatInitializer';
import ChatRoomScreen from './ChatRoomScreen';

const Stack = createNativeStackNavigator();

const Demarrage = () => {
  const [initialRoute, setInitialRoute] = useState(null);

  useEffect(() => {
    const checkFirstLaunch = async () => {
      await AsyncStorage.removeItem('hasLaunched');
      const hasLaunched = await AsyncStorage.getItem('hasLaunched');
      if (hasLaunched === null) {
        // await AsyncStorage.setItem('hasLaunched', 'true');
        setInitialRoute('Onboarding'); // première ouverture => Onboarding
      } else {
        // alert("plus d'une fois");
        setInitialRoute('Dem'); // pas première fois => Dem
      }
    };
    checkFirstLaunch();
  }, []);

  if (initialRoute === null) {
    // option : tu peux afficher un écran de chargement ici
    return null;
  }

  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName={initialRoute}
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Onboarding" component={Onboarding} />
          <Stack.Screen name="Login" component={Login} />
          <Stack.Screen name="Accueil" component={Accueil} />
          <Stack.Screen name="Camera" component={Cam} />
          <Stack.Screen name="CategoryView" component={CategoryView} />
          <Stack.Screen name="Enregistre" component={Enregistre} />
          <Stack.Screen name="Header" component={Header} />
          <Stack.Screen name="VideoPlayer" component={VideoPlayer} />
          <Stack.Screen name="Recordings" component={Recordings} />
          <Stack.Screen name="VideoWebPlayer" component={VideoWebPlayer} />
          <Stack.Screen name="Room" component={Room} />
          <Stack.Screen name="Dem" component={Dem} />
          <Stack.Screen name="Audios" component={Audios} />
          <Stack.Screen name="Audioplayer" component={Audioplayer} />
          <Stack.Screen name="ExpressionList" component={ExpressionList} />
          <Stack.Screen name="Homelayout" component={Homelayout} />
          <Stack.Screen name="Images" component={Images} />
          <Stack.Screen name="ImageViewer" component={ImageViewer} />
          <Stack.Screen name="SplashScreen" component={SplashScreen} />
          <Stack.Screen name="Alo" component={Alo} />
          <Stack.Screen name="Elv3" component={Elv3} />
          <Stack.Screen name="Chat" component={Chat} />
          <Stack.Screen name="ChatScreen" component={ChatScreen} />
          <Stack.Screen name="ChatInitializer" component={ChatInitializer} />
          <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </SafeAreaProvider>
  );
};

export default Demarrage;

