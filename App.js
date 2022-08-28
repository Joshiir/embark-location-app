import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import IonIcons from '@expo/vector-icons/Ionicons';
import LogInScreen from './src/screens/LoginScreen'
import SignUpScreen from './src/screens/SignUpScreen'
import ForgotPasswordScreen from './src/screens/ForgotPasswordScreen'
import DashboardScreen from './src/screens/DashboardScreen'
import ProfileScreen from './src/screens/ProfileScreen';
import ExploreScreen from './src/screens/ExploreScreen';
import DetailsScreen from './src/screens/DetailsScreen';
import TripPlanScreen from './src/screens/TripPlanScreen';
import ChangePasswordScreen from './src/screens/ChangePasswordScreen';
import ChangeEmailScreen from './src/screens/ChangeEmailScreen';


const Stack = createNativeStackNavigator();
const Tab = createMaterialBottomTabNavigator();
const ExploreStack = createNativeStackNavigator();
const DashboardStack = createNativeStackNavigator();
const ProfileStack = createNativeStackNavigator();

function DashboardStackScreen() {
  return (
    <DashboardStack.Navigator>
      <DashboardStack.Screen name="My Trips" component={DashboardScreen} options={{ headerShown: false }} />
      <DashboardStack.Screen name="TripPlan" component={TripPlanScreen} options={{ headerShown: false }} />
    </DashboardStack.Navigator>
  )
}

function ExploreStackScreen() {
  return (
    <ExploreStack.Navigator>
      <ExploreStack.Screen name="Explore" component={ExploreScreen} options={{ headerShown: false }} />
      <ExploreStack.Screen name="Details" component={DetailsScreen} options={{ headerShown: false }} />
    </ExploreStack.Navigator>
  )
}

function ProfileStackScreen() {
  return (
    <ProfileStack.Navigator
      screenOptions={{ headerStyle: { backgroundColor: '#00A36C', }, headerTintColor: '#fff', headerTitleStyle: { fontSize: 20, fontWeight: 'normal' }, }} >
      <ProfileStack.Screen name="Profile" component={ProfileScreen} options={{ headerShown: false }} />
      <ProfileStack.Screen name="ChangePassword" component={ChangePasswordScreen} options={{ title: 'Change Password' }} />
      <Stack.Screen name="ChangeEmail" component={ChangeEmailScreen} options={{ title: 'Change Email' }} />
    </ProfileStack.Navigator>
  )
}

function TabNavigator() {
  return (
    <Tab.Navigator barStyle={{ backgroundColor: '#00A36C'}}>
      <Tab.Screen name="My Trips" component={DashboardStackScreen} options={{ tabBarIcon: ({ color }) => (<IonIcons name='menu' color={color} size='20' />)}} />
      <Tab.Screen name="Explore" component={ExploreStackScreen} options={{ tabBarIcon: ({ color }) => (<IonIcons name='map' color={color} size='20' />)}} />
      <Tab.Screen name="Profile" component={ProfileStackScreen} options={{ tabBarIcon: ({ color }) => (<IonIcons name='person' color={color} size='20' />)}} />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator 
        initialRouteName="SignIn" 
        screenOptions={{ headerStyle: { backgroundColor: '#00A36C', }, headerTintColor: '#fff', headerTitleStyle: { fontSize: 20, fontWeight: 'normal' }, }} >
          <Stack.Screen name="SignIn" component={LogInScreen} options={{ headerShown: false }} />
          <Stack.Screen name="SignUp" component={SignUpScreen} options={{ title: 'Sign Up' }} />
          <Stack.Screen name="ForgotPassword" component={ForgotPasswordScreen} options={{ title: 'Forgot Password' }} />
          <Stack.Screen name="Dashboard" component={TabNavigator} options={{ headerShown: false }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
