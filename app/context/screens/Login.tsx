import { View, Text, TextInput, Button, Image, StyleSheet } from 'react-native';
import React, { useState } from 'react';
import { useAuth } from '../AuthContext';
import axios from 'axios';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const { onLogin, onRegister } = useAuth();

  const login = async () => {
    try {
      const result = await onLogin!(email, password);

      if (!result) {
        alert("Login Failed: No response from server.");
        return;
      }

      if (result.error) {
        console.log("❌ Login Error:", result);
        alert(`Login Failed: ${result.msg || "Invalid credentials."}`);
      } else {
        console.log("✅ Login Successful:", result);
        alert("Login successful!");
      }
    } catch (error) {
      console.error("❌ API Call Failed:", error);
      alert("An error occurred. Please try again later.");
    }
  };

  const register = async () => {
    try {
      const result = await onRegister!(email, password);

      if (result && result.error) {
        alert(result.msg || "Registration failed. Please try again.");
      } else {
        login();
      }
    } catch (error) {
      console.error("❌ Registration Failed:", error);
      alert("An error occurred during registration. Please try again.");
    }
  };

  return (
    <View style={styles.container}>
      <Image source={{ uri: 'https://galaxies.dev/img/logos/logo--blue.png' }} style={styles.image} />

      <View style={styles.form}>
        <TextInput
          style={styles.input}
          placeholder="Email"
          onChangeText={(text: string) => setEmail(text)}
          value={email}
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          secureTextEntry={true}
          onChangeText={(text: string) => setPassword(text)}
          value={password}
        />
        <Button onPress={login} title="Sign in" />
        <Button onPress={register} title="Create Account" />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  image: {
    width: '50%',
    height: '50%',
    resizeMode: 'contain',
  },
  form: {
    gap: 10,
    width: '60%',
  },
  input: {
    height: 44,
    borderWidth: 1,
    borderRadius: 4,
    padding: 10,
    backgroundColor: '#fff',
  },
  container: {
    alignItems: 'center',
    width: '100%',
  },
});

export default Login;
