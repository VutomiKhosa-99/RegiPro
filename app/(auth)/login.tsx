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

interface LoginForm {
  email: string;
  password: string;
}

export default function LoginScreen() {
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();
  const router = useRouter();

  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const onSubmit = async (data: LoginForm) => {
    setLoading(true);
    try {
      await login(data.email, data.password);
      Toast.show({
        type: 'success',
        text1: 'Success!',
        text2: 'You have successfully logged in.',
      });
      router.replace('/(tabs)/home');
    } catch (error: any) {
      Toast.show({
        type: 'error',
        text1: 'Error!',
        text2: error.message || 'Login failed. Please try again.',
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
              Sign In
            </Text>

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
                  value: 6,
                  message: 'Password must be at least 6 characters',
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

            <Link href="/(auth)/forgot-password" style={styles.forgotLink}>
              <Text style={styles.forgotText}>Forgot Password?</Text>
            </Link>

            <Button
              mode="contained"
              onPress={handleSubmit(onSubmit)}
              loading={loading}
              disabled={loading}
              style={styles.button}
            >
              Sign In
            </Button>

            <View style={styles.signupContainer}>
              <Text>Don't have an account? </Text>
              <Link href="/(auth)/register">
                <Text style={styles.signupLink}>Sign Up</Text>
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
  forgotLink: {
    alignSelf: 'flex-end',
    marginBottom: spacing.md,
  },
  forgotText: {
    color: colors.primary,
  },
  signupContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  signupLink: {
    color: colors.primary,
    fontWeight: 'bold',
  },
});