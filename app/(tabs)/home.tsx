import React, { useEffect, useState } from 'react';
import {
  View,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {
  Text,
  Card,
  Avatar,
  Button,
  FAB,
  Portal,
  Modal,
} from 'react-native-paper';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { useAuth } from '../../src/contexts/AuthContext';
import { useBusiness } from '../../src/contexts/BusinessContext';
import { colors, spacing } from '../../src/theme/theme';
import LoadingScreen from '../../src/components/LoadingScreen';

export default function HomeScreen() {
  const { user, logout } = useAuth();
  const { businesses, loading, fetchBusinesses } = useBusiness();
  const [greeting, setGreeting] = useState('');
  const [showAbout, setShowAbout] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const hour = new Date().getHours();
    if (hour < 12) setGreeting('Good morning');
    else if (hour < 17) setGreeting('Good afternoon');
    else setGreeting('Good evening');

    fetchBusinesses();
  }, []);

  const handleLogout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to logout?',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Logout',
          style: 'destructive',
          onPress: () => logout(),
        },
      ]
    );
  };

  const handleAddBusiness = () => {
    if (businesses.length >= 2) {
      Alert.alert(
        'Business Limit Reached',
        'You have reached the business limit. Subscribe to add another business.',
        [{ text: 'OK' }]
      );
    } else {
      router.push('/(tabs)/questionnaire');
    }
  };

  const getIndustryIcon = (industry: string) => {
    const iconMap: { [key: string]: string } = {
      'Tech & Software': 'computer',
      'Agriculture': 'agriculture',
      'Manufacturing': 'factory',
      'Fitness & Wellness': 'fitness-center',
      'Property': 'home',
      'Retail': 'store',
      'Entertainment': 'movie',
      'Marketing': 'campaign',
    };
    return iconMap[industry] || 'business';
  };

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <View style={styles.container}>
      <ScrollView style={styles.scrollView}>
        {/* Header */}
        <View style={styles.header}>
          <Text variant="titleMedium" style={styles.greeting}>
            {greeting},
          </Text>
          <Text variant="headlineMedium" style={styles.userName}>
            {user?.firstname}
          </Text>
        </View>

        {/* User Profile Card */}
        <Card style={styles.profileCard}>
          <Card.Content style={styles.profileContent}>
            <Avatar.Icon
              size={60}
              icon="account"
              style={styles.avatar}
            />
            <View style={styles.userInfo}>
              <Text variant="titleMedium" style={styles.fullName}>
                {user?.firstname} {user?.lastname}
              </Text>
              <Text variant="bodyMedium" style={styles.email}>
                {user?.email}
              </Text>
            </View>
          </Card.Content>
        </Card>

        {/* Your Businesses Section */}
        <View style={styles.businessSection}>
          <Text variant="titleLarge" style={styles.sectionTitle}>
            Your Businesses
          </Text>

          <View style={styles.businessGrid}>
            {/* Add New Business Card */}
            <TouchableOpacity
              style={styles.businessCard}
              onPress={handleAddBusiness}
            >
              <View style={styles.businessContent}>
                <View style={styles.addBusinessIcon}>
                  <MaterialIcons name="add" size={28} color={colors.primary} />
                </View>
                <Text style={styles.businessName}>Add New Business</Text>
              </View>
            </TouchableOpacity>

            {/* Existing Businesses */}
            {businesses.map((business) => (
              <TouchableOpacity
                key={business.id}
                style={styles.businessCard}
                onPress={() => router.push(`/business/${business.id}`)}
              >
                <View style={styles.businessContent}>
                  <View style={styles.businessIcon}>
                    <MaterialIcons
                      name={getIndustryIcon(business.industry)}
                      size={40}
                      color={colors.primary}
                    />
                  </View>
                  <Text style={styles.businessName}>{business.name}</Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </ScrollView>

      {/* Bottom Actions */}
      <View style={styles.bottomActions}>
        <TouchableOpacity
          style={styles.actionButton}
          onPress={() => setShowAbout(true)}
        >
          <MaterialIcons name="info" size={16} color={colors.primary} />
          <Text style={styles.actionText}>About App</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={styles.actionButton}
          onPress={handleLogout}
        >
          <MaterialIcons name="logout" size={16} color={colors.primary} />
          <Text style={styles.actionText}>Log Out</Text>
        </TouchableOpacity>
      </View>

      {/* About Modal */}
      <Portal>
        <Modal
          visible={showAbout}
          onDismiss={() => setShowAbout(false)}
          contentContainerStyle={styles.modalContent}
        >
          <Text variant="headlineSmall" style={styles.modalTitle}>
            About RegiPro
          </Text>
          <Text variant="bodyMedium" style={styles.modalText}>
            RegiPro is your ultimate funding success partner. We help you craft winning business plans, register with CIPC, and discover ABSA funding solutions.
          </Text>
          <Button
            mode="contained"
            onPress={() => setShowAbout(false)}
            style={styles.modalButton}
          >
            Close
          </Button>
        </Modal>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
  },
  scrollView: {
    flex: 1,
  },
  header: {
    padding: spacing.lg,
    paddingTop: spacing.xl,
  },
  greeting: {
    color: colors.onSurface,
  },
  userName: {
    fontWeight: 'bold',
    color: colors.onSurface,
  },
  profileCard: {
    margin: spacing.lg,
    backgroundColor: colors.surface,
  },
  profileContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    backgroundColor: colors.primary,
  },
  userInfo: {
    marginLeft: spacing.md,
    flex: 1,
  },
  fullName: {
    fontWeight: 'bold',
  },
  email: {
    color: colors.onSurfaceVariant,
  },
  businessSection: {
    padding: spacing.lg,
  },
  sectionTitle: {
    fontWeight: 'bold',
    marginBottom: spacing.md,
    color: colors.onSurface,
  },
  businessGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  businessCard: {
    width: '48%',
    aspectRatio: 1,
    backgroundColor: 'rgba(217, 217, 217, 0.5)',
    borderRadius: 12,
    borderWidth: 2,
    borderColor: 'rgba(116, 137, 132, 0.64)',
    marginBottom: spacing.md,
  },
  businessContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: spacing.sm,
  },
  addBusinessIcon: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.surface,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: spacing.sm,
  },
  businessIcon: {
    marginBottom: spacing.sm,
  },
  businessName: {
    fontSize: 12,
    fontWeight: '600',
    textAlign: 'center',
    color: colors.onSurface,
  },
  bottomActions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    padding: spacing.md,
    backgroundColor: colors.surface,
    borderTopWidth: 1,
    borderTopColor: colors.outline,
  },
  actionButton: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: spacing.sm,
  },
  actionText: {
    marginLeft: spacing.xs,
    color: colors.primary,
  },
  modalContent: {
    backgroundColor: colors.surface,
    padding: spacing.xl,
    margin: spacing.lg,
    borderRadius: 12,
  },
  modalTitle: {
    textAlign: 'center',
    marginBottom: spacing.md,
    fontWeight: 'bold',
  },
  modalText: {
    textAlign: 'center',
    marginBottom: spacing.lg,
    lineHeight: 24,
  },
  modalButton: {
    marginTop: spacing.md,
  },
});