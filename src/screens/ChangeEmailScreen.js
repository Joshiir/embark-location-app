import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import Theme from '../themes/Theme';
import React, { useState } from 'react';
import { auth } from '../../firebase';
import { updateEmail } from 'firebase/auth';


/**
 * The Change Email Screen allowing for an email
 * to be input to reset password to an account.
 * 
 * @param {Object} navigation - React Navigation prop to move between screens
 * @returns renders ChangeEmailScreen
 */

const ChangeEmailScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  /**
   * The user inputs an email which has a reset password email sent to.
   */
  const handleChangePassword = () => {
    updateEmail(auth, email)
    .then(() => {
      // Password reset email sent!
      // Returned to Login Screen
      navigation.replace('SignIn');
    })
    .catch((error) => {
      //Error if email does not exist
      setErrorMessage(error.message);
    });
  }

  return (
    <View style={ Theme.container }>

      <View style={ Theme.inputContainer }>
        <TextInput
          placeholder='Email'
          value={ email }
          onChangeText={text => setEmail(text)}
          style={ Theme.inputText }
        />
        <Text style={ Theme.errorText }>{ errorMessage }</Text>
      </View>

      <View style={ Theme.buttonContainer }>
        <TouchableOpacity
          style={ Theme.primaryButton }
          onPress={ handleChangePassword }>
          <Text style={ Theme.buttonText }>Reset</Text>
        </TouchableOpacity>
      </View>
        
    </View>
  );
}

export default ChangeEmailScreen;
