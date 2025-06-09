import { Tabs } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors } from '../../src/theme/theme';

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        tabBarInactiveTintColor: colors.onSurfaceVariant,
        tabBarStyle: {
          backgroundColor: colors.surface,
        },
        headerShown: false,
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: 'Home',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="home" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="onboarding"
        options={{
          title: 'Start',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="play-arrow" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="questionnaire"
        options={{
          title: 'Questions',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="quiz" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="business-plan"
        options={{
          title: 'Business Plan',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="description" size={size} color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="steps"
        options={{
          title: 'CIPC Steps',
          tabBarIcon: ({ color, size }) => (
            <MaterialIcons name="list" size={size} color={color} />
          ),
        }}
      />
    </Tabs>
  );
}