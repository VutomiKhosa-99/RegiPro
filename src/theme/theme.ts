import { MD3LightTheme } from 'react-native-paper';

export const colors = {
  primary: '#10b981',
  onPrimary: '#ffffff',
  primaryContainer: '#ecfdf5',
  onPrimaryContainer: '#2b2d33',
  secondary: '#689498',
  onSecondary: '#ffffff',
  secondaryContainer: '#ecfdf5',
  onSecondaryContainer: '#2b2d33',
  tertiary: '#2b2d33',
  onTertiary: '#ffffff',
  tertiaryContainer: '#ecfdf5',
  onTertiaryContainer: '#2b2d33',
  error: '#ee0004',
  onError: '#ffffff',
  errorContainer: '#ffeaea',
  onErrorContainer: '#ee0004',
  background: '#ecfdf5',
  onBackground: '#2b2d33',
  surface: '#ffffff',
  onSurface: '#2b2d33',
  surfaceVariant: '#f5f5f5',
  onSurfaceVariant: '#666666',
  outline: '#cccccc',
  outlineVariant: '#e0e0e0',
  shadow: '#000000',
  scrim: '#000000',
  inverseSurface: '#2b2d33',
  inverseOnSurface: '#ffffff',
  inversePrimary: '#10b981',
  elevation: {
    level0: 'transparent',
    level1: '#ffffff',
    level2: '#f8f9fa',
    level3: '#f1f3f4',
    level4: '#e8eaed',
    level5: '#e0e3e6',
  },
  surfaceDisabled: '#f5f5f5',
  onSurfaceDisabled: '#cccccc',
  backdrop: 'rgba(0, 0, 0, 0.5)',
};

export const spacing = {
  xs: 4,
  sm: 8,
  md: 16,
  lg: 24,
  xl: 32,
  xxl: 48,
};

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...colors,
  },
};