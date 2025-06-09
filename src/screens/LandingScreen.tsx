import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  ImageBackground,
} from 'react-native';
import {
  Text,
  Button,
  Card,
} from 'react-native-paper';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { MaterialIcons } from '@expo/vector-icons';
import { colors, spacing } from '../theme/theme';

const features = [
  'Craft Winning Business Plans',
  'Register with CIPC',
  'Discover ABSA Funding Solutions',
];

export default function LandingScreen() {
  const [currentFeature, setCurrentFeature] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentFeature((prev) => (prev + 1) % features.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <ScrollView style={styles.container}>
      <LinearGradient
        colors={[colors.primaryContainer, colors.background]}
        style={styles.gradient}
      >
        {/* Header */}
        <View style={styles.header}>
          <Text variant="headlineLarge" style={styles.logo}>
            RegiPro
          </Text>
        </View>

        {/* Hero Section */}
        <View style={styles.heroSection}>
          <View style={styles.heroContent}>
            <Text variant="headlineMedium" style={styles.heroTitle}>
              Turn your vision into a{'\n'}
              <Text style={styles.highlightText}>Prospering reality</Text>
            </Text>

            {/* Animated Features */}
            <View style={styles.featuresContainer}>
              {features.map((feature, index) => (
                <View
                  key={index}
                  style={[
                    styles.featureItem,
                    index === currentFeature && styles.activeFeature,
                  ]}
                >
                  <MaterialIcons
                    name="check-circle"
                    size={20}
                    color={colors.primary}
                    style={styles.checkIcon}
                  />
                  <Text
                    variant="bodyLarge"
                    style={[
                      styles.featureText,
                      index === currentFeature && styles.activeFeatureText,
                    ]}
                  >
                    {feature}
                  </Text>
                </View>
              ))}
            </View>

            {/* Action Buttons */}
            <View style={styles.buttonContainer}>
              <Button
                mode="contained"
                onPress={() => router.push('/(auth)/register')}
                style={styles.primaryButton}
                contentStyle={styles.buttonContent}
              >
                Get Started
                <MaterialIcons name="arrow-forward" size={20} color={colors.onPrimary} />
              </Button>

              <Button
                mode="outlined"
                onPress={() => router.push('/about')}
                style={styles.secondaryButton}
                contentStyle={styles.buttonContent}
              >
                Learn More
                <MaterialIcons name="open-in-new" size={20} color={colors.primary} />
              </Button>
            </View>
          </View>

          {/* Illustration Placeholder */}
          <View style={styles.illustrationContainer}>
            <Card style={styles.illustrationCard}>
              <Card.Content style={styles.illustrationContent}>
                <MaterialIcons
                  name="business-center"
                  size={80}
                  color={colors.primary}
                />
                <Text variant="titleMedium" style={styles.illustrationText}>
                  Your Business Journey Starts Here
                </Text>
              </Card.Content>
            </Card>
          </View>
        </View>

        {/* Features Grid */}
        <View style={styles.featuresGrid}>
          <Card style={styles.featureCard}>
            <Card.Content style={styles.featureCardContent}>
              <MaterialIcons name="description" size={40} color={colors.primary} />
              <Text variant="titleMedium" style={styles.featureCardTitle}>
                Business Plans
              </Text>
              <Text variant="bodyMedium" style={styles.featureCardDescription}>
                AI-powered business plan generation tailored to your industry
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.featureCard}>
            <Card.Content style={styles.featureCardContent}>
              <MaterialIcons name="how-to-reg" size={40} color={colors.primary} />
              <Text variant="titleMedium" style={styles.featureCardTitle}>
                CIPC Registration
              </Text>
              <Text variant="bodyMedium" style={styles.featureCardDescription}>
                Step-by-step guidance for business registration
              </Text>
            </Card.Content>
          </Card>

          <Card style={styles.featureCard}>
            <Card.Content style={styles.featureCardContent}>
              <MaterialIcons name="account-balance" size={40} color={colors.primary} />
              <Text variant="titleMedium" style={styles.featureCardTitle}>
                ABSA Funding
              </Text>
              <Text variant="bodyMedium" style={styles.featureCardDescription}>
                Discover funding opportunities for your business
              </Text>
            </Card.Content>
          </Card>
        </View>

        {/* Call to Action */}
        <View style={styles.ctaSection}>
          <Text variant="headlineSmall" style={styles.ctaTitle}>
            Ready to start your business journey?
          </Text>
          <Button
            mode="contained"
            onPress={() => router.push('/(auth)/register')}
            style={styles.ctaButton}
            contentStyle={styles.buttonContent}
          >
            Sign Up Now
          </Button>
        </View>
      </LinearGradient>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  gradient: {
    flex: 1,
    minHeight: '100%',
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xxl,
    alignItems: 'center',
  },
  logo: {
    fontWeight: 'bold',
    color: colors.primary,
  },
  heroSection: {
    padding: spacing.lg,
    alignItems: 'center',
  },
  heroContent: {
    alignItems: 'center',
    marginBottom: spacing.xl,
  },
  heroTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.onBackground,
    marginBottom: spacing.lg,
  },
  highlightText: {
    color: colors.primary,
  },
  featuresContainer: {
    marginBottom: spacing.xl,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: spacing.sm,
    opacity: 0.6,
  },
  activeFeature: {
    opacity: 1,
  },
  checkIcon: {
    marginRight: spacing.sm,
  },
  featureText: {
    color: colors.onBackground,
  },
  activeFeatureText: {
    fontWeight: 'bold',
  },
  buttonContainer: {
    gap: spacing.md,
    width: '100%',
  },
  primaryButton: {
    borderRadius: 25,
  },
  secondaryButton: {
    borderRadius: 25,
    borderColor: colors.primary,
  },
  buttonContent: {
    paddingVertical: spacing.sm,
    gap: spacing.xs,
  },
  illustrationContainer: {
    width: '100%',
    marginTop: spacing.lg,
  },
  illustrationCard: {
    backgroundColor: colors.surface,
  },
  illustrationContent: {
    alignItems: 'center',
    padding: spacing.xl,
  },
  illustrationText: {
    marginTop: spacing.md,
    textAlign: 'center',
    color: colors.onSurface,
  },
  featuresGrid: {
    padding: spacing.lg,
    gap: spacing.md,
  },
  featureCard: {
    backgroundColor: colors.surface,
  },
  featureCardContent: {
    alignItems: 'center',
    padding: spacing.lg,
  },
  featureCardTitle: {
    marginTop: spacing.md,
    marginBottom: spacing.sm,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  featureCardDescription: {
    textAlign: 'center',
    color: colors.onSurfaceVariant,
  },
  ctaSection: {
    padding: spacing.lg,
    alignItems: 'center',
    marginTop: spacing.xl,
  },
  ctaTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    color: colors.onBackground,
    marginBottom: spacing.lg,
  },
  ctaButton: {
    borderRadius: 25,
    paddingHorizontal: spacing.xl,
  },
});