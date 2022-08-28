import React, { useState } from 'react';
import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import Theme from '../themes/Theme';
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth } from '../../firebase';


/**
 * The Sign Up Screen allowing for account creation
 * by entering name, email and password.
 * 
 * @param {Object} navigation - React Navigation prop to move between screens
 * @returns renders SignUpScreen
 */
const SignUpScreen = () => {
  const [email, setEmail] = useState('')
  const [name, setName] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [validationMessage, setValidationMessage] = useState('')

  /**
   * Checks that the first password entered is the exact same as the second password.
   * @param {string} value 
   * @param {string} valueCompare 
   * @param {string} setValue 
   */
  const ValidatePassword = (value, valueCompare, setValue) => {
    if (value !== valueCompare) {
      setValidationMessage('Passwords do not match');
    } else {
      setValidationMessage('');
    }
    setValue(value);
  };

  /** 
   * Authenticates email and password with Firebase, and displays error message on error. 
   */
  const handleSignUp = () => {
    if (password === confirmPassword) {
      createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        // Signed in
        const user = userCredential.user;
        updateProfile(user, {displayName: name })
        console.log('Registered with: ', user.email)
      })
      .catch((error) => {
        // Display Firebase error message
        setValidationMessage(error.message);
      });
    }
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
        <TextInput 
          placeholder='Name'
          value={ name }
          onChangeText={text => setName(text)}
          style={ Theme.inputText }
        />
        <TextInput 
          placeholder='Password'
          value={ password }
          onChangeText={(value) => ValidatePassword(value, confirmPassword, setPassword)}
          style={ Theme.inputText }
          secureTextEntry
        />
        <TextInput 
          placeholder='Confirm Password'
          value={ confirmPassword }
          onChangeText={(value) => ValidatePassword(value, password, setConfirmPassword)}
          style={ Theme.inputText }
          secureTextEntry
        />
        <Text style={ Theme.errorText }>{validationMessage}</Text>
      </View>

      <View style={ Theme.buttonContainer }>
        <TouchableOpacity
          style={ Theme.primaryButton }
          onPress={ handleSignUp }>
          <Text style={ Theme.buttonText }>Create Account</Text>
        </TouchableOpacity>
      </View>

    </View>
  );
}

export default SignUpScreen;
