import { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

import { Platform } from 'react-native'; 
import { API_URL_DEV, API_URL_MOBILE, API_URL_PROD } from '@env';

const getApiUrl = () => {
  if (Platform.OS === 'web') {
    return API_URL_DEV;
  }
  if (process.env.NODE_ENV === 'production') {
    return API_URL_PROD;
  }
  return API_URL_MOBILE;
};

const API_URL = getApiUrl();
console.log('🛠 API_URL:', API_URL);
export { API_URL };

interface AuthProps {
  authState: { token: string | null; authenticated: boolean };
  onRegister?: (email: string, password: string) => Promise<any>;
  onLogin?: (email: string, password: string) => Promise<any>;
  onLogout?: () => Promise<any>;
  refreshAuthToken?: () => Promise<void>;
}

const TOKEN_Key = 'my-jwt';
const REFRESH_TOKEN_Key = 'refresh_token';

const AuthContext = createContext<AuthProps | undefined>(undefined);

export const useAuth = (): AuthProps => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

interface LoginResponse {
  access_token: string;
  refresh_token: string;
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [authState, setAuthState] = useState<{ token: string | null; authenticated: boolean }>({
    token: null,
    authenticated: false,
  });

  const setAuthHeader = (token: string) => {
    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
  };
  const clearAuthHeader = () => {
    delete axios.defaults.headers.common['Authorization'];
  };
  useEffect(() => {
    const loadToken = async () => {
      try {
        const token = await AsyncStorage.getItem(TOKEN_Key);
        if (token) {
          setAuthHeader(token);
          setAuthState({ token, authenticated: true });
        } else {
          setAuthState({ token: null, authenticated: false });
        }
      } catch (error) {
        console.error('❌ Error loading token from AsyncStorage:', error);
      }
    };
    loadToken();
  }, []); 
  const login = async (email: string, password: string) => {
    try {
      const formData = new URLSearchParams();
      formData.append('grant_type', 'password');
      formData.append('client_id', 'service_client');
      formData.append('client_secret', 'SWD392-LamNN15-GROUP3-SPRING2025');
      formData.append('username', email);
      formData.append('password', password);
      formData.append('UserNameOrEmail', email);

      const response = await axios.post<LoginResponse>(`${API_URL}/connect/token`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });

      if (response.data.access_token) {
        await AsyncStorage.setItem(TOKEN_Key, response.data.access_token);
        await AsyncStorage.setItem(REFRESH_TOKEN_Key, response.data.refresh_token);
        setAuthHeader(response.data.access_token);
        setAuthState({ token: response.data.access_token, authenticated: true });

        console.log('✅ Login successful');
        return { success: true };
      } else {
        console.error('❌ Invalid response from server: No access token received');
        return { error: true, msg: 'Invalid response from server: No access token received' };
      }
    } catch (error: any) {
      const errorMessage =
        error?.response?.data?.error_description || error?.message || 'Login failed. Please check credentials.';
      console.error('❌ Login Failed:', errorMessage);
      return { error: true, msg: errorMessage };
    }
  };
  const refreshAuthToken = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem(REFRESH_TOKEN_Key);
      if (!refreshToken) {
        console.warn('⚠️ No refresh token found, user must re-login');
        return;
      }
      const formData = new URLSearchParams();
      formData.append('grant_type', 'refresh_token');
      formData.append('client_id', 'service_client');
      formData.append('client_secret', 'SWD392-LamNN15-GROUP3-SPRING2025');
      formData.append('refresh_token', refreshToken);
      const response = await axios.post<LoginResponse>(`${API_URL}/connect/token`, formData, {
        headers: { 'Content-Type': 'application/x-www-form-urlencoded;charset=UTF-8' },
      });
      if (response.data.access_token) {
        await AsyncStorage.setItem(TOKEN_Key, response.data.access_token);
        await AsyncStorage.setItem(REFRESH_TOKEN_Key, response.data.refresh_token);
        setAuthHeader(response.data.access_token);
        setAuthState({ token: response.data.access_token, authenticated: true });

        console.log('🔄 Token refreshed successfully');
      } else {
        console.warn('❌ Failed to refresh token, user must re-login');
      }
    } catch (error) {
      console.error('❌ Error refreshing token:', error);
    }
  };

  const logout = async () => {
    try {
      await AsyncStorage.removeItem(TOKEN_Key);
      await AsyncStorage.removeItem(REFRESH_TOKEN_Key);
      clearAuthHeader();
      setAuthState({ token: null, authenticated: false });

      console.log('✅ Successfully logged out');
    } catch (error) {
      console.error('❌ Error logging out:', error);
    }
  };

  const register = async (email: string, password: string) => {
    try {
      const response = await axios.post(`${API_URL}/register`, { email, password });

      if (response.status === 201) {
        console.log('✅ Registration successful');
        return { success: true };
      } else {
        console.error('❌ Registration failed');
        return { error: true, msg: 'Registration failed' };
      }
    } catch (error: any) {
      const errorMessage = error?.response?.data?.message || error?.message || 'Registration failed.';
      console.error('❌ Registration error:', errorMessage);
      return { error: true, msg: errorMessage };
    }
  };

  const value = {
    authState,
    onLogin: login,
    onRegister: register,
    onLogout: logout,
    refreshAuthToken,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
