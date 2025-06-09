# RegiPro Mobile App

RegiPro is a comprehensive mobile application built with Expo and React Native that helps small businesses with registration, business plan generation, and funding opportunities.

## Features

- **User Authentication**: Secure login and registration
- **Business Plan Generation**: AI-powered business plan creation using OpenAI
- **CIPC Registration**: Step-by-step guidance for business registration
- **ABSA Funding**: Discover funding opportunities and business products
- **Multi-Business Management**: Manage multiple business ventures
- **Responsive Design**: Optimized for both iOS and Android

## Tech Stack

- **Frontend**: React Native with Expo
- **Navigation**: Expo Router
- **UI Components**: React Native Paper
- **State Management**: React Context API
- **Forms**: React Hook Form
- **Storage**: AsyncStorage
- **Backend**: Node.js/Express (existing backend)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Expo CLI
- iOS Simulator or Android Emulator (for development)

### Installation

1. Clone the repository:
```bash
git clone <repository-url>
cd RegiPro
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm start
```

4. Run on your preferred platform:
```bash
# iOS
npm run ios

# Android
npm run android

# Web
npm run web
```

## Project Structure

```
RegiPro/
├── app/                    # App router pages
│   ├── (auth)/            # Authentication screens
│   ├── (tabs)/            # Main app tabs
│   └── _layout.tsx        # Root layout
├── src/
│   ├── components/        # Reusable components
│   ├── contexts/          # React contexts
│   ├── screens/           # Screen components
│   ├── services/          # API services
│   ├── theme/             # Theme configuration
│   └── config/            # App configuration
├── assets/                # Static assets
└── package.json
```

## Configuration

Update the API base URL in `src/config/constants.ts` to match your backend deployment:

```typescript
export const API_BASE_URL = __DEV__ 
  ? 'http://localhost:5001' 
  : 'https://your-backend-url.com';
```

## Key Features Implementation

### Authentication
- JWT-based authentication with secure token storage
- Form validation with React Hook Form
- Automatic token refresh and logout handling

### Business Management
- Create and manage multiple businesses
- Industry-specific icons and categorization
- Business plan generation and download

### Navigation
- Tab-based navigation for main features
- Stack navigation for authentication flow
- Deep linking support with Expo Router

### UI/UX
- Material Design 3 components with React Native Paper
- Custom theme with brand colors
- Responsive design for different screen sizes
- Loading states and error handling

## Backend Integration

The app integrates with the existing Node.js backend:

- **Authentication**: `/auth/signin`, `/auth/signup`, `/auth/signout`
- **Business Management**: `/responses` (CRUD operations)
- **Business Plan Generation**: `/business-plan/generate`

## Building for Production

### Android
```bash
expo build:android
```

### iOS
```bash
expo build:ios
```

## Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## License

This project is licensed under the MIT License.