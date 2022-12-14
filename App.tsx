/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * Generated with the TypeScript template
 * https://github.com/react-native-community/react-native-template-typescript
 *
 * @format
 */

 import 'react-native-gesture-handler';
 import React from 'react';
 import {View,StatusBar,useColorScheme} from 'react-native';
 
 import {Colors} from 'react-native/Libraries/NewAppScreen';
 import Router from './src/router';
 
 import {withAuthenticator} from 'aws-amplify-react-native';
 import { Amplify } from 'aws-amplify';
 import awsconfig from './src/aws-exports';
 Amplify.configure(awsconfig);
 
 
 const App = () => {
   const isDarkMode = useColorScheme() === 'dark';
 
   const backgroundStyle = {
     backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
     flex: 1,
   };
   return (
     <View style={backgroundStyle}>
       <StatusBar 
       backgroundColor="#66d9d1"
       barStyle={isDarkMode ? 'light-content' : 'dark-content'} />
       <Router />
     </View>
   );
 };
 

 export default withAuthenticator(App);