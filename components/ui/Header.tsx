import React from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  StatusBar, 
  SafeAreaView 
} from 'react-native';
import { Colors } from '@/constants/Colors';
import { ChevronLeft, Search, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';

interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showCart?: boolean;
  showSearch?: boolean;
  transparent?: boolean;
  cartItemCount?: number;
  onSearchPress?: () => void;
  onCartPress?: () => void;
}

export function Header({ 
  title, 
  showBack = false, 
  showCart = false,
  showSearch = false,
  transparent = false,
  cartItemCount = 0,
  onSearchPress,
  onCartPress
}: HeaderProps) {
  const router = useRouter();
  
  return (
    <SafeAreaView style={[
      styles.safeArea,
      transparent && styles.transparentSafeArea
    ]}>
      <View style={[
        styles.container,
        transparent && styles.transparentContainer
      ]}>
        <View style={styles.leftSection}>
          {showBack && (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <ChevronLeft size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          )}
          {title && <Text style={styles.title}>{title}</Text>}
        </View>
        
        <View style={styles.rightSection}>
          {showSearch && (
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={onSearchPress}
            >
              <Search size={24} color={Colors.text.primary} />
            </TouchableOpacity>
          )}
          
          {showCart && (
            <TouchableOpacity 
              style={styles.iconButton}
              onPress={onCartPress || (() => router.push('/cart'))}
            >
              <ShoppingBag size={24} color={Colors.text.primary} />
              {cartItemCount > 0 && (
                <View style={styles.badge}>
                  <Text style={styles.badgeText}>
                    {cartItemCount > 9 ? '9+' : cartItemCount}
                  </Text>
                </View>
              )}
            </TouchableOpacity>
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    backgroundColor: Colors.background,
    paddingTop: StatusBar.currentHeight,
    zIndex: 1000,
  },
  transparentSafeArea: {
    backgroundColor: 'transparent',
    position: 'absolute',
    width: '100%',
    top: 0,
    zIndex: 1000,
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: Colors.neutral.light,
  },
  transparentContainer: {
    borderBottomWidth: 0,
    backgroundColor: 'transparent',
  },
  leftSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  backButton: {
    marginRight: 8,
    padding: 4,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
    color: Colors.text.primary,
  },
  rightSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconButton: {
    padding: 4,
    marginLeft: 16,
    position: 'relative',
  },
  badge: {
    position: 'absolute',
    top: -4,
    right: -4,
    backgroundColor: Colors.primary.dark,
    borderRadius: 10,
    minWidth: 18,
    height: 18,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 4,
  },
  badgeText: {
    color: Colors.text.light,
    fontSize: 10,
    fontWeight: '700',
  },
});