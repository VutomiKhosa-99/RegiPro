import React, { useEffect } from 'react';
import { View, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuth } from '../src/contexts/AuthContext';
import LandingScreen from '../src/screens/LandingScreen';
import LoadingScreen from '../src/components/LoadingScreen';

export default function Index() {
  const { user, isLoading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!isLoading) {
      if (user) {
        router.replace('/(tabs)/home');
      }
    }
  }, [user, isLoading]);

  if (isLoading) {
    return <LoadingScreen />;
  }

  if (user) {
    return null; // Will redirect to home
  }

  return <LandingScreen />;
}