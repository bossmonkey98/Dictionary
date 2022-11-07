import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { StatusBar } from 'expo-status-bar';
import { View } from 'react-native';
import { ThemeProvider ,useTheme } from './context/themeContext';
import { WordProvider } from './context/WordContext';
import Home from './Screens/Home';
import Word from './Screens/Word';
import {s} from 'react-native-wind'
export type ScreenParamList = {
  'Home': undefined;
  'Word': undefined;
}


export default function App() {
  const Stack = createNativeStackNavigator<ScreenParamList>()
  const { theme } = useTheme()
  return (
    <NavigationContainer>
      <ThemeProvider>
        <WordProvider>
          <View style={s`h-full ${theme === 'dark' ? 'bg-black' : 'bg-white'}`}>
            <Stack.Navigator initialRouteName='Home'>
              <Stack.Screen name='Home' component={Home} options={{ title: 'Dictonary Home' }} />
              <Stack.Screen name='Word' component={Word} options={{ title: 'Word Details' }} />
            </Stack.Navigator>
            <StatusBar style="auto" />
          </View>
        </WordProvider>
      </ThemeProvider>
    </NavigationContainer>

  );
}
