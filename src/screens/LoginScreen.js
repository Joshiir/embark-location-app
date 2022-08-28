import { TextInput, Text, View, TouchableOpacity } from 'react-native';
import Theme from '../themes/Theme';
import React, { useState } from 'react';
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from '../../firebase';


/**
 * The Login Screen allowing to login to
 * an account.
 * 
 * @param {Object} navigation - React Navigation prop to move between screens
 * @returns renders LogInScreen
 */
const LogInScreen = ({ navigation }) => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [errorMessage, setErrorMessage] = useState('')

  /** Authenticates email and password with Firebase, and displays error message on error. */
  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      // Signed in 
      const user = userCredential.user;
      console.log('Logged in with: ', user.email)
      console.log('User ID: ', user.uid)
      navigation.replace('Dashboard')
    })
    .catch((error) => {
      // Display Firebase error message
      setErrorMessage(error.message);
    });
  }


  return (
    <View style={ Theme.container }>
      <Text style={ Theme.title }>Login</Text>

        <View style={ Theme.inputContainer }>
          {/* Input field that accepts text and sets the Email.*/}
          <TextInput
            placeholder='Email'
            value={ email }
            onChangeText={text => setEmail(text)}
            style={ Theme.inputText }
          />

          {/* Input field that accepts text and sets the Password.*/}
          <TextInput 
            placeholder='Password'
            value={ password }
            onChangeText={text => setPassword(text)}
            style={ Theme.inputText }
            secureTextEntry
          />
          <Text style={ Theme.errorText }>{errorMessage}</Text>
        </View>
      
      <View style={ Theme.buttonContainer }>
        <TouchableOpacity
          style={ Theme.primaryButton }
          onPress={ handleLogin }>
          <Text style={ Theme.buttonText }>Log In</Text>
        </TouchableOpacity>
      </View>

      <View style={ Theme.buttonContainer }>
        <TouchableOpacity
          onPress={() => navigation.navigate('SignUp')}
          style={ Theme.secondaryButton }>
          <Text style={ Theme.secondaryText }>Create an account</Text>
        </TouchableOpacity>
      </View>

      <View style={ Theme.buttonContainer }>
        <TouchableOpacity
          onPress={() => navigation.navigate('ForgotPassword')}
          style={ Theme.secondaryButton }>
          <Text style={ Theme.secondaryText }>Forgot Password</Text>
        </TouchableOpacity>
      </View>
    
    </View>
  );
}

export default LogInScreen;
