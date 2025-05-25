import React, { useState } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Image, 
  ScrollView, 
  Switch
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { Header } from '@/components/ui/Header';
import { Button } from '@/components/ui/Button';
import { ChevronRight, User, ShoppingBag, Heart, MapPin, CreditCard, Bell, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { useRouter } from 'expo-router';

// Mock user state
const mockIsLoggedIn = true;
const mockUserData = {
  name: 'Emily Johnson',
  email: 'emily.johnson@example.com',
  avatar: 'https://images.pexels.com/photos/3763188/pexels-photo-3763188.jpeg',
};

export default function AccountScreen() {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(mockIsLoggedIn);
  const [userData, setUserData] = useState(mockUserData);
  const [notificationsEnabled, setNotificationsEnabled] = useState(true);
  
  const handleLogout = () => {
    // Simulate logout
    setIsLoggedIn(false);
  };
  
  const handleLogin = () => {
    // Simulate login
    setIsLoggedIn(true);
    setUserData(mockUserData);
  };
  
  const menuItems = [
    {
      id: 'orders',
      title: 'My Orders',
      icon: <ShoppingBag size={22} color={Colors.text.primary} />,
      onPress: () => router.push('/orders'),
    },
    {
      id: 'wishlist',
      title: 'Wishlist',
      icon: <Heart size={22} color={Colors.text.primary} />,
      onPress: () => router.push('/wishlist'),
    },
    {
      id: 'addresses',
      title: 'Shipping Addresses',
      icon: <MapPin size={22} color={Colors.text.primary} />,
      onPress: () => router.push('/addresses'),
    },
    {
      id: 'payment',
      title: 'Payment Methods',
      icon: <CreditCard size={22} color={Colors.text.primary} />,
      onPress: () => router.push('/payment-methods'),
    },
  ];
  
  const settingsItems = [
    {
      id: 'notifications',
      title: 'Push Notifications',
      icon: <Bell size={22} color={Colors.text.primary} />,
      type: 'toggle',
      value: notificationsEnabled,
      onToggle: () => setNotificationsEnabled(!notificationsEnabled),
    },
    {
      id: 'help',
      title: 'Help & Support',
      icon: <HelpCircle size={22} color={Colors.text.primary} />,
      onPress: () => router.push('/support'),
    },
  ];

  return (
    <View style={styles.container}>
      <Header title="My Account" showBack={false} />
      
      <ScrollView style={styles.scrollView}>
        {isLoggedIn ? (
          <>
            {/* User Profile Section */}
            <View style={styles.profileSection}>
              <Image 
                source={{ uri: userData.avatar }} 
                style={styles.avatar}
              />
              <View style={styles.profileInfo}>
                <Text style={styles.userName}>{userData.name}</Text>
                <Text style={styles.userEmail}>{userData.email}</Text>
              </View>
              <TouchableOpacity 
                style={styles.editButton}
                onPress={() => router.push('/edit-profile')}
              >
                <Text style={styles.editButtonText}>Edit</Text>
              </TouchableOpacity>
            </View>
            
            {/* Menu Sections */}
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>My Account</Text>
              {menuItems.map((item) => (
                <TouchableOpacity 
                  key={item.id}
                  style={styles.menuItem}
                  onPress={item.onPress}
                >
                  <View style={styles.menuIconContainer}>
                    {item.icon}
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                  <ChevronRight size={20} color={Colors.neutral.medium} />
                </TouchableOpacity>
              ))}
            </View>
            
            <View style={styles.sectionContainer}>
              <Text style={styles.sectionTitle}>Settings</Text>
              {settingsItems.map((item) => (
                <View key={item.id} style={styles.menuItem}>
                  <View style={styles.menuIconContainer}>
                    {item.icon}
                  </View>
                  <Text style={styles.menuItemText}>{item.title}</Text>
                  
                  {item.type === 'toggle' ? (
                    <Switch
                      value={item.value}
                      onValueChange={item.onToggle}
                      trackColor={{ 
                        false: Colors.neutral.light, 
                        true: Colors.primary.light 
                      }}
                      thumbColor={item.value ? Colors.primary.dark : Colors.neutral.medium}
                    />
                  ) : (
                    <ChevronRight size={20} color={Colors.neutral.medium} />
                  )}
                </View>
              ))}
            </View>
            
            {/* Logout Button */}
            <TouchableOpacity 
              style={styles.logoutButton}
              onPress={handleLogout}
            >
              <LogOut size={20} color={Colors.error.main} />
              <Text style={styles.logoutText}>Logout</Text>
            </TouchableOpacity>
          </>
        ) : (
          <View style={styles.authContainer}>
            <View style={styles.authImageContainer}>
              <Image 
                source={{ uri: 'https://images.pexels.com/photos/6214476/pexels-photo-6214476.jpeg' }} 
                style={styles.authImage}
                resizeMode="cover"
              />
            </View>
            
            <Text style={styles.authTitle}>Sign in to your account</Text>
            <Text style={styles.authDescription}>
              Sign in to access your orders, favorites, and preferences.
            </Text>
            
            <Button 
              title="Sign In" 
              fullWidth 
              style={styles.signInButton}
              onPress={() => router.push('/login')}
            />
            
            <Button 
              title="Create Account" 
              variant="outlined" 
              fullWidth 
              style={styles.createAccountButton}
              onPress={() => router.push('/register')}
            />
          </View>
        )}
        
        <View style={{ height: 40 }} />
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
  },
  scrollView: {
    flex: 1,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: Colors.primary.light,
    marginBottom: 16,
  },
  avatar: {
    width: 70,
    height: 70,
    borderRadius: 35,
    marginRight: 16,
  },
  profileInfo: {
    flex: 1,
  },
  userName: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 14,
    color: Colors.text.secondary,
  },
  editButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: Colors.primary.dark,
  },
  editButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: Colors.text.light,
  },
  sectionContainer: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: Colors.text.primary,
    marginHorizontal: 16,
    marginBottom: 8,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 12,
    paddingHorizontal: 16,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.light,
  },
  menuIconContainer: {
    width: 36,
    alignItems: 'center',
    marginRight: 12,
  },
  menuItemText: {
    flex: 1,
    fontSize: 16,
    color: Colors.text.primary,
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal: 16,
    marginTop: 20,
    paddingVertical: 12,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: Colors.error.light,
  },
  logoutText: {
    marginLeft: 8,
    fontSize: 16,
    fontWeight: '600',
    color: Colors.error.main,
  },
  authContainer: {
    padding: 16,
    alignItems: 'center',
  },
  authImageContainer: {
    width: '100%',
    height: 220,
    borderRadius: 12,
    overflow: 'hidden',
    marginBottom: 24,
  },
  authImage: {
    width: '100%',
    height: '100%',
  },
  authTitle: {
    fontSize: 22,
    fontWeight: '700',
    color: Colors.text.primary,
    marginBottom: 8,
    textAlign: 'center',
  },
  authDescription: {
    fontSize: 16,
    color: Colors.text.secondary,
    marginBottom: 24,
    textAlign: 'center',
  },
  signInButton: {
    marginBottom: 12,
  },
  createAccountButton: {
    backgroundColor: 'transparent',
  },
});




