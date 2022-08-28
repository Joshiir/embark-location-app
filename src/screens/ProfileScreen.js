import { Text, View, TouchableOpacity } from 'react-native';
import Theme from '../themes/Theme';
import { signOut } from "firebase/auth";
import { auth } from '../../firebase';


/**
 * The Profile Screen to view account details,
 * change email and password, and log out.
 * 
 * @param {Object} navigation - React Navigation prop to move between screens
 * @returns renders ProfileScreen
 */
const ProfileScreen = ({ navigation }) => {

  /** 
   * The authenticated user is logged out to the Sign In Screen. 
   */
  const handleLogOut = () => {
    signOut(auth)
    .then(() => {
      navigation.replace('SignIn')
      console.log('Who am I: ', auth.currentUser)
    }).catch((error) => {
      // An error happened.
    });
  }

  return (
    <View style={ Theme.container }>
      <Text style={Theme.title }>My Profile</Text>
      <View style={ Theme.textContainer }>
        <Text style={ Theme.text }>Email: {auth.currentUser?.email}</Text>
        <Text style={ Theme.text }>Name: {auth.currentUser?.displayName}</Text>
      </View>
      <View style={ Theme.buttonContainer }>
        <TouchableOpacity
          style={ Theme.secondaryButton }
          onPress={() => navigation.navigate('ChangeEmail')}>
            <Text style={ Theme.secondaryText }>Change email</Text>
        </TouchableOpacity>
      </View>
      <View style={ Theme.buttonContainer }>
        <TouchableOpacity
          style={ Theme.secondaryButton }
          onPress={() => navigation.navigate('ChangePassword')} >
            <Text style={ Theme.secondaryText }>Change password</Text>
        </TouchableOpacity>
      </View>
      <View style={ Theme.buttonContainer }>
        <TouchableOpacity
          style={ Theme.tertiaryButton }
          onPress={ handleLogOut }>
            <Text style={ Theme.buttonText }>Log Out</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );
}

export default ProfileScreen;
