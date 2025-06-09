import React, { useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import {
  Text,
  TextInput,
  Button,
  Card,
  HelperText,
} from 'react-native-paper';
import { useRouter, Link } from 'expo-router';
import { useForm, Controller } from 'react-hook-form';
import { useAuth } from '../../src/contexts/AuthContext';
import { colors, spacing } from '../../src/theme/theme';
import Toast from 'react-native-toast-message';

interface RegisterForm {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
}

export default function RegisterScreen() {
  const [loading, setLoading] = useState(false);
  const { register: registerUser } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<RegisterForm>();

  const onSubmit = async (data: RegisterForm) => {
    setLoading(true);
    try {
      await registerUser(data.firstname, data.lastname, data.email, data.password);
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'Account created successfully.',
      });
      router.replace('/(tabs)/onboarding');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: error.message || 'Registration failed. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <KeyboardAvoidingView
      style={styles.container}
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
    >
      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <Card style={styles.card}>
          <Card.Content>
            <Text variant="headlineMedium" style={styles.title}>
              Sign Up
            </Text>

            <Controller
              control={control}
              name="firstname"
              rules={{
                required: 'First name is required',
                minLength: {
                  value: 3,
                  message: 'First name must be at least 3 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="First Name"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.firstname}
                  style={styles.input}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.firstname}>
              {errors.firstname?.message}
            </HelperText>

            <Controller
              control={control}
              name="lastname"
              rules={{
                required: 'Last name is required',
                minLength: {
                  value: 3,
                  message: 'Last name must be at least 3 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Last Name"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.lastname}
                  style={styles.input}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.lastname}>
              {errors.lastname?.message}
            </HelperText>

            <Controller
              control={control}
              name="email"
              rules={{
                required: 'Email is required',
                pattern: {
                  value: /^\S+@\S+$/i,
                  message: 'Invalid email address',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Email"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.email}
                  keyboardType="email-address"
                  autoCapitalize="none"
                  style={styles.input}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.email}>
              {errors.email?.message}
            </HelperText>

            <Controller
              control={control}
              name="password"
              rules={{
                required: 'Password is required',
                minLength: {
                  value: 8,
                  message: 'Password must be at least 8 characters',
                },
              }}
              render={({ field: { onChange, onBlur, value } }) => (
                <TextInput
                  label="Password"
                  mode="outlined"
                  onBlur={onBlur}
                  onChangeText={onChange}
                  value={value}
                  error={!!errors.password}
                  secureTextEntry
                  style={styles.input}
                />
              )}
            />
            <HelperText type="error" visible={!!errors.password}>
              {errors.password?.message}
            </HelperText>

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Sign Up
            </Button>

            <View style={styles.loginContainer}>
              <Text>Already have an account? </Text>
              <Link href="/(auth)/login">
                <Text style={styles.loginLink}>Sign In</Text>
              </Link>
            </View>
          </Card.Content>
        </Card>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollContainer: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: spacing.lg,
  },
  card: {
    backgroundColor: 'rgba(236, 253, 245, 0.35)',
  },
  title: {
    textAlign: 'center',
    marginBottom: spacing.xl,
    fontWeight: 'bold',
  },
  input: {
    marginBottom: spacing.sm,
  },
  button: {
    marginTop: spacing.lg,
    marginBottom: spacing.md,
  },
  loginContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  loginLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});