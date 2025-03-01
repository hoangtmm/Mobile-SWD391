import { View, Text, ScrollView, ActivityIndicator } from 'react-native';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { API_URL } from '../AuthContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
const Home = () => {
  const [users, setUsers] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  // useEffect(() => {
  //   const loadUser = async () => {
  //     try {
  //       const result = await axios.get(`${API_URL}/api/token`, {
  //         headers: {
  //           'Authorization': `Bearer ${await AsyncStorage.getItem('my-jwt')}`
  //         }
  //       });
  
  //       setUsers(result.data);
  //     } catch (e: any) {
  //       setError(e.response?.data?.message || e.message);
  //     } finally {
  //       setLoading(false);
  //     }
  //   };
  
  //   loadUser();
  // }, []);

  // if (loading) {
  //   return (
  //     <View>
  //       <ActivityIndicator size="large" color="#0000ff" />
  //       <Text>Loading...</Text>
  //     </View>
  //   );
  // }

  // if (error) {
  //   return (
  //     <View>
  //       <Text style={{ color: 'red' }}>Error: {error}</Text>
  //     </View>
  //   );
  // }

  return (
    <ScrollView>
      {users.length > 0 ? (
        users.map((user, index) => (
          <View key={index}>
            <Text>Hello</Text>
            {/* Render other user properties as needed */}
          </View>
        ))
      ) : (
        <Text>No users found</Text>
      )}
    </ScrollView>
  );
};

export default Home;
